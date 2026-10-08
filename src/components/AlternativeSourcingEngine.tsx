import React, { useState } from 'react';
import { AlternativeSupplier } from '../types/risk';
import {
  Shuffle,
  CheckCircle,
  TrendingUp,
  Clock,
  Boxes,
  ShieldCheck,
  Send,
  Building,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';

interface AlternativeSourcingEngineProps {
  suppliers: AlternativeSupplier[];
  onDispatchPO: (supplierName: string) => void;
}

export const AlternativeSourcingEngine: React.FC<AlternativeSourcingEngineProps> = ({
  suppliers,
  onDispatchPO,
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(suppliers[0].id);
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const handleDispatch = (supplier: AlternativeSupplier) => {
    setDispatchedId(supplier.id);
    onDispatchPO(supplier.name);
    setTimeout(() => {
      setDispatchedId(null);
    }, 4000);
  };

  const selectedSupplier =
    suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shuffle className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            FR-04: Alternative Sourcing Engine (Conflict Zone Exclusions)
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            4 PRE-VETTED SECONDARY FABRICATORS
          </span>
        </div>

        <div className="text-xs text-slate-400">
          Target component: <strong className="text-white">MCU-AUTO-GEN5 (32-bit Microcontroller)</strong>
        </div>
      </div>

      {/* Primary Benchmark vs Secondary Comparison Matrix */}
      <div className="p-5">
        {/* Baseline Incumbent Callout */}
        <div className="mb-5 p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-rose-900/60 text-rose-300">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-rose-400 font-bold">
                Current Compromised Primary Incumbent
              </div>
              <h4 className="font-bold text-sm text-white">
                Gulf Micro Integrated (Jebel Ali Free Zone, UAE)
              </h4>
              <div className="text-xs text-rose-300/80 mt-0.5">
                Strait of Hormuz Blockade has suspended all outbound shipping. 0 units deliverable.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-rose-500 text-slate-950 px-2.5 py-1 rounded shrink-0">
            TRANSIT HALTED (18-DAY DELAY)
          </span>
        </div>

        {/* Alternative Sourcing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {suppliers.map((supplier) => {
            const isSelected = selectedSupplierId === supplier.id;
            const isDispatched = dispatchedId === supplier.id;

            return (
              <div
                key={supplier.id}
                onClick={() => setSelectedSupplierId(supplier.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {supplier.country}
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                      {supplier.qualificationStatus}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-white line-clamp-2">
                    {supplier.name}
                  </h5>
                  <div className="text-[11px] text-slate-400 mt-1">{supplier.location}</div>

                  {/* Key Metrics Grid */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        Unit Cost Delta:
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          supplier.unitCostDeltaPercent > 5
                            ? 'text-amber-400'
                            : supplier.unitCostDeltaPercent <= 0
                            ? 'text-emerald-400'
                            : 'text-slate-200'
                        }`}
                      >
                        {supplier.unitCostDeltaPercent > 0 ? '+' : ''}
                        {supplier.unitCostDeltaPercent}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Lead Time Delta:
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          supplier.leadTimeDeltaDays < 0
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {supplier.leadTimeDeltaDays} Days
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Boxes className="w-3.5 h-3.5 text-slate-400" />
                        Capacity Available:
                      </span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {supplier.availableMonthlyCapacityUnits.toLocaleString()} / mo
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                        Risk Index:
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {supplier.geopoliticalRiskIndex} / 100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDispatch(supplier);
                    }}
                    disabled={isDispatched}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isDispatched
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : isSelected
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isDispatched ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PO Dispatched to ERP!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Emergency PO</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Deep Comparison & Switchover Plan */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Selected Secondary Switchover Pathway: {selectedSupplier.name}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Estimated operational switchover: <strong>{selectedSupplier.estimatedSwitchoverDays} days</strong>. On-time delivery track record: <strong>{selectedSupplier.onTimeDeliveryRate}%</strong>. All tooling verified compatible with German assembly specs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right text-xs">
              <span className="text-slate-400 block">Lead Time Advantage</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {Math.abs(selectedSupplier.leadTimeDeltaDays)} Days Quicker
              </span>
            </div>
            <button
              onClick={() => handleDispatch(selectedSupplier)}
              className="py-2.5 px-4 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              1-Click Enterprise Requisition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
