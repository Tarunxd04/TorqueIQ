import React, { useEffect, useState } from 'react'
import { Compass, Ship, Wind, Zap, CheckCircle2 } from 'lucide-react'

interface AnalysisLoadingProps {
  onComplete: () => void
  origin?: string
  destination?: string
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  onComplete,
  origin = 'Mumbai',
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
    <div className="p-12 rounded-2xl bg-navy-850 border border-cyan-500/40 shadow-2xl text-center space-y-6 animate-fade-in max-w-2xl mx-auto my-8">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        <div className="w-full h-full rounded-full flex items-center justify-center text-cyan-400">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">GreenRoute AI Optimization Engine</h3>
        <p className="text-xs text-slate-400 mt-1">Analyzing {origin} → {destination} voyage variables...</p>
      </div>

      <div className="space-y-3 max-w-md mx-auto text-left">
        {steps.map((s, idx) => {
          const Icon = s.icon
          const isDone = idx < step
          const isCurrent = idx === step

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : isCurrent
                  ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold shadow-lg shadow-cyan-950/40'
                  : 'bg-navy-900/40 border-navy-800 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'animate-bounce text-cyan-400' : ''}`} />
              )}
              <span className="text-xs">{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
