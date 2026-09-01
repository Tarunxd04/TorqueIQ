import React from 'react'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { StatCard } from '../common/StatCard'
import { Leaf, ShieldCheck, TrendingDown, Flame, Globe, BarChart3 } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts'

export const CarbonView: React.FC = () => {
  const comparisonData = [
    { name: 'Baseline Voyage', co2Tonnes: 1520, fuelTonnes: 483, fill: '#EF4444' },
    { name: 'GreenRoute Optimized', co2Tonnes: 1345, fuelTonnes: 428, fill: '#10B981' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>IMO CII & EU ETS Decarbonization Suite</span>
          </div>
          <h2 className="text-2xl font-black text-white">Vessel Carbon Management Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track Carbon Intensity Indicators (CII), greenhouse gas abatement, and emissions reduction metrics.
          </p>
        </div>

        <Badge variant="green" size="md">
          IMO CII Grade A Compliant
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total CO₂"
          value="1,345"
          unit="tonnes"
          trend="-175t saved"
          trendType="positive"
          icon={Leaf}
          iconColor="text-emerald-400"
          description="Per Mumbai → Singapore trip"
        />

        <StatCard
          title="CO₂ / Nautical Mile"
          value="0.43"
          unit="t / NM"
          trend="-11.6% vs base"
          trendType="positive"
          icon={Globe}
          iconColor="text-cyan-400"
          description="Route efficiency factor"
        />

        <StatCard
          title="CO₂ / Tonne Cargo"
          value="20.7"
          unit="kg CO₂/t"
          trend="Top 5% efficiency"
          trendType="positive"
          icon={BarChart3}
          iconColor="text-emerald-400"
          description="Cargo transport intensity"
        />

        <StatCard
          title="Total CO₂ Avoided"
          value="175"
          unit="tonnes"
          trend="11.6% reduction"
          trendType="positive"
          icon={TrendingDown}
          iconColor="text-emerald-400"
          description="GreenRoute optimization"
        />

        <StatCard
          title="Carbon Score"
          value="95 / 100"
          trend="Grade A"
          trendType="positive"
          icon={ShieldCheck}
          iconColor="text-cyan-400"
          description="MARPOL Annex VI Rating"
        />
      </div>

      {/* Comparison Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Baseline vs GreenRoute Optimized CO₂ Emissions" subtitle="Single voyage comparison (Mumbai → Singapore)" className="lg:col-span-2">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={11} unit=" t" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="co2Tonnes" name="CO₂ Emissions (tonnes)" radius={[6, 6, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Savings Callout Card */}
        <Card title="Carbon Abatement Rationale">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center">
              <span className="text-xs font-bold text-slate-300 uppercase block">Total Net CO₂ Savings</span>
              <span className="text-3xl font-black text-emerald-400 font-mono mt-1 block">175 Tonnes</span>
              <span className="text-xs text-emerald-300 font-semibold block mt-1">Equivalent to planting 7,800 trees</span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 flex justify-between">
                <span className="text-slate-400">Baseline Voyage CO₂:</span>
                <span className="font-mono font-bold text-rose-400">1,520 tonnes</span>
              </div>
              <div className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 flex justify-between">
                <span className="text-slate-400">Optimized Voyage CO₂:</span>
                <span className="font-mono font-bold text-emerald-400">1,345 tonnes</span>
              </div>
              <div className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 flex justify-between">
                <span className="text-slate-400">Net CO₂ Abatement:</span>
                <span className="font-mono font-bold text-cyan-400">11.6% Reduction</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
