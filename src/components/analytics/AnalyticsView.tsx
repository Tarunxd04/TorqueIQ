import React, { useState } from 'react'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { MONTHLY_FUEL_CO2_TRENDS, ROUTE_EFFICIENCY_COMPARISON } from '../../data/analyticsData'
import { BarChart3, Filter, Calendar, TrendingDown, Zap, Globe } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('8M')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Executive Intelligence Matrix</span>
          </div>
          <h2 className="text-2xl font-black text-white">Fleet Analytics & Historical Trends</h2>
          <p className="text-xs text-slate-400 mt-1">
            Multi-metric performance charts tracking bunker fuel burn, carbon abatement, speed efficiency, and route benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">Time Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-cyan-400 font-bold focus:outline-none"
            >
              <option value="3M">Last 3 Months</option>
              <option value="8M">YTD (8 Months)</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: Fuel Saved & CO2 Reduction Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Fuel Savings (%)" subtitle="Percentage fuel reduction achieved vs traditional routing">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[10, 15]} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="fuelSavedPct" name="Fuel Saved (%)" stroke="#10B981" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Monthly Bunker Fuel Expenditure ($M)" subtitle="Net USD cost savings trajectory">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} unit="M$" />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="costUSD" name="Bunker Spend ($M)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2: Route Benchmark Table */}
      <Card title="Key Corridor Route Benchmarks" subtitle="Performance across major maritime trade lanes">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-navy-700/80 text-slate-400 font-bold uppercase tracking-wider bg-navy-900/60">
                <th className="p-3">Trade Route</th>
                <th className="p-3 text-right">Distance (NM)</th>
                <th className="p-3 text-right">Avg Speed</th>
                <th className="p-3 text-right">Fuel Intensity (t/NM)</th>
                <th className="p-3 text-right">CO₂ Avoided / Trip</th>
                <th className="p-3 text-center">Efficiency Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {ROUTE_EFFICIENCY_COMPARISON.map((r, idx) => (
                <tr key={idx} className="hover:bg-navy-800/40 transition">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>{r.route}</span>
                  </td>
                  <td className="p-3 text-right font-mono text-slate-200">{r.distance.toLocaleString()} NM</td>
                  <td className="p-3 text-right font-mono text-slate-200">{r.avgSpeed} kts</td>
                  <td className="p-3 text-right font-mono text-cyan-400 font-bold">{r.avgFuelPerNM} t/NM</td>
                  <td className="p-3 text-right font-mono text-emerald-400 font-bold">{r.co2Avoided} tonnes</td>
                  <td className="p-3 text-center">
                    <Badge variant="green" size="sm">Optimal</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
