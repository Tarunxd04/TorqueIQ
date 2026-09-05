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
  Legend
} from 'recharts'

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('8M')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest mb-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Executive Intelligence Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Fleet Analytics & Historical Trends</h2>
          <p className="text-xs text-slate-400 mt-1">
            Multi-metric performance charts tracking bunker fuel burn, carbon abatement, and route benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <Calendar className="w-3.5 h-3.5 text-brand-bright" />
            <span className="text-slate-400 text-[11px]">Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-white font-mono text-xs focus:outline-none"
            >
              <option value="3M" className="bg-[#090A0E] text-white">Last 3 Months</option>
              <option value="8M" className="bg-[#090A0E] text-white">YTD (8 Months)</option>
              <option value="1Y" className="bg-[#090A0E] text-white">1 Year</option>
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
                <XAxis dataKey="month" stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={11} unit="%" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090A0E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#EDEDEF',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                  }}
                  formatter={(val: number) => [`${val}%`, 'Fuel Saved']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="fuelSavedPct"
                  name="Fuel Savings Rate (%)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Monthly Carbon Abatement (Tonnes)" subtitle="Total greenhouse gas emissions prevented per month">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={11} unit=" t" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090A0E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#EDEDEF',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                  }}
                  formatter={(val: number) => [`${val} tonnes`, 'CO₂ Avoided']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="co2Saved" name="CO₂ Cut (Tonnes)" fill="#5E6AD2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2: Route Efficiency Benchmarks */}
      <Card title="Corridor Hydrodynamic Efficiency Ranking" subtitle="Benchmarking active global shipping lanes">
        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ROUTE_EFFICIENCY_COMPARISON} margin={{ top: 10, right: 20, left: 10, bottom: 0 }} layout="vertical">
              <XAxis type="number" stroke="#4B5563" fontSize={11} unit="%" domain={[80, 100]} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="route" stroke="#4B5563" fontSize={11} width={130} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090A0E',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#EDEDEF',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                }}
                formatter={(val: number) => [`${val}%`, 'Hydro Score']}
              />
              <Bar dataKey="efficiency" name="Hydrodynamic Rating (%)" fill="#06B6D4" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
