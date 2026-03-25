# ManzilTak Game Concept Selection & Zustand Schema

## Objective

Select the **one** concept (out of 15) that best satisfies three constraints simultaneously:

1. **Hardware** — Pentium dual-core / 8 GB DDR3. Must render at 30+ fps via CSS Grid or a tiny Canvas loop. No physics engines, particle systems, or 3D.
2. **Vampire Survivors Mechanic** — Continuous escalating pressure + forced upgrade/resource choices during pressure. We track *what* they choose, not *how fast* they click.
3. **Psychometric Breadth** — The choice tree must cleanly map to ≥ 5 non-mainstream career archetypes so the AI evaluation has rich signal.

---

## Ranking Summary

| # | Concept | VS Fit | HW Fit | Psych Breadth | Verdict |
|---|---------|--------|--------|---------------|---------|
| 1 | EcoSphere Guardians | ⚠️ Turn-based, no real-time pressure | ✅ | ❌ Narrow (marine only) | **Reject** |
| 2 | CyberSentinel | ✅ Waves of attacks = escalating pressure | ✅ | ⚠️ Narrow (security only) | Candidate |
| 3 | CityScape Architects | ⚠️ Slow sim, no survival mechanic | ✅ | ⚠️ Single career | **Reject** |
| 4 | Orbital Pathfinder | ❌ Needs physics sim for slingshots | ❌ | ❌ Single career | **Reject** |
| 5 | Sound Wave Composer | ❌ Needs Web Audio API, no pressure loop | ⚠️ | ❌ Single career | **Reject** |
| 6 | Crisis Allocator | ✅ Time-pressured triage = great VS fit | ✅ | ✅ Broad (logistics → many fields) | **🏆 WINNER** |
| 7 | MolecularSymphony | ❌ Puzzle-like, no escalation | ✅ | ❌ Narrow | **Reject** |
| 8 | EchoThread | ❌ No pressure mechanic at all | ✅ | ❌ Very narrow | **Reject** |
| 9 | Pathfinder (Epi) | ⚠️ Analytical, weak pressure loop | ✅ | ❌ Single career | **Reject** |
| 10 | Biomimicry Engineer | ❌ Observation-based, no survival | ⚠️ Needs creature animation | ❌ Single career | **Reject** |
| 11 | Precision Ag | ❌ Slow cycles, no pressure | ✅ | ❌ Single career | **Reject** |
| 12 | Astro-Botanist | ⚠️ Resource mgmt but slow loop | ✅ | ❌ Single career | **Reject** |
| 13 | Quantum Circuit | ❌ Pure puzzle, no escalation | ✅ | ❌ Single career | **Reject** |
| 14 | LedgerFlow | ⚠️ Time-pressured but narrow choice tree | ✅ | ❌ Single career | **Reject** |
| 15 | NeuroSync | ⚠️ Precision tuning, weak choice tree | ✅ | ❌ Single career | **Reject** |

---

## 🏆 Selected Concept: Crisis Allocator — Reimagined as "SurvivalGrid"

### Why Crisis Allocator Wins

The original concept already embeds the Vampire Survivors DNA:
- **Escalating pressure:** Disasters strike in waves of increasing severity
- **Forced resource choices:** Limited resources must be triaged across competing needs
- **Short-term vs long-term tradeoffs:** Bandage a crisis now, or invest in infrastructure for later?
- **Broad career mapping:** The *way* you triage maps to dozens of non-mainstream careers — not just one

It's also trivially lightweight: a CSS Grid of hex/square tiles, no physics, no animation beyond color transitions and simple CSS transforms.

---

## Full Game Design: SurvivalGrid

### Theme & Setup

You are the **Resource Commander** of a 6×6 grid representing a region hit by escalating crises. Each cell represents a sector (residential, hospital, power, water, farm, factory). Crises spawn as colored threat indicators on cells. You have a finite pool of **Supply Points (SP)** replenished in small increments each wave.

### The 10-Minute Loop (5 Waves × ~2 min each)

| Wave | Time | Threats | SP Budget | Pressure |
|------|------|---------|-----------|----------|
| 1 | 0:00–2:00 | 2 mild threats | 10 SP | Tutorial-level |
| 2 | 2:00–4:00 | 4 threats, 1 critical | 8 SP | Scarcity begins |
| 3 | 4:00–6:00 | 6 threats, 2 critical, 1 cascade | 8 SP | Cascading failures |
| 4 | 6:00–8:00 | 8 threats, chain reactions | 7 SP | True triage |
| 5 | 8:00–10:00 | 10 threats, boss-level cascade | 6 SP | Survival mode |

