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
      title="Expected Voyage Weather Forecast Timeline"
      subtitle="Dynamic ocean corridor forecast along Route B (South Indian Ocean)"
      action={
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-[10px] font-bold text-amber-400">
          <AlertCircle className="w-3 h-3" />
          <span>Simulated Forecast Data</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {timeline.map((day, idx) => {
          const isFavorable = day.status === 'Favorable'
          const isCaution = day.status === 'Caution'

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition ${
                isFavorable
                  ? 'bg-emerald-950/30 border-emerald-800/60 hover:border-emerald-500/60'
                  : isCaution
                  ? 'bg-amber-950/30 border-amber-800/60 hover:border-amber-500/60'
                  : 'bg-navy-900 border-navy-700/80 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-white">{day.day}</span>
                  <p className="text-[10px] text-slate-400">{day.dateLabel}</p>
                </div>
                <Badge variant={isFavorable ? 'green' : isCaution ? 'yellow' : 'cyan'}>
                  {day.status}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{day.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{day.waves}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{day.current}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Fuel Drag:</span>
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
