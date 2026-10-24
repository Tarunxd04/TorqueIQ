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
  iconColor = 'text-[#174D3F]',
  description
}) => {
  const trendStyles = {
    positive: 'text-[#174D3F] bg-[#EDF5F2] border-[#D2E4DC]',
    negative: 'text-[#F15F56] bg-[#FDF1F0] border-[#FCD8D5]',
    neutral: 'text-[#777777] bg-[#F5F5EF] border-[#E5E3DA]',
  }

  return (
    <div className="bg-white border border-[#E5E3DA] p-5 rounded-2xl flex flex-col justify-between group hover:border-[#174D3F]/30 hover:shadow-card transition-all duration-200 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#777777] break-words">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-[#F5F5EF] border border-[#E5E3DA] text-[#174D3F] group-hover:bg-[#EDF5F2] group-hover:border-[#D2E4DC] transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191919] tracking-tight font-sans">
            {value}
          </span>
          {unit && (
            <span className="text-xs sm:text-sm font-mono font-medium text-[#777777]">
              {unit}
            </span>
          )}
        </div>

        {(trend || description) && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {trend && (
              <span className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border ${trendStyles[trendType]}`}>
                {trend}
              </span>
            )}
            {description && (
              <span className="text-xs sm:text-sm text-[#777777] font-sans">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
