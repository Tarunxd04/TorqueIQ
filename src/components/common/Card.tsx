import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`bg-navy-850/90 border border-navy-700/60 rounded-xl p-5 shadow-xl shadow-navy-950/40 backdrop-blur-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4 border-b border-navy-700/40 pb-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
