import { ReportItem } from '../types/maritime'

export const MONTHLY_FUEL_CO2_TRENDS = [
  { month: 'Jan', baselineFuel: 4200, optimizedFuel: 3680, baselineCo2: 13230, optimizedCo2: 11592, fuelSavedPct: 12.4, costUSD: 2.57 },
  { month: 'Feb', baselineFuel: 3950, optimizedFuel: 3460, baselineCo2: 12442, optimizedCo2: 10899, fuelSavedPct: 12.4, costUSD: 2.42 },
  { month: 'Mar', baselineFuel: 4400, optimizedFuel: 3850, baselineCo2: 13860, optimizedCo2: 12127, fuelSavedPct: 12.5, costUSD: 2.69 },
  { month: 'Apr', baselineFuel: 4100, optimizedFuel: 3580, baselineCo2: 12915, optimizedCo2: 11277, fuelSavedPct: 12.7, costUSD: 2.50 },
  { month: 'May', baselineFuel: 4600, optimizedFuel: 4020, baselineCo2: 14490, optimizedCo2: 12663, fuelSavedPct: 12.6, costUSD: 2.81 },
  { month: 'Jun', baselineFuel: 4300, optimizedFuel: 3760, baselineCo2: 13545, optimizedCo2: 11844, fuelSavedPct: 12.5, costUSD: 2.63 },
  { month: 'Jul', baselineFuel: 4500, optimizedFuel: 3930, baselineCo2: 14175, optimizedCo2: 12379, fuelSavedPct: 12.6, costUSD: 2.75 },
  { month: 'Aug', baselineFuel: 4150, optimizedFuel: 3630, baselineCo2: 13072, optimizedCo2: 11434, fuelSavedPct: 12.5, costUSD: 2.54 }
]

export const FLEET_EFFICIENCY_DISTRIBUTION = [
  { category: '94%+ (Optimal)', count: 6, percentage: 30 },
  { category: '90 - 93.9% (High)', count: 9, percentage: 45 },
  { category: '86 - 89.9% (Standard)', count: 4, percentage: 20 },
  { category: '< 86% (Needs Maint.)', count: 1, percentage: 5 }
]

export const VOYAGE_STATUS_BREAKDOWN = [
  { name: 'On Optimal Route', value: 5, color: '#10B981' },
  { name: 'Minor Deviation', value: 2, color: '#38BDF8' },
  { name: 'Weather Reroute', value: 1, color: '#F59E0B' },
  { name: 'At Loading Port', value: 4, color: '#6366F1' },
  { name: 'In Maintenance', value: 2, color: '#EC4899' },
  { name: 'Docked/Idle', value: 6, color: '#64748B' }
]

export const ROUTE_EFFICIENCY_COMPARISON = [
  { route: 'Mumbai → Singapore', distance: 3120, avgSpeed: 13.8, avgFuelPerNM: 0.137, co2Avoided: 175 },
  { route: 'Dubai → Chennai', distance: 2450, avgSpeed: 13.6, avgFuelPerNM: 0.132, co2Avoided: 142 },
  { route: 'Shanghai → Rotterdam', distance: 10450, avgSpeed: 14.1, avgFuelPerNM: 0.145, co2Avoided: 610 },
  { route: 'Kochi → Singapore', distance: 1680, avgSpeed: 13.5, avgFuelPerNM: 0.130, co2Avoided: 98 },
  { route: 'Colombo → Shanghai', distance: 3420, avgSpeed: 13.9, avgFuelPerNM: 0.139, co2Avoided: 195 }
]

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'REP-2026-0801',
    title: 'Monthly Fleet Voyage Optimization Summary (August 2026)',
    type: 'Voyage',
    date: '2026-08-28',
    generatedBy: 'System AI Engine',
    status: 'Ready',
    summary: 'Comprehensive audit of 34 completed voyages showing an average 12.4% fuel savings and $412,000 cost reduction across active routes.'
  },
  {
    id: 'REP-2026-0802',
    title: 'IMO CII & EU ETS Carbon Compliance Report',
    type: 'Carbon',
    date: '2026-08-25',
    generatedBy: 'Sustainability Operations',
    status: 'Ready',
    summary: 'Vessel carbon intensity indicators (CII) breakdown with 18 of 20 ships rating Grade A or B under GreenRoute optimization.'
  },
  {
    id: 'REP-2026-0803',
    title: 'Arabian Sea & Bay of Bengal Fuel Burn Audit',
    type: 'Fuel',
    date: '2026-08-20',
    generatedBy: 'Marine Engineering Team',
    status: 'Ready',
    summary: 'Comparative analysis of heavy fuel oil (HFO) vs low-sulfur fuel oil (LSFO) consumption across speed curves 12-16 knots.'
  },
  {
    id: 'REP-2026-0804',
    title: 'Fleet Maintenance & Propulsion Efficiency Matrix',
    type: 'Fleet',
    date: '2026-08-15',
    generatedBy: 'Technical Superintendent',
    status: 'Ready',
    summary: 'Hull fouling and propeller condition degradation index for all 20 active vessels with maintenance scheduling recommendations.'
  }
]
