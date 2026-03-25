// =============================================================================
// SurvivalGrid — Zustand Assessment Store
// =============================================================================
// This is the "silent brain" of the game. The student never sees this store
// directly. Every crisis response, upgrade pick, and wave transition mutates
// this state and appends to the behavioral log. When the game ends, the
// payload is extracted and sent to DeepSeek for career evaluation.
//
// ARCHITECTURE NOTES:
// - Single flat store (no nested slices) for simplicity and performance.
// - All trait-score computation happens inside the store so the component
//   layer stays thin and dumb.
// - The store is designed to be consumed by both the game renderer
//   (reads activeThreats, supplyPoints, etc.) and the API layer
//   (reads payload via getPayload()).
// =============================================================================

import { create } from 'zustand';

import type {
  ActiveThreat,
  ChoiceCategory,
  CrisisDecision,
  GameBehavioralPayload,
  SectorType,
  ThreatSeverity,
  TraitScores,
  UpgradeDecision,
  UpgradeType,
  WaveStats,
} from '@/types/assessment';
import {
  CHOICE_SP_COST,
  GAME_DURATION_SEC,
  SP_BUDGET_PER_WAVE,
  THREAT_ESCALATION_INTERVAL_SEC,
  TOTAL_WAVES,
  WAVE_DURATION_SEC,
} from '@/types/assessment';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Severity escalation order: low → medium → high → critical → destroyed. */
const SEVERITY_ORDER: readonly ThreatSeverity[] = [
  'low',
  'medium',
  'high',
  'critical',
];

/** Advance a severity by one step. Returns null if already critical (destroyed). */
function nextSeverity(current: ThreatSeverity): ThreatSeverity | null {
  const idx = SEVERITY_ORDER.indexOf(current);
  // Already at the highest severity; the next step is sector destruction
  if (idx >= SEVERITY_ORDER.length - 1) return null;
  return SEVERITY_ORDER[idx + 1] ?? null;
}

/** Generate a simple unique ID (crypto.randomUUID is too heavy for this). */
function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Clamp a number between 0 and 1. */
function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

// ---------------------------------------------------------------------------
// Store state shape
// ---------------------------------------------------------------------------

interface AssessmentStoreState {
  // ── Game lifecycle ──────────────────────────────────────────────────────
  /** Whether a game session is currently active. */
  isPlaying: boolean;
  /** Whether the game is temporarily paused (for upgrade selection). */
  isPaused: boolean;
  /** Whether the game has ended (survived or game-over). */
  isGameOver: boolean;

  // ── Clock ───────────────────────────────────────────────────────────────
  /** Seconds elapsed since the game started (0–600). */
  elapsedSec: number;
  /** Current wave number (1–5). */
  currentWave: number;

  // ── Resources ───────────────────────────────────────────────────────────
  /** Current supply points available to spend. */
  supplyPoints: number;
  /** Bonus SP per wave from "Reinforce Grid" upgrades (stacks). */
  bonusSpPerWave: number;
  /** SP discount for quick_fix from "Rapid Response" upgrades (stacks). */
  quickFixDiscount: number;

  // ── Grid state ──────────────────────────────────────────────────────────
  /**
   * Damage per grid cell. Key = "row-col" (e.g. "2-4").
   * Value = cumulative damage (0–6). At 6 the sector is destroyed.
   */
  sectorDamage: Record<string, number>;
  /** Currently active (unresolved) threats on the grid. */
  activeThreats: ActiveThreat[];
  /** Number of sectors totally destroyed. 3+ = game over. */
  destroyedSectorCount: number;

  // ── Upgrade tracking ────────────────────────────────────────────────────
  /** How many cascade shields remain for the current wave. */
  cascadeShieldsRemaining: number;
  /** How many auto-heals remain for the current wave (Supply Chain). */
  autoHealsRemaining: number;
  /** Early warning bonus: threats are revealed this many seconds earlier. */
  earlyWarningBonusSec: number;

  // ── Behavioral payload (silent — student never sees this) ───────────────
  payload: GameBehavioralPayload;
}

// ---------------------------------------------------------------------------
// Store actions
// ---------------------------------------------------------------------------

interface AssessmentStoreActions {
  // ── Lifecycle ───────────────────────────────────────────────────────────
  /** Initialize a new game session for the given student. */
  startGame: (studentId: string) => void;

