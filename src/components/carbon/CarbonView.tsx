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
  Cell,
  CartesianGrid
} from 'recharts'

export const CarbonView: React.FC = () => {
  const comparisonData = [
    { name: 'Baseline Voyage', co2Tonnes: 1520, fuelTonnes: 483, fill: '#E5E3DA' },
    { name: 'Torque IQ Optimized', co2Tonnes: 1345, fuelTonnes: 428, fill: '#174D3F' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>IMO CII & EU ETS Decarbonization Suite</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">Vessel Carbon Management Dashboard</h1>
          <p className="text-xs text-[#777777] mt-1">
            Track Carbon Intensity Indicators (CII), greenhouse gas abatement, and emissions reduction metrics.
          </p>
        </div>

        <Badge variant="green" size="md" dot>
          IMO CII Grade A Compliant
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <StatCard
          title="Total CO₂"
          value="1,345"
          unit="tonnes"
          trend="-175t saved"
          trendType="positive"
          icon={Leaf}
          iconColor="text-[#174D3F]"
          description="Trip total emissions"
        />

        <StatCard
          title="CO₂ / Nautical Mile"
          value="0.43"
          unit="t / NM"
          trend="-11.6% vs base"
          trendType="positive"
          icon={Globe}
          iconColor="text-[#174D3F]"
          description="Route efficiency factor"
        />

        <StatCard
          title="CO₂ / Tonne Cargo"
          value="20.7"
          unit="kg CO₂/t"
          trend="Top 5% efficiency"
          trendType="positive"
          icon={BarChart3}
          iconColor="text-[#174D3F]"
          description="Cargo transport intensity"
        />

        <StatCard
          title="Total CO₂ Avoided"
          value="175"
          unit="tonnes"
          trend="11.6% reduction"
          trendType="positive"
          icon={TrendingDown}
          iconColor="text-[#174D3F]"
          description="Torque IQ optimization"
        />

        <StatCard
          title="Carbon Score"
          value="95 / 100"
          trend="Grade A"
          trendType="positive"
          icon={ShieldCheck}
          iconColor="text-[#174D3F]"
          description="MARPOL Annex VI Rating"
        />
      </div>

      {/* Comparison Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Baseline vs Torque IQ Optimized CO₂ Emissions" subtitle="Voyage emissions comparison (tonnes CO₂)" className="lg:col-span-2">
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
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
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="co2Tonnes" name="CO₂ Emissions (tonnes)" radius={[6, 6, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke={index === 0 ? '#C8C6BC' : '#0F342B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Savings Callout Card */}
        <Card title="Carbon Abatement Rationale">
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[#EDF5F2] border border-[#D2E4DC] text-center">
              <span className="text-[10px] font-mono font-bold text-[#174D3F] uppercase block">Total Net CO₂ Savings</span>
              <span className="text-3xl font-extrabold text-[#174D3F] font-mono mt-1 block">175 Tonnes</span>
              <span className="text-xs text-[#174D3F] font-medium block mt-1">Equivalent to planting 7,800 trees</span>
            </div>

            <div className="space-y-2 text-xs text-[#555555]">
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] flex justify-between">
                <span className="text-[#777777]">Baseline Voyage CO₂:</span>
                <span className="font-mono font-bold text-[#191919]">1,520 tonnes</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] flex justify-between">
                <span className="text-[#777777]">Optimized Voyage CO₂:</span>
                <span className="font-mono font-bold text-[#174D3F]">1,345 tonnes</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] flex justify-between">
                <span className="text-[#777777]">Net CO₂ Abatement:</span>
                <span className="font-mono font-bold text-[#174D3F]">11.6% Reduction</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
