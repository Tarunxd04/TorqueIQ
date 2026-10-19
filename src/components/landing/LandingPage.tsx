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
  Sparkles,
  BarChart3,
  CheckCircle2
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
      title: 'Configure Voyage Constraints',
      desc: 'Specify origin and destination ports, cargo tonnage, and requested berth arrival timeframe.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Analyze Fleet Suitability',
      desc: 'Screen 20 active vessels across hydrodynamic efficiency, cargo capacity, draft, and port readiness.',
      icon: Ship
    },
    {
      num: '03',
      title: 'Corridor & Route Synthesis',
      desc: 'Evaluate oceanic corridors, nautical distance, chokepoints, and traffic separation schemes.',
      icon: Globe
    },
    {
      num: '04',
      title: 'Ocean Weather Intelligence',
      desc: 'Integrate real-time wave heights, equatorial surface currents, and aerodynamic wind vectors.',
      icon: Leaf
    },
    {
      num: '05',
      title: 'Propulsion Curve Calibration',
      desc: 'Apply cubic speed-power hydrodynamics (P ∝ V³) to pinpoint the fuel-efficient operating sweet spot.',
      icon: Zap
    },
    {
      num: '06',
      title: 'AI Decision Recommendation',
      desc: 'Generate transparent, explainable decision scores certifying the optimal Ship, Route, and Speed triple.',
      icon: ShieldCheck
    }
  ]

  const problemCards = [
    {
      icon: Flame,
      iconColor: 'text-[#F15F56]',
      iconBg: 'bg-[#FDF1F0] border-[#FCD8D5]',
      title: 'Excess Bunker Fuel Burn',
      stat: '+28% waste',
      desc: 'Traveling just 1.5 knots above hydrodynamic optimal speed increases fuel burn by up to 28% due to cubic propulsion resistance.'
    },
    {
      icon: Leaf,
      iconColor: 'text-[#174D3F]',
      iconBg: 'bg-[#EDF5F2] border-[#D2E4DC]',
      title: 'Heavy Carbon Emissions',
      stat: '3.145 t CO₂/t',
      desc: 'Every tonne of marine fuel combusted emits 3.145 tonnes of greenhouse gases, directly degrading IMO CII compliance ratings.'
    },
    {
      icon: Clock,
      iconColor: 'text-[#D97706]',
      iconBg: 'bg-[#FEF7EC] border-[#FBE5C3]',
      title: 'Unpredictable Swell Delays',
      stat: 'Demurrage costs',
      desc: 'Failing to model wind vectors and counter-currents results in delayed port arrival and costly anchorage demurrage fees.'
    },
    {
      icon: TrendingDown,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-[#EEF4FE] border-[#D0E1FD]',
      title: 'Operating Cost Volatility',
      stat: '60% of voyage OPEX',
      desc: 'Bunker fuel constitutes up to 60% of total voyage operational expenditure. Fractional percentage savings yield millions annually.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F5F5EF] text-[#191919] flex flex-col relative topo-pattern">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E3DA] text-xs font-mono text-[#174D3F] mb-8 shadow-subtle hover:border-[#D2E4DC] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#174D3F] animate-pulse" />
            <span className="font-semibold tracking-wide">AI-POWERED MARITIME VOYAGE & FLEET INTELLIGENCE</span>
          </div>

          {/* Exact Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#191919] leading-[1.08] mb-6">
            Smarter Voyages.<br />
            Lower Fuel. <span className="text-[#174D3F]">Greener Seas.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#777777] font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Optimize maritime routes, forecast fuel consumption, and improve fleet efficiency with intelligent voyage analytics.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToPlanner}
              className="btn-coral w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Optimization</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToView('analytics')}
              className="btn-outline-warm w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-[#777777]" />
              <span>View Analytics</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-[#E5E3DA] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-3xl mx-auto">
            <div>
              <div className="text-2xl font-bold font-mono text-[#191919]">20 Vessels</div>
              <div className="text-xs text-[#777777] mt-0.5">Active Fleet Telemetry</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[#174D3F]">12.4% Avg</div>
              <div className="text-xs text-[#777777] mt-0.5">Fuel Burn Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[#174D3F]">1,320 Tonnes</div>
              <div className="text-xs text-[#777777] mt-0.5">Monthly CO₂ Abated</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-[#F15F56]">Grade A</div>
              <div className="text-xs text-[#777777] mt-0.5">IMO CII Rating Standard</div>
            </div>
          </div>
        </div>

        {/* Polished Maritime Route Visualization Card */}
        <div className="relative mt-8 rounded-2xl p-2 bg-white border border-[#E5E3DA] shadow-card">
          <div className="p-3 bg-[#FAF9F5] border border-[#E5E3DA] rounded-xl mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#174D3F]" />
              <span className="font-semibold text-[#191919]">Indian Ocean Trade Corridor</span>
              <span className="text-[#777777]">• Port of Chennai (MAA) ➔ Port of Singapore (SGSIN)</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#777777]">
              <span>Optimal Speed: <strong className="text-[#174D3F]">13.8 kts</strong></span>
              <span>•</span>
              <span>Fuel Cut: <strong className="text-[#174D3F]">-12.4%</strong></span>
            </div>
          </div>

          <MaritimeMapSvg selectedRouteId="route-eco" height={480} />
        </div>
      </section>

      {/* THE EFFICIENCY CHALLENGE / PROBLEMS SECTION */}
      <section className="py-20 border-y border-[#E5E3DA] bg-white px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-[10px] font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
              Maritime Industry Challenges
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
              Every Nautical Mile Has an Environmental & Economic Cost.
            </h2>
            <p className="mt-4 text-[#777777] text-sm leading-relaxed max-w-2xl mx-auto">
              Global commercial shipping accounts for ~3% of all global greenhouse gas emissions. Sub-optimal ship assignment, uncalibrated speed profiles, and ignoring ocean currents cause massive fuel waste and regulatory fines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problemCards.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-white border border-[#E5E3DA] rounded-2xl p-6 hover:shadow-card hover:border-[#D6D3C7] transition-all space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#777777] bg-[#F5F5EF] px-2 py-0.5 rounded border border-[#E5E3DA]">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#191919]">{item.title}</h3>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW TORQUE IQ OPERATES / 6 STEP WORKFLOW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-[10px] font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
            Optimization Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
            How Torque IQ Operates
          </h2>
          <p className="mt-4 text-[#777777] text-sm leading-relaxed">
            From operational input constraints to explainable AI recommendations in 6 precision analytical phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflowSteps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="bg-white border border-[#E5E3DA] rounded-2xl p-6 hover:shadow-card hover:border-[#174D3F]/40 transition-all relative group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#777777] group-hover:text-[#174D3F] transition-colors">
                    PHASE {step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-[#F5F5EF] border border-[#E5E3DA] text-[#174D3F] group-hover:bg-[#EDF5F2] group-hover:border-[#D2E4DC] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-[#191919] mb-2">{step.title}</h3>
                <p className="text-xs text-[#777777] leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>

        {/* DECISION TRIPLE OUTPUT BANNER */}
        <div className="mt-14 p-8 rounded-2xl bg-[#174D3F] text-white border border-[#0F342B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-widest text-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Core System Recommendation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              BEST SHIP + BEST ROUTE + BEST SPEED
            </h3>
            <p className="text-xs text-white/80 max-w-xl leading-relaxed">
              Torque IQ provides an unambiguous, production-grade optimization recommendation balancing bunker fuel burn, IMO CII compliance, scheduled arrival times, and operating costs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToPlanner}
              className="btn-coral px-6 py-3 rounded-full font-medium text-xs flex items-center gap-2 shadow-sm"
            >
              <span>Launch Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToFleet}
              className="px-5 py-3 rounded-full font-medium text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              <span>Explore Fleet</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
