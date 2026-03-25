// =============================================================================
// SurvivalGrid — Psychometric Assessment Type Definitions
// =============================================================================
// These types define the silent behavioral tracking layer. The student never
// sees any of this; it all flows through the Zustand store and eventually
// becomes the JSON payload sent to DeepSeek for career evaluation.
// =============================================================================

// ---------------------------------------------------------------------------
// Enums as union types (lightweight, no runtime footprint)
// ---------------------------------------------------------------------------

/** The four categories of choices a player can make when a crisis spawns. */
export type ChoiceCategory =
  | 'quick_fix'              // High SP cost, instant resolution
  | 'strategic_investment'   // Low SP cost, delayed payoff
  | 'creative_reallocation'  // 0 SP cost, has a tradeoff
  | 'ignore';                // Do nothing, save SP

/** Permanent upgrades offered between waves (VS-style level-ups). */
export type UpgradeType =
  | 'reinforce_grid'   // +1 max SP per wave — conservative, values security
  | 'early_warning'    // See threats 5s earlier — analytical, values information
  | 'rapid_response'   // Quick Fix costs −1 SP — action-oriented, trusts instinct
  | 'supply_chain'     // Auto-heal 1 low-severity threat/wave — delegation
  | 'cascade_shield';  // Prevent 1 cascade/wave — risk mitigation

/** Threat severity, from mild to sector-destroying. */
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

/** The six sector types that make up the 6×6 grid. */
export type SectorType =
  | 'residential'
  | 'hospital'
  | 'power'
  | 'water'
  | 'farm'
  | 'factory';

// ---------------------------------------------------------------------------
// A single active threat on the grid
// ---------------------------------------------------------------------------

/** Represents one threat currently alive on a sector tile. */
export interface ActiveThreat {
  /** Unique identifier for this threat instance. */
  id: string;
  /** Grid row (0-5). */
  row: number;
  /** Grid column (0-5). */
  col: number;
  /** The sector type this threat occupies. */
  sectorType: SectorType;
  /** Current severity — auto-escalates over time. */
  severity: ThreatSeverity;
  /** Game-clock second when this threat spawned. */
  spawnedAtSec: number;
  /** Game-clock second when the choice card was presented. */
  presentedAtSec: number;
}

// ---------------------------------------------------------------------------
// Behavioral log entries (one per student decision)
// ---------------------------------------------------------------------------

/**
 * A single decision the student made in response to a crisis.
 * Each field is chosen to give the AI evaluator maximum signal about
 * the student's cognitive style, not their gaming skill.
 */
export interface CrisisDecision {
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

  /**
   * Seconds between "choice card presented" and "student clicked".
   * Long deliberation = thoughtful; short = impulsive or decisive.
   */
  deliberationTimeSec: number;

  /** How many other active threats existed when they made this choice. */
  concurrentThreats: number;
}

/**
 * A permanent upgrade chosen between waves.
 * The pattern of upgrades chosen across 4 inter-wave breaks reveals
 * strategic preferences (security vs speed vs delegation etc.).
 */
export interface UpgradeDecision {
  /** After which wave this upgrade was chosen (1-4). */
  afterWave: number;

  /** Which upgrade was selected. */
  upgradeChosen: UpgradeType;

  /** The other options that were available but not picked. */
  upgradesOffered: UpgradeType[];
}

// ---------------------------------------------------------------------------
// Trait scores (derived, not directly input by the student)
// ---------------------------------------------------------------------------

/**
 * Rolling trait scores derived from decision patterns.
 * Each value is normalized 0-1. These are the primary input
 * to the AI career-matching prompt.
 */
export interface TraitScores {
  /** Tendency toward immediate action. */
  impulsivity: number;

  /** Tendency to invest for the future vs fix now. */
  longTermPlanning: number;

  /** Willingness to accept tradeoffs and creative workarounds. */
  lateralThinking: number;

  /** Comfort with leaving threats unresolved. */
  riskTolerance: number;

  /** Tendency to protect critical sectors over peripheral ones. */
  prioritization: number;

  /** Speed and accuracy of resource allocation. */
  resourceEfficiency: number;

  /** Ability to adjust strategy when cascades occur. */
  adaptability: number;
}

// ---------------------------------------------------------------------------
// Per-wave aggregate statistics
// ---------------------------------------------------------------------------

/** Aggregate statistics about a single wave. */
export interface WaveStats {
  /** Wave number (1-5). */
  wave: number;

  /** Total threats that appeared in this wave. */
  threatsAppeared: number;

  /** Threats successfully resolved in this wave. */
  threatsResolved: number;

  /** Sectors lost this wave. */
  sectorsLost: SectorType[];

  /** SP spent this wave. */
  spSpent: number;

  /** Cascade events triggered this wave. */
  cascadeEvents: number;
}

// ---------------------------------------------------------------------------
// The complete payload sent to the AI evaluator
// ---------------------------------------------------------------------------

/**
 * The full behavioral payload sent to DeepSeek after the game ends.
 * This is the single source of truth for the AI to assess the student.
 */
export interface GameBehavioralPayload {
  /** Student identifier (linked from onboarding, not collected in-game). */
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

// ---------------------------------------------------------------------------
// Grid layout constants
// ---------------------------------------------------------------------------

/** Number of rows in the grid. */
export const GRID_ROWS = 6;

/** Number of columns in the grid. */
export const GRID_COLS = 6;

/** Total game duration in seconds (10 minutes). */
export const GAME_DURATION_SEC = 600;

/** Number of waves in a full game. */
export const TOTAL_WAVES = 5;

/** Duration of a single wave in seconds. */
export const WAVE_DURATION_SEC = GAME_DURATION_SEC / TOTAL_WAVES; // 120s

/**
 * SP budget per wave. Decreases to create escalating pressure.
 * Index 0 = Wave 1, Index 4 = Wave 5.
 */
export const SP_BUDGET_PER_WAVE: readonly number[] = [10, 8, 8, 7, 6];

/** SP costs for each choice category. */
export const CHOICE_SP_COST: Record<ChoiceCategory, number> = {
  quick_fix: 4,
  strategic_investment: 2,
  creative_reallocation: 0,
  ignore: 0,
};

/**
 * How many seconds before a threat auto-escalates to the next severity.
 * low → medium → high → critical → sector destroyed.
 */
export const THREAT_ESCALATION_INTERVAL_SEC = 20;

/**
 * The default 6×6 grid layout. Each cell maps to a sector type.
 * In a real game you could randomize this, but a fixed layout
 * keeps the assessment consistent across students.
 */
export const DEFAULT_GRID_LAYOUT: readonly (readonly SectorType[])[] = [
  ['residential', 'residential', 'hospital', 'hospital', 'power', 'power'],
  ['residential', 'residential', 'hospital', 'water',    'power', 'factory'],
  ['farm',        'farm',        'water',    'water',    'factory', 'factory'],
  ['farm',        'farm',        'residential', 'hospital', 'factory', 'power'],
  ['water',       'residential', 'residential', 'hospital', 'farm',   'power'],
  ['water',       'factory',     'farm',        'farm',     'factory', 'residential'],
];
