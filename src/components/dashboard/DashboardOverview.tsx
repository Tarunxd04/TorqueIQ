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
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest mb-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>GreenRoute Maritime Control Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Fleet Sustainability & Optimization Overview</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time hydrodynamic, weather, and carbon intensity metrics across 20 active vessels.
          </p>
        </div>

        <button
          onClick={() => onNavigateToView('planner')}
          className="btn-primary px-4 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2"
        >
          <span>Plan Optimal Voyage</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Metric KPI Cards in Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <StatCard
          title="Active Ships"
          value={20}
          unit="vessels"
          trend="+2 online"
          trendType="positive"
          icon={Ship}
          iconColor="text-brand-bright"
          description="100% operational"
        />

        <StatCard
          title="Active Voyages"
          value={8}
          unit="en route"
          trend="8/8 optimized"
          trendType="positive"
          icon={Navigation}
          iconColor="text-cyan-400"
          description="On schedule"
        />

        <StatCard
          title="Avg Efficiency"
          value="92.4%"
          trend="+1.8% MoM"
          trendType="positive"
          icon={Gauge}
          iconColor="text-emerald-400"
          description="Fleet hydro rating"
        />

        <StatCard
          title="Fuel Saved"
          value="12.4%"
          trend="420 t/mo"
          trendType="positive"
          icon={Flame}
          iconColor="text-amber-400"
          description="Below baseline"
        />

        <StatCard
          title="CO₂ Avoided"
          value="1,320"
          unit="tonnes"
          trend="-11.6% CII"
          trendType="positive"
          icon={Leaf}
          iconColor="text-emerald-400"
          description="Tier A rating"
        />

        <StatCard
          title="Cost Savings"
          value="$315k"
          unit="USD"
          trend="+14% YoY"
          trendType="positive"
          icon={DollarSign}
          iconColor="text-indigo-400"
          description="Bunker savings"
        />
      </div>

      {/* Bento Layout Grid for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_FUEL_CO2_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5E6AD2" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#5E6AD2" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090A0E',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#EDEDEF',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="actualFuel" name="Optimized Fuel (t)" stroke="#5E6AD2" strokeWidth={2} fillOpacity={1} fill="url(#fuelGrad)" />
                  <Area type="monotone" dataKey="co2Saved" name="CO₂ Cut (t)" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#co2Grad)" />
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
            <div className="h-[220px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={VOYAGE_STATUS_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {VOYAGE_STATUS_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#050508" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090A0E',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#EDEDEF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
              {VOYAGE_STATUS_BREAKDOWN.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400">{item.name}:</span>
                  <span className="font-mono font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Live Fleet Table */}
      <Card
        title="Active Fleet Operational Overview (Sample)"
        subtitle="Real-time telemetry and hydrodynamic compliance"
        action={
          <button
            onClick={() => onNavigateToView('fleet')}
            className="text-xs font-mono font-medium text-brand-bright hover:text-white transition flex items-center gap-1"
          >
            <span>View All 20 Ships</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="py-3 px-3">Vessel Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Speed</th>
                <th className="py-3 px-3">Fuel Eff.</th>
                <th className="py-3 px-3">CII Score</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {FLEET_SHIPS.slice(0, 5).map((ship) => (
                <tr key={ship.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{ship.name}</td>
                  <td className="py-3 px-3 text-slate-400">{ship.type}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{ship.location}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-cyan-400">{ship.currentSpeed} kts</td>
                  <td className="py-3 px-3 font-mono font-semibold text-emerald-400">{ship.fuelEfficiency}%</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{ship.co2Intensity} t/t</td>
                  <td className="py-3 px-3">
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
