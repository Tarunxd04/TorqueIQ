import React from 'react'
import {
  ArrowRight,
  Ship,
  Compass,
  Zap,
  Leaf,
  Flame,
  Clock,
  ShieldCheck,
  TrendingDown,
  Globe,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Footer } from '../layout/Footer'

interface LandingPageProps {
  onNavigateToPlanner: () => void
  onNavigateToFleet: () => void
  onNavigateToView: (view: string) => void
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToPlanner,
  onNavigateToFleet,
  onNavigateToView
}) => {
  const workflowSteps = [
    {
      num: '01',
      title: 'Select Voyage',
      desc: 'Specify origin, destination port, cargo tonnage, and required arrival timeframe.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Analyze Fleet',
      desc: 'Evaluate 20 available vessels based on hydrodynamic efficiency, capacity, and location.',
      icon: Ship
    },
    {
      num: '03',
      title: 'Analyze Routes',
      desc: 'Compare distance, traffic, and oceanic corridors across multiple navigation paths.',
      icon: Globe
    },
    {
      num: '04',
      title: 'Evaluate Weather',
      desc: 'Incorporate real-time wave heights, surface currents, and wind resistance vectors.',
      icon: Leaf
    },
    {
      num: '05',
      title: 'Optimize Speed',
      desc: 'Calculate the cubic speed-power curve to identify the hydrodynamic sweet spot.',
      icon: Zap
    },
    {
      num: '06',
      title: 'Generate Best Voyage',
      desc: 'Deliver explainable decision score for Best Ship + Best Route + Best Speed.',
      icon: ShieldCheck
    }
  ]

  return (
    <div className="min-h-screen bg-[#020203] text-slate-100 flex flex-col relative tech-grid-bg">
      {/* Linear-style Ambient Lighting */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-bottom" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-brand-bright mb-8 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-bright animate-pulse" />
            <span>SMART INDIA HACKATHON • SIH26138</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Navigate <span className="text-gradient-heading">Smarter.</span><br />
            Sail <span className="text-gradient-brand">Greener.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Next-generation maritime voyage intelligence. Powering hydrodynamic speed optimization, real-time weather routing, and automated IMO CII carbon reduction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onNavigateToPlanner}
              className="btn-primary w-full sm:w-auto px-7 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Optimize a Voyage</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToFleet}
              className="btn-secondary w-full sm:w-auto px-7 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
            >
              <Ship className="w-4 h-4 text-slate-400" />
              <span>Explore Fleet (20 Ships)</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: Maritime Real-World Map */}
        <div className="relative mt-8 rounded-2xl p-1 bg-gradient-to-b from-white/[0.10] to-white/[0.02] shadow-2xl">
          <MaritimeMapSvg selectedRouteId="route-eco" height={460} />
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 border-y border-white/[0.06] bg-[#050508]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-[11px] font-mono font-semibold text-brand-bright uppercase tracking-widest mb-3">
              The Maritime Efficiency Challenge
            </h2>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Every Nautical Mile Has an Environmental Cost.
            </h3>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Global shipping accounts for ~3% of all global emissions. Sub-optimal ship assignment, uncalibrated speed profiles, and ignoring ocean currents cause massive fuel waste and regulatory fines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Excess Fuel Burn</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traveling 1.5 knots above hydrodynamic optimal speed increases fuel burn by up to 28% due to cubic power resistance curves.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Heavy CO₂ Emissions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every tonne of marine fuel emits 3.145 tonnes of greenhouse gases, directly degrading IMO CII compliance ratings.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Unpredictable ETA</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Failing to dynamically model wind vectors and wave resistance results in costly port demurrage and schedule delays.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Bunker Cost Volatility</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fuel accounts for up to 60% of total voyage operating expenditure. Small percentage savings yield millions annually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / ARCHITECTURE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            Optimization Architecture
          </h2>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            How Torque IQ Operates
          </h3>
          <p className="mt-4 text-slate-400 text-sm">
            From voyage input to explainable AI recommendation in 6 precision decision steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="glass-panel p-6 relative group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-brand-bright transition-colors">
                    PHASE {step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-brand-bright">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Decision Triple Output Highlight Banner */}
        <div className="mt-12 p-8 rounded-2xl glass-panel border border-brand-accent/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              Primary System Output
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              BEST SHIP + BEST ROUTE + BEST SPEED
            </h4>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Torque IQ provides an unambiguous, presentation-ready recommendation balancing fuel consumption, CII emissions, ETA, and bunker cost.
            </p>
          </div>

          <button
            onClick={onNavigateToPlanner}
            className="btn-primary px-6 py-3 rounded-xl font-medium text-xs shrink-0 flex items-center gap-2 relative z-10"
          >
            <span>Launch Planner Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
