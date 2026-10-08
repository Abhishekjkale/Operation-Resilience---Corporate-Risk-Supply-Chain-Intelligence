export interface AISVessel {
  id: string;
  mmsi: string;
  name: string;
  flag: string;
  flagCode: string;
  type: string;
  lat: number;
  lng: number;
  speedKnots: number;
  heading: number;
  destination: string;
  eta: string;
  cargo: string;
  cargoValueUsd: number;
  containerCount: number;
  status: 'critical_hazard' | 'warning' | 'rerouted' | 'nominal';
  prsScore: number; // 0-100
  chokePointDistanceKm: number;
  carrier: string;
  routeId: string;
  demurrageRatePerDay: number;
  criticalComponents: string[];
}

export interface KineticZone {
  id: string;
  name: string;
  threatLevel: 'extreme' | 'high' | 'moderate';
  center: { lat: number; lng: number };
  radiusKm: number;
  description: string;
  weaponSystems: string[];
  closureStatus: 'Active Naval Blockade' | 'High Missile Threat' | 'Contested Passage';
  insuranceMultiplier: number;
}

export interface ThreatArc {
  id: string;
  originName: string;
  lat: number;
  lng: number;
  rangeKm: number;
  arcDegreesStart: number;
  arcDegreesEnd: number;
  systemName: string;
}

export interface PortNode {
  id: string;
  name: string;
  code: string;
  country: string;
  lat: number;
  lng: number;
  congestionIndex: number; // 0-100
  dwellTimeDays: number;
  status: 'restricted' | 'congested' | 'operational' | 'divert_hub';
  capacityUtilization: number;
  berthDelayHours: number;
}

export interface SupplyChainRoute {
  id: string;
  name: string;
  type: 'primary_compromised' | 'cape_divert' | 'salalah_airbridge';
  distanceNm: number;
  transitDays: number;
  costPerTeu: number;
  riskScore: number;
  waypoints: { lat: number; lng: number; label?: string }[];
  status: 'blocked' | 'viable_slow' | 'recommended_fast';
  carbonEmissionIndex: number;
}

export interface BOMComponent {
  id: string;
  partNumber: string;
  name: string;
  tier: 1 | 2 | 3;
  parentComponentId?: string;
  supplierId: string;
  supplierName: string;
  country: string;
  facilityLocation: string;
  leadTimeWeeks: number;
  bufferDaysRemaining: number;
  isSingleSourced: boolean;
  isInConflictZone: boolean;
  dailyFactoryHaltingImpactUsd: number;
  inventoryLevelUnits: number;
  status: 'critical_halt' | 'at_risk' | 'safe';
  subcomponents?: BOMComponent[];
}

export interface AlternativeSupplier {
  id: string;
  name: string;
  location: string;
  country: string;
  componentCategory: string;
  unitCostDeltaPercent: number; // e.g. +4.2%
  leadTimeDeltaDays: number; // e.g. -6 days or +3 days
  availableMonthlyCapacityUnits: number;
  qualificationStatus: 'Pre-Vetted (Tier-1 Pass)' | 'Audit Complete' | 'Emergency Fast-Track';
  onTimeDeliveryRate: number;
  geopoliticalRiskIndex: number; // lower is better
  estimatedSwitchoverDays: number;
}

export interface GeopoliticalAlert {
  id: string;
  timestamp: string;
  source: 'Janes Defense' | 'ACLED' | 'Spire AIS' | 'S&P Global Platts' | 'Lloyds War Committee';
  severity: 'critical' | 'high' | 'medium';
  title: string;
  impactSummary: string;
  affectedRegions: string[];
  metricsChanged?: {
    metric: string;
    oldValue: string;
    newValue: string;
  };
}

export interface FinancialExposureCalculation {
  shipmentId: string;
  containerCount: number;
  baseCargoValueUsd: number;
  demurrageCostAccumulatedUsd: number;
  contractDefaultPenaltyUsd: number;
  factoryDowntimeRiskUsd: number;
  airBridgePremiumUsd: number;
  netLossPreventedUsd: number;
  paybackRatio: number;
}
