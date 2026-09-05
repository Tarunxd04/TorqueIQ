import React, { useState } from 'react'
import { FLEET_SHIPS } from '../../data/shipsData'
import { Ship } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { Modal } from '../common/Modal'
import { exportFleetCsv } from '../../utils/exportUtils'
import { Search, Filter, ArrowUpDown, Ship as ShipIcon, Download, Compass, Activity, Fuel, Leaf, Anchor } from 'lucide-react'

export const FleetView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'capacity' | 'speed'>('efficiency')
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null)

  // Filtering & Sorting
  const filteredShips = FLEET_SHIPS.filter((ship) => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ship.imo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ship.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || ship.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    if (sortBy === 'efficiency') return b.fuelEfficiency - a.fuelEfficiency
    if (sortBy === 'capacity') return b.capacity - a.capacity
    if (sortBy === 'speed') return b.currentSpeed - a.currentSpeed
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Fleet Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest mb-1.5">
            <ShipIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fleet Telemetry & Hydrodynamics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">20-Vessel Active Fleet Directory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track vessel hydrodynamics, IMO CII ratings, position, fuel reserves, and operational readiness.
          </p>
        </div>

        <button
          onClick={exportFleetCsv}
          className="btn-secondary px-4 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5 text-brand-bright" />
          <span>Export Fleet Audit CSV</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-4 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3.5">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ship name, IMO, location..."
              className="input-tech w-full pl-9 pr-4 py-2 text-xs font-medium placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-tech px-3 py-2 text-xs font-medium"
              >
                <option value="ALL" className="bg-[#090A0E] text-white">All Statuses (20)</option>
                <option value="Sailing" className="bg-[#090A0E] text-white">Sailing</option>
                <option value="At Port" className="bg-[#090A0E] text-white">At Port</option>
                <option value="Loading" className="bg-[#090A0E] text-white">Loading</option>
                <option value="Maintenance" className="bg-[#090A0E] text-white">Maintenance</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-tech px-3 py-2 text-xs font-medium"
              >
                <option value="efficiency" className="bg-[#090A0E] text-white">Efficiency (High → Low)</option>
                <option value="capacity" className="bg-[#090A0E] text-white">Capacity</option>
                <option value="speed" className="bg-[#090A0E] text-white">Speed</option>
                <option value="name" className="bg-[#090A0E] text-white">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Table */}
      <Card>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-white/[0.02]">
                <th className="p-3">Vessel & IMO</th>
                <th className="p-3">Type & Flag</th>
                <th className="p-3 text-right">Capacity</th>
                <th className="p-3 text-right">Current Load</th>
                <th className="p-3">Position</th>
                <th className="p-3 text-right">Efficiency</th>
                <th className="p-3 text-right">Speed</th>
                <th className="p-3 text-right">Bunker Fuel</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredShips.map((ship) => (
                <tr
                  key={ship.id}
                  onClick={() => setSelectedShip(ship)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="p-3">
                    <div>
                      <span className="font-semibold text-white text-xs">{ship.name}</span>
                      <p className="text-[10px] text-slate-400 font-mono">{ship.imo}</p>
                    </div>
                  </td>

                  <td className="p-3 text-slate-300">
                    <div>
                      <span>{ship.type}</span>
                      <p className="text-[10px] text-slate-400 font-mono">{ship.flag}</p>
                    </div>
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.capacity.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.currentLoad.toLocaleString()} t
                  </td>

                  <td className="p-3 text-slate-300 max-w-xs truncate font-mono text-[11px]">
                    {ship.location}
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-emerald-400">
                    {ship.fuelEfficiency}%
                  </td>

                  <td className="p-3 text-right font-mono text-cyan-300 font-medium">
                    {ship.currentSpeed > 0 ? `${ship.currentSpeed} kts` : '0 kts'}
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    <span className={ship.fuelLevel < 50 ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                      {ship.fuelLevel}%
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <Badge
                      variant={
                        ship.status === 'Sailing'
                          ? 'green'
                          : ship.status === 'At Port'
                          ? 'blue'
                          : ship.status === 'Loading'
                          ? 'cyan'
                          : 'yellow'
                      }
                      size="sm"
                      dot
                    >
                      {ship.status}
                    </Badge>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedShip(ship)
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 hover:bg-brand-accent hover:text-white font-mono text-[10px] font-medium border border-white/[0.06] transition-all"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Vessel Slide-over Modal */}
      {selectedShip && (
        <Modal
          isOpen={!!selectedShip}
          onClose={() => setSelectedShip(null)}
          title={`Vessel Telemetry Inspector — ${selectedShip.name}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <ShipIcon className="w-4 h-4 text-brand-bright" />
                  <span>{selectedShip.name}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">{selectedShip.imo} • Flag: {selectedShip.flag} • Built {selectedShip.yearBuilt}</p>
              </div>
              <Badge variant={selectedShip.status === 'Sailing' ? 'green' : 'blue'} size="md" dot>
                {selectedShip.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-slate-400 block text-[10px] font-mono uppercase mb-1">Fuel Efficiency</span>
                <span className="text-base font-mono font-bold text-emerald-400">{selectedShip.fuelEfficiency}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-slate-400 block text-[10px] font-mono uppercase mb-1">Current Speed</span>
                <span className="text-base font-mono font-bold text-white">{selectedShip.currentSpeed} knots</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-slate-400 block text-[10px] font-mono uppercase mb-1">Bunker Fuel</span>
                <span className="text-base font-mono font-bold text-cyan-300">{selectedShip.fuelLevel}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-slate-400 block text-[10px] font-mono uppercase mb-1">CO₂ Intensity</span>
                <span className="text-base font-mono font-bold text-emerald-400">{selectedShip.co2Intensity} g/t-NM</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
              <h5 className="font-semibold text-slate-200 tracking-tight">Vessel Hydrodynamic Specifications</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                <div><span className="text-slate-400">Deadweight Capacity:</span> {selectedShip.capacity.toLocaleString()} DWT</div>
                <div><span className="text-slate-400">Current Payload:</span> {selectedShip.currentLoad.toLocaleString()} tonnes</div>
                <div><span className="text-slate-400">Base Fuel Burn (14 kts):</span> {selectedShip.baseFuelBurnPerDay} tonnes/day</div>
                <div><span className="text-slate-400">Current GPS Coordinate:</span> <span className="font-mono text-cyan-300">{selectedShip.location}</span></div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
