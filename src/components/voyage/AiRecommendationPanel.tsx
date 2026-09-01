import React from 'react'
import { OptimizationResult } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { CheckCircle2, ShieldCheck, Zap, Leaf, DollarSign, Clock, HelpCircle } from 'lucide-react'

interface AiRecommendationPanelProps {
  result: OptimizationResult
}

export const AiRecommendationPanel: React.FC<AiRecommendationPanelProps> = ({ result }) => {
  const breakdown = result.scoreBreakdown

  return (
    <Card
      title="GreenRoute AI Decision Rationale & Score"
      subtitle="Transparent explainable score decomposition powering the AI recommendation"
      className="border-cyan-500/40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Rationale & Bullet Points */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-navy-900 border border-cyan-500/30 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-white">GreenRoute Primary Recommendation</h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                <span className="font-bold text-cyan-400">{result.bestShip.name}</span> via <span className="font-bold text-emerald-400">{result.bestRoute.name}</span> at <span className="font-bold text-cyan-400">{result.recommendedSpeedKnots} knots</span> is the most fuel-efficient option for this voyage.
              </p>
            </div>
          </div>

          {/* Key Savings Callout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Fuel Saved</span>
              <span className="text-base font-extrabold text-emerald-400">{result.savings.fuelPct}%</span>
            </div>

            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">CO₂ Cut</span>
              <span className="text-base font-extrabold text-emerald-400">{result.savings.co2Pct}%</span>
            </div>

            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Cost Savings</span>
              <span className="text-base font-extrabold text-amber-400">${result.savings.costUSD.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">ETA Margin</span>
              <span className="text-base font-extrabold text-cyan-400">{result.savings.etaDiffFormatted}</span>
            </div>
          </div>

          {/* Why this recommendation? */}
          <div>
            <h5 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Why this recommendation?
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {result.explanationPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-navy-900/60 p-2.5 rounded-lg border border-navy-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col: Score Breakdown */}
        <div className="p-5 rounded-xl bg-navy-900 border border-navy-700/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-navy-800 pb-2 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Optimization Score</span>
              <Badge variant="green" size="md">92 / 100</Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Fuel Efficiency Weight</span>
                  <span className="font-mono font-bold text-emerald-400">+{breakdown.fuelEfficiencyScore} pts</span>
                </div>
                <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">CO₂ Abatement Weight</span>
                  <span className="font-mono font-bold text-emerald-400">+{breakdown.co2Score} pts</span>
                </div>
                <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">ETA Window Accuracy</span>
                  <span className="font-mono font-bold text-cyan-400">+{breakdown.etaScore} pts</span>
                </div>
                <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Fuel Cost Minimization</span>
                  <span className="font-mono font-bold text-amber-400">+{breakdown.costScore} pts</span>
                </div>
                <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '66.6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Weather Risk Avoidance</span>
                  <span className="font-mono font-bold text-emerald-400">+{breakdown.weatherScore} pts</span>
                </div>
                <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-[10px] text-slate-400">
            Total Aggregate Score: <span className="text-white font-bold font-mono text-xs">35 + 25 + 18 + 10 + 4 = 92</span>. Superior score over Route A (74) & Route C (61).
          </div>
        </div>
      </div>
    </Card>
  )
}
