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
      subtitle="Hydrodynamic drag prediction along primary oceanic corridor"
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
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3.5 transition-all ${
                isFavorable
                  ? 'bg-emerald-500/[0.03] border-emerald-500/20 hover:border-emerald-500/40'
                  : isCaution
                  ? 'bg-amber-500/[0.03] border-amber-500/20 hover:border-amber-500/40'
                  : 'glass-panel hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{day.day}</span>
                  <p className="text-[10px] font-mono text-slate-400">{day.dateLabel}</p>
                </div>
                <Badge variant={isFavorable ? 'green' : isCaution ? 'yellow' : 'cyan'} size="sm" dot>
                  {day.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{day.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-brand-bright shrink-0" />
                  <span className="truncate">{day.waves}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{day.current}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Fuel Impact:</span>
                <span className={`font-mono font-bold ${day.impactPct < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
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
