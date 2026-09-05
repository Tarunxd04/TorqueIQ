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
  iconColor = 'text-brand-bright',
  description
}) => {
  const trendStyles = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-400 bg-white/[0.04] border-white/[0.08]',
  }

  return (
    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group hover:border-brand-accent/40 transition-all duration-300">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] ${iconColor} group-hover:bg-white/[0.08] transition-colors`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-mono font-medium text-slate-400">
              {unit}
            </span>
          )}
        </div>

        {(trend || description) && (
          <div className="mt-3 flex items-center gap-2">
            {trend && (
              <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${trendStyles[trendType]}`}>
                {trend}
              </span>
            )}
            {description && (
              <span className="text-xs text-slate-400 truncate font-sans">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
