import React, { useState } from 'react'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { StatCard } from '../common/StatCard'
import { MONTHLY_FUEL_CO2_TRENDS, ROUTE_EFFICIENCY_COMPARISON } from '../../data/analyticsData'
import { BarChart3, Filter, Calendar, TrendingDown, Zap, Globe, Flame, Leaf, Gauge, DollarSign } from 'lucide-react'
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>Executive Intelligence Matrix</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">Fleet Analytics & Historical Trends</h1>
          <p className="text-xs text-[#777777] mt-1">
            Multi-metric performance charts tracking predicted vs actual bunker fuel burn, carbon abatement, and route benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E3DA] text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#174D3F]" />
            <span className="text-[#777777] text-[11px]">Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-[#191919] font-mono text-xs focus:outline-none"
            >
              <option value="3M">Last 3 Months</option>
              <option value="8M">YTD (8 Months)</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Average Fuel Savings"
          value="12.4%"
          trend="+1.2% this quarter"
          trendType="positive"
          icon={Flame}
          iconColor="text-[#174D3F]"
          description="vs unoptimized routes"
        />
        <StatCard
          title="YTD Carbon Abated"
          value="9,850 t"
          trend="Tier A standard"
          trendType="positive"
          icon={Leaf}
          iconColor="text-[#174D3F]"
          description="IMO CII verified"
        />
        <StatCard
          title="Corridor Efficiency"
          value="94.2%"
          trend="Top benchmark"
          trendType="positive"
          icon={Gauge}
          iconColor="text-[#174D3F]"
          description="Indian Ocean route"
        />
        <StatCard
          title="Cumulative Bunker Savings"
          value="$2.45M"
          trend="+18% YoY"
          trendType="positive"
          icon={DollarSign}
          iconColor="text-[#174D3F]"
          description="Direct OPEX cut"
        />
      </div>

      {/* Row 1: Fuel Saved & CO2 Reduction Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Fuel Savings (%)" subtitle="Percentage fuel reduction achieved vs traditional uncalibrated routing">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                <YAxis stroke="#777777" fontSize={11} unit="%" tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E3DA',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#191919',
                    boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
                  }}
                  formatter={(val: number) => [`${val}%`, 'Fuel Saved']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="fuelSavedPct"
                  name="Fuel Savings Rate (%)"
                  stroke="#174D3F"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#174D3F' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Monthly Carbon Abatement (Tonnes)" subtitle="Total greenhouse gas emissions prevented per month across active voyages">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                <YAxis stroke="#777777" fontSize={11} unit=" t" tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E3DA',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#191919',
                    boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
                  }}
                  formatter={(val: number) => [`${val} tonnes`, 'CO₂ Avoided']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="co2Saved" name="CO₂ Cut (Tonnes)" fill="#F15F56" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2: Route Efficiency Benchmarks */}
      <Card title="Corridor Hydrodynamic Efficiency Ranking" subtitle="Benchmarking active global shipping lanes under dynamic current vectors">
        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ROUTE_EFFICIENCY_COMPARISON} margin={{ top: 10, right: 20, left: 10, bottom: 0 }} layout="vertical">
              <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="#777777" fontSize={11} unit="%" domain={[80, 100]} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
              <YAxis type="category" dataKey="route" stroke="#777777" fontSize={11} width={130} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E3DA',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#191919',
                  boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
                }}
                formatter={(val: number) => [`${val}%`, 'Hydro Score']}
              />
              <Bar dataKey="efficiency" name="Hydrodynamic Rating (%)" fill="#174D3F" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
