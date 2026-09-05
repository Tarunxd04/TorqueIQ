import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'cyan' | 'yellow' | 'red' | 'gray' | 'blue' | 'purple'
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
  dot = false
}) => {
  const variantStyles = {
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    yellow: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
    gray: 'bg-white/[0.04] text-slate-300 border-white/[0.08]',
    blue: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
  }

  const dotColors = {
    green: 'bg-emerald-400',
    cyan: 'bg-cyan-400',
    yellow: 'bg-amber-400',
    red: 'bg-rose-400',
    gray: 'bg-slate-400',
    blue: 'bg-indigo-400',
    purple: 'bg-purple-400',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-mono',
    md: 'px-2.5 py-0.5 text-xs font-mono',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} tracking-wider uppercase font-medium ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  )
}
