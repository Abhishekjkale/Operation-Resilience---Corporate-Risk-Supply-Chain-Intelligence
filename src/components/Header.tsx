import React from 'react';
import {
  ShieldAlert,
  Flame,
  Radio,
  Clock,
  Compass,
  Cpu,
  TrendingUp,
  FileCode2,
  PlayCircle,
  RotateCcw,
} from 'lucide-react';

interface HeaderProps {
  currentRole: 'CRO' | 'OPERATIONS' | 'PROCUREMENT';
  onRoleChange: (role: 'CRO' | 'OPERATIONS' | 'PROCUREMENT') => void;
  onOpenSimulation: () => void;
  onOpenArchitecture: () => void;
  isSimulatedScenarioActive: boolean;
  onResetSimulation: () => void;
  activeAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenSimulation,
  onOpenArchitecture,
  isSimulatedScenarioActive,
  onResetSimulation,
  activeAlertCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Mission Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 shadow-lg shadow-rose-950/40 text-slate-950">
            <Compass className="w-6 h-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                OPERATION RESILIENCE
                <span className="text-xs font-mono font-medium text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                  OR-PLATFORM v1.0
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Corporate Risk & Supply Chain Intelligence • Middle East Kinetic Conflict Monitor
            </p>
          </div>
        </div>

        {/* Live Ticker & Geopolitical State */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {/* MARSEC DEFCON Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-700/60 text-xs">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-mono text-rose-300 font-bold">MARSEC 3 / RED</span>
            <span className="hidden lg:inline text-rose-400/80">| Hormuz Contested</span>
          </div>

          {/* Brent Crude Ticker */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">ICE Brent:</span>
            <span className="font-mono font-bold text-rose-400">$94.80/bbl</span>
            <span className="text-xs font-mono text-rose-500 bg-rose-500/10 px-1 rounded">
              +35.2%
            </span>
          </div>

          {/* Time & AIS Stream Status */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-400">AIS LATENCY: 1.8s</span>
          </div>

          {/* Persona Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-xs">
            <button
              onClick={() => onRoleChange('CRO')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                currentRole === 'CRO'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Chief Risk Officer (Executive Board Level)"
            >
              CRO (Exec)
            </button>
            <button
              onClick={() => onRoleChange('OPERATIONS')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                currentRole === 'OPERATIONS'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Supply Chain Director (Operations Level)"
            >
              SC Director
            </button>
            <button
              onClick={() => onRoleChange('PROCUREMENT')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                currentRole === 'PROCUREMENT'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Procurement Manager (Tactical Level)"
            >
              Procurement
            </button>
          </div>

          {/* Simulation Trigger & Blueprint Controls */}
          <div className="flex items-center gap-2">
            {isSimulatedScenarioActive ? (
              <button
                onClick={onResetSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Scenario</span>
              </button>
            ) : (
              <button
                onClick={onOpenSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <PlayCircle className="w-3.5 h-3.5 fill-slate-950 text-amber-500" />
                <span>Simulate PRD Jebel Ali Event</span>
              </button>
            )}

            <button
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700/80 transition-all"
              title="View Architecture Stack, Prisma Schema & Integration APIs"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Arch & Schema</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
