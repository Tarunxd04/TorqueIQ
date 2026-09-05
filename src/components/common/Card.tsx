import React, { useRef, useState } from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
  spotlight?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  spotlight = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseLeave = () => {
    setMousePos(null)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-panel rounded-2xl p-6 overflow-hidden ${className}`}
    >
      {/* Subtle cursor spotlight effect */}
      {spotlight && mousePos && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94, 106, 210, 0.12), transparent 80%)`
          }}
        />
      )}

      {(title || action) && (
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/[0.06] pb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
