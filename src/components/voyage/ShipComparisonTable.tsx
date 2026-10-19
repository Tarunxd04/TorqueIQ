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
            <tr className="border-b border-[#E5E3DA] text-[10px] font-mono uppercase tracking-wider text-[#777777] bg-[#FAF9F5]">
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
          <tbody className="divide-y divide-[#E5E3DA]">
            {ships.map((item) => {
              const ship = item.ship
              const isRec = item.recommended

              return (
                <tr
                  key={ship.id}
                  className={`transition-colors ${
                    isRec
                      ? 'bg-[#EDF5F2]/60 border-l-4 border-l-[#174D3F] font-medium'
                      : 'hover:bg-[#FAF9F6]'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {isRec ? (
                        <CheckCircle2 className="w-4 h-4 text-[#174D3F] shrink-0" />
                      ) : (
                        <Ship className="w-4 h-4 text-[#777777] shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-[#191919] text-xs">{ship.name}</span>
                        <p className="text-[10px] text-[#777777] mt-0.5">{ship.imo} • Built {ship.yearBuilt}</p>
                      </div>
                      {isRec && <Badge variant="green" size="sm">BEST MATCH</Badge>}
                    </div>
                  </td>

                  <td className="p-3 text-[#555555]">{ship.type}</td>

                  <td className="p-3 text-right font-mono text-[#191919]">
                    {ship.capacity.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono text-[#555555]">
                    {ship.currentLoad.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-[#174D3F]">
                    {ship.fuelEfficiency}%
                  </td>

                  <td className="p-3 text-right font-mono text-[#191919]">
                    13.8 kts
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-[#174D3F]' : 'text-[#191919]'}`}>
                    {item.fuel} t
                  </td>

                  <td className={`p-3 text-right font-mono font-bold ${isRec ? 'text-[#174D3F]' : 'text-[#555555]'}`}>
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