  /** Called every second by the game loop tick. */
  tick: () => void;

  // ── Threats ─────────────────────────────────────────────────────────────
  /** Spawn a new threat on a specific grid cell. */
  spawnThreat: (row: number, col: number, sectorType: SectorType, severity: ThreatSeverity) => void;

  // ── Player choices ──────────────────────────────────────────────────────
  /**
   * Record the student's response to a crisis.
   * This is THE primary psychometric data point.
   */
  makeChoice: (threatId: string, choice: ChoiceCategory) => void;

  /** Record the permanent upgrade chosen between waves. */
  chooseUpgrade: (upgrade: UpgradeType, offered: UpgradeType[]) => void;

  // ── Wave transitions ────────────────────────────────────────────────────
  /** Advance to the next wave (called automatically by tick). */
  advanceWave: () => void;

  // ── End state ───────────────────────────────────────────────────────────
  /** End the game (called on timeout or 3 sectors destroyed). */
  endGame: (survived: boolean) => void;

  /** Extract the full behavioral payload for the AI evaluator. */
  getPayload: () => GameBehavioralPayload;
}

export type AssessmentStore = AssessmentStoreState & AssessmentStoreActions;

// ---------------------------------------------------------------------------
// Default trait scores (all start at 0.5 = neutral)
// ---------------------------------------------------------------------------

function defaultTraitScores(): TraitScores {
  return {
    impulsivity: 0.5,
    longTermPlanning: 0.5,
    lateralThinking: 0.5,
    riskTolerance: 0.5,
    prioritization: 0.5,
    resourceEfficiency: 0.5,
    adaptability: 0.5,
  };
}

// ---------------------------------------------------------------------------
// Default payload factory
// ---------------------------------------------------------------------------

function emptyPayload(studentId: string): GameBehavioralPayload {
  return {
    studentId,
    gameStartedAt: new Date().toISOString(),
    gameDurationSec: 0,
    survived: false,
    finalDamageScore: 0,
    crisisDecisions: [],
    upgradeDecisions: [],
    waveStats: [],
    traitScores: defaultTraitScores(),
  };
}

// ---------------------------------------------------------------------------
// Default wave stats factory
// ---------------------------------------------------------------------------

function emptyWaveStats(wave: number): WaveStats {
  return {
    wave,
    threatsAppeared: 0,
    threatsResolved: 0,
    sectorsLost: [],
    spSpent: 0,
    cascadeEvents: 0,
  };
}

// ---------------------------------------------------------------------------
// Trait score computation
// ---------------------------------------------------------------------------

/**
 * Recompute all trait scores from the full decision history.
 * This runs after every decision so the payload is always up-to-date.
 *
 * DESIGN NOTE: We intentionally recompute from scratch each time rather
 * than doing incremental updates. With a maximum of ~40 decisions in a
 * 10-minute game, this is negligible cost and avoids drift bugs.
 */
