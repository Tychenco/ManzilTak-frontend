'use client';

import type { SectorType, ThreatSeverity } from '@/types/assessment';

// ---------------------------------------------------------------------------
// Visual mappings — sector type → color + emoji icon
// ---------------------------------------------------------------------------

const SECTOR_STYLES: Record<SectorType, { bg: string; border: string; icon: string; label: string }> = {
  residential: { bg: 'bg-emerald-950/60',  border: 'border-emerald-700/40',  icon: '🏠', label: 'Residential' },
  hospital:    { bg: 'bg-rose-950/60',     border: 'border-rose-700/40',     icon: '🏥', label: 'Hospital' },
  power:       { bg: 'bg-amber-950/60',    border: 'border-amber-700/40',    icon: '⚡', label: 'Power' },
  water:       { bg: 'bg-sky-950/60',      border: 'border-sky-700/40',      icon: '💧', label: 'Water' },
  farm:        { bg: 'bg-lime-950/60',     border: 'border-lime-700/40',     icon: '🌾', label: 'Farm' },
  factory:     { bg: 'bg-violet-950/60',   border: 'border-violet-700/40',   icon: '🏭', label: 'Factory' },
};

// ---------------------------------------------------------------------------
// Threat severity → pulsing ring color + animation class
// ---------------------------------------------------------------------------

const THREAT_STYLES: Record<ThreatSeverity, { ring: string; pulse: string; glow: string; bg?: string }> = {
  low:      { ring: 'ring-yellow-400/60',  pulse: 'animate-pulse',    glow: 'shadow-yellow-500/20' },
  medium:   { ring: 'ring-orange-400/70',  pulse: 'animate-pulse',    glow: 'shadow-orange-500/30' },
  high:     { ring: 'ring-red-500/80',     pulse: 'animate-pulse',    glow: 'shadow-red-500/40' },
  critical: { ring: 'ring-red-600',        pulse: 'animate-none',     glow: 'shadow-red-600/60', bg: '!bg-red-600' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * A single tile in the 6×6 SurvivalGrid.
 * Renders the sector icon/label and optionally a threat severity overlay.
 * Entirely stateless — all data comes via props.
 */
export function SectorTile(props: {
  sectorType: SectorType;
  threatSeverity?: ThreatSeverity;
  damage?: number;
}) {
  const sector = SECTOR_STYLES[props.sectorType];
  const threat = props.threatSeverity ? THREAT_STYLES[props.threatSeverity] : null;
  const isDestroyed = (props.damage ?? 0) >= 6;

  return (
    <div
      className={[
        // Base tile
        'relative flex flex-col items-center justify-center',
        'aspect-square rounded-lg border transition-all duration-300',
        'select-none cursor-pointer',
        // Sector colors
        threat?.bg || sector.bg,
        sector.border,
        // Destroyed state
        isDestroyed && 'opacity-30 grayscale',
        // Threat state — pulsing ring + glow
        threat && !isDestroyed && [
          'ring-2',
          threat.ring,
          threat.pulse,
          'shadow-lg',
          threat.glow,
        ].join(' '),
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Sector icon */}
      <span className="text-xl sm:text-2xl leading-none" role="img" aria-label={sector.label}>
        {isDestroyed ? '💀' : sector.icon}
      </span>

      {/* Sector label */}
      <span className="mt-0.5 text-[9px] font-medium tracking-wide text-white/50 uppercase">
        {sector.label}
      </span>

      {/* Threat severity badge (if active and not destroyed) */}
      {threat && !isDestroyed && (
        <span
          className={[
            'absolute -top-1 -right-1 flex size-5 items-center justify-center',
            'rounded-full text-[10px] font-bold',
            'bg-slate-900 text-white ring-1',
            threat.ring,
          ].join(' ')}
        >
          {props.threatSeverity === 'low' && '!'}
          {props.threatSeverity === 'medium' && '!!'}
          {props.threatSeverity === 'high' && '⚠'}
          {props.threatSeverity === 'critical' && '🔥'}
        </span>
      )}

      {/* Damage bar (bottom of tile) */}
      {(props.damage ?? 0) > 0 && !isDestroyed && (
        <div className="absolute bottom-1 left-1 right-1 h-1 rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-red-500 transition-all duration-500"
            style={{ width: `${Math.min(((props.damage ?? 0) / 6) * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
