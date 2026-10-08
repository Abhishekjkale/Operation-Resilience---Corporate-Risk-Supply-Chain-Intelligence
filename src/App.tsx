import React, { useState } from 'react';
import {
  INITIAL_VESSELS,
  KINETIC_ZONES,
  THREAT_ARCS,
  PORT_NODES,
  SUPPLY_CHAIN_ROUTES,
  MULTI_TIER_BOM,
  ALTERNATIVE_SUPPLIERS,
  GEOPOLITICAL_ALERTS,
} from './data/mockData';
import { AISVessel } from './types/risk';
import { Header } from './components/Header';
import { KpiMetricsBar } from './components/KpiMetricsBar';
import { GeospatialRiskMap } from './components/GeospatialRiskMap';
import { BOMDependencyGraph } from './components/BOMDependencyGraph';
import { PredictiveRiskScoring } from './components/PredictiveRiskScoring';
import { AlternativeSourcingEngine } from './components/AlternativeSourcingEngine';
import { AlertingEngine } from './components/AlertingEngine';
import { FinancialExposureModeler } from './components/FinancialExposureModeler';
import { OperationalSimulationModal } from './components/OperationalSimulationModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import {
  Map,
  GitFork,
  Activity,
  Shuffle,
  Bell,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Role & navigation state
  const [currentRole, setCurrentRole] = useState<'CRO' | 'OPERATIONS' | 'PROCUREMENT'>('CRO');
  const [activeTab, setActiveTab] = useState<
    'geospatial' | 'bom_graph' | 'prs' | 'alt_sourcing' | 'alerts' | 'financial'
  >('geospatial');

  // Vessel and Telematics State
  const [vessels, setVessels] = useState<AISVessel[]>(INITIAL_VESSELS);
  const [selectedVessel, setSelectedVessel] = useState<AISVessel | null>(INITIAL_VESSELS[0]);

  // Operational Simulation State (PRD Scenario)
  const [isSimulatedScenarioActive, setIsSimulatedScenarioActive] = useState<boolean>(false);
  const [isSimModalOpen, setIsSimModalOpen] = useState<boolean>(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Trigger Salalah Air-Bridge Reroute for a vessel
  const handleTriggerReroute = (vesselId: string) => {
    setVessels((prev) =>
      prev.map((v) => {
        if (v.id === vesselId) {
          return {
            ...v,
            status: 'rerouted',
            prsScore: 28, // Risk drops immediately!
            destination: 'Port of Salalah Divert Hub -> Frankfurt Cargo Hub',
            routeId: 'route-salalah-airbridge',
          };
        }
        return v;
      })
    );

    // Update selected vessel view if active
    if (selectedVessel && selectedVessel.id === vesselId) {
      setSelectedVessel((prev) =>
        prev
          ? {
              ...prev,
              status: 'rerouted',
              prsScore: 28,
              destination: 'Port of Salalah Divert Hub -> Frankfurt Cargo Hub',
              routeId: 'route-salalah-airbridge',
            }
          : null
      );
    }

    showToast('Salalah Air-Bridge Reroute authorized. ETA reduced to 4 days (18 days saved).');
  };

  // Apply full PRD Operational Simulation
  const handleApplySimulation = () => {
    setIsSimulatedScenarioActive(true);
    // Vessel 1 (Evergreen Titan) has its cargo flagged and rerouted
    setVessels((prev) =>
      prev.map((v) => {
        if (v.id === 'vessel-01') {
          return {
            ...v,
            status: 'rerouted',
            prsScore: 32,
            destination: 'Salalah Port -> Frankfurt Air-Bridge',
            routeId: 'route-salalah-airbridge',
          };
        }
        return v;
      })
    );
    showToast('PRD Scenario Applied: Jebel Ali Restricted ➔ Salalah Reroute Executed (+$14.2k diff vs $2.4M saved).');
  };

  // Reset Simulation to pristine state
  const handleResetSimulation = () => {
    setIsSimulatedScenarioActive(false);
    setVessels(INITIAL_VESSELS);
    setSelectedVessel(INITIAL_VESSELS[0]);
    showToast('Simulation state reset to default baseline.');
  };

  // Alternative Supplier Selection
  const handleSelectAlternativeForComponent = (componentName: string) => {
    setActiveTab('alt_sourcing');
    showToast(`Navigated to Alternative Sourcing Engine for component: ${componentName}`);
  };

  const handleDispatchEmergencyPO = (supplierName: string) => {
    showToast(`Emergency Purchase Order requisition dispatched to ${supplierName} via SAP S/4HANA.`);
  };

  const handleSimulatedWebhook = (payload: any) => {
    showToast(`Webhook event [${payload.event}] dispatched to SIEM endpoint with HTTP 200 OK.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 max-w-md bg-emerald-950 border border-emerald-500/80 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">{toastMessage}</p>
        </div>
      )}

      {/* Global Executive Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenSimulation={() => setIsSimModalOpen(true)}
        onOpenArchitecture={() => setIsArchModalOpen(true)}
        isSimulatedScenarioActive={isSimulatedScenarioActive}
        onResetSimulation={handleResetSimulation}
        activeAlertCount={GEOPOLITICAL_ALERTS.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-5 flex flex-col gap-5">
        {/* Top KPI Metrics Bar (Aligned with PRD Section 2) */}
        <KpiMetricsBar
          currentRole={currentRole}
          isSimulatedScenarioActive={isSimulatedScenarioActive}
        />

        {/* Feature Module Navigation Bar (Matrix FR-01 through FR-06) */}
        <div className="border-b border-slate-800 bg-slate-900/60 p-1 rounded-xl flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            <button
              onClick={() => setActiveTab('geospatial')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'geospatial'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>FR-01: Geospatial Telematics Map</span>
            </button>

            <button
              onClick={() => setActiveTab('bom_graph')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bom_graph'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>FR-02: Multi-Tier BOM Graph</span>
            </button>

            <button
              onClick={() => setActiveTab('prs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'prs'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>FR-03: Predictive Risk Scoring (PRS)</span>
            </button>

            <button
              onClick={() => setActiveTab('alt_sourcing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'alt_sourcing'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Shuffle className="w-4 h-4" />
              <span>FR-04: Alternative Sourcing Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'alerts'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>FR-05: Event Alerting & Webhooks</span>
            </button>

            <button
              onClick={() => setActiveTab('financial')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'financial'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>FR-06: Financial Exposure Modeler</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 pr-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PRD MATRIX MVP-1</span>
          </div>
        </div>

        {/* Tab Views */}
        <div className="flex-1">
          {activeTab === 'geospatial' && (
            <div className="space-y-6">
              <GeospatialRiskMap
                vessels={vessels}
                kineticZones={KINETIC_ZONES}
                threatArcs={THREAT_ARCS}
                ports={PORT_NODES}
                routes={SUPPLY_CHAIN_ROUTES}
                selectedVessel={selectedVessel}
                onSelectVessel={setSelectedVessel}
                onTriggerReroute={handleTriggerReroute}
                isSimulatedScenarioActive={isSimulatedScenarioActive}
              />

              {/* Quick Summary Grid Under Map */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Strait of Hormuz Status
                    </h4>
                    <p className="text-xs text-rose-300/90 mt-1">
                      Full naval blockade active. Coastal batteries illuminate sector 4 commercial lanes. War insurance spikes to +580%.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Salalah Bypass Corridor
                    </h4>
                    <p className="text-xs text-emerald-300/90 mt-1">
                      Oman deep-water terminal clear of Iranian missile threat arcs. Intermodal connection ready for Frankfurt air-bridge.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Cape of Good Hope Divert
                    </h4>
                    <p className="text-xs text-amber-300/90 mt-1">
                      Viable but adds +14 days transit delay and +$420/TEU in bunker fuel costs due to crude price surge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bom_graph' && (
            <BOMDependencyGraph
              bomData={MULTI_TIER_BOM}
              onSelectAlternative={handleSelectAlternativeForComponent}
            />
          )}

          {activeTab === 'prs' && (
            <PredictiveRiskScoring
              vessels={vessels}
              onSelectVessel={setSelectedVessel}
            />
          )}

          {activeTab === 'alt_sourcing' && (
            <AlternativeSourcingEngine
              suppliers={ALTERNATIVE_SUPPLIERS}
              onDispatchPO={handleDispatchEmergencyPO}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertingEngine
              alerts={GEOPOLITICAL_ALERTS}
              onTriggerSimulatedWebhook={handleSimulatedWebhook}
            />
          )}

          {activeTab === 'financial' && (
            <FinancialExposureModeler
              isSimulatedScenarioActive={isSimulatedScenarioActive}
            />
          )}
        </div>
      </main>

      {/* Operational Simulation Walkthrough Modal */}
      <OperationalSimulationModal
        isOpen={isSimModalOpen}
        onClose={() => setIsSimModalOpen(false)}
        onApplySimulation={handleApplySimulation}
      />

      {/* Technical Architecture & Database Schema Modal */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Operation Resilience (OR-Platform)</span>
            <span>• PRD-ENT-2026-V1 Baseline Approved</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>SOC2 Type II / ISO27001 Compliant</span>
            <span>•</span>
            <button
              onClick={() => setIsArchModalOpen(true)}
              className="text-amber-400 hover:underline"
            >
              PostgreSQL Schema & API Specs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
