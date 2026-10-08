import React, { useState } from 'react';
import {
  AISVessel,
  KineticZone,
  ThreatArc,
  PortNode,
  SupplyChainRoute,
} from '../types/risk';
import {
  Crosshair,
  Layers,
  Ship,
  Anchor,
  Radio,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Info,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface GeospatialRiskMapProps {
  vessels: AISVessel[];
  kineticZones: KineticZone[];
  threatArcs: ThreatArc[];
  ports: PortNode[];
  routes: SupplyChainRoute[];
  selectedVessel: AISVessel | null;
  onSelectVessel: (vessel: AISVessel | null) => void;
  onTriggerReroute: (vesselId: string) => void;
  isSimulatedScenarioActive: boolean;
}

export const GeospatialRiskMap: React.FC<GeospatialRiskMapProps> = ({
  vessels,
  kineticZones,
  threatArcs,
  ports,
  routes,
  selectedVessel,
  onSelectVessel,
  onTriggerReroute,
  isSimulatedScenarioActive,
}) => {
  // Layer visibility toggles
  const [showKineticZones, setShowKineticZones] = useState(true);
  const [showMissileArcs, setShowMissileArcs] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [showPorts, setShowPorts] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [activePreset, setActivePreset] = useState<'hormuz' | 'babelmandeb' | 'global'>('hormuz');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // SVG coordinate transformation function
  // We map Longitude [30 -> 75] and Latitude [10 -> 35] to SVG canvas [0 -> 1000, 600 -> 0]
  // Preset views change the viewBox for responsive tactical zoom
  const getViewBox = () => {
    switch (activePreset) {
      case 'hormuz':
        // Focused on Persian Gulf, Hormuz & Gulf of Oman (Lat 22 to 29, Lng 52 to 61)
        return '450 120 480 340';
      case 'babelmandeb':
        // Focused on Red Sea & Bab-el-Mandeb (Lat 11 to 20, Lng 38 to 48)
        return '140 280 440 300';
      case 'global':
      default:
        // Broad theater from Europe to Gulf & Indian Ocean
        return '0 0 1000 620';
    }
  };

  // Convert lat/lng to theater SVG coordinates
  const projectCoordinates = (lat: number, lng: number) => {
    // Map bounding box: Longitude 10°W (-10) to 105°E, Latitude -35°S to 55°N
    // Optimized for the Indian Ocean - Middle East - Mediterranean corridor
    const minLng = -10;
    const maxLng = 105;
    const minLat = -35;
    const maxLat = 55;

    const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
    const y = 620 - ((lat - minLat) / (maxLat - minLat)) * 620;
    return { x, y };
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative flex flex-col">
      {/* Tactical Map Toolbar */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-semibold text-sm text-slate-200">
            FR-01: Live Conflict Geospatial Telematics Overlay
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            AIS TELEMETRY 5Hz
          </span>
        </div>

        {/* View Presets */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800 text-xs">
          <button
            onClick={() => setActivePreset('hormuz')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activePreset === 'hormuz'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Strait of Hormuz Sector
          </button>
          <button
            onClick={() => setActivePreset('babelmandeb')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activePreset === 'babelmandeb'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bab-el-Mandeb Gate
          </button>
          <button
            onClick={() => setActivePreset('global')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activePreset === 'global'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Global Corridor
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showKineticZones}
              onChange={(e) => setShowKineticZones(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <span className="text-rose-400 font-medium">Kinetic Zones</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showMissileArcs}
              onChange={(e) => setShowMissileArcs(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-0"
            />
            <span className="text-orange-400 font-medium">Missile Arcs</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showVessels}
              onChange={(e) => setShowVessels(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span className="text-cyan-400 font-medium">AIS Vessels</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showPorts}
              onChange={(e) => setShowPorts(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
            />
            <span className="text-emerald-400 font-medium">Ports & Congestion</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-emerald-400 focus:ring-0"
            />
            <span className="text-purple-400 font-medium">Routes & Reroute</span>
          </label>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <div className="relative w-full h-[520px] bg-[#070b14] overflow-hidden select-none">
        {/* Subtle Radar Background Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radar concentric circular rings in center of Strait of Hormuz */}
        <div
          className="absolute pointer-events-none rounded-full border border-amber-500/20"
          style={{
            left: '58%',
            top: '32%',
            width: '260px',
            height: '260px',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full border border-rose-500/30 radar-pulse"
          style={{
            left: '58%',
            top: '32%',
            width: '180px',
            height: '180px',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* SVG Canvas */}
        <svg
          viewBox={getViewBox()}
          className="w-full h-full cursor-grab active:cursor-grabbing transition-all duration-700 ease-in-out"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="kineticHormuzGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#e11d48" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="kineticRedSeaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
            </radialGradient>

            {/* Pattern for Blockaded Maritime Corridors */}
            <pattern id="blockadeStripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#e11d48" strokeWidth="2.5" strokeOpacity="0.7" />
            </pattern>
          </defs>

          {/* ======================================================== */}
          {/* BASE GEOGRAPHY & COASTLINE SILHOUETTES                   */}
          {/* Stylized vector representation of Persian Gulf, Arabian  */}
          {/* Peninsula, Red Sea, Iran coast, Horn of Africa, Europe   */}
          {/* ======================================================== */}
          <g className="landmasses fill-slate-800/40 stroke-slate-700/60 stroke-[1]">
            {/* Arabian Peninsula & Middle East Coastline */}
            <polygon points="480,180 540,160 590,210 610,240 580,270 560,280 500,290 440,320 380,310 360,250 400,210 440,190" />
            {/* Iran / Northern Coastline */}
            <polygon points="520,140 580,130 630,160 660,190 600,205 560,195 530,170" />
            {/* Horn of Africa & Red Sea West Shore (Egypt, Sudan, Eritrea, Djibouti, Somalia) */}
            <polygon points="350,220 370,270 380,330 400,380 440,420 390,440 330,360 320,280" />
            {/* Mediterranean & Southern Europe */}
            <polygon points="120,60 220,50 300,80 340,130 280,150 200,120 140,90" />
            {/* India Subcontinent Corner */}
            <polygon points="720,240 760,280 780,350 740,360 700,300" />
          </g>

          {/* ======================================================== */}
          {/* LAYER 1: SUPPLY CHAIN SHIPPING ROUTES                    */}
          {/* ======================================================== */}
          {showRoutes && (
            <g className="routes-layer">
              {/* Route A: Compromised Primary Suez / Hormuz route */}
              <polyline
                points="567,206 580,195 460,295 385,320 340,180 180,95"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                strokeOpacity="0.85"
              />

              {/* Route B: Cape of Good Hope Long circumnavigation */}
              <polyline
                points="567,206 600,270 580,380 480,520 280,590 120,460 90,250 180,95"
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
                strokeDasharray="8,6"
                strokeOpacity="0.75"
              />

              {/* Route C: Recommended Salalah Port + Air-Bridge to Frankfurt (PRD Optimized) */}
              <polyline
                points="567,206 565,248" // Pre-Hormuz diversion to Salalah
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />
              <polyline
                points="565,248 230,85" // Air-Bridge Frankfurt corridor
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeDasharray="4,3"
                strokeOpacity="0.9"
              />
              {/* Salalah to Frankfurt Flight Path Indicator */}
              <circle cx="397" cy="166" r="3" fill="#34d399" className="animate-ping" />
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 2: KINETIC CONFLICT ZONES & BLOCKADES              */}
          {/* ======================================================== */}
          {showKineticZones && (
            <g className="kinetic-zones-layer">
              {/* Strait of Hormuz Kinetic Polygon & Choke Blockade */}
              <ellipse
                cx="580"
                cy="198"
                rx="45"
                ry="30"
                fill="url(#kineticHormuzGrad)"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
              {/* Naval Blockade Line across Strait */}
              <line
                x1="565"
                y1="190"
                x2="595"
                y2="204"
                stroke="#f43f5e"
                strokeWidth="4"
                strokeDasharray="3,3"
              />

              {/* Bab-el-Mandeb Kinetic Threat Zone */}
              <circle
                cx="385"
                cy="320"
                r="35"
                fill="url(#kineticRedSeaGrad)"
                stroke="#f97316"
                strokeWidth="1.5"
              />

              {/* Persian Gulf Northern Sector Jamming Area */}
              <ellipse
                cx="535"
                cy="180"
                rx="35"
                ry="22"
                fill="rgba(244, 63, 94, 0.15)"
                stroke="#f43f5e"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 3: MISSILE RANGE ARCS & RADAR SYSTEMS              */}
          {/* ======================================================== */}
          {showMissileArcs && (
            <g className="missile-arcs-layer">
              {/* Bandar Abbas Coastal Battery Arc (280km) */}
              <path
                d="M 545,210 A 65 65 0 0 1 615,225"
                fill="none"
                stroke="#f97316"
                strokeWidth="1.8"
                strokeDasharray="5,3"
              />
              <path
                d="M 525,225 A 95 95 0 0 1 635,245"
                fill="none"
                stroke="#f97316"
                strokeWidth="1.2"
                strokeDasharray="4,6"
                opacity="0.6"
              />
              <circle cx="580" cy="188" r="3.5" fill="#f97316" />
              <text x="586" y="186" fill="#fdba74" fontSize="9" fontFamily="monospace" fontWeight="bold">
                Bandar Abbas ASCM Array (300km)
              </text>

              {/* Jask Coastal Interceptor Arc */}
              <path
                d="M 585,245 A 55 55 0 0 1 635,255"
                fill="none"
                stroke="#fb923c"
                strokeWidth="1.5"
                strokeDasharray="3,4"
              />
              <circle cx="600" cy="215" r="3" fill="#fb923c" />

              {/* Hodeidah Coastal Ridge Arc (Bab-el-Mandeb) */}
              <path
                d="M 360,345 A 50 50 0 0 1 420,340"
                fill="none"
                stroke="#ea580c"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <circle cx="380" cy="305" r="3" fill="#ea580c" />
              <text x="345" y="300" fill="#fed7aa" fontSize="8" fontFamily="monospace">
                Bab-el-Mandeb Threat Arc
              </text>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 4: PORTS & INTERMODAL HUBS                         */}
          {/* ======================================================== */}
          {showPorts && (
            <g className="ports-layer">
              {/* Port of Jebel Ali (Origin - RED RESTRICTED) */}
              <g
                className="cursor-pointer group"
                onClick={() => setHoveredNode('port-jebel-ali')}
              >
                <circle cx="567" cy="206" r="7" fill="#e11d48" className="animate-pulse" />
                <circle cx="567" cy="206" r="14" fill="none" stroke="#e11d48" strokeWidth="1" strokeDasharray="3,3" />
                <rect x="578" y="198" width="95" height="28" rx="3" fill="#0f172a" stroke="#e11d48" strokeWidth="1" opacity="0.95" />
                <text x="584" y="210" fill="#fecdd3" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  AEJEA: Jebel Ali
                </text>
                <text x="584" y="221" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">
                  RESTRICTED (PRS 96)
                </text>
              </g>

              {/* Port of Salalah (Oman Bypass Hub - EMERALD GREEN) */}
              <g
                className="cursor-pointer group"
                onClick={() => setHoveredNode('port-salalah')}
              >
                <circle cx="565" cy="248" r="7" fill="#10b981" />
                <circle cx="565" cy="248" r="12" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                <rect x="576" y="240" width="105" height="28" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1" opacity="0.95" />
                <text x="582" y="252" fill="#a7f3d0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  OMSLL: Port of Salalah
                </text>
                <text x="582" y="263" fill="#34d399" fontSize="7.5" fontFamily="monospace">
                  DIVERT HUB (CLEAR)
                </text>
              </g>

              {/* Port of Fujairah (Gulf of Oman Anchorage - AMBER) */}
              <g className="cursor-pointer">
                <circle cx="578" cy="214" r="5" fill="#f59e0b" />
                <text x="588" y="235" fill="#fcd34d" fontSize="7.5" fontFamily="monospace">
                  AEFJR: Fujairah (Dwell 8.4d)
                </text>
              </g>

              {/* Frankfurt Air Hub (Europe) */}
              <g className="cursor-pointer">
                <circle cx="230" cy="85" r="6" fill="#38bdf8" />
                <rect x="240" y="75" width="100" height="24" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
                <text x="246" y="86" fill="#bae6fd" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  FRA: Cargo City Hub
                </text>
                <text x="246" y="96" fill="#38bdf8" fontSize="7" fontFamily="monospace">
                  Air-Bridge Arrival Point
                </text>
              </g>

              {/* Port of Rotterdam */}
              <g className="cursor-pointer">
                <circle cx="180" cy="95" r="5" fill="#94a3b8" />
                <text x="110" y="92" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">
                  NLRTM: Rotterdam
                </text>
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 5: LIVE AIS VESSEL POSITIONS & STATUS               */}
          {/* ======================================================== */}
          {showVessels && (
            <g className="vessels-layer">
              {vessels.map((vessel) => {
                const pos = projectCoordinates(vessel.lat, vessel.lng);
                const isSelected = selectedVessel?.id === vessel.id;
                const isCritical = vessel.status === 'critical_hazard';

                return (
                  <g
                    key={vessel.id}
                    className="cursor-pointer"
                    onClick={() => onSelectVessel(vessel)}
                  >
                    {/* Pulsing indicator for vessels in critical hazard */}
                    {isCritical && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="12"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Vessel Dot */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 6 : 4.5}
                      fill={
                        vessel.status === 'critical_hazard'
                          ? '#f43f5e'
                          : vessel.status === 'rerouted'
                          ? '#10b981'
                          : vessel.status === 'warning'
                          ? '#f59e0b'
                          : '#38bdf8'
                      }
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth={isSelected ? 2 : 1.5}
                    />

                    {/* Heading Vector line */}
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={pos.x + Math.sin((vessel.heading * Math.PI) / 180) * 16}
                      y2={pos.y - Math.cos((vessel.heading * Math.PI) / 180) * 16}
                      stroke={isCritical ? '#f43f5e' : '#38bdf8'}
                      strokeWidth="1.5"
                    />

                    {/* Vessel Label badge */}
                    <rect
                      x={pos.x + 8}
                      y={pos.y - 12}
                      width={vessel.name.length * 5.2 + 22}
                      height="16"
                      rx="2"
                      fill="#020617"
                      stroke={isSelected ? '#f59e0b' : '#334155'}
                      strokeWidth="1"
                      opacity="0.92"
                    />
                    <text
                      x={pos.x + 12}
                      y={pos.y - 1}
                      fill={isCritical ? '#fca5a5' : '#e2e8f0'}
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {vessel.name.slice(0, 15)} (PRS {vessel.prsScore})
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* Floating Map Legend */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 backdrop-blur-sm text-[11px] flex flex-col gap-1.5 shadow-xl">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Map Telematics Legend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-slate-300">Kinetic Strike / Blockade Zone (Hormuz)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-orange-400"></span>
            <span className="text-slate-300">ASCM Missile Range Arcs (300km)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-emerald-500"></span>
            <span className="text-slate-300">Salalah Port + Air-Bridge Reroute</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-yellow-400"></span>
            <span className="text-slate-300">Cape of Good Hope Diversion (+14d)</span>
          </div>
        </div>

        {/* Jebel Ali PRD Event Callout Banner (when active) */}
        {isSimulatedScenarioActive && (
          <div className="absolute top-3 right-3 bg-rose-950/90 border border-rose-500/80 rounded-lg p-3 max-w-sm backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">
                  Automated Resolution Active
                </h4>
                <p className="text-xs text-rose-300/90 mt-1">
                  Evergreen Titan (14 microchip containers) diverted from Jebel Ali. Cargo rerouted via Salalah Port with direct Frankfurt Air-Bridge.
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] font-mono">
                  <span className="bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded">
                    Cost Delta: +$14,200
                  </span>
                  <span className="bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    Saved: 18-Day Delay ($2.4M)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Vessel Inspector Drawer (Bottom Panel) */}
      {selectedVessel && (
        <div className="bg-slate-950 border-t border-slate-800 p-4 transition-all">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-lg border ${
                  selectedVessel.status === 'critical_hazard'
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                    : selectedVessel.status === 'rerouted'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                }`}
              >
                <Ship className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base text-white">{selectedVessel.name}</h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    MMSI: {selectedVessel.mmsi}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Flag: {selectedVessel.flag}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      selectedVessel.prsScore >= 80
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : selectedVessel.prsScore >= 50
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}
                  >
                    PRS Risk Score: {selectedVessel.prsScore}/100
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                  <span>
                    <strong className="text-slate-400">Cargo:</strong> {selectedVessel.cargo}
                  </span>
                  <span>
                    <strong className="text-slate-400">Value:</strong> $
                    {(selectedVessel.cargoValueUsd / 1_000_000).toFixed(2)}M
                  </span>
                  <span>
                    <strong className="text-slate-400">Containers:</strong> {selectedVessel.containerCount} TEU
                  </span>
                  <span>
                    <strong className="text-slate-400">Speed:</strong> {selectedVessel.speedKnots} kts (HDG {selectedVessel.heading}°)
                  </span>
                  <span>
                    <strong className="text-slate-400">Demurrage:</strong> ${selectedVessel.demurrageRatePerDay}/day
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Critical BOM Microchips on board: {selectedVessel.criticalComponents.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Vessel Action Buttons */}
            <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
              {selectedVessel.status !== 'rerouted' ? (
                <button
                  onClick={() => onTriggerReroute(selectedVessel.id)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Dispatch Salalah Air-Bridge Reroute</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-500/20 border border-emerald-500/50 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reroute Executed (ETA 4 Days)</span>
                </div>
              )}

              <button
                onClick={() => onSelectVessel(null)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 bg-slate-900 hover:text-white border border-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
