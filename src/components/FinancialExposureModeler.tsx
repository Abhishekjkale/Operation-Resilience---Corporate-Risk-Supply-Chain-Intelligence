import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Plane,
  Anchor,
  Clock,
  ShieldCheck,
  AlertCircle,
  Calculator,
  Download,
} from 'lucide-react';

interface FinancialExposureModelerProps {
  isSimulatedScenarioActive: boolean;
}

export const FinancialExposureModeler: React.FC<FinancialExposureModelerProps> = ({
  isSimulatedScenarioActive,
}) => {
  // Configurable simulation states matching the PRD defaults
  const [containerCount, setContainerCount] = useState<number>(14);
  const [delayDays, setDelayDays] = useState<number>(18);
  const [demurrageRatePerDay, setDemurrageRatePerDay] = useState<number>(2800);
  const [dailyFactoryHaltPenalty, setDailyFactoryHaltPenalty] = useState<number>(140000);
  const [airBridgePremium, setAirBridgePremium] = useState<number>(14200);

  // Calculations
  const totalDemurrage = containerCount * demurrageRatePerDay * delayDays;
  const totalFactoryHalt = dailyFactoryHaltPenalty * delayDays;
  const contractDefaultPenalty = 450000;
  const totalUnmitigatedLoss = totalDemurrage + totalFactoryHalt + contractDefaultPenalty;

  // With Operation Resilience recommendation:
  const netSavings = totalUnmitigatedLoss - airBridgePremium;
  const roiMultiplier = Math.round(netSavings / airBridgePremium);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            FR-06: Financial Exposure & Air-Bridge Conversion Modeler
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            EXECUTIVE ROI ENGINE
          </span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1">
          <span>Target Annual Enterprise Loss Prevented:</span>
          <span className="font-mono font-bold text-amber-400">$12M+</span>
        </div>
      </div>

      <div className="p-5">
        {/* Top Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          {/* Slider 1: Containers */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Stranded Containers (FEU):</span>
              <span className="font-mono text-amber-400 font-bold">{containerCount} Units</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={containerCount}
              onChange={(e) => setContainerCount(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">14 automotive microchip containers</span>
          </div>

          {/* Slider 2: Delay Days */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Unmitigated Delay (Days):</span>
              <span className="font-mono text-rose-400 font-bold">{delayDays} Days</span>
            </div>
            <input
              type="range"
              min="3"
              max="45"
              value={delayDays}
              onChange={(e) => setDelayDays(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Standard port blockage waiting time</span>
          </div>

          {/* Slider 3: Demurrage */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Demurrage / Day / Box:</span>
              <span className="font-mono text-slate-200 font-bold">
                ${demurrageRatePerDay.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={demurrageRatePerDay}
              onChange={(e) => setDemurrageRatePerDay(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Carrier port detention penalty</span>
          </div>

          {/* Slider 4: Daily Halt Penalty */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Assembly Line Halt:</span>
              <span className="font-mono text-rose-400 font-bold">
                ${dailyFactoryHaltPenalty.toLocaleString()} / day
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="300000"
              step="10000"
              value={dailyFactoryHaltPenalty}
              onChange={(e) => setDailyFactoryHaltPenalty(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Direct assembly downtime cost</span>
          </div>
        </div>

        {/* Comparison Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card A: Unmitigated Crisis Scenario */}
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-rose-400" />
                  <h4 className="font-bold text-sm text-white">
                    Path A: Passive Delay (Port of Jebel Ali Halt)
                  </h4>
                </div>
                <span className="text-xs font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
                  {delayDays} DAYS STALLED
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Accumulated Demurrage Penalties:</span>
                  <span className="font-mono text-rose-300 font-semibold">
                    ${totalDemurrage.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Factory Assembly Line Halt:</span>
                  <span className="font-mono text-rose-400 font-bold">
                    ${totalFactoryHalt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Tier-1 OEM Contract Default Fee:</span>
                  <span className="font-mono text-rose-300 font-semibold">
                    ${contractDefaultPenalty.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-rose-900/60 flex items-baseline justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">
                Total Unmitigated Loss Exposure:
              </span>
              <span className="font-mono text-2xl font-bold text-rose-400">
                ${totalUnmitigatedLoss.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card B: Operation Resilience Automated Resolution */}
          <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold px-3 py-1 rounded-bl-lg">
              PRD RECOMMENDED PATH
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">
                    Path B: Salalah Divert + Frankfurt Air-Bridge
                  </h4>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Intermodal Trucking to Salalah Hub:</span>
                  <span className="font-mono text-slate-200">$4,800</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Charter Air-Bridge Transfer (FRA Hub):</span>
                  <span className="font-mono text-slate-200">$9,400</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Expedited Conversion Differential:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    +${airBridgePremium.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Delivery Delay Avoided:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {delayDays} Days Saved (4-day transit)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-emerald-900/60 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block">
                  Net Enterprise Loss Prevented:
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  ROI: {roiMultiplier}x Capital Efficiency
                </span>
              </div>
              <span className="font-mono text-2xl font-bold text-emerald-400">
                +${netSavings.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Decision Banner */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">
                Executive Action Recommendation for CRO & Logistics Lead:
              </span>
              <span className="text-slate-300">
                Authorize +$14,200 air-bridge charter immediately. Eliminates $2.52M in European automotive assembly line downtime with zero tier-1 delivery disruption.
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              const exportText = `OPERATION RESILIENCE FINANCIAL EXPOSURE AUDIT\nDate: 2026-10-08\nCargo: 14 Containers Automotive Microchips\nDelay Avoided: ${delayDays} Days\nUnmitigated Loss: $${totalUnmitigatedLoss.toLocaleString()}\nAir-Bridge Cost: $${airBridgePremium.toLocaleString()}\nNet Savings: $${netSavings.toLocaleString()}\nStatus: APPROVED`;
              const blob = new Blob([exportText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'financial-exposure-audit.txt';
              a.click();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shrink-0 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
