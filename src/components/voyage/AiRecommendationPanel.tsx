import React from 'react'
import { OptimizationResult } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { CheckCircle2, ShieldCheck, Fuel, Leaf, DollarSign, Clock, HelpCircle } from 'lucide-react'

interface AiRecommendationPanelProps {
  result: OptimizationResult
}

export const AiRecommendationPanel: React.FC<AiRecommendationPanelProps> = ({ result }) => {
  const breakdown = result.scoreBreakdown

  return (
    <Card
      title="GreenRoute AI Decision Rationale & Score"
      subtitle="Transparent explainable score decomposition powering the AI recommendation"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Rationale & Bullet Points */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-brand-accent/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-bright">Primary Recommendation Synthesis</h4>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                <span className="font-semibold text-white">{result.bestShip.name}</span> via <span className="font-semibold text-emerald-400">{result.bestRoute.name}</span> at <span className="font-semibold text-cyan-400">{result.recommendedSpeedKnots} knots</span> is the optimal hydrodynamic package.
              </p>
            </div>
          </div>

          {/* Key Savings Callout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Fuel Saved</span>
              <span className="text-base font-bold text-emerald-400 font-mono">{result.savings.fuelPct}%</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">CO₂ Cut</span>
              <span className="text-base font-bold text-emerald-400 font-mono">{result.savings.co2Pct}%</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Cost Savings</span>
              <span className="text-base font-bold text-amber-400 font-mono">${result.savings.costUSD.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">ETA Margin</span>
              <span className="text-base font-bold text-cyan-400 font-mono">{result.savings.etaDiffFormatted}</span>
            </div>
          </div>

          {/* Why this recommendation? */}
          <div className="pt-2">
            <h5 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-bright" />
              <span>Algorithmic Decision Factors</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {result.explanationPoints.map((bullet: string, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Multi-Criteria Score Gauge & Bars */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Composite AI Score</span>
              <Badge variant="green" size="sm" dot>Optimal</Badge>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-white tracking-tight font-mono">{result.optimizationScore}</span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5 text-amber-400" />
                    Fuel Efficiency (35% wgt)
                  </span>
                  <span className="font-mono font-bold text-white">{breakdown.fuelEfficiencyScore}/100</span>
                </div>
                <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${breakdown.fuelEfficiencyScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    Carbon Intensity (25% wgt)
                  </span>
                  <span className="font-mono font-bold text-white">{breakdown.co2Score}/100</span>
                </div>
                <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${breakdown.co2Score}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    ETA Reliability (20% wgt)
                  </span>
                  <span className="font-mono font-bold text-white">{breakdown.etaScore}/100</span>
                </div>
                <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${breakdown.etaScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-brand-bright" />
                    Total Operating Cost (20% wgt)
                  </span>
                  <span className="font-mono font-bold text-white">{breakdown.costScore}/100</span>
                </div>
                <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-brand-bright h-1.5 rounded-full transition-all duration-500" style={{ width: `${breakdown.costScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-mono mt-6 pt-3 border-t border-white/[0.05]">
            *Weights calibrated to IMO CII 2026 decarbonization reduction factors.
          </p>
        </div>
      </div>
    </Card>
  )
}
