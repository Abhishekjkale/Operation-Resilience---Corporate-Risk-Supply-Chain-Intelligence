import React, { useState } from 'react';
import {
  TECHNICAL_STACK_DOCUMENTATION,
  PRISMA_SCHEMA_CODE,
  API_INTEGRATION_BOILERPLATE,
} from '../data/architectureDocs';
import {
  Layers,
  Database,
  Code2,
  Copy,
  Check,
  X,
  Cpu,
  Server,
  Radio,
  FileCode,
  ShieldCheck,
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'prisma_schema' | 'api_integrations'>(
    'stack'
  );
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Technical Stack Architecture, Database Schema & API Integrations
              </h3>
              <p className="text-xs text-slate-400">
                Production-Ready Blueprint for Operation Resilience (OR-Platform)
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

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('stack')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'stack'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>1. Technical Architecture</span>
            </button>
            <button
              onClick={() => setActiveTab('prisma_schema')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'prisma_schema'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>2. PostgreSQL & Prisma Schema</span>
            </button>
            <button
              onClick={() => setActiveTab('api_integrations')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'api_integrations'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>3. API Integration Boilerplates</span>
            </button>
          </div>

          {activeTab !== 'stack' && (
            <button
              onClick={() =>
                copyToClipboard(
                  activeTab === 'prisma_schema'
                    ? PRISMA_SCHEMA_CODE
                    : API_INTEGRATION_BOILERPLATE,
                  activeTab
                )
              }
              className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            >
              {copiedTab === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs text-slate-300">
          {activeTab === 'stack' && (
            <div className="space-y-6">
              {/* Architecture Overview */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  Enterprise Data Lakehouse Architecture
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {TECHNICAL_STACK_DOCUMENTATION.overview}
                </p>
              </div>

              {/* Stack Layers Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Recommended System Layers & Technology Choices
                </h4>
                {TECHNICAL_STACK_DOCUMENTATION.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="max-w-md">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                        {layer.layer}
                      </span>
                      <h5 className="font-bold text-sm text-white mt-0.5">
                        {layer.technology}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-400 md:max-w-lg leading-relaxed">
                      {layer.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* Compliance & SLA Guarantee */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Security SLA</span>
                  <div className="font-bold text-white mt-1">SOC2 Type II / ISO27001</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">AES-256 at rest, TLS 1.3 in transit</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Latency SLA</span>
                  <div className="font-bold text-white mt-1">Sub-3 Second Ingestion</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Continuous AIS streaming feeds</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Scalability</span>
                  <div className="font-bold text-white mt-1">10M+ Daily Coordinates</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Auto-scaling Kubernetes deployment</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prisma_schema' && (
            <div>
              <div className="mb-3 text-xs text-slate-400">
                PostgreSQL schema with PostGIS spatial extensions for vessel geofences, multi-tier BOM components, shipments, and geopolitical kinetic zones:
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400/90 overflow-x-auto leading-relaxed">
                {PRISMA_SCHEMA_CODE}
              </pre>
            </div>
          )}

          {activeTab === 'api_integrations' && (
            <div>
              <div className="mb-3 text-xs text-slate-400">
                Production TypeScript boilerplates for ingesting Spire Maritime AIS streams, Janes Defense threat feeds, SAP S/4HANA BOM GraphQL, and Platts energy futures webhooks:
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
                {API_INTEGRATION_BOILERPLATE}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
