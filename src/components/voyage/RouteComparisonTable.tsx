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
    <Card title="Route Intelligence Comparison" subtitle="Comprehensive hydrodynamic analysis across candidate oceanic corridors">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-white/[0.02]">
              <th className="p-3">Route Corridor</th>
              <th className="p-3 text-right">Distance</th>
              <th className="p-3 text-right">ETA</th>
              <th className="p-3 text-right">Fuel Burn</th>
              <th className="p-3 text-right">CO₂ Emissions</th>
              <th className="p-3 text-right">Est. Cost</th>
              <th className="p-3 text-center">Weather Risk</th>
              <th className="p-3">Fuel Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {routes.map((route) => {
              const isRec = route.isRecommended
              const fuelPct = (route.fuelConsumptionTonnes / maxFuel) * 100

              return (
                <tr
                  key={route.id}
                  className={`transition-colors ${
                    isRec
                      ? 'bg-emerald-500/[0.04] border-l-2 border-l-emerald-400 font-medium'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {isRec && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      <div>
                        <span className="font-semibold text-white text-xs">{route.name}</span>
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

                  <td className="p-3 text-right font-mono font-bold text-white">
                    {route.fuelConsumptionTonnes} <span className="text-[10px] font-normal text-slate-400">t</span>
                  </td>

                  <td className="p-3 text-right font-mono text-emerald-400">
                    {route.co2EmissionsTonnes} <span className="text-[10px] font-normal text-slate-400">t</span>
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    ${route.estimatedCostUSD.toLocaleString()}
                  </td>

                  <td className="p-3 text-center">
                    <Badge
                      variant={route.weatherRisk === 'Low' ? 'green' : route.weatherRisk === 'Medium' ? 'yellow' : 'red'}
                      size="sm"
                      dot
                    >
                      {route.weatherRisk}
                    </Badge>
                  </td>

                  <td className="p-3 min-w-[120px]">
                    <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isRec ? 'bg-emerald-400' : 'bg-brand-bright'
                        }`}
                        style={{ width: `${Math.min(100, fuelPct)}%` }}
                      />
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
