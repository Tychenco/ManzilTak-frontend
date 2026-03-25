'use client';

import { useEffect } from 'react';
import { SectorTile } from '@/components/survival-grid/SectorTile';
import type { SectorType } from '@/types/assessment';
import { DEFAULT_GRID_LAYOUT } from '@/types/assessment';
import { useAssessmentStore } from '@/store/useAssessmentStore';

// ---------------------------------------------------------------------------
// Static header bar (mocked — will be wired to Zustand in Phase 3)
// ---------------------------------------------------------------------------

function GameHeader() {
  const currentWave = useAssessmentStore((s) => s.currentWave);
  const elapsedSec = useAssessmentStore((s) => s.elapsedSec);
  const supplyPoints = useAssessmentStore((s) => s.supplyPoints);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6">
      {/* Left: Wave indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Wave
          </span>
          <span className="text-2xl font-black tabular-nums text-white">
            {currentWave}
          </span>
          <span className="text-sm text-slate-600">/5</span>
        </div>

        {/* Wave pips */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((w) => (
            <div
              key={w}
              className={[
                'size-2 rounded-full transition-colors',
                w <= currentWave ? 'bg-emerald-400' : 'bg-slate-700',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Center: Timer */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Time
        </span>
        <span className="text-3xl font-black tabular-nums tracking-tight text-white">
          {formatTime(elapsedSec)}
        </span>
      </div>

      {/* Right: Supply Points */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          SP
        </span>
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black tabular-nums text-amber-400">
            {supplyPoints}
          </span>
          <div className="flex flex-col">
            {/* SP bar */}
            <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                style={{ width: `${Math.min((supplyPoints / 20) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Status bar (bottom — damage + threats summary)
// ---------------------------------------------------------------------------

function GameFooter() {
  const activeThreatsCount = useAssessmentStore((s) => s.activeThreats.length);
  const destroyedSectorCount = useAssessmentStore((s) => s.destroyedSectorCount);

  return (
    <footer className="flex items-center justify-between border-t border-slate-800 px-4 py-2 text-xs sm:px-6">
      <div className="flex items-center gap-4">
        <span className="text-slate-500">
          Active Threats: <span className="font-bold text-red-400">{activeThreatsCount}</span>
        </span>
        <span className="text-slate-500">
          Sectors Lost: <span className="font-bold text-red-400">{destroyedSectorCount}</span>/3
        </span>
      </div>
      <span className="text-slate-600">
        SurvivalGrid Assessment v0.1
      </span>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SurvivalGridPage() {
  const isPlaying = useAssessmentStore((s) => s.isPlaying);
  const isGameOver = useAssessmentStore((s) => s.isGameOver);
  const startGame = useAssessmentStore((s) => s.startGame);
  const tick = useAssessmentStore((s) => s.tick);

  const activeThreats = useAssessmentStore((s) => s.activeThreats);
  const sectorDamage = useAssessmentStore((s) => s.sectorDamage);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, tick]);

  return (
    <div className="flex h-dvh flex-col">
      <GameHeader />

      {/* Grid container — centered, max-width so it doesn't stretch on wide screens */}
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        {!isPlaying && !isGameOver && (
          <button
            type="button"
            onClick={() => startGame('test-student-id')}
            className="mb-4 rounded bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 opacity-50 transition-opacity hover:opacity-100"
          >
            [Debug] Start Assessment
          </button>
        )}

        <div className="grid w-full max-w-lg grid-cols-6 gap-1.5 sm:gap-2">
          {DEFAULT_GRID_LAYOUT.map((row, rowIdx) =>
            row.map((sectorType: SectorType, colIdx: number) => {
              const threat = activeThreats.find(
                (t) => t.row === rowIdx && t.col === colIdx,
              );
              const cellKey = `${rowIdx}-${colIdx}`;
              const damage = sectorDamage[cellKey] ?? 0;

              return (
                <SectorTile
                  key={cellKey}
                  sectorType={sectorType}
                  threatSeverity={threat?.severity}
                  damage={damage}
                />
              );
            }),
          )}
        </div>
      </main>

      <GameFooter />
    </div>
  );
}
