import React from 'react';
import {
  Timer,
  Navigation,
  DollarSign,
  AlertTriangle,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface KpiMetricsBarProps {
  currentRole: 'CRO' | 'OPERATIONS' | 'PROCUREMENT';
  isSimulatedScenarioActive: boolean;
}

export const KpiMetricsBar: React.FC<KpiMetricsBarProps> = ({
  currentRole,
  isSimulatedScenarioActive,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {/* KPI 1: MTTD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Mean Time to Detect (MTTD)
          </span>
          <Timer className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-emerald-400">
            &lt; 12.4m
          </span>
          <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            Target &lt;15m
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          Replaced standard 48hr manual broker lag
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/40"></div>
      </div>

      {/* KPI 2: Reroute Impact Efficiency */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Reroute Viability Rate
          </span>
          <Navigation className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-cyan-400">
            88.2%
          </span>
          <span className="text-[11px] font-mono text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded">
            Target 85%
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          Automated multi-modal path in &lt;1 hr
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500/40"></div>
      </div>

      {/* KPI 3: Margin Loss Saved */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Enterprise Margin Saved
          </span>
          <DollarSign className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-amber-300">
            {isSimulatedScenarioActive ? '$14.8M' : '$12.4M'}
          </span>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
            +$2.4M protected
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          Prevented 18-day factory shutdown
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/40"></div>
      </div>

      {/* KPI 4: Stranded Tier-1 Assets */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Critical Inbound Cargo
          </span>
          <Cpu className="w-4 h-4 text-rose-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-rose-400">
            {isSimulatedScenarioActive ? '14 FEU (Staged)' : '14 FEU'}
          </span>
          <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
            $18.4M Value
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          Automotive 32-bit MCU (Jebel Ali origin)
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500/40"></div>
      </div>

      {/* KPI 5: Fleet Predictive Risk Index */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all col-span-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Fleet PRS
          </span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-bold font-mono ${isSimulatedScenarioActive ? 'text-rose-400' : 'text-amber-400'}`}>
            {isSimulatedScenarioActive ? '94 / 100' : '60.2 / 100'}
          </span>
          <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
            {isSimulatedScenarioActive ? 'Hormuz Critical' : 'Elevated'}
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400">
          ML scoring: Proximity + Insurance + BOM
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isSimulatedScenarioActive ? 'bg-rose-500' : 'bg-amber-500/40'}`}></div>
      </div>
    </div>
  );
};
