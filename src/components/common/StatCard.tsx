import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: string
  trendType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  description?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendType = 'positive',
  icon: Icon,
  iconColor = 'text-cyan-400',
  description
}) => {
  const trendStyles = {
    positive: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
    negative: 'text-rose-400 bg-rose-950/60 border-rose-800/40',
    neutral: 'text-slate-400 bg-slate-800/60 border-slate-700/40',
  }

  return (
    <div className="bg-navy-850/90 border border-navy-700/60 rounded-xl p-5 shadow-lg shadow-navy-950/40 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-lg bg-navy-800/80 border border-navy-700 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{value}</span>
          {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
        </div>

        {(trend || description) && (
          <div className="mt-3 flex items-center gap-2">
            {trend && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${trendStyles[trendType]}`}>
                {trend}
              </span>
            )}
            {description && (
              <span className="text-xs text-slate-400 truncate">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
