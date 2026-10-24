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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E3DA] pb-3 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#174D3F]" />
            Multi-Criteria Decision Matrix — 4 Optimization Strategies
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight mt-1">Select Preferred Voyage Strategy</h2>
          <p className="text-xs text-[#777777] mt-1">
            Compare 4 synthesized vessel, corridor, speed profile, and weather routing strategy packages below.
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
              className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all duration-200 relative bg-white min-w-0 ${
                isSelected
                  ? 'border-[#F15F56] ring-1 ring-[#F15F56] shadow-card'
                  : 'border-[#E5E3DA] hover:border-[#D6D3C7] hover:shadow-subtle'
              }`}
            >
              <div>
                {/* Header Badge & Selection Indicator */}
                <div className="flex items-center justify-between mb-3.5">
                  <Badge variant={opt.badgeVariant} size="sm">
                    {opt.badgeText}
                  </Badge>

                  {isSelected ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-[#F15F56]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACTIVE</span>
                    </div>
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#B8B6AD] group-hover:text-[#777777] transition-colors" />
                  )}
                </div>

                {/* Option Title */}
                <h3 className="text-sm font-semibold text-[#191919] tracking-tight mb-1">
                  {opt.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed mb-4">
                  {opt.description}
                </p>

                {/* Strategy Details */}
                <div className="space-y-2.5 pt-3 border-t border-[#E5E3DA] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#777777] flex items-center gap-1.5 text-xs">
                      <Ship className="w-3.5 h-3.5 text-[#777777]" />
                      Ship:
                    </span>
                    <span className="font-medium text-[#191919] truncate max-w-[130px]">{opt.ship.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#777777] flex items-center gap-1.5 text-xs">
                      <Navigation className="w-3.5 h-3.5 text-[#777777]" />
                      Route:
                    </span>
                    <span className="font-medium text-[#191919] truncate max-w-[130px]">{opt.route.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#777777] flex items-center gap-1.5 text-xs">
                      <Flame className="w-3.5 h-3.5 text-[#F15F56]" />
                      Fuel Type:
                    </span>
                    <span className="font-mono text-[11px] font-medium text-[#191919]">{opt.fuelType}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#777777] flex items-center gap-1.5 text-xs">
                      <Zap className="w-3.5 h-3.5 text-[#174D3F]" />
                      Speed:
                    </span>
                    <span className="font-mono font-bold text-[#174D3F]">{opt.speedKnots} kts</span>
                  </div>
                </div>
              </div>

              {/* Metrics Output Grid */}
              <div className="mt-5 pt-3.5 border-t border-[#E5E3DA] space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DA] text-left">
                    <span className="text-[9px] font-mono uppercase text-[#777777] block text-left">ETA</span>
                    <span className="font-mono font-semibold text-[#191919] text-[11px] block text-left">{opt.etaFormatted}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DA] text-right">
                    <span className="text-[9px] font-mono uppercase text-[#777777] block text-right">Total Fuel</span>
                    <span className="font-mono font-semibold text-[#174D3F] text-[11px] block text-right">{opt.expectedFuelTonnes} t</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DA] text-left">
                    <span className="text-[9px] font-mono uppercase text-[#777777] block text-left">CO₂ Emissions</span>
                    <span className="font-mono font-semibold text-[#174D3F] text-[11px] block text-left">{opt.expectedCo2Tonnes} t</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DA] text-right">
                    <span className="text-[9px] font-mono uppercase text-[#777777] block text-right">Voyage Cost</span>
                    <span className="font-mono font-semibold text-[#191919] text-[11px] block text-right">${opt.estimatedCostUSD.toLocaleString()}</span>
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
                      ? 'btn-coral'
                      : 'btn-outline-warm'
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
