import React from 'react'
import { WeatherForecastDay } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { CloudSun, Wind, Waves, Compass, AlertCircle } from 'lucide-react'

interface WeatherForecastTimelineProps {
  timeline: WeatherForecastDay[]
}

export const WeatherForecastTimeline: React.FC<WeatherForecastTimelineProps> = ({ timeline }) => {
  return (
    <Card
      title="Ocean Corridor Weather Forecast Timeline"
      subtitle="Hydrodynamic drag prediction and wave vector analysis along primary oceanic corridor"
      action={
        <Badge variant="yellow" size="sm" dot>
          Simulated Forecast
        </Badge>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {timeline.map((day, idx) => {
          const isFavorable = day.status === 'Favorable'
          const isCaution = day.status === 'Caution'

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3.5 transition-all bg-white ${
                isFavorable
                  ? 'border-[#D2E4DC] hover:border-[#174D3F]/50 shadow-subtle'
                  : isCaution
                  ? 'border-[#FBE5C3] hover:border-[#F59E0B]/50'
                  : 'border-[#E5E3DA] hover:border-[#D6D3C7]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#191919]">{day.day}</span>
                  <p className="text-[10px] font-mono text-[#777777]">{day.dateLabel}</p>
                </div>
                <Badge variant={isFavorable ? 'green' : isCaution ? 'yellow' : 'cyan'} size="sm" dot>
                  {day.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-[#555555]">
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                  <span className="truncate">{day.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span className="truncate">{day.waves}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                  <span className="truncate">{day.current}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E5E3DA] flex items-center justify-between text-xs">
                <span className="text-[#777777] text-[11px]">Fuel Impact:</span>
                <span className={`font-mono font-bold ${day.impactPct < 0 ? 'text-[#174D3F]' : 'text-[#D97706]'}`}>
                  {day.impactPct < 0 ? `${day.impactPct}% (push)` : `+${day.impactPct}% (drag)`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
