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
  CheckCircle2
} from 'lucide-react'
import { StatCard } from '../common/StatCard'
import { Card } from '../common/Card'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import { MONTHLY_FUEL_CO2_TRENDS, FLEET_EFFICIENCY_DISTRIBUTION, VOYAGE_STATUS_BREAKDOWN } from '../../data/analyticsData'
import { FLEET_SHIPS } from '../../data/shipsData'

interface DashboardOverviewProps {
  onNavigateToView: (view: string) => void
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateToView }) => {
  return (
    <div className="space-y-6">
      {/* Overview Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>GreenRoute Maritime Control Matrix</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Fleet Sustainability & Optimization Overview</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time hydrodynamic, weather, and carbon intensity metrics across 20 active vessels.
          </p>
        </div>

        <button
          onClick={() => onNavigateToView('planner')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition shrink-0 flex items-center gap-2"
        >
          <span>Plan New Optimal Voyage</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Active Ships"
          value={20}
          unit="vessels"
          trend="+2 online"
          trendType="positive"
          icon={Ship}
          iconColor="text-cyan-400"
          description="100% operational"
        />

        <StatCard
          title="Active Voyages"
          value={8}
          unit="en route"
          trend="8/8 optimized"
          trendType="positive"
          icon={Navigation}
          iconColor="text-emerald-400"
          description="On schedule"
        />

        <StatCard
          title="Avg Efficiency"
          value="92.4%"
          trend="+1.8% MoM"
          trendType="positive"
          icon={Gauge}
          iconColor="text-cyan-400"
          description="Fleet hydro rating"
        />

        <StatCard
          title="Fuel Saved"
          value="12.4%"
          trend="420 tonnes/mo"
          trendType="positive"
          icon={Flame}
          iconColor="text-emerald-400"
          description="Vs un-optimized"
        />

        <StatCard
          title="CO₂ Avoided"
          value="11.6%"
          trend="1,320 tonnes"
          trendType="positive"
          icon={Leaf}
          iconColor="text-emerald-400"
          description="IMO CII Class A"
        />

        <StatCard
          title="Monthly Cost"
          value="$1.24M"
          unit="USD"
          trend="-$284K saved"
          trendType="positive"
          icon={DollarSign}
          iconColor="text-amber-400"
          description="Bunker spend"
        />
      </div>

      {/* Charts Grid Row 1: Fuel & CO2 Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Consumption Trend Area Chart */}
        <Card title="Monthly Fuel Consumption (Baseline vs GreenRoute)" subtitle="Tonnes heavy fuel oil burned across active fleet">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="baselineFuel" name="Baseline (Un-optimized)" stroke="#EF4444" fillOpacity={1} fill="url(#colorBaseline)" strokeWidth={2} />
                <Area type="monotone" dataKey="optimizedFuel" name="GreenRoute Optimized" stroke="#10B981" fillOpacity={1} fill="url(#colorOptimized)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CO2 Emissions Trend Area Chart */}
        <Card title="Monthly CO₂ Emissions Cut (Tonnes CO₂e)" subtitle="IMO CII Compliance trajectory">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="baselineCo2" name="Baseline CO₂ (t)" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
                <Area type="monotone" dataKey="optimizedCo2" name="Optimized CO₂ (t)" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCo2)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Grid Row 2: Fleet Distribution & Active Voyages Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Efficiency Distribution */}
        <Card title="Fleet Efficiency Spectrum" subtitle="Hydrodynamic efficiency ratings across 20 ships">
          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FLEET_EFFICIENCY_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#64748B" fontSize={10} interval={0} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Vessels" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Voyage Status Distribution Donut */}
        <Card title="Voyage Status Distribution" subtitle="Active operational states">
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VOYAGE_STATUS_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {VOYAGE_STATUS_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Active Vessels Quick Status List */}
        <Card title="Top Active Ships" subtitle="Live vessel tracking snippet" action={
          <button onClick={() => onNavigateToView('fleet')} className="text-xs text-cyan-400 font-semibold hover:underline">
            View All 20 →
          </button>
        }>
          <div className="space-y-3 mt-1">
            {FLEET_SHIPS.slice(0, 4).map((ship) => (
              <div key={ship.id} className="p-3 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{ship.name}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{ship.location}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">{ship.fuelEfficiency}% Eff</span>
                  <p className="text-[10px] text-slate-400">{ship.currentSpeed > 0 ? `${ship.currentSpeed} kts` : ship.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
