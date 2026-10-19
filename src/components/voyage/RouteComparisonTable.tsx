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
    <Card title="Route Intelligence Comparison Matrix" subtitle="Comprehensive hydrodynamic analysis across candidate oceanic corridors">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E3DA] text-[10px] font-mono uppercase tracking-wider text-[#777777] bg-[#FAF9F5]">
              <th className="p-3">Route Corridor</th>
              <th className="p-3 text-right">Distance</th>
              <th className="p-3 text-right">ETA</th>
              <th className="p-3 text-right">Fuel Burn</th>
              <th className="p-3 text-right">CO₂ Emissions</th>
              <th className="p-3 text-right">Est. Cost</th>
              <th className="p-3 text-center">Weather Risk</th>
              <th className="p-3">Fuel Relative Load</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E3DA]">
            {routes.map((route) => {
              const isRec = route.isRecommended
              const isOriginal = route.id === 'route-standard' || route.code === 'R-STND'
              const fuelPct = (route.fuelConsumptionTonnes / maxFuel) * 100

              return (
                <tr
                  key={route.id}
                  className={`transition-colors ${
                    isRec
                      ? 'bg-[#EDF5F2]/60 border-l-4 border-l-[#174D3F] font-medium'
                      : isOriginal
                      ? 'bg-[#FAF9F5] border-l-4 border-l-[#777777]'
                      : 'hover:bg-[#FAF9F6]'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {isRec && <CheckCircle2 className="w-4 h-4 text-[#174D3F] shrink-0" />}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#191919] text-xs">{route.name}</span>
                          {isRec && <Badge variant="green" size="sm">AI OPTIMIZED</Badge>}
                          {isOriginal && <Badge variant="gray" size="sm">BASELINE ROUTE</Badge>}
                        </div>
                        <p className="text-[10px] text-[#777777] mt-0.5">{route.pathDescription}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-right font-mono text-[#191919]">
                    {route.distanceNM.toLocaleString()} NM
                  </td>

                  <td className="p-3 text-right font-mono text-[#555555]">
                    {Math.floor(route.estimatedHours / 24)}d {route.estimatedHours % 24}h
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-[#191919]">
                    <span className={isRec ? 'text-[#174D3F] font-extrabold' : ''}>
                      {route.fuelConsumptionTonnes} <span className="text-[10px] font-normal text-[#777777]">t</span>
                    </span>
                  </td>

                  <td className="p-3 text-right font-mono">
                    <span className={isRec ? 'text-[#174D3F] font-bold' : 'text-[#555555]'}>
                      {route.co2EmissionsTonnes} <span className="text-[10px] font-normal text-[#777777]">t</span>
                    </span>
                  </td>

                  <td className="p-3 text-right font-mono text-[#191919]">
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
                    <div className="w-full bg-[#E5E3DA] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isRec ? 'bg-[#174D3F]' : 'bg-[#777777]'
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
