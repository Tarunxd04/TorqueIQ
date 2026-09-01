export interface Ship {
  id: string
  name: string
  imo: string
  type: 'Container' | 'Bulk Carrier' | 'Tanker' | 'Cargo'
  capacity: number // DWT tonnes
  currentLoad: number // tonnes
  location: string
  fuelEfficiency: number // percentage e.g. 94.8
  currentSpeed: number // knots
  status: 'Sailing' | 'At Port' | 'Loading' | 'Maintenance'
  fuelLevel: number // percentage
  co2Intensity: number // g CO2 / tonne-NM
  baseFuelBurnPerDay: number // tonnes/day at 14 kts
  yearBuilt: number
  flag: string
}

export interface Port {
  id: string
  name: string
  code: string
  country: string
  lat: number
  lng: number
}

export interface Waypoint {
  x: number
  y: number
  label?: string
}

export interface RouteOption {
  id: string
  name: string
  code: string
  distanceNM: number
  estimatedHours: number
  fuelConsumptionTonnes: number
  co2EmissionsTonnes: number
  estimatedCostUSD: number
  weatherRisk: 'Low' | 'Medium' | 'High'
  pathDescription: string
  waypoints: Waypoint[]
  isRecommended?: boolean
  weatherImpactPct: number
}

export interface WeatherCondition {
  id: string
  area: string
  temperatureC: number
  windSpeedKnots: number
  windDirection: string
  waveHeightM: number
  oceanCurrentKnots: number
  visibilityKM: number
  seaCondition: 'Calm' | 'Moderate' | 'Rough' | 'Severe'
  impactStatus: 'Favorable' | 'Moderate' | 'Caution' | 'Adverse'
  fuelImpactPct: number
}

export interface WeatherForecastDay {
  day: string
  dateLabel: string
  wind: string
  waves: string
  current: string
  status: 'Favorable' | 'Moderate' | 'Caution' | 'Adverse'
  impactPct: number
  summary: string
}

export interface VoyagePlanInput {
  origin: string
  destination: string
  cargoTonnes: number
  arrivalDate: string
  selectedShipId: string
}

export interface SpeedCurvePoint {
  speed: number
  fuel: number
  etaHours: number
  co2: number
  cost: number
  isOptimal?: boolean
}

export interface ShipComparisonItem {
  ship: Ship
  fuel: number
  co2: number
  etaHours: number
  score: number
  recommended: boolean
}

export interface CandidateVoyageOption {
  id: string
  title: string
  badgeText: string
  badgeVariant: 'green' | 'cyan' | 'yellow' | 'red' | 'blue'
  ship: Ship
  route: RouteOption
  speedKnots: number
  fuelType: 'LSFO (Low Sulfur)' | 'VLSFO' | 'MGO (Marine Gas Oil)' | 'HFO (Heavy Fuel)'
  expectedFuelTonnes: number
  expectedCo2Tonnes: number
  estimatedCostUSD: number
  etaFormatted: string
  etaHours: number
  weatherRisk: 'Low' | 'Medium' | 'High'
  weatherSummary: string
  score: number
  description: string
  highlights: string[]
}

export interface OptimizationResult {
  bestShip: Ship
  bestRoute: RouteOption
  recommendedSpeedKnots: number
  expectedFuelTonnes: number
  expectedCo2Tonnes: number
  estimatedFuelCostUSD: number
  etaFormatted: string
  etaHours: number
  totalDistanceNM: number
  weatherSummary: {
    wind: string
    waves: string
    current: string
    sea: string
    impactStatus: 'Favorable' | 'Moderate' | 'Caution' | 'Adverse'
    fuelImpactPct: number
  }
  savings: {
    fuelPct: number
    co2Pct: number
    costUSD: number
    etaDiffFormatted: string
  }
  optimizationScore: number
  scoreBreakdown: {
    fuelEfficiencyScore: number
    co2Score: number
    etaScore: number
    costScore: number
    weatherScore: number
  }
  explanationPoints: string[]
  routeOptions: RouteOption[]
  speedCurvePoints: SpeedCurvePoint[]
  shipComparisonList: ShipComparisonItem[]
  forecastTimeline: WeatherForecastDay[]
  fourCandidateOptions: CandidateVoyageOption[]
}

export interface WhatIfParams {
  speedKnots: number
  cargoTonnes: number
  fuelPricePerTonne: number
  routeId: string
  weatherSeverity: 'Low' | 'Medium' | 'High'
}

export interface ReportItem {
  id: string
  title: string
  type: 'Voyage' | 'Fuel' | 'Carbon' | 'Fleet'
  date: string
  generatedBy: string
  status: 'Ready' | 'Archived'
  summary: string
  downloadUrl?: string
}