function computeTraitScores(
  crisisDecisions: CrisisDecision[],
  upgradeDecisions: UpgradeDecision[],
): TraitScores {
  // Start neutral
  const traits = defaultTraitScores();
  if (crisisDecisions.length === 0) return traits;

  const total = crisisDecisions.length;

  // ── Count choice categories ───────────────────────────────────────────
  let quickFixes = 0;
  let strategicInvestments = 0;
  let creativeReallocations = 0;
  let ignores = 0;
  let totalDeliberation = 0;
  let highSeverityIgnores = 0;

  // Track whether the student changed strategy across waves
  const choicesPerWave = new Map<number, ChoiceCategory[]>();

  for (const d of crisisDecisions) {
    switch (d.choiceCategory) {
      case 'quick_fix': quickFixes++; break;
      case 'strategic_investment': strategicInvestments++; break;
      case 'creative_reallocation': creativeReallocations++; break;
      case 'ignore': ignores++; break;
    }

    totalDeliberation += d.deliberationTimeSec;

    // Did they ignore a high/critical threat? Bold or reckless.
    if (d.choiceCategory === 'ignore' && (d.threatSeverity === 'high' || d.threatSeverity === 'critical')) {
      highSeverityIgnores++;
    }

    // Group choices by wave for adaptability calculation
    const existing = choicesPerWave.get(d.wave) ?? [];
    existing.push(d.choiceCategory);
    choicesPerWave.set(d.wave, existing);
  }

  // ── Impulsivity (high quick_fix ratio + low deliberation time) ────────
  const avgDeliberation = totalDeliberation / total;
  traits.impulsivity = clamp01(
    (quickFixes / total) * 0.6 + (1 - Math.min(avgDeliberation / 10, 1)) * 0.4,
  );

  // ── Long-term planning (strategic investments + upgrade pattern) ──────
  let planningUpgradeBonus = 0;
  for (const u of upgradeDecisions) {
    if (u.upgradeChosen === 'early_warning' || u.upgradeChosen === 'supply_chain') {
      planningUpgradeBonus += 0.1;
    }
  }
  traits.longTermPlanning = clamp01(
    (strategicInvestments / total) * 0.7 + planningUpgradeBonus,
  );

  // ── Lateral thinking (creative reallocations) ─────────────────────────
  traits.lateralThinking = clamp01(
    (creativeReallocations / total) * 0.8 + (creativeReallocations > 3 ? 0.2 : 0),
  );

  // ── Risk tolerance (ignores, especially on high-severity threats) ─────
  traits.riskTolerance = clamp01(
    (ignores / total) * 0.5 + (highSeverityIgnores / Math.max(total, 1)) * 0.5,
  );

  // ── Prioritization (did they fix critical threats first?) ─────────────
  // Measure: ratio of quick_fix/strategic on high/critical threats
  let criticalResponses = 0;
  let criticalThreats = 0;
  for (const d of crisisDecisions) {
    if (d.threatSeverity === 'high' || d.threatSeverity === 'critical') {
      criticalThreats++;
      if (d.choiceCategory !== 'ignore') criticalResponses++;
    }
  }
  traits.prioritization = criticalThreats > 0
    ? clamp01(criticalResponses / criticalThreats)
    : 0.5;

  // ── Resource efficiency (SP remaining vs SP spent ratio) ──────────────
  // Higher remaining SP at game end = more efficient (or more passive)
  const avgSpRemaining = crisisDecisions.reduce((s, d) => s + d.spRemaining, 0) / total;
  // Normalize: 0 SP = bad, 10 SP = great
  traits.resourceEfficiency = clamp01(avgSpRemaining / 10);

  // ── Adaptability (strategy diversity across waves) ────────────────────
  // If the student uses different choice categories across waves, they adapt
  let uniqueStrategySets = 0;
  const previousWaveSigs = new Set<string>();
  for (const [_, choices] of choicesPerWave) {
    // Create a "signature" for each wave's strategy mix
    const sig = [...new Set(choices)].sort().join(',');
    if (!previousWaveSigs.has(sig)) {
      uniqueStrategySets++;
      previousWaveSigs.add(sig);
    }
  }
  // More unique strategies across waves = higher adaptability
  traits.adaptability = clamp01(uniqueStrategySets / Math.max(choicesPerWave.size, 1));

  return traits;
}

