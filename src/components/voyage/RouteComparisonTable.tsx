import React from 'react'
import { RouteOption } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { CheckCircle2, ShieldAlert } from 'lucide-react'

interface RouteComparisonTableProps {
  routes: RouteOption[]
}

export const RouteComparisonTable: React.FC<RouteComparisonTableProps> = ({ routes }) => {
  const maxFuel = 500

  return (
    <Card title="Route Intelligence Comparison" subtitle="Comprehensive analysis across candidate oceanic corridors">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-navy-700/80 text-slate-400 font-bold uppercase tracking-wider bg-navy-900/60">
              <th className="p-3">Route</th>
              <th className="p-3 text-right">Distance</th>
              <th className="p-3 text-right">ETA</th>
              <th className="p-3 text-right">Fuel Burn</th>
              <th className="p-3 text-right">CO₂ Emissions</th>
              <th className="p-3 text-right">Est. Fuel Cost</th>
              <th className="p-3 text-center">Weather Risk</th>
              <th className="p-3">Fuel Efficiency Visual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800">
            {routes.map((route) => {
              const isRec = route.isRecommended
              const fuelPct = (route.fuelConsumptionTonnes / maxFuel) * 100

              return (
                <tr
                  key={route.id}
                  className={`transition ${
                    isRec
                      ? 'bg-gradient-to-r from-emerald-950/40 via-navy-850 to-navy-850 border-l-4 border-l-emerald-400 font-medium'
                      : 'hover:bg-navy-800/40'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {isRec && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      <div>
                        <span className="font-bold text-white text-xs">{route.name}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{route.pathDescription}</p>
                      </div>
                      {isRec && <Badge variant="green" size="sm">RECOMMENDED</Badge>}
                    </div>
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {route.distanceNM.toLocaleString()} NM
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {Math.floor(route.estimatedHours / 24)}d {route.estimatedHours % 24}h
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {route.fuelConsumptionTonnes} t
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {route.co2EmissionsTonnes} t
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-amber-400">
                    ${(route.estimatedCostUSD / 1000).toFixed(0)}K
                  </td>

                  <td className="p-3 text-center">
                    <Badge
                      variant={route.weatherRisk === 'Low' ? 'green' : route.weatherRisk === 'Medium' ? 'yellow' : 'red'}
                      size="sm"
                    >
                      {route.weatherRisk}
                    </Badge>
                  </td>

                  <td className="p-3 w-48">
                    <div className="space-y-1">
                      <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden border border-navy-800">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isRec ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-slate-600'
                          }`}
                          style={{ width: `${fuelPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono block text-right">{route.weatherImpactPct > 0 ? `+${route.weatherImpactPct}% drag` : `${route.weatherImpactPct}% push`}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
