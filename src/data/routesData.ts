import { RouteOption } from '../types/maritime'

export const DEFAULT_MUMBAI_SINGAPORE_ROUTES: RouteOption[] = [
  {
    id: 'route-a',
    name: 'Route A — Coastal Shipping Lane',
    code: 'R-IND-A',
    distanceNM: 3280,
    estimatedHours: 118,
    fuelConsumptionTonnes: 468,
    co2EmissionsTonnes: 1470,
    estimatedCostUSD: 327000,
    weatherRisk: 'Medium',
    pathDescription: 'Following Sri Lankan coast and Bay of Bengal shipping corridor.',
    waypoints: [
      { x: 15, y: 35, label: 'Mumbai' },
      { x: 28, y: 65, label: 'Colombo Pass' },
      { x: 55, y: 55, label: 'Andaman Basin' },
      { x: 75, y: 70, label: 'Malacca Entrance' },
      { x: 88, y: 80, label: 'Singapore' },
    ],
    weatherImpactPct: 3.2,
    isRecommended: false
  },
  {
    id: 'route-b',
    name: 'Route B — South Indian Ocean (Optimized)',
    code: 'R-IND-B',
    distanceNM: 3120,
    estimatedHours: 122,
    fuelConsumptionTonnes: 428,
    co2EmissionsTonnes: 1345,
    estimatedCostUSD: 299000,
    weatherRisk: 'Low',
    pathDescription: 'Direct deep ocean arc taking advantage of favorable equatorial current vector.',
    waypoints: [
      { x: 15, y: 35, label: 'Mumbai' },
      { x: 35, y: 72, label: 'Deep Basin Arc' },
      { x: 62, y: 75, label: 'Sunda Approach' },
      { x: 88, y: 80, label: 'Singapore' },
    ],
    weatherImpactPct: -4.8,
    isRecommended: true
  },
  {
    id: 'route-c',
    name: 'Route C — Equatorial Fast Track',
    code: 'R-IND-C',
    distanceNM: 3050,
    estimatedHours: 130,
    fuelConsumptionTonnes: 441,
    co2EmissionsTonnes: 1386,
    estimatedCostUSD: 308000,
    weatherRisk: 'High',
    pathDescription: 'Shortest nautical distance crossing active monsoon wave front zones.',
    waypoints: [
      { x: 15, y: 35, label: 'Mumbai' },
      { x: 42, y: 82, label: 'Monsoon Front' },
      { x: 70, y: 82, label: 'Nicobar Pass' },
      { x: 88, y: 80, label: 'Singapore' },
    ],
    weatherImpactPct: 5.5,
    isRecommended: false
  }
]
