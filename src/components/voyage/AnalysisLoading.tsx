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
    <div className="p-10 rounded-2xl bg-white border border-[#E5E3DA] shadow-card text-center space-y-6 animate-fade-in max-w-xl mx-auto my-8">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-[#E5E3DA] border-t-[#F15F56] animate-spin" />
        <div className="w-full h-full rounded-full flex items-center justify-center text-[#174D3F]">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#191919] tracking-tight">Torque IQ Optimization Engine</h3>
        <p className="text-xs text-[#777777] mt-1">Analyzing {origin} → {destination} voyage variables...</p>
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
                  ? 'bg-[#EDF5F2] border-[#D2E4DC] text-[#174D3F]'
                  : isCurrent
                  ? 'bg-[#FDF1F0] border-[#FCD8D5] text-[#191919] font-medium shadow-subtle'
                  : 'bg-white border-[#E5E3DA] text-[#777777]'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-[#174D3F] shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-[#F15F56]' : ''}`} />
              )}
              <span className="text-xs">{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
