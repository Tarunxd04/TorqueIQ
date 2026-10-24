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
      <div className="bg-white border border-[#E5E3DA] p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Sliders className="w-4 h-4 text-[#174D3F]" />
            <span>Interactive Scenario Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">What-If Hydrodynamic Voyage Simulator</h1>
          <p className="text-sm text-[#666666] mt-1">
            Adjust speed, cargo payload, bunker pricing, oceanic corridors, and swell severity to model real-time trade-offs.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="btn-outline-warm px-4 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#174D3F]" />
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
                <span className="text-[#191919] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#174D3F]" /> Speed (knots)
                </span>
                <span className="font-mono text-[#174D3F] text-sm font-bold">{params.speedKnots} kts</span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="0.1"
                value={params.speedKnots}
                onChange={(e) => setParams(p => ({ ...p, speedKnots: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-[#E5E3DA] rounded-lg appearance-none cursor-pointer accent-[#174D3F]"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono mt-1.5">
                <span>10 kts (Eco)</span>
                <span className="text-[#174D3F] font-bold">13.8 kts (Opt)</span>
                <span>20 kts (Fast)</span>
              </div>
            </div>

            {/* Cargo Load Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#191919]">Cargo Payload (DWT tonnes)</span>
                <span className="font-mono text-[#191919] text-sm font-bold">{params.cargoTonnes.toLocaleString()} t</span>
              </div>
              <input
                type="range"
                min="10000"
                max="80000"
                step="2500"
                value={params.cargoTonnes}
                onChange={(e) => setParams(p => ({ ...p, cargoTonnes: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-[#E5E3DA] rounded-lg appearance-none cursor-pointer accent-[#F15F56]"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono mt-1.5">
                <span>10,000 t</span>
                <span>80,000 t</span>
              </div>
            </div>

            {/* Fuel Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#191919]">Bunker Fuel Index ($/tonne)</span>
                <span className="font-mono text-[#D97706] text-sm font-bold">${params.fuelPricePerTonne}/t</span>
              </div>
              <input
                type="range"
                min="500"
                max="1200"
                step="25"
                value={params.fuelPricePerTonne}
                onChange={(e) => setParams(p => ({ ...p, fuelPricePerTonne: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-[#E5E3DA] rounded-lg appearance-none cursor-pointer accent-[#D97706]"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono mt-1.5">
                <span>$500/t</span>
                <span>$1,200/t</span>
              </div>
            </div>

            {/* Route Option Radio */}
            <div>
              <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Route Corridor</label>
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
                        ? 'bg-[#EDF5F2] border-[#174D3F] text-[#174D3F] font-bold shadow-subtle'
                        : 'bg-[#FFFFFF] border-[#E5E3DA] text-[#777777] hover:text-[#191919] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Severity */}
            <div>
              <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Weather Severity</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                {['Low', 'Medium', 'High'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setParams(p => ({ ...p, weatherSeverity: sev as any }))}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      params.weatherSeverity === sev
                        ? sev === 'Low'
                          ? 'bg-[#EDF5F2] border-[#D2E4DC] text-[#174D3F] font-bold'
                          : sev === 'Medium'
                          ? 'bg-[#FEF7EC] border-[#FBE5C3] text-[#9A6210] font-bold'
                          : 'bg-[#FDF1F0] border-[#FCD8D5] text-[#D84B42] font-bold'
                        : 'bg-[#FFFFFF] border-[#E5E3DA] text-[#777777] hover:text-[#191919] hover:bg-[#FAF9F5]'
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
          <div className="p-6 rounded-2xl bg-white border border-[#E5E3DA] flex items-center justify-between shadow-subtle">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase tracking-wider">Dynamic Scenario Efficiency Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-[#191919] font-mono">{sim.efficiencyScore}</span>
                <span className="text-xs font-mono text-[#777777]">/ 100</span>
              </div>
              <p className="text-xs text-[#777777] mt-1">
                {sim.efficiencyScore >= 90 ? 'Optimal configuration — High fuel efficiency & regulatory compliance.' : sim.efficiencyScore >= 75 ? 'Moderate efficiency — Slight speed or route penalty.' : 'Sub-optimal — High fuel burn or severe weather drag.'}
              </p>
            </div>

            <Badge variant={sim.efficiencyScore >= 90 ? 'green' : sim.efficiencyScore >= 75 ? 'yellow' : 'red'} size="md" dot>
              {sim.efficiencyScore >= 90 ? 'EXCELLENT' : sim.efficiencyScore >= 75 ? 'FAIR' : 'POOR'}
            </Badge>
          </div>

          {/* Dynamic Calculated KPI Output Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-[#E5E3DA] space-y-1 shadow-subtle">
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#F15F56]" /> Fuel Burn
              </span>
              <p className="text-2xl font-bold text-[#191919] font-mono">{sim.fuelTonnes}</p>
              <span className="text-[10px] font-mono text-[#777777]">tonnes HFO</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E3DA] space-y-1 shadow-subtle">
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#174D3F]" /> CO₂ Cut
              </span>
              <p className="text-2xl font-bold text-[#174D3F] font-mono">{sim.co2Tonnes}</p>
              <span className="text-[10px] font-mono text-[#777777]">tonnes CO₂e</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E3DA] space-y-1 shadow-subtle">
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#D97706]" /> Fuel Cost
              </span>
              <p className="text-2xl font-bold text-[#191919] font-mono">${(sim.fuelCostUSD / 1000).toFixed(0)}K</p>
              <span className="text-[10px] font-mono text-[#777777]">USD total</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E3DA] space-y-1 shadow-subtle">
              <span className="text-[10px] font-mono font-bold text-[#777777] uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#174D3F]" /> Voyage ETA
              </span>
              <p className="text-2xl font-bold text-[#191919] font-mono">{sim.etaFormatted}</p>
              <span className="text-[10px] font-mono text-[#777777]">{sim.etaHours} total hours</span>
            </div>
          </div>

          {/* Dynamic Tradeoff Insight Box */}
          <Card title="Live Scenario Insights">
            <div className="space-y-3 text-xs text-[#555555]">
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#174D3F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#191919]">Speed Sensitivity:</span>
                  <p className="mt-0.5 text-[#777777]">
                    At {params.speedKnots} knots, the vessel burns {sim.fuelTonnes} tonnes of fuel. {params.speedKnots > 16 ? 'WARNING: High speed incurs steep cubic fuel penalty!' : params.speedKnots < 12 ? 'Notice: Slow steaming reduces fuel burn but extends ETA to ' + sim.etaFormatted : 'Speed is well balanced near the 13.8 kt hydrodynamic optimum.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] flex items-start gap-2.5">
                <Leaf className="w-4 h-4 text-[#174D3F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#191919]">Carbon Footprint:</span>
                  <p className="mt-0.5 text-[#777777]">
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
