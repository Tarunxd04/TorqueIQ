import React from 'react'
import {
  ArrowRight,
  Ship,
  Compass,
  Zap,
  Leaf,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  ShieldCheck,
  TrendingDown,
  Globe
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
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-navy-950">

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow background accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-700/60 text-xs font-semibold text-cyan-400 mb-6 shadow-lg shadow-cyan-950/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SMART INDIA HACKATHON PROJECT SIH26138</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
            NAVIGATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">SMARTER.</span><br />
            SAIL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">GREENER.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            AI-powered maritime voyage optimization for lower fuel consumption, lower carbon emissions, and smarter fleet operations.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToPlanner}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <span>Optimize a Voyage</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onNavigateToFleet}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy-850 text-slate-200 font-bold text-base border border-navy-700 hover:bg-navy-800 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Ship className="w-5 h-5 text-cyan-400" />
              <span>Explore Fleet (20 Ships)</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: 2D Maritime Map */}
        <div className="mt-6 relative">
          <MaritimeMapSvg selectedRouteId="route-b" height={440} />
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-navy-900/60 border-y border-navy-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">The Maritime Efficiency Challenge</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Every Nautical Mile Has a Cost.</h3>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Global shipping consumes millions of barrels of heavy fuel oil daily. Sub-optimal ship assignment, un-optimized speed profiles, and ignoring ocean currents cause massive operational waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-navy-850 border border-navy-700/80 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-800/50 flex items-center justify-center text-rose-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Excess Fuel Burn</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traveling just 1.5 knots above hydrodynamic optimal speed increases fuel burn by up to 28% due to cubic power resistance curves.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-navy-850 border border-navy-700/80 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Heavy CO₂ Emissions</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every tonne of marine fuel burned emits 3.145 tonnes of greenhouse gases, directly degrading IMO CII compliance ratings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-navy-850 border border-navy-700/80 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Unpredictable ETA</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Failing to dynamically model wind vectors and wave resistance results in costly port demurrage penalties.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-navy-850 border border-navy-700/80 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Bunker Cost Spikes</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fuel accounts for up to 60% of total voyage operating costs. Small percentage savings yield millions annually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Optimization Architecture</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">How Torque IQ Works</h3>
          <p className="mt-4 text-slate-300 text-base">
            From voyage input to explainable AI recommendation in 6 decision steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="p-6 rounded-xl bg-navy-850 border border-navy-700/80 hover:border-cyan-500/40 transition-all shadow-lg relative group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition">{step.num}</span>
                  <div className="p-2.5 rounded-lg bg-navy-800 text-cyan-400 border border-navy-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Decision Triple Output Highlight */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Primary System Output</span>
            <h4 className="text-2xl font-extrabold text-white mt-1">BEST SHIP + BEST ROUTE + BEST SPEED</h4>
            <p className="text-xs text-slate-300 mt-2 max-w-xl">
              Torque IQ provides an unambiguous, presentation-ready recommendation balancing fuel, emissions, ETA, and cost.
            </p>
          </div>

          <button
            onClick={onNavigateToPlanner}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-105 transition shrink-0"
          >
            Launch Planner Demo Flow
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
