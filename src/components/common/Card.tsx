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
      className={`relative bg-white border border-[#E5E3DA] rounded-2xl p-6 shadow-card transition-all duration-200 ${className}`}
    >
      {/* Subtle cursor spotlight effect */}
      {spotlight && mousePos && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(241, 95, 86, 0.04), transparent 80%)`
          }}
        />
      )}

      {(title || action) && (
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#E5E3DA] pb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-[#191919] tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-[#777777] mt-1">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
