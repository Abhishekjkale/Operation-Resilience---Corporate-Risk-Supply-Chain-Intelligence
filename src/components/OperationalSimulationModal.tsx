import React, { useState } from 'react';
import {
  AlertTriangle,
  Radio,
  Cpu,
  Navigation,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  ShieldAlert,
  Plane,
  X,
} from 'lucide-react';

interface OperationalSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySimulation: () => void;
}

export const OperationalSimulationModal: React.FC<OperationalSimulationModalProps> = ({
  isOpen,
  onClose,
  onApplySimulation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExecuteResolution = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setCurrentStep(4);
      onApplySimulation();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                PRD Operational Scenario Simulation
              </h3>
              <p className="text-xs text-slate-400">
                Automated Resolution Workflow Execution (PRD Page 3 Reference)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 1 ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] border-current">
              1
            </span>
            <span>AIS Trigger</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-800"></div>
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 2 ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] border-current">
              2
            </span>
            <span>PRS Surge & BOM Tagging</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-800"></div>
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 3 ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] border-current">
              3
            </span>
            <span>Salalah Air-Bridge Reroute</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/60">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase mb-1">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Incoming Spire AIS Telematics Event</span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Port of Jebel Ali (AEJEA) Maritime Access Restricted
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Naval telemetry confirms Iranian fast-attack patrols closing Strait of Hormuz approaches. Port authorities have initiated an emergency anchorage hold. Outbound commercial departures halted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Target Port Code:</span>
                  <span className="font-mono text-white font-bold">AEJEA (Jebel Ali, UAE)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Telemetry Timestamp:</span>
                  <span className="font-mono text-slate-200">2026-10-08 05:06:12 UTC</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Carrier Vessels Affected:</span>
                  <span className="font-mono text-rose-400 font-bold">Evergreen Titan (SC-774)</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md"
                >
                  <span>Advance to System Action (BOM Tagging)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Platform Automated Action</span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Identified 14 Inbound Containers of Critical Automotive Microchips
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Automated SAP ERP BOM ingestion correlates inbound cargo to Tier-1 Powertrain ECU assembly line. Factory safety buffer is only <strong>2 days</strong>.
                </p>
              </div>

              {/* PRS Surge Visualizer */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Baseline PRS Score
                  </span>
                  <span className="font-mono text-3xl font-bold text-slate-400">22</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Nominal Transit</span>
                </div>

                <div className="flex flex-col items-center">
                  <TrendingUp className="w-6 h-6 text-rose-500 animate-bounce" />
                  <span className="text-xs font-mono text-rose-400 font-bold mt-1">
                    SURGES +72 PTS
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase text-rose-400 block font-bold">
                    Escalated PRS Score
                  </span>
                  <span className="font-mono text-3xl font-bold text-rose-400">94</span>
                  <span className="text-[10px] text-rose-400 block mt-0.5">Critical Hazard</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 bg-slate-800 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md"
                >
                  <span>Evaluate Automated Reroute Recommendation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase mb-1">
                  <Plane className="w-4 h-4" />
                  <span>Operation Resilience Recommendation</span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Divert Cargo to Port of Salalah + Air-Bridge Transfer to Frankfurt
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Bypasses the contested Strait of Hormuz entirely. Intermodal bonded truck transit to Salalah deep-water terminal, followed by chartered Boeing 777F cargo flight direct to Frankfurt Hub (FRA).
                </p>
              </div>

              {/* Cost Differential Calculation from PRD */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Calculated Cost Differential
                  </span>
                  <span className="font-mono text-xl font-bold text-amber-400 mt-1 block">
                    +$14,200 USD
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Air charter delta vs maritime demurrage
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Operational Delay Prevention
                  </span>
                  <span className="font-mono text-xl font-bold text-emerald-400 mt-1 block">
                    18 Days Saved ($2.4M)
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Zero European factory line shutdown
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 bg-slate-800 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={handleExecuteResolution}
                  disabled={isExecuting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  {isExecuting ? (
                    <span>Dispatching Waypoints to Master...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Execute Reroute Resolution (Save $2.4M)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-white">
                Reroute Resolution Successfully Deployed
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Evergreen Titan has received authorized deviation orders to Port of Salalah. Electronic Air Waybills (e-AWB) issued for 14 containers on Lufthansa Cargo LH-8220 to Frankfurt.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
                >
                  Return to Dashboard & Inspect Map Reroute
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
