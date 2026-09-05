import React from 'react'
import { ShipComparisonItem } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { CheckCircle2, Ship } from 'lucide-react'

interface ShipComparisonTableProps {
  ships: ShipComparisonItem[]
}

export const ShipComparisonTable: React.FC<ShipComparisonTableProps> = ({ ships }) => {
  return (
    <Card title="Candidate Vessel Hydrodynamic Comparison" subtitle="Comparing top fleet candidates for cargo voyage requirement">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-white/[0.02]">
              <th className="p-3">Vessel Name</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-right">Capacity (DWT)</th>
              <th className="p-3 text-right">Current Load</th>
              <th className="p-3 text-right">Hydro Efficiency</th>
              <th className="p-3 text-right">Est. Speed</th>
              <th className="p-3 text-right">Expected Fuel</th>
              <th className="p-3 text-right">Expected CO₂</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {ships.map((item) => {
              const ship = item.ship
              const isRec = item.recommended

              return (
                <tr
                  key={ship.id}
                  className={`transition-colors ${
                    isRec
                      ? 'bg-cyan-500/[0.04] border-l-2 border-l-cyan-400 font-medium'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {isRec ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <Ship className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-white text-xs">{ship.name}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ship.imo} • Built {ship.yearBuilt}</p>
                      </div>
                      {isRec && <Badge variant="cyan" size="sm">RECOMMENDED</Badge>}
                    </div>
                  </td>

                  <td className="p-3 text-slate-300">{ship.type}</td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.capacity.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.currentLoad.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-emerald-400">
                    {ship.fuelEfficiency}%
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    13.8 kts
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {item.fuel} t
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {item.co2} t
                  </td>

                  <td className="p-3 text-center">
                    <Badge variant={ship.status === 'Sailing' ? 'green' : ship.status === 'At Port' ? 'blue' : 'gray'} size="sm" dot>
                      {ship.status}
                    </Badge>
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