**Goal:** Keep total sector damage below a threshold by the end of wave 5. Complete collapse of any 3 sectors = early game over.

### The Pressure Mechanic

- **Threats auto-escalate.** An unresolved threat grows from yellow → orange → red → 💀 (sector lost) over ~20 seconds.
- **Cascade effect.** A lost sector damages its neighbors (e.g., lost power plant → hospital loses functionality).
- **Timer per wave.** You cannot stall; the next wave starts automatically.

### The Upgrade/Choice System (The Assessment Engine)

When a crisis spawns, the player selects one of **3 response options** (presented as cards):

| Choice Type | Example | What It Reveals |
|-------------|---------|-----------------|
| **Quick Fix** (high SP cost, instant) | "Deploy emergency rations" (costs 4 SP, stops 1 threat now) | Impulsive, reactive, prefers certainty |
| **Strategic Investment** (low SP cost, delayed) | "Build water pipeline" (costs 2 SP, prevents future water crises) | Long-term planner, comfortable with risk |
| **Creative Reallocation** (0 SP cost, has tradeoff) | "Redirect hospital staff to farm" (saves farm, weakens hospital) | Lateral thinker, systems-aware |
| **Ignore / Skip** | Do nothing, save SP for later | Risk-tolerant, strategic patience or avoidance |

Each wave also offers **1 permanent upgrade** (analogous to VS level-up):

| Upgrade | Effect | Psychometric Signal |
|---------|--------|---------------------|
| **Reinforce Grid** | +1 max SP per wave | Conservative, values security |
| **Early Warning** | See threats 5s earlier | Analytical, values information |
| **Rapid Response** | Quick Fix costs -1 SP | Action-oriented, trusts instinct |
| **Supply Chain** | Auto-heal 1 low-severity threat per wave | Delegation, systems thinking |
| **Cascade Shield** | Prevent 1 cascade event per wave | Risk mitigation, protective instinct |

### How Choices Map to Non-Mainstream Careers

The AI evaluator analyzes the *pattern of decisions*, not win/lose:

| Behavioral Pattern | Dominant Trait | Career Archetypes |
|--------------------|----------------|-------------------|
| Mostly Quick Fixes + Rapid Response upgrades | **Action-Oriented, Decisive** | Emergency Medicine, Disaster Relief Coordinator, Firefighting Engineer, Crisis Journalist |
| Mostly Strategic Investments + Early Warning | **Long-Term Planner, Analytical** | Urban Planner, Environmental Policy Analyst, Climate Scientist, Epidemiologist |
| Mostly Creative Reallocations + Supply Chain | **Systems Thinker, Lateral** | Social Entrepreneur, Product Designer, Supply Chain Architect, Behavioral Economist |
| Mixed + Cascade Shield focus | **Risk-Aware Protector** | Cybersecurity Analyst, Insurance Actuary, Aviation Safety Inspector, Bioethicist |
| Ignores low-severity + bets on big moves | **High-Risk Tolerance, Visionary** | Startup Founder, Venture Capitalist, Film Director, Game Designer |

---

## The Behavioral Tracking Schema (Zustand Store)

> [!IMPORTANT]
> This is the **silent brain** that the student never sees. Every choice updates this store. The final JSON payload is sent to DeepSeek for evaluation.

### TypeScript Interfaces

