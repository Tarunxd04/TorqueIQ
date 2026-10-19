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
    green: 'bg-[#EDF5F2] text-[#174D3F] border-[#D2E4DC]',
    cyan: 'bg-[#EBF7FB] text-[#0F6575] border-[#BDE3ED]',
    yellow: 'bg-[#FEF7EC] text-[#9A6210] border-[#FBE5C3]',
    red: 'bg-[#FDF1F0] text-[#D84B42] border-[#FCD8D5]',
    gray: 'bg-[#F5F5EF] text-[#555555] border-[#E5E3DA]',
    blue: 'bg-[#EEF4FE] text-[#1D54B4] border-[#D0E1FD]',
    purple: 'bg-[#F5F0FB] text-[#63359E] border-[#E2D2F7]',
  }

  const dotColors = {
    green: 'bg-[#174D3F]',
    cyan: 'bg-[#0F6575]',
    yellow: 'bg-[#C27E1A]',
    red: 'bg-[#F15F56]',
    gray: 'bg-[#777777]',
    blue: 'bg-[#2563EB]',
    purple: 'bg-[#7C3AED]',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-mono',
    md: 'px-2.5 py-0.5 text-xs font-mono',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} tracking-wide uppercase font-semibold ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}
