import React from 'react'
import { OptimizationResult, CandidateVoyageOption } from '../../types/maritime'
import { Ship, Navigation, Zap, Flame, Leaf, DollarSign, Clock, CloudSun, ShieldCheck, CheckCircle2, Circle } from 'lucide-react'
import { Badge } from '../common/Badge'

interface RecommendationCardProps {
  result: OptimizationResult
  selectedOptionId: string
  onSelectOption: (optionId: string) => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  result,
  selectedOptionId,
  onSelectOption
}) => {
  const options = result.fourCandidateOptions || []

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-3 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Decision Support Matrix — 4 Optimization Strategies
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">Select Preferred Voyage Strategy</h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare 4 distinct vessel, fuel type, route corridor, speed, and weather availability packages below.
          </p>
        </div>
      </div>

      {/* 4 Candidate Voyage Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-white/[0.09] via-white/[0.04] to-white/[0.02] border-brand-bright shadow-[0_0_30px_rgba(94,106,210,0.25)] ring-1 ring-brand-bright'
                  : 'glass-panel hover:border-white/[0.12] hover:bg-white/[0.05]'
              }`}
            >
              <div>
                {/* Header Badge & Selection Indicator */}
                <div className="flex items-center justify-between mb-3.5">
                  <Badge variant={opt.badgeVariant} size="sm">
                    {opt.badgeText}
                  </Badge>

                  {isSelected ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-brand-bright">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SELECTED</span>
                    </div>
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                  )}
                </div>

                {/* Option Title */}
                <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                  {opt.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {opt.description}
                </p>

                {/* Strategy Details */}
                <div className="space-y-2.5 pt-3 border-t border-white/[0.06] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                      <Ship className="w-3.5 h-3.5 text-slate-400" />
                      Ship:
                    </span>
                    <span className="font-medium text-white truncate max-w-[130px]">{opt.ship.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                      <Navigation className="w-3.5 h-3.5 text-slate-400" />
                      Route:
                    </span>
                    <span className="font-medium text-white truncate max-w-[130px]">{opt.route.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Fuel Type:
                    </span>
                    <span className="font-mono text-[11px] text-amber-300">{opt.fuelType}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Speed:
                    </span>
                    <span className="font-mono font-semibold text-white">{opt.speedKnots} kts</span>
                  </div>
                </div>
              </div>

              {/* Metrics Output Grid */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">ETA</span>
                    <span className="font-mono font-semibold text-white">{opt.etaFormatted}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">Total Fuel</span>
                    <span className="font-mono font-semibold text-cyan-300">{opt.expectedFuelTonnes} t</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">CO₂ Emissions</span>
                    <span className="font-mono font-semibold text-emerald-400">{opt.expectedCo2Tonnes} t</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">Voyage Cost</span>
                    <span className="font-mono font-semibold text-slate-200">${opt.estimatedCostUSD.toLocaleString()}</span>
                  </div>
                </div>

                {/* Selection Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectOption(opt.id)
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {isSelected ? 'Active Strategy' : 'Select Option'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
