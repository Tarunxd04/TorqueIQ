import React, { useEffect, useState } from 'react'
import { Compass, Ship, Wind, Zap, CheckCircle2 } from 'lucide-react'

interface AnalysisLoadingProps {
  onComplete: () => void
  origin?: string
  destination?: string
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  onComplete,
  origin = 'Chennai',
  destination = 'Singapore'
}) => {
  const [step, setStep] = useState(0)

  const steps = [
    { label: 'Scanning 20 fleet vessel hydrodynamics...', icon: Ship },
    { label: 'Evaluating oceanic current vectors & swell fronts...', icon: Wind },
    { label: 'Computing speed-power cubic resistance curves...', icon: Zap },
    { label: 'Synthesizing BEST SHIP + BEST ROUTE + BEST SPEED...', icon: Compass },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer)
          setTimeout(onComplete, 400)
          return prev
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="p-10 rounded-2xl glass-panel-elevated border border-brand-accent/40 shadow-2xl text-center space-y-6 animate-fade-in max-w-xl mx-auto my-8">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-brand-accent/20 border-t-brand-bright animate-spin" />
        <div className="w-full h-full rounded-full flex items-center justify-center text-brand-bright">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white tracking-tight">Torque IQ Optimization Engine</h3>
        <p className="text-xs text-slate-400 mt-1">Analyzing {origin} → {destination} voyage variables...</p>
      </div>

      <div className="space-y-2.5 max-w-md mx-auto text-left">
        {steps.map((s, idx) => {
          const Icon = s.icon
          const isDone = idx < step
          const isCurrent = idx === step

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                isDone
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 text-emerald-300'
                  : isCurrent
                  ? 'bg-brand-accent/[0.08] border-brand-accent/40 text-white font-medium shadow-lg shadow-brand-accent/10'
                  : 'bg-white/[0.01] border-white/[0.04] text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-brand-bright' : ''}`} />
              )}
              <span className="text-xs">{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
