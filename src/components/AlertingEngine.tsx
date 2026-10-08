import React, { useState } from 'react';
import { GeopoliticalAlert } from '../types/risk';
import {
  Bell,
  Radio,
  Webhook,
  Mail,
  Smartphone,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  Terminal,
} from 'lucide-react';

interface AlertingEngineProps {
  alerts: GeopoliticalAlert[];
  onTriggerSimulatedWebhook: (payload: any) => void;
}

export const AlertingEngine: React.FC<AlertingEngineProps> = ({
  alerts,
  onTriggerSimulatedWebhook,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'rules' | 'webhook_console'>('feed');
  const [webhookUrl, setWebhookUrl] = useState(
    'https://api.enterprise.corp/v1/webhooks/geopolitical-risk'
  );
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [lastDeliveredPayload, setLastDeliveredPayload] = useState<string | null>(null);

  // Alert Trigger Rules Configuration State
  const [rules, setRules] = useState([
    {
      id: 'rule-fuel',
      name: 'Bunker Fuel / Brent Crude Intraday Surge (> +10%)',
      channel: 'Webhook & Email',
      enabled: true,
      currentStatus: 'TRIGGERED (+35.2%)',
      lastFired: '32m ago',
    },
    {
      id: 'rule-port',
      name: 'Port Status Alteration (Operational -> Restricted/Closed)',
      channel: 'Push Notification & SMS',
      enabled: true,
      currentStatus: 'TRIGGERED (Port of Jebel Ali)',
      lastFired: '14m ago',
    },
    {
      id: 'rule-insurance',
      name: 'Lloyds War Committee AWRP Surcharge Surge (> +300 bps)',
      channel: 'Webhook & Push',
      enabled: true,
      currentStatus: 'TRIGGERED (+520 bps)',
      lastFired: '2h ago',
    },
    {
      id: 'rule-kinetic',
      name: 'Vessel Ingress into Active Missile Threat Arc (Range < 50km)',
      channel: 'Immediate Executive Webhook',
      enabled: true,
      currentStatus: 'ARMED & MONITORING',
      lastFired: 'Nominal',
    },
  ]);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleTestWebhook = () => {
    setTestStatus('sending');
    const mockPayload = {
      event: 'GEOPOLITICAL_THREAT_TRIGGER',
      timestamp: new Date().toISOString(),
      source: 'Spire_AIS_Telematics_Sensor_Mesh',
      threat_level: 'CRITICAL_BLOCKADE',
      details: {
        choke_point: 'Strait of Hormuz',
        port_affected: 'Port of Jebel Ali (AEJEA)',
        affected_vessels_count: 2,
        high_criticality_containers: 14,
        commodity: 'Automotive Microcontrollers (MCU-AUTO-GEN5)',
        automated_prs_surge: '22 -> 94',
        recommended_action: 'DIVERT_TO_SALALAH_PORT_AND_AIRBRIDGE_FRANKFURT',
        estimated_delay_prevented_days: 18,
        cost_differential_usd: 14200,
      },
    };

    setTimeout(() => {
      setTestStatus('sent');
      setLastDeliveredPayload(JSON.stringify(mockPayload, null, 2));
      onTriggerSimulatedWebhook(mockPayload);
      setTimeout(() => setTestStatus('idle'), 3500);
    }, 700);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Component Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-rose-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            FR-05: Real-Time Geopolitical Event Alerting & Webhook Engine
          </h3>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            STREAMING BUS ACTIVE
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-xs">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'feed'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Threat Feed ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trigger Rules (4)
          </button>
          <button
            onClick={() => setActiveTab('webhook_console')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'webhook_console'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Webhook Dispatch Console
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-5">
        {activeTab === 'feed' && (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  alert.severity === 'critical'
                    ? 'bg-rose-950/30 border-rose-800/70'
                    : alert.severity === 'high'
                    ? 'bg-amber-950/20 border-amber-800/60'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        alert.severity === 'critical'
                          ? 'bg-rose-500 text-slate-950'
                          : alert.severity === 'high'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Source: <strong className="text-slate-200">{alert.source}</strong>
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.timestamp}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white mt-2">{alert.title}</h4>
                <p className="text-xs text-slate-300/90 mt-1 leading-relaxed">
                  {alert.impactSummary}
                </p>

                {alert.metricsChanged && (
                  <div className="mt-2.5 inline-flex items-center gap-2 text-xs font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    <span className="text-slate-400">{alert.metricsChanged.metric}:</span>
                    <span className="line-through text-slate-400">{alert.metricsChanged.oldValue}</span>
                    <span className="text-rose-400 font-bold">➔ {alert.metricsChanged.newValue}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-3">
              Configure event-driven alerting rules evaluated across Kafka streaming pipelines. Alerts fire within sub-15 minutes of telematics ingestion.
            </p>
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h5 className="font-bold text-xs text-white">{rule.name}</h5>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                    <span>Channels: {rule.channel}</span>
                    <span>Last fired: {rule.lastFired}</span>
                  </div>
                  <div className="mt-1">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        rule.currentStatus.includes('TRIGGERED')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {rule.currentStatus}
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'webhook_console' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                Target Webhook Endpoint URL (Enterprise SIEM / ERP / Slack):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleTestWebhook}
                  disabled={testStatus === 'sending'}
                  className="py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                >
                  {testStatus === 'sending' ? (
                    <span>Dispatching...</span>
                  ) : testStatus === 'sent' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>200 OK Delivered!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Test Webhook</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Terminal payload inspect */}
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Standard Webhook JSON Payload Schema
                </span>
                <span className="text-emerald-400">HMAC SHA-256 SIGNED</span>
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
                {lastDeliveredPayload ||
                  JSON.stringify(
                    {
                      event: 'GEOPOLITICAL_THREAT_TRIGGER',
                      timestamp: '2026-10-08T05:20:00Z',
                      source: 'Spire_AIS_Telematics',
                      threat_level: 'CRITICAL_BLOCKADE',
                      port_affected: 'Port of Jebel Ali (AEJEA)',
                      affected_containers: 14,
                      commodity: 'Automotive Microchips (MCU-AUTO-GEN5)',
                      automated_prs_surge: '22 -> 94',
                      recommended_reroute: 'SALALAH_AIRBRIDGE_FRANKFURT',
                      cost_differential_usd: 14200,
                      delay_prevented_days: 18,
                    },
                    null,
                    2
                  )}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
