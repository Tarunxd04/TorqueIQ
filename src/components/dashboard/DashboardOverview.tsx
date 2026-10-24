import React from 'react'
import {
  Ship,
  Navigation,
  Gauge,
  Flame,
  Leaf,
  DollarSign,
  ArrowUpRight,
  TrendingDown,
  Activity,
  CheckCircle2,
  Sliders,
  Layers
} from 'lucide-react'
import { StatCard } from '../common/StatCard'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'
import { MONTHLY_FUEL_CO2_TRENDS, FLEET_EFFICIENCY_DISTRIBUTION, VOYAGE_STATUS_BREAKDOWN } from '../../data/analyticsData'
import { FLEET_SHIPS } from '../../data/shipsData'

interface DashboardOverviewProps {
  onNavigateToView: (view: string) => void
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateToView }) => {
  const pieColors = ['#174D3F', '#F15F56', '#D97706', '#64748B']

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle reveal-fade-up">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Activity className="w-4 h-4 text-[#174D3F]" />
            <span>Autonomous Fleet Operations & Voyage Control Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">Fleet Sustainability & Optimization Overview</h1>
          <p className="text-sm text-[#666666] mt-1">
            Real-time hydrodynamic, oceanic weather, and carbon intensity metrics across 20 active commercial vessels.
          </p>
        </div>

        <button
          onClick={() => onNavigateToView('planner')}
          className="btn-coral px-5 py-2.5 rounded-xl text-sm font-medium shrink-0 flex items-center gap-2 shadow-sm"
        >
          <span>Plan Optimal Voyage</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Required KPI Cards in Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 reveal-fade-up reveal-stagger-1">
        <StatCard
          title="Total Fleet"
          value={20}
          unit="vessels"
          trend="+2 online"
          trendType="positive"
          icon={Ship}
          iconColor="text-[#174D3F]"
          description="100% operational"
        />

        <StatCard
          title="Active Voyages"
          value={8}
          unit="en route"
          trend="8/8 optimized"
          trendType="positive"
          icon={Navigation}
          iconColor="text-[#174D3F]"
          description="On schedule"
        />

        <StatCard
          title="Fuel Consumption"
          value="428 t"
          unit="this mo"
          trend="-12.4% vs base"
          trendType="positive"
          icon={Flame}
          iconColor="text-[#F15F56]"
          description="Optimized burn"
        />

        <StatCard
          title="Estimated Fuel Savings"
          value="$315k"
          unit="USD"
          trend="+14% YoY"
          trendType="positive"
          icon={DollarSign}
          iconColor="text-[#174D3F]"
          description="Bunker savings"
        />

        <StatCard
          title="CO2 Emissions Reduced"
          value="1,320"
          unit="tonnes"
          trend="-11.6% CII"
          trendType="positive"
          icon={Leaf}
          iconColor="text-[#174D3F]"
          description="Tier A compliance"
        />

        <StatCard
          title="Optimization Performance"
          value="92.4%"
          trend="+1.8% MoM"
          trendType="positive"
          icon={Gauge}
          iconColor="text-[#174D3F]"
          description="Fleet hydro rating"
        />
      </div>

      {/* Bento Layout Grid for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-fade-up reveal-stagger-2">
        {/* Monthly Fuel & Carbon Reduction Chart (2 cols) */}
        <div className="lg:col-span-2">
          <Card
            title="Monthly Fuel Consumption vs Carbon Reduction"
            subtitle="Historical baseline compared with AI hydrodynamic optimization (tonnes/month)"
            action={
              <Badge variant="green" size="sm" dot>
                -12.4% Avg Fuel Cut
              </Badge>
            }
          >
            <div className="h-[280px] w-full pt-2 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fuelGradWarm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#174D3F" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#174D3F" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="co2GradWarm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F15F56" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#F15F56" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                  <YAxis stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E3DA',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#191919',
                      boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="actualFuel" name="Optimized Fuel (t)" stroke="#174D3F" strokeWidth={2.5} fillOpacity={1} fill="url(#fuelGradWarm)" />
                  <Area type="monotone" dataKey="co2Saved" name="CO₂ Cut (t)" stroke="#F15F56" strokeWidth={2} fillOpacity={1} fill="url(#co2GradWarm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Voyage Status & CII Breakdown */}
        <div>
          <Card
            title="Voyage Operational Status"
            subtitle="Fleet live mission distribution"
          >
            <div className="h-[200px] w-full flex items-center justify-center min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={VOYAGE_STATUS_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {VOYAGE_STATUS_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E3DA',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#191919',
                      boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5E3DA]">
              {VOYAGE_STATUS_BREAKDOWN.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
                  <span className="text-[#777777] text-[11px] truncate">{item.name}:</span>
                  <span className="font-mono font-semibold text-[#191919] text-[11px] ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Live Fleet Sample Table */}
      <Card
        className="reveal-fade-up reveal-stagger-3"
        title="Active Fleet Operational Telemetry (Sample)"
        subtitle="Real-time vessel position, fuel efficiency, and IMO CII compliance"
        action={
          <button
            onClick={() => onNavigateToView('fleet')}
            className="text-xs font-mono font-medium text-[#174D3F] hover:text-[#0F342B] transition flex items-center gap-1"
          >
            <span>View All 20 Vessels</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E3DA] text-[10px] font-mono uppercase tracking-wider text-[#777777] bg-[#FDFDFB]">
                <th className="py-3 px-3 text-left">Vessel Name</th>
                <th className="py-3 px-3 text-left">Type</th>
                <th className="py-3 px-3 text-left">Location</th>
                <th className="py-3 px-3 text-right">Speed</th>
                <th className="py-3 px-3 text-right">Fuel Eff.</th>
                <th className="py-3 px-3 text-right">CII Score</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DA]">
              {FLEET_SHIPS.slice(0, 6).map((ship) => (
                <tr key={ship.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#191919] text-left">
                    <div className="flex items-center gap-2">
                      <Ship className="w-3.5 h-3.5 text-[#174D3F]" />
                      <span>{ship.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#777777] text-left">{ship.type}</td>
                  <td className="py-3 px-3 text-[#777777] font-mono text-[11px] text-left">{ship.location}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#191919] text-right">{ship.currentSpeed} kts</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#174D3F] text-right">{ship.fuelEfficiency}%</td>
                  <td className="py-3 px-3 font-mono text-[#555555] text-right">{ship.co2Intensity} g/t-NM</td>
                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={ship.status === 'Sailing' ? 'green' : ship.status === 'Loading' ? 'yellow' : 'cyan'}
                      size="sm"
                      dot
                    >
                      {ship.status}
                    </Badge>
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
