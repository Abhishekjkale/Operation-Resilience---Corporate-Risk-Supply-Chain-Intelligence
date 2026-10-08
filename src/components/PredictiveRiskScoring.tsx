import React, { useState } from 'react';
import { AISVessel } from '../types/risk';
import {
  Activity,
  Sliders,
  Shield,
  AlertTriangle,
  Flame,
  Ship,
  Sparkles,
  BarChart3,
  RotateCcw,
} from 'lucide-react';

interface PredictiveRiskScoringProps {
  vessels: AISVessel[];
  onSelectVessel: (vessel: AISVessel) => void;
}

export const PredictiveRiskScoring: React.FC<PredictiveRiskScoringProps> = ({
  vessels,
  onSelectVessel,
}) => {
  // Sensitivity weights state (defaults sum to 100)
  const [proximityWeight, setProximityWeight] = useState(40);
  const [insuranceWeight, setInsuranceWeight] = useState(25);
  const [carrierWeight, setCarrierWeight] = useState(15);
  const [commodityWeight, setCommodityWeight] = useState(20);

  const resetWeights = () => {
    setProximityWeight(40);
    setInsuranceWeight(25);
    setCarrierWeight(15);
    setCommodityWeight(20);
  };

  // Dynamically calculate dynamic PRS based on weights
  const calculateDynamicPrs = (vessel: AISVessel) => {
    // Proximity factor (closer to Hormuz choke point = higher score)
    const proxFactor = Math.max(0, 100 - (vessel.chokePointDistanceKm / 10));
    // Carrier/Flag profile factor
    const carrierFactor = vessel.flag === 'Panama' || vessel.flag === 'Liberia' ? 70 : 45;
    // Insurance / Kinetic status factor
    const insuranceFactor = vessel.status === 'critical_hazard' ? 98 : vessel.status === 'warning' ? 70 : 25;
    // Commodity sensitivity factor (semiconductors/microchips are highest)
    const commodityFactor = vessel.cargo.includes('Microchip') ? 95 : vessel.cargo.includes('Sensor') ? 80 : 40;

    const totalWeight = proximityWeight + insuranceWeight + carrierWeight + commodityWeight;
    const rawScore =
      (proxFactor * proximityWeight +
        carrierFactor * carrierWeight +
        insuranceFactor * insuranceWeight +
        commodityFactor * commodityWeight) /
      totalWeight;

    return Math.min(100, Math.round(rawScore));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Component Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            FR-03: Predictive Risk Scoring (PRS) Machine Learning Engine
          </h3>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            DYNAMIC 0-100 INDEX
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time Feature Vector Recalculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Column: Algorithm Calibration Controls */}
        <div className="p-5 bg-slate-950/40">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Sensitivity Weight Tuning</span>
            </h4>
            <button
              onClick={resetWeights}
              className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Slider 1: Kinetic Proximity */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Choke Point Proximity (Hormuz/Mandeb):</span>
                <span className="font-mono text-amber-400 font-bold">{proximityWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={proximityWeight}
                onChange={(e) => setProximityWeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">
                Inverse distance to active naval blockade & missile arcs.
              </span>
            </div>

            {/* Slider 2: War Risk Insurance */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>War-Risk Insurance Multiplier:</span>
                <span className="font-mono text-amber-400 font-bold">{insuranceWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={insuranceWeight}
                onChange={(e) => setInsuranceWeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">
                Lloyds AWRP surcharge rate and hull underwriter clearance.
              </span>
            </div>

            {/* Slider 3: Carrier Risk & Flag */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Carrier Security & Flag State:</span>
                <span className="font-mono text-amber-400 font-bold">{carrierWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={carrierWeight}
                onChange={(e) => setCarrierWeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">
                Historical boarding vulnerability & sovereignty flags.
              </span>
            </div>

            {/* Slider 4: Commodity Criticality */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Commodity Criticality (BOM Impact):</span>
                <span className="font-mono text-amber-400 font-bold">{commodityWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={commodityWeight}
                onChange={(e) => setCommodityWeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">
                Downstream factory halt liability ($140,000/day for MCUs).
              </span>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <div className="font-mono font-semibold text-amber-400 mb-1">PRS Equation:</div>
            <code className="text-[10px] text-slate-400 block font-mono">
              PRS = Σ(w_i * f_i) / Σ(w_i)
            </code>
            <p className="mt-1.5 text-slate-400">
              Trigger threshold: Shipments scoring &gt; 80 automatically prompt logistics leads with verified multi-modal reroute options.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Shipment Risk Leaderboard */}
        <div className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-rose-400" />
              <span>Active Shipments Risk Vector Ranking</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">5 Tracked Vessels</span>
          </div>

          <div className="space-y-3">
            {vessels.map((vessel) => {
              const dynPrs = calculateDynamicPrs(vessel);
              const isUrgent = dynPrs >= 80;

              return (
                <div
                  key={vessel.id}
                  onClick={() => onSelectVessel(vessel)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isUrgent
                      ? 'bg-rose-950/20 border-rose-700/60 hover:border-rose-500'
                      : dynPrs >= 50
                      ? 'bg-slate-900/80 border-slate-700 hover:border-slate-600'
                      : 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded ${
                          isUrgent
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        <Ship className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-white">{vessel.name}</h5>
                          <span className="text-[10px] font-mono text-slate-400">
                            {vessel.carrier}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {vessel.cargo} • {vessel.containerCount} Containers ($
                          {(vessel.cargoValueUsd / 1_000_000).toFixed(1)}M)
                        </div>
                      </div>
                    </div>

                    {/* PRS Score Badge & Bar */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-mono uppercase">
                          Dynamic PRS
                        </div>
                        <div
                          className={`font-mono text-base font-bold ${
                            dynPrs >= 80
                              ? 'text-rose-400'
                              : dynPrs >= 50
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {dynPrs} / 100
                        </div>
                      </div>

                      {/* Visual progress meter */}
                      <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            dynPrs >= 80
                              ? 'bg-rose-500'
                              : dynPrs >= 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${dynPrs}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Factor Sub-Breakdown Tags */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className="bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded">
                      Choke Dist: {vessel.chokePointDistanceKm} km
                    </span>
                    <span className="bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded">
                      Demurrage: ${vessel.demurrageRatePerDay}/day
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        vessel.status === 'critical_hazard'
                          ? 'bg-rose-500/20 text-rose-300'
                          : vessel.status === 'rerouted'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Status: {vessel.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
