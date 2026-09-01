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
    <div className="space-y-6">
      {/* Fleet Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <ShipIcon className="w-4 h-4 text-emerald-400" />
            <span>Fleet Control Matrix</span>
          </div>
          <h2 className="text-2xl font-black text-white">20-Vessel Active Fleet Directory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track vessel hydrodynamics, IMO CII emissions ratings, location, fuel reserves, and operational state.
          </p>
        </div>

        <button
          onClick={exportFleetCsv}
          className="px-4 py-2.5 rounded-xl bg-navy-800 text-slate-200 border border-navy-700 hover:border-cyan-500/40 text-xs font-bold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Fleet Audit CSV</span>
        </button>
      </div>

      {/* Controls Bar */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ship name, IMO ID, location..."
              className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="ALL">All Statuses (20)</option>
                <option value="Sailing">Sailing</option>
                <option value="At Port">At Port</option>
                <option value="Loading">Loading</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="efficiency">Sort by Efficiency (High → Low)</option>
                <option value="capacity">Sort by Capacity</option>
                <option value="speed">Sort by Speed</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Fleet Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-navy-700/80 text-slate-400 font-bold uppercase tracking-wider bg-navy-900/60">
                <th className="p-3">Vessel & IMO</th>
                <th className="p-3">Type & Flag</th>
                <th className="p-3 text-right">Capacity</th>
                <th className="p-3 text-right">Current Load</th>
                <th className="p-3">Current Location</th>
                <th className="p-3 text-right">Efficiency</th>
                <th className="p-3 text-right">Speed</th>
                <th className="p-3 text-right">Fuel Level</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {filteredShips.map((ship) => (
                <tr
                  key={ship.id}
                  onClick={() => setSelectedShip(ship)}
                  className="hover:bg-navy-800/60 cursor-pointer transition"
                >
                  <td className="p-3 font-bold text-white">
                    <div>
                      <span className="text-slate-100">{ship.name}</span>
                      <p className="text-[10px] text-slate-400 font-mono font-normal">{ship.imo}</p>
                    </div>
                  </td>

                  <td className="p-3 text-slate-300">
                    <div>
                      <span>{ship.type}</span>
                      <p className="text-[10px] text-slate-400">{ship.flag}</p>
                    </div>
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.capacity.toLocaleString()} t
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
                    {ship.currentLoad.toLocaleString()} t
                  </td>

                  <td className="p-3 text-slate-300 max-w-xs truncate">
                    {ship.location}
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-emerald-400">
                    {ship.fuelEfficiency}%
                  </td>

                  <td className="p-3 text-right font-mono text-slate-200">
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
                      className="px-2.5 py-1 rounded bg-navy-800 text-cyan-400 hover:bg-cyan-500 hover:text-navy-950 font-bold transition text-[11px]"
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
          title={`Vessel Detail Inspector — ${selectedShip.name}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-navy-900 border border-navy-700/80 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <ShipIcon className="w-5 h-5 text-cyan-400" />
                  <span>{selectedShip.name}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">{selectedShip.imo} • Flag: {selectedShip.flag} • Built {selectedShip.yearBuilt}</p>
              </div>
              <Badge variant={selectedShip.status === 'Sailing' ? 'green' : 'blue'} size="md">
                {selectedShip.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                <span className="text-slate-400 block mb-1">Fuel Efficiency</span>
                <span className="text-lg font-mono font-bold text-emerald-400">{selectedShip.fuelEfficiency}%</span>
              </div>
              <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                <span className="text-slate-400 block mb-1">Current Speed</span>
                <span className="text-lg font-mono font-bold text-white">{selectedShip.currentSpeed} knots</span>
              </div>
              <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                <span className="text-slate-400 block mb-1">Bunker Fuel Level</span>
                <span className="text-lg font-mono font-bold text-cyan-400">{selectedShip.fuelLevel}%</span>
              </div>
              <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                <span className="text-slate-400 block mb-1">CO₂ Intensity</span>
                <span className="text-lg font-mono font-bold text-emerald-400">{selectedShip.co2Intensity} g/t-NM</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2 text-xs">
              <h5 className="font-bold text-slate-200 uppercase tracking-wider">Vessel Specifications</h5>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><span className="text-slate-400">Deadweight Capacity:</span> {selectedShip.capacity.toLocaleString()} DWT</div>
                <div><span className="text-slate-400">Current Cargo Load:</span> {selectedShip.currentLoad.toLocaleString()} tonnes</div>
                <div><span className="text-slate-400">Base Fuel Burn (14 kts):</span> {selectedShip.baseFuelBurnPerDay} tonnes/day</div>
                <div><span className="text-slate-400">Current Position:</span> {selectedShip.location}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