// ---------------------------------------------------------------------------
// The store
// ---------------------------------------------------------------------------

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  // ── Initial state ─────────────────────────────────────────────────────
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  elapsedSec: 0,
  currentWave: 1,
  supplyPoints: SP_BUDGET_PER_WAVE[0] ?? 10,
  bonusSpPerWave: 0,
  quickFixDiscount: 0,
  sectorDamage: {},
  activeThreats: [],
  destroyedSectorCount: 0,
  cascadeShieldsRemaining: 0,
  autoHealsRemaining: 0,
  earlyWarningBonusSec: 0,
  payload: emptyPayload(''),

  // ── startGame ─────────────────────────────────────────────────────────
  // Resets all state and begins a fresh game session.
  // Called once when the student clicks "Start Assessment".
  startGame: (studentId: string) => {
    set({
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      elapsedSec: 0,
      currentWave: 1,
      supplyPoints: (SP_BUDGET_PER_WAVE[0] ?? 10),
      bonusSpPerWave: 0,
      quickFixDiscount: 0,
      sectorDamage: {},
      activeThreats: [],
      destroyedSectorCount: 0,
      cascadeShieldsRemaining: 0,
      autoHealsRemaining: 0,
      earlyWarningBonusSec: 0,
      payload: emptyPayload(studentId),
    });
  },

  // ── tick ───────────────────────────────────────────────────────────────
  // Called every second by a requestAnimationFrame / setInterval loop.
  // Handles: clock advancement, threat escalation, game-over checks.
  tick: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver) return;

    const newElapsed = state.elapsedSec + 1;

    // ── Time's up → game over ──────────────────────────────────────────
    if (newElapsed >= GAME_DURATION_SEC) {
      state.endGame(true); // Survived the full 10 minutes
      return;
    }

    // ── Auto-advance wave ──────────────────────────────────────────────
    const newWave = Math.min(
      Math.floor(newElapsed / WAVE_DURATION_SEC) + 1,
      TOTAL_WAVES,
    );
    if (newWave > state.currentWave) {
      // Wave transition — this will pause the game for upgrade selection
      state.advanceWave();
      return;
    }

    // ── Escalate existing threats ──────────────────────────────────────
    // Every THREAT_ESCALATION_INTERVAL_SEC seconds, unresolved threats
    // get one step worse. This is the core pressure mechanic.
    const updatedThreats: ActiveThreat[] = [];
    let newDestroyedCount = state.destroyedSectorCount;
    const currentWaveStats = state.payload.waveStats[state.currentWave - 1]
      ?? emptyWaveStats(state.currentWave);

    for (const threat of state.activeThreats) {
      const age = newElapsed - threat.spawnedAtSec;
      const shouldEscalate = age > 0 && age % THREAT_ESCALATION_INTERVAL_SEC === 0;

      if (shouldEscalate) {
        const next = nextSeverity(threat.severity);
        if (next === null) {
          // ── Sector destroyed ──────────────────────────────────────
          const key = `${threat.row}-${threat.col}`;
          const currentDamage = state.sectorDamage[key] ?? 0;
          const newSectorDamage = { ...state.sectorDamage, [key]: 6 };

          // Only count as newly destroyed if it wasn't already at 6
          if (currentDamage < 6) {
            newDestroyedCount++;
            currentWaveStats.sectorsLost.push(threat.sectorType);
          }

          set({ sectorDamage: newSectorDamage });
          // Threat is consumed (sector gone), don't keep it
        } else {
          // Threat escalates to next severity
          updatedThreats.push({ ...threat, severity: next });
        }
      } else {
        updatedThreats.push(threat);
      }
    }

    // ── Update wave stats in payload ────────────────────────────────────
    const updatedWaveStats = [...state.payload.waveStats];
    updatedWaveStats[state.currentWave - 1] = currentWaveStats;

    set({
      elapsedSec: newElapsed,
      activeThreats: updatedThreats,
      destroyedSectorCount: newDestroyedCount,
      payload: {
        ...state.payload,
        gameDurationSec: newElapsed,
        waveStats: updatedWaveStats,
      },
    });

    // ── Check game-over condition: 3+ sectors destroyed ────────────────
    if (newDestroyedCount >= 3) {
      // Use setTimeout(0) to avoid set-during-set issues
      setTimeout(() => { get().endGame(false); }, 0);
    }
  },

  // ── spawnThreat ───────────────────────────────────────────────────────
  // Places a new threat on the grid. Called by the game engine's wave
  // script (Phase 3). Immediately appends to activeThreats and updates
  // the per-wave statistics.
  spawnThreat: (row: number, col: number, sectorType: SectorType, severity: ThreatSeverity) => {
    const state = get();
    const now = state.elapsedSec;

    const newThreat: ActiveThreat = {
      id: uid(),
      row,
      col,
      sectorType,
      severity,
      spawnedAtSec: now,
      presentedAtSec: now, // Will be adjusted by early_warning upgrade
    };

    // Apply early warning: present the choice card earlier
    if (state.earlyWarningBonusSec > 0) {
      newThreat.presentedAtSec = Math.max(0, now - state.earlyWarningBonusSec);
    }

    // Update wave stats: increment threatsAppeared
    const waveIdx = state.currentWave - 1;
    const updatedWaveStats = [...state.payload.waveStats];
    const ws = updatedWaveStats[waveIdx] ?? emptyWaveStats(state.currentWave);
    ws.threatsAppeared++;
    updatedWaveStats[waveIdx] = ws;

    set({
      activeThreats: [...state.activeThreats, newThreat],
      payload: {
        ...state.payload,
        waveStats: updatedWaveStats,
      },
    });
  },

  // ── makeChoice ────────────────────────────────────────────────────────
  // THE most important action: records what the student chose to do
  // about a specific threat. This is the primary psychometric data point.
  //
  // FLOW:
  // 1. Find the threat by ID
  // 2. Compute deliberation time (now − presentedAt)
  // 3. Apply SP cost (with discount for rapid_response upgrade)
  // 4. Resolve or escalate the threat based on choice
  // 5. Log the CrisisDecision
  // 6. Recompute trait scores
  makeChoice: (threatId: string, choice: ChoiceCategory) => {
    const state = get();
    const threat = state.activeThreats.find((t) => t.id === threatId);
    if (!threat) return; // Threat already resolved or destroyed

    const now = state.elapsedSec;
    const deliberation = now - threat.presentedAtSec;

    // ── Calculate SP cost ──────────────────────────────────────────────
    let cost = CHOICE_SP_COST[choice];
    if (choice === 'quick_fix') {
      cost = Math.max(0, cost - state.quickFixDiscount);
    }

    // ── Check if the student can afford it ──────────────────────────────
    // If they can't afford a paid choice, fall back to 'ignore'
    const effectiveChoice: ChoiceCategory =
      cost > state.supplyPoints && cost > 0 ? 'ignore' : choice;
    const effectiveCost = effectiveChoice === choice ? cost : 0;

    // ── Resolve the threat ─────────────────────────────────────────────
    // quick_fix: threat is immediately removed
    // strategic_investment: threat severity drops by 1 (or removed if low)
    // creative_reallocation: threat removed, but random neighbor takes +1 damage
    // ignore: threat stays and keeps escalating
    let updatedThreats = [...state.activeThreats];
    let updatedSectorDamage = { ...state.sectorDamage };

    switch (effectiveChoice) {
      case 'quick_fix':
        // Instantly remove the threat
        updatedThreats = updatedThreats.filter((t) => t.id !== threatId);
        break;

      case 'strategic_investment':
        // Reduce severity by one step; remove if already at 'low'
        updatedThreats = updatedThreats.map((t) => {
          if (t.id !== threatId) return t;
          const idx = SEVERITY_ORDER.indexOf(t.severity);
          if (idx <= 0) return t; // Will be filtered below
          return { ...t, severity: SEVERITY_ORDER[idx - 1]! };
        }).filter((t) => {
          // Remove threats that were 'low' and got "fixed" by investment
          if (t.id === threatId && t.severity === 'low') return false;
          return true;
        });
        break;

      case 'creative_reallocation': {
        // Remove the threat entirely
        updatedThreats = updatedThreats.filter((t) => t.id !== threatId);
        // Tradeoff: a random adjacent cell takes +1 damage
        const neighbors = [
          `${threat.row - 1}-${threat.col}`,
          `${threat.row + 1}-${threat.col}`,
          `${threat.row}-${threat.col - 1}`,
          `${threat.row}-${threat.col + 1}`,
        ].filter((key) => {
          const [r, c] = key.split('-').map(Number);
          return r !== undefined && c !== undefined && r >= 0 && r < 6 && c >= 0 && c < 6;
        });
        if (neighbors.length > 0) {
          const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]!;
          updatedSectorDamage[randomNeighbor] =
            Math.min(6, (updatedSectorDamage[randomNeighbor] ?? 0) + 1);
        }
        break;
      }

      case 'ignore':
        // Threat stays in activeThreats, keeps escalating via tick()
        break;
    }

    // ── Update wave stats ──────────────────────────────────────────────
    const waveIdx = state.currentWave - 1;
    const updatedWaveStats = [...state.payload.waveStats];
    const ws = updatedWaveStats[waveIdx] ?? emptyWaveStats(state.currentWave);
    if (effectiveChoice !== 'ignore') {
      ws.threatsResolved++;
    }
    ws.spSpent += effectiveCost;
    updatedWaveStats[waveIdx] = ws;

    // ── Log the crisis decision ────────────────────────────────────────
    const decision: CrisisDecision = {
      wave: state.currentWave,
      timestampSec: now,
      threatSeverity: threat.severity,
      sectorType: threat.sectorType,
      choiceCategory: effectiveChoice,
      spRemaining: state.supplyPoints - effectiveCost,
      deliberationTimeSec: deliberation,
      concurrentThreats: state.activeThreats.length - 1, // Exclude this one
    };

    const updatedDecisions = [...state.payload.crisisDecisions, decision];

    // ── Recompute trait scores from full history ────────────────────────
    const updatedTraits = computeTraitScores(
      updatedDecisions,
      state.payload.upgradeDecisions,
    );

    set({
      supplyPoints: state.supplyPoints - effectiveCost,
      activeThreats: updatedThreats,
      sectorDamage: updatedSectorDamage,
      payload: {
        ...state.payload,
        crisisDecisions: updatedDecisions,
        waveStats: updatedWaveStats,
        traitScores: updatedTraits,
      },
    });
  },

  // ── chooseUpgrade ─────────────────────────────────────────────────────
  // Called when the student picks a permanent upgrade between waves.
  // Applies the upgrade effect and logs it to the behavioral payload.
  chooseUpgrade: (upgrade: UpgradeType, offered: UpgradeType[]) => {
    const state = get();

    // ── Apply the upgrade effect ───────────────────────────────────────
    const updates: Partial<AssessmentStoreState> = {};
    switch (upgrade) {
      case 'reinforce_grid':
        updates.bonusSpPerWave = state.bonusSpPerWave + 1;
        break;
      case 'early_warning':
        updates.earlyWarningBonusSec = state.earlyWarningBonusSec + 5;
        break;
      case 'rapid_response':
        updates.quickFixDiscount = state.quickFixDiscount + 1;
        break;
      case 'supply_chain':
        updates.autoHealsRemaining = state.autoHealsRemaining + 1;
        break;
      case 'cascade_shield':
        updates.cascadeShieldsRemaining = state.cascadeShieldsRemaining + 1;
        break;
    }

    // ── Log to behavioral payload ──────────────────────────────────────
    const upgradeDecision: UpgradeDecision = {
      afterWave: state.currentWave,
      upgradeChosen: upgrade,
      upgradesOffered: offered,
    };

    const updatedUpgradeDecisions = [
      ...state.payload.upgradeDecisions,
      upgradeDecision,
    ];

    // ── Recompute trait scores with the new upgrade data ────────────────
    const updatedTraits = computeTraitScores(
      state.payload.crisisDecisions,
      updatedUpgradeDecisions,
    );

    set({
      ...updates,
      isPaused: false, // Resume the game after upgrade selection
      payload: {
        ...state.payload,
        upgradeDecisions: updatedUpgradeDecisions,
        traitScores: updatedTraits,
      },
    });
  },

  // ── advanceWave ───────────────────────────────────────────────────────
  // Transitions between waves. Pauses the game to show the upgrade
  // selection modal, then replenishes SP for the next wave.
  advanceWave: () => {
    const state = get();
    const nextWave = state.currentWave + 1;

    if (nextWave > TOTAL_WAVES) {
      state.endGame(true);
      return;
    }

    // Replenish SP for the new wave (base budget + bonus from upgrades)
    const baseSp = SP_BUDGET_PER_WAVE[nextWave - 1] ?? 6;
    const newSp = baseSp + state.bonusSpPerWave;

    // Initialize wave stats for the new wave
    const updatedWaveStats = [...state.payload.waveStats];
    updatedWaveStats[nextWave - 1] = emptyWaveStats(nextWave);

    set({
      currentWave: nextWave,
      supplyPoints: newSp,
      isPaused: true, // Pause for upgrade selection (Phase 4 UI)
      // Reset per-wave upgrade uses
      cascadeShieldsRemaining: state.cascadeShieldsRemaining > 0 ? 1 : 0,
      autoHealsRemaining: state.autoHealsRemaining > 0 ? 1 : 0,
      payload: {
        ...state.payload,
        waveStats: updatedWaveStats,
      },
    });
  },

  // ── endGame ───────────────────────────────────────────────────────────
  // Finalizes the behavioral payload with end-of-game stats.
  endGame: (survived: boolean) => {
    const state = get();

    // Calculate final damage score: sum of all sector damage values
    const finalDamageScore = Object.values(state.sectorDamage).reduce(
      (sum, dmg) => sum + dmg,
      0,
    );

    set({
      isPlaying: false,
      isGameOver: true,
      payload: {
        ...state.payload,
        survived,
        gameDurationSec: state.elapsedSec,
        finalDamageScore,
      },
    });
  },

  // ── getPayload ────────────────────────────────────────────────────────
  // Returns the complete behavioral payload for the AI evaluator.
  // Called after the game ends to send data to DeepSeek.
  getPayload: () => {
    return get().payload;
  },
}));
