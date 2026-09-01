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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-navy-700/60 pb-3 gap-3">
        <div>
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Decision Support Matrix — 4 Optimization Strategies
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">SELECT YOUR PREFERRED VOYAGE OPTION</h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare 4 distinct vessel, fuel type, route corridor, speed, and weather availability packages below. Choose the option that fits your operational priority.
          </p>
        </div>
      </div>

      {/* 4 Candidate Voyage Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-navy-850 via-navy-900 to-navy-850 border-cyan-400 shadow-2xl shadow-cyan-950/60 ring-2 ring-cyan-500/50 scale-[1.02]'
                  : 'bg-navy-900/90 border-navy-700/80 hover:border-navy-600 hover:bg-navy-850/80'
              }`}
            >
              {/* Glow background accent when selected */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
              )}

              <div>
                {/* Header Badge & Selection Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={opt.badgeVariant} size="sm">
                    {opt.badgeText}
                  </Badge>
                  <div className={`p-1 rounded-full ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {isSelected ? <CheckCircle2 className="w-5 h-5 fill-cyan-950" /> : <Circle className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-white mb-1 group-hover:text-cyan-400 transition">{opt.title}</h3>
                <p className="text-[11px] text-slate-400 leading-snug mb-4">{opt.description}</p>

                {/* Key Metrics Specifications */}
                <div className="space-y-2.5 text-xs pt-3 border-t border-navy-700/60">
                  {/* Vessel */}
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Ship className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Ship:
                    </span>
                    <span className="font-bold text-white text-right">{opt.ship.name}</span>
                  </div>

                  {/* Fuel & Fuel Type */}
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Fuel Burn:
                    </span>
                    <div className="text-right">
                      <span className="font-mono font-bold text-white block">{opt.expectedFuelTonnes} t</span>
                      <span className="text-[10px] text-slate-400 font-mono block">{opt.fuelType}</span>
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Speed:
                    </span>
                    <span className="font-mono font-bold text-cyan-400">{opt.speedKnots} kts</span>
                  </div>

                  {/* ETA & Duration */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Voyage ETA:
                    </span>
                    <span className="font-mono font-bold text-white">{opt.etaFormatted}</span>
                  </div>

                  {/* Estimated Cost */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Est. Cost:
                    </span>
                    <span className="font-mono font-bold text-amber-400">${(opt.estimatedCostUSD / 1000).toFixed(0)}K</span>
                  </div>

                  {/* Expected CO2 */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> CO₂ Emissions:
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{opt.expectedCo2Tonnes} t</span>
                  </div>

                  {/* Weather Availability */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Weather Risk:
                    </span>
                    <Badge variant={opt.weatherRisk === 'Low' ? 'green' : opt.weatherRisk === 'Medium' ? 'yellow' : 'red'} size="sm">
                      {opt.weatherRisk} Risk
                    </Badge>
                  </div>
                </div>

                {/* Strategy Highlights */}
                <div className="mt-4 pt-3 border-t border-navy-800 space-y-1 text-[11px]">
                  {opt.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Button */}
              <div className="mt-5 pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectOption(opt.id)
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-cyan-500 text-navy-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400'
                      : 'bg-navy-800 text-slate-300 border border-navy-700 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 fill-navy-950 text-cyan-400" />
                      <span>SELECTED VOYAGE</span>
                    </>
                  ) : (
                    <span>CHOOSE THIS VOYAGE</span>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