```typescript
/** Categories of choices a player can make in response to a crisis. */
type ChoiceCategory = 'quick_fix' | 'strategic_investment' | 'creative_reallocation' | 'ignore';

/** Permanent upgrade options offered between waves. */
type UpgradeType = 'reinforce_grid' | 'early_warning' | 'rapid_response' | 'supply_chain' | 'cascade_shield';

/** Severity levels for threats on the grid. */
type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

/** Sector types in the 6×6 grid. */
type SectorType = 'residential' | 'hospital' | 'power' | 'water' | 'farm' | 'factory';

/** A single decision the student made in response to a crisis. */
interface CrisisDecision {
  /** Which wave this happened in (1-5). */
  wave: number;
  /** Seconds elapsed in the game when this decision was made. */
  timestampSec: number;
  /** The severity of the threat they responded to. */
  threatSeverity: ThreatSeverity;
  /** The sector under threat. */
  sectorType: SectorType;
  /** What the student chose to do. */
  choiceCategory: ChoiceCategory;
  /** SP remaining at the moment of decision. */
  spRemaining: number;
  /** How many seconds they deliberated before choosing. */
  deliberationTimeSec: number;
  /** How many other active threats existed when they made this choice. */
  concurrentThreats: number;
}

/** A permanent upgrade chosen between waves. */
interface UpgradeDecision {
  /** After which wave this upgrade was chosen (1-4). */
  afterWave: number;
  /** Which upgrade was selected. */
  upgradeChosen: UpgradeType;
  /** The other options that were available but not picked. */
  upgradesOffered: UpgradeType[];
}

/** Rolling trait scores derived from decision patterns. */
interface TraitScores {
  /** Tendency toward immediate action (0-1). */
  impulsivity: number;
  /** Tendency to invest for the future vs fix now (0-1). */
  longTermPlanning: number;
  /** Willingness to accept tradeoffs and creative workarounds (0-1). */
  lateralThinking: number;
  /** Comfort with leaving threats unresolved (0-1). */
  riskTolerance: number;
  /** Tendency to protect critical sectors over peripheral ones (0-1). */
  prioritization: number;
  /** Speed and accuracy of resource allocation (0-1). */
  resourceEfficiency: number;
  /** Ability to adjust strategy when cascades occur (0-1). */
  adaptability: number;
}

/** Aggregate statistics about a single wave. */
interface WaveStats {
  /** Wave number (1-5). */
  wave: number;
  /** Total threats that appeared. */
  threatsAppeared: number;
  /** Threats successfully resolved. */
  threatsResolved: number;
  /** Sectors lost this wave. */
  sectorsLost: SectorType[];
  /** SP spent this wave. */
  spSpent: number;
  /** Cascade events triggered. */
  cascadeEvents: number;
}

/** The complete behavioral payload sent to DeepSeek. */
interface GameBehavioralPayload {
  /** Student metadata (linked from onboarding, not collected here). */
  studentId: string;
  /** ISO timestamp of game start. */
  gameStartedAt: string;
  /** Total game duration in seconds. */
  gameDurationSec: number;
  /** Did the student survive all 5 waves? */
  survived: boolean;
  /** Final sector damage score (0 = perfect, 36 = total collapse). */
  finalDamageScore: number;
  /** Every crisis decision made, in chronological order. */
  crisisDecisions: CrisisDecision[];
  /** Permanent upgrades chosen between waves. */
  upgradeDecisions: UpgradeDecision[];
  /** Per-wave aggregate statistics. */
  waveStats: WaveStats[];
  /** Final computed trait scores. */
  traitScores: TraitScores;
}
```

### Zustand Store Shape

```typescript
import { create } from 'zustand';

interface SurvivalGridStore {
  // --- Game State ---
  currentWave: number;
  elapsedSec: number;
  supplyPoints: number;
  sectorDamage: Record<string, number>;
  activeThreats: Array<{
    id: string;
    sectorId: string;
    severity: ThreatSeverity;
    spawnedAt: number;
  }>;
  isPaused: boolean;
  isGameOver: boolean;

  // --- Behavioral Log (Silent) ---
  payload: GameBehavioralPayload;

  // --- Actions ---
  startGame: (studentId: string) => void;
  advanceWave: () => void;
  spawnThreat: (sectorId: string, severity: ThreatSeverity) => void;
  makeChoice: (threatId: string, choice: ChoiceCategory) => void;
  chooseUpgrade: (upgrade: UpgradeType, offered: UpgradeType[]) => void;
  tick: () => void;
  endGame: () => void;
  getPayload: () => GameBehavioralPayload;
}
```

---

## Technical Rendering Plan

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Grid | Tailwind CSS Grid (`grid-cols-6`) | Zero JS for layout, GPU-composited |
| Threat indicators | CSS `background-color` transitions + `animate-pulse` | No canvas needed, ~0 CPU |
| Choice cards | Tailwind-styled `<button>` overlay | Standard DOM, instant render |
| Timer | `requestAnimationFrame` with a simple counter | Lightweight, no library |
| State | Zustand (single store, ~200 lines) | Already in project constraints |
| Animations | CSS `@keyframes` only | No JS animation loop |

**Estimated total bundle impact:** < 5 KB gzipped (Zustand store + game logic). Pure DOM/CSS — runs smoothly on Pentium.

---

## Verification Plan

### Automated
- `bun run check:types` — Ensure all new interfaces compile cleanly
- `bun run lint` — Pass project ESLint rules

### Manual (User)
- Review this document and approve the concept before any code is written
- Confirm the 7 trait dimensions cover the career archetypes you want to assess
- Confirm the 5-wave escalation curve feels balanced for a 10-minute session
