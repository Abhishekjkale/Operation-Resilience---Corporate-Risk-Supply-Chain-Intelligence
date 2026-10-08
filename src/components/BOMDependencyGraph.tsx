import React, { useState } from 'react';
import { BOMComponent } from '../types/risk';
import {
  GitFork,
  AlertOctagon,
  ShieldAlert,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Factory,
  Cpu,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface BOMDependencyGraphProps {
  bomData: BOMComponent;
  onSelectAlternative: (componentName: string) => void;
}

export const BOMDependencyGraph: React.FC<BOMDependencyGraphProps> = ({
  bomData,
  onSelectAlternative,
}) => {
  const [selectedNode, setSelectedNode] = useState<BOMComponent>(
    bomData.subcomponents?.[0] || bomData
  );
  const [viewMode, setViewMode] = useState<'visual_tree' | 'flat_list'>('visual_tree');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Component Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-rose-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            FR-02: Multi-Tier ERP BOM Dependency Graph (Down to Tier-3)
          </h3>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            SAP S/4HANA SYNCED
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-xs">
            <button
              onClick={() => setViewMode('visual_tree')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'visual_tree'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Tree
            </button>
            <button
              onClick={() => setViewMode('flat_list')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'flat_list'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Risk Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Critical Bottleneck Alert Bar */}
      <div className="bg-rose-950/40 border-b border-rose-800/40 px-4 py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-rose-300">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
          <span>
            <strong className="font-semibold text-rose-200">Critical Single-Source Alert:</strong> Part{' '}
            <code className="bg-rose-900/50 px-1 py-0.5 rounded font-mono text-rose-200">MCU-AUTO-GEN5</code> has 0 secondary European suppliers active. Buffer remaining: <strong>2 days</strong>.
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-rose-400 font-mono font-bold">$140,000 / day</span>
          <span className="text-rose-300/80 text-[11px] ml-1">assembly line halt penalty</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left 2 Cols: Interactive Graph / Tree */}
        <div className="lg:col-span-2 p-5 overflow-x-auto min-h-[440px]">
          {viewMode === 'visual_tree' ? (
            <div className="flex flex-col gap-6 min-w-[550px]">
              {/* TIER 1 ROOT */}
              <div className="flex flex-col items-center">
                <div
                  onClick={() => setSelectedNode(bomData)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all w-80 text-center ${
                    selectedNode.id === bomData.id
                      ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      TIER 1 (FINISHED SYSTEM)
                    </span>
                    <span className="text-emerald-400 font-semibold">{bomData.country}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{bomData.name}</h4>
                  <div className="text-xs font-mono text-amber-400 mt-1">{bomData.partNumber}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Supplier: {bomData.supplierName}
                  </div>
                </div>

                {/* Connecting branch */}
                <div className="w-0.5 h-6 bg-slate-700 mt-1"></div>
                <div className="w-3/4 h-0.5 bg-slate-700"></div>
              </div>

              {/* TIER 2 SUBCOMPONENTS */}
              <div className="grid grid-cols-3 gap-4">
                {bomData.subcomponents?.map((t2) => (
                  <div key={t2.id} className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-slate-700 -mt-2"></div>

                    <div
                      onClick={() => setSelectedNode(t2)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all w-full text-left relative ${
                        selectedNode.id === t2.id
                          ? 'border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500'
                          : t2.status === 'critical_halt'
                          ? 'bg-rose-950/40 border-rose-700/80 hover:border-rose-500'
                          : 'bg-slate-800/50 border-slate-700/70 hover:border-slate-600'
                      }`}
                    >
                      {t2.isSingleSourced && (
                        <span className="absolute -top-2 right-2 text-[10px] font-mono font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded shadow">
                          SINGLE SOURCE
                        </span>
                      )}

                      <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                        <span>TIER 2</span>
                        <span
                          className={
                            t2.isInConflictZone ? 'text-rose-400 font-bold' : 'text-slate-300'
                          }
                        >
                          {t2.country}
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-white line-clamp-1">{t2.name}</h5>
                      <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                        {t2.partNumber}
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Buffer:</span>
                        <span
                          className={`font-mono font-bold ${
                            t2.bufferDaysRemaining <= 3 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {t2.bufferDaysRemaining} days left
                        </span>
                      </div>
                    </div>

                    {/* TIER 3 BRANCHES */}
                    {t2.subcomponents && t2.subcomponents.length > 0 && (
                      <div className="w-full flex flex-col items-center mt-2">
                        <div className="w-0.5 h-4 bg-slate-700"></div>
                        <div className="flex flex-col gap-2 w-full mt-1">
                          {t2.subcomponents.map((t3) => (
                            <div
                              key={t3.id}
                              onClick={() => setSelectedNode(t3)}
                              className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                                selectedNode.id === t3.id
                                  ? 'border-amber-500 bg-amber-500/10'
                                  : t3.status === 'at_risk'
                                  ? 'bg-orange-950/30 border-orange-700/60'
                                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-slate-400">TIER 3</span>
                                <span className="text-slate-300">{t3.country}</span>
                              </div>
                              <div className="text-xs font-medium text-slate-200 mt-0.5">
                                {t3.name}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                                {t3.partNumber}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Flat List / Matrix View */
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Part #</th>
                    <th className="py-2.5 px-3">Component</th>
                    <th className="py-2.5 px-3">Tier</th>
                    <th className="py-2.5 px-3">Supplier & Location</th>
                    <th className="py-2.5 px-3">Single Sourced?</th>
                    <th className="py-2.5 px-3">Buffer Days</th>
                    <th className="py-2.5 px-3">Halt Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr
                    onClick={() => setSelectedNode(bomData.subcomponents![0])}
                    className="hover:bg-slate-800/50 cursor-pointer bg-rose-950/20"
                  >
                    <td className="py-2.5 px-3 font-mono text-rose-300 font-bold">
                      MCU-AUTO-GEN5
                    </td>
                    <td className="py-2.5 px-3 font-medium text-white">
                      Automotive Microcontroller (32-bit)
                    </td>
                    <td className="py-2.5 px-3 font-mono">Tier-2</td>
                    <td className="py-2.5 px-3">Gulf Micro (Jebel Ali, UAE)</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        YES (CRITICAL)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">2 Days</td>
                    <td className="py-2.5 px-3 font-mono text-rose-300">$140k/day</td>
                  </tr>

                  {bomData.subcomponents?.[0].subcomponents?.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedNode(c)}
                      className="hover:bg-slate-800/50 cursor-pointer"
                    >
                      <td className="py-2.5 px-3 font-mono text-amber-300">{c.partNumber}</td>
                      <td className="py-2.5 px-3 font-medium text-white">{c.name}</td>
                      <td className="py-2.5 px-3 font-mono">Tier-3</td>
                      <td className="py-2.5 px-3">
                        {c.supplierName} ({c.country})
                      </td>
                      <td className="py-2.5 px-3">
                        {c.isSingleSourced ? (
                          <span className="text-orange-400 font-bold">YES</span>
                        ) : (
                          <span className="text-slate-400">NO</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-mono">{c.bufferDaysRemaining} Days</td>
                      <td className="py-2.5 px-3 font-mono">
                        ${c.dailyFactoryHaltingImpactUsd.toLocaleString()}/day
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Col: Deep Node Inspector & Alt Sourcing Action */}
        <div className="p-5 bg-slate-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400">
                ERP Node Detail & Hazard Profile
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  selectedNode.status === 'critical_halt'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : selectedNode.status === 'at_risk'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {selectedNode.status.replace('_', ' ')}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xs font-mono text-amber-400">{selectedNode.partNumber}</div>
              <h4 className="font-bold text-base text-white mt-0.5">{selectedNode.name}</h4>
              <div className="text-xs text-slate-400 mt-1">Tier-{selectedNode.tier} Component</div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-slate-400" />
                  Primary Supplier:
                </span>
                <span className="font-medium text-slate-200 text-right">
                  {selectedNode.supplierName}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Facility Location:
                </span>
                <span className="font-medium text-slate-200 text-right">
                  {selectedNode.facilityLocation}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Inventory Buffer:
                </span>
                <span
                  className={`font-mono font-bold ${
                    selectedNode.bufferDaysRemaining <= 3 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {selectedNode.bufferDaysRemaining} Days Available
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Halt Cost Exposure:
                </span>
                <span className="font-mono font-bold text-rose-400">
                  ${selectedNode.dailyFactoryHaltingImpactUsd.toLocaleString()} / day
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Single Source Status:</span>
                <span
                  className={`font-semibold ${
                    selectedNode.isSingleSourced ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {selectedNode.isSingleSourced ? 'Single Sourced (High Risk)' : 'Multi-Sourced'}
                </span>
              </div>
            </div>
          </div>

          {/* Action to Alternative Sourcing Engine */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => onSelectAlternative(selectedNode.name)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-98"
            >
              <span>Match Alternative Suppliers (FR-04)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
