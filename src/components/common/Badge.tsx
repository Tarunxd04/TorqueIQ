import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'cyan' | 'yellow' | 'red' | 'gray' | 'blue'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'cyan', size = 'md', className = '' }) => {
  const variantStyles = {
    green: 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50 shadow-emerald-900/20',
    cyan: 'bg-cyan-950/80 text-cyan-400 border-cyan-700/50 shadow-cyan-900/20',
    yellow: 'bg-amber-950/80 text-amber-400 border-amber-700/50 shadow-amber-900/20',
    red: 'bg-rose-950/80 text-rose-400 border-rose-700/50 shadow-rose-900/20',
    gray: 'bg-slate-800 text-slate-300 border-slate-700',
    blue: 'bg-blue-950/80 text-blue-400 border-blue-700/50 shadow-blue-900/20',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-2.5 py-1 text-xs font-semibold',
  }

  return (
    <span className={`inline-flex items-center rounded-md border ${variantStyles[variant]} ${sizeStyles[size]} tracking-wide ${className}`}>
      {children}
    </span>
  )
}
