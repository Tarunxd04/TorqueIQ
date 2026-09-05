import React, { useState } from 'react'
import { WhatIfParams } from '../../types/maritime'
import { runWhatIfSimulation } from '../../utils/calculations'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { Sliders, Zap, Flame, Leaf, DollarSign, Clock, ShieldCheck, RefreshCw } from 'lucide-react'

export const WhatIfSimulator: React.FC = () => {
  const [params, setParams] = useState<WhatIfParams>({
    speedKnots: 13.8,
    cargoTonnes: 65000,
    fuelPricePerTonne: 700,
    routeId: 'route-b',
    weatherSeverity: 'Low'
  })

  // Calculate live simulation metrics based on React state
  const sim = runWhatIfSimulation(params)

  const handleReset = () => {
    setParams({
      speedKnots: 13.8,
      cargoTonnes: 65000,
      fuelPricePerTonne: 700,
      routeId: 'route-b',
      weatherSeverity: 'Low'
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest mb-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Scenario Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">What-If Hydrodynamic Voyage Simulator</h2>
          <p className="text-xs text-slate-400 mt-1">
            Adjust speed, cargo payload, bunker pricing, oceanic corridors, and swell severity to model real-time trade-offs.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="btn-secondary px-4 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brand-bright" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Input Panel */}
        <Card title="Simulation Controls" subtitle="Drag sliders to modify parameters" className="lg:col-span-1">
          <div className="space-y-6">
            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Speed (knots)
                </span>
                <span className="font-mono text-cyan-400 text-sm font-bold">{params.speedKnots} kts</span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="0.1"
                value={params.speedKnots}
                onChange={(e) => setParams(p => ({ ...p, speedKnots: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-[#5E6AD2]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>10 kts (Eco Slow)</span>
                <span className="text-emerald-400 font-bold">13.8 kts (Opt)</span>
                <span>20 kts (Fast)</span>
              </div>
            </div>

            {/* Cargo Load Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Cargo Payload (DWT tonnes)</span>
                <span className="font-mono text-white text-sm font-bold">{params.cargoTonnes.toLocaleString()} t</span>
              </div>
              <input
                type="range"
                min="10000"
                max="80000"
                step="2500"
                value={params.cargoTonnes}
                onChange={(e) => setParams(p => ({ ...p, cargoTonnes: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>10,000 t</span>
                <span>80,000 t</span>
              </div>
            </div>

            {/* Fuel Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Bunker Fuel Index ($/tonne)</span>
                <span className="font-mono text-amber-400 text-sm font-bold">${params.fuelPricePerTonne}/t</span>
              </div>
              <input
                type="range"
                min="500"
                max="1200"
                step="25"
                value={params.fuelPricePerTonne}
                onChange={(e) => setParams(p => ({ ...p, fuelPricePerTonne: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>$500/t</span>
                <span>$1,200/t</span>
              </div>
            </div>

            {/* Route Option Radio */}
            <div>
              <label className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">Route Corridor</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                {[
                  { id: 'route-a', label: 'Route A' },
                  { id: 'route-b', label: 'Route B (Opt)' },
                  { id: 'route-c', label: 'Route C' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setParams(p => ({ ...p, routeId: r.id }))}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      params.routeId === r.id
                        ? 'bg-brand-accent/20 border-brand-bright text-white font-semibold shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Severity */}
            <div>
              <label className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">Weather Severity</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                {['Low', 'Medium', 'High'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setParams(p => ({ ...p, weatherSeverity: sev as any }))}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      params.weatherSeverity === sev
                        ? sev === 'Low' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold' : sev === 'Medium' ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold' : 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Results Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dynamic Efficiency Score Callout */}
          <div className="p-6 rounded-2xl glass-panel-elevated border border-brand-accent/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Dynamic Scenario Efficiency Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-white font-mono">{sim.efficiencyScore}</span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {sim.efficiencyScore >= 90 ? 'Optimal configuration — High fuel efficiency & compliance.' : sim.efficiencyScore >= 75 ? 'Moderate efficiency — Slight speed or route penalty.' : 'Sub-optimal — High fuel burn or severe weather drag.'}
              </p>
            </div>

            <Badge variant={sim.efficiencyScore >= 90 ? 'green' : sim.efficiencyScore >= 75 ? 'yellow' : 'red'} size="md" dot>
              {sim.efficiencyScore >= 90 ? 'EXCELLENT' : sim.efficiencyScore >= 75 ? 'FAIR' : 'POOR'}
            </Badge>
          </div>

          {/* Dynamic Calculated KPI Output Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-cyan-400" /> Fuel Burn
              </span>
              <p className="text-2xl font-bold text-white font-mono">{sim.fuelTonnes}</p>
              <span className="text-[10px] font-mono text-slate-400">tonnes HFO</span>
            </div>

            <div className="p-4 rounded-xl glass-panel space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> CO₂ Cut
              </span>
              <p className="text-2xl font-bold text-emerald-400 font-mono">{sim.co2Tonnes}</p>
              <span className="text-[10px] font-mono text-slate-400">tonnes CO₂e</span>
            </div>

            <div className="p-4 rounded-xl glass-panel space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Fuel Cost
              </span>
              <p className="text-2xl font-bold text-amber-400 font-mono">${(sim.fuelCostUSD / 1000).toFixed(0)}K</p>
              <span className="text-[10px] font-mono text-slate-400">USD total</span>
            </div>

            <div className="p-4 rounded-xl glass-panel space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-bright" /> Voyage ETA
              </span>
              <p className="text-2xl font-bold text-white font-mono">{sim.etaFormatted}</p>
              <span className="text-[10px] font-mono text-slate-400">{sim.etaHours} total hours</span>
            </div>
          </div>

          {/* Dynamic Tradeoff Insight Box */}
          <Card title="Live Scenario Insights">
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Speed Sensitivity:</span>
                  <p className="mt-0.5 text-slate-400">
                    At {params.speedKnots} knots, the vessel burns {sim.fuelTonnes} tonnes of fuel. {params.speedKnots > 16 ? 'WARNING: High speed incurs steep cubic fuel penalty!' : params.speedKnots < 12 ? 'Notice: Slow steaming reduces fuel but extends ETA to ' + sim.etaFormatted : 'Speed is well balanced near the 13.8 kt hydrodynamic optimum.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Carbon Footprint:</span>
                  <p className="mt-0.5 text-slate-400">
                    Calculated CO₂ of {sim.co2Tonnes} tonnes using standard 3.145 emission factor.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
