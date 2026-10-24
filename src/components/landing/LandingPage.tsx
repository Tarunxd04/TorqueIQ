import React from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Layers,
  Fuel,
  Compass,
  FileCheck,
  Ship,
  Navigation,
  Sliders,
  Leaf,
  Wind,
  FileText,
  ShieldCheck,
  DollarSign,
  Gauge
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
  onNavigateToView,
}) => {
  const statisticsList = [
    {
      value: '20 Vessels',
      label: 'Active Fleet Telemetry',
      sub: '100% Operational Readiness',
      highlightColor: 'text-[#191919]',
      icon: Ship,
    },
    {
      value: '12.4% Avg',
      label: 'Fuel Burn Reduction',
      sub: 'vs Standard Admiralty Tracks',
      highlightColor: 'text-[#174D3F]',
      icon: Fuel,
    },
    {
      value: '1,320 Tonnes',
      label: 'Monthly CO₂ Abated',
      sub: 'Tier 1 Emission Mitigation',
      highlightColor: 'text-[#174D3F]',
      icon: Leaf,
    },
    {
      value: 'Grade A',
      label: 'IMO CII Rating Standard',
      sub: 'MARPOL Annex VI Compliant',
      highlightColor: 'text-[#F15F56]',
      icon: ShieldCheck,
    },
    {
      value: '$2.45M',
      label: 'Cumulative OPEX Saved',
      sub: 'Direct Bunker Fuel Economy',
      highlightColor: 'text-[#174D3F]',
      icon: DollarSign,
    },
    {
      value: '13.8 kts',
      label: 'Optimal Speed Frontier',
      sub: 'Propulsion Sweet Spot',
      highlightColor: 'text-[#191919]',
      icon: Gauge,
    },
  ]

  const platformModules = [
    {
      id: 'planner',
      title: 'Voyage Planner & Decision Matrix',
      tag: 'Speed-Power Engine',
      desc: 'Ingests origin, destination, cargo payload in DWT, and berth arrival deadlines to generate 4 Pareto-optimal routes balancing bunker fuel and ETA.',
      icon: Compass,
      color: 'text-[#F15F56]',
      bgColor: 'bg-[#FDF1F0] border-[#FCD8D5]',
    },
    {
      id: 'fleet',
      title: '20-Vessel Real-Time Fleet Directory',
      tag: 'Live AIS Telemetry',
      desc: 'Deep operational registry across container, bulk carrier, and tanker classes with real-time deadweight capacity, speed, and hydrodynamic efficiency ratings.',
      icon: Ship,
      color: 'text-[#174D3F]',
      bgColor: 'bg-[#EDF5F2] border-[#D2E4DC]',
    },
    {
      id: 'simulator',
      title: 'What-If Hydrodynamic Simulator',
      tag: 'Scenario Testing',
      desc: 'Interactive scenario modeler allowing operators to adjust wave swell heights, cargo payloads, and bunker fuel pricing in real time to visualize trade-offs.',
      icon: Sliders,
      color: 'text-[#174D3F]',
      bgColor: 'bg-[#EDF5F2] border-[#D2E4DC]',
    },
    {
      id: 'carbon',
      title: 'IMO CII & Decarbonization Suite',
      tag: 'MARPOL Annex VI',
      desc: 'Calculates operational carbon intensity in grams of CO₂ per tonne-nautical mile, assigning ratings from Grade A to Grade E with compliance forecasts.',
      icon: Leaf,
      color: 'text-[#174D3F]',
      bgColor: 'bg-[#EDF5F2] border-[#D2E4DC]',
    },
    {
      id: 'weather',
      title: 'Oceanic Weather & Current Routing',
      tag: 'Dynamic Currents',
      desc: 'Indian Ocean dynamic surface current push (+0.8 kt equatorial vectors), wave period analysis, and adverse weather avoidance corridors.',
      icon: Wind,
      color: 'text-[#2563EB]',
      bgColor: 'bg-[#EFF6FF] border-[#DBEAFE]',
    },
    {
      id: 'reports',
      title: 'Voyage & Carbon Audit Certifications',
      tag: 'Class Certifications',
      desc: 'Generates verified compliance documentation and instant CSV data exports formatted for maritime classification societies, charterers, and port authorities.',
      icon: FileText,
      color: 'text-[#174D3F]',
      bgColor: 'bg-[#EDF5F2] border-[#D2E4DC]',
    },
  ]

  const problemCards = [
    {
      title: 'Excessive Fuel Consumption',
      desc: 'Fixed-speed steaming burns 10-18% excess bunker fuel due to uncalibrated engine RPM and ignored cubic propulsion resistance laws.',
      stat: '+$140k/voyage waste',
      icon: Fuel,
      iconBg: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
    },
    {
      title: 'Unfavorable Weather Routing',
      desc: 'Adverse 2.5m+ swells and head currents increase vessel hydrodynamic resistance, causing unexpected delays and severe engine strain.',
      stat: '+18h transit delay',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Sub-Optimal Ship Assignment',
      desc: 'Assigning a vessel without matching cargo payload and hydrodynamic hull curves leads to severe fuel inefficiency and ballast penalties.',
      stat: '34% mismatch rate',
      icon: Compass,
      iconBg: 'bg-[#EDF5F2] border-[#D2E4DC]',
      iconColor: 'text-[#174D3F]',
    },
    {
      title: 'Strict IMO CII Penalties',
      desc: 'Poor operational efficiency ratings (Grade D or E) trigger mandatory corrective action plans and restricted port operations under MARPOL Annex VI.',
      stat: 'Grade D/E risk',
      icon: TrendingUp,
      iconBg: 'bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600',
    },
  ]

  const workflowSteps = [
    {
      num: '01',
      title: 'Operational Input Synthesis',
      desc: 'Port of origin, destination, cargo payload in DWT tonnes, required berth arrival window, and fleet availability are ingested.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Fleet Capability Matching',
      desc: 'Evaluates deadweight capacity, hull fuel efficiency factor, and current location of 20 commercial vessels across container, bulk, and tanker classes.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Hydrodynamic Resistance Engine',
      desc: 'Applies cubic speed-power relationships P proportional to V^3 adjusted for weather penalties and oceanic Indian Ocean surface currents.',
      icon: Cpu,
    },
    {
      num: '04',
      title: 'Multi-Objective Route Optimization',
      desc: 'Synthesizes Eco Speed, Balanced Passage, Fast Transit, and Adverse Weather Bypass corridors along verified Admiralty sea lanes.',
      icon: Compass,
    },
    {
      num: '05',
      title: 'MARPOL & IMO CII Scoring',
      desc: 'Computes grams of CO2 per tonne-nautical mile, assigning IMO CII compliance ratings from Grade A (Superior) to Grade E (Critical).',
      icon: FileCheck,
    },
    {
      num: '06',
      title: 'Decision Matrix & Rationale',
      desc: 'Outputs Pareto-optimal recommendations with fuel savings percentage, total USD voyage cost, and verifiable ETA deadlines.',
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="w-full bg-[#F5F5EF] text-[#191919] flex flex-col relative topo-pattern">
      {/* 1. HERO SECTION */}
      <section className="w-full relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#E5E3DA] text-xs font-mono text-[#174D3F] mb-6 sm:mb-8 shadow-subtle hover:border-[#D2E4DC] transition-colors max-w-full select-none">
              <span className="w-2 h-2 rounded-full bg-[#174D3F] animate-pulse shrink-0" />
              <span className="font-semibold tracking-wide truncate sm:whitespace-normal">AI-POWERED MARITIME VOYAGE & FLEET INTELLIGENCE</span>
            </div>

            {/* Fraunces Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#191919] leading-[1.12] mb-6 max-w-3xl sm:max-w-4xl text-balance">
              Smarter Voyages.<br className="hidden sm:inline" />
              {' '}Lower Fuel. <span className="text-[#174D3F]">Greener Seas.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#666666] font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-pretty">
              Optimize maritime routes, forecast hydrodynamic fuel consumption, and improve fleet efficiency with intelligent voyage analytics calibrated for global commercial shipping.
            </p>

            {/* Action Buttons — Uniform Height & Responsive Gaps */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onNavigateToPlanner}
                className="btn-coral w-full sm:w-auto px-6 sm:px-7 h-12 rounded-full font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm whitespace-nowrap cursor-pointer transition-all"
              >
                <span>Launch Voyage Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToFleet}
                className="btn-outline-warm w-full sm:w-auto px-6 sm:px-7 h-12 rounded-full font-medium text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all"
              >
                <Ship className="w-4 h-4 text-[#174D3F]" />
                <span>Explore 20-Vessel Fleet</span>
              </button>

              <button
                onClick={() => onNavigateToView('analytics')}
                className="btn-outline-warm w-full sm:w-auto px-6 sm:px-7 h-12 rounded-full font-medium text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all"
              >
                <BarChart3 className="w-4 h-4 text-[#777777]" />
                <span>View Analytics</span>
              </button>
            </div>

            {/* Verification Badges Row */}
            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs font-mono text-[#777777]">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                Admiralty Sea Lanes Calibrated
              </span>
              <span className="hidden sm:inline text-[#D6D3C7]">•</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                IMO CII Grade A Rated
              </span>
              <span className="hidden sm:inline text-[#D6D3C7]">•</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                Real-Time Indian Ocean Routing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS & FLEET BENCHMARKS SECTION */}
      <section className="w-full py-12 border-y border-[#E5E3DA] bg-white px-4 sm:px-6 lg:px-8 relative z-10 shadow-subtle">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[#E5E3DA] gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider block">
                Verified Quantitative Benchmarks
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">
                Fleet Performance & Sustainability Metrics
              </h2>
            </div>
            <span className="text-xs font-mono text-[#777777] bg-[#F5F5EF] px-3 py-1 rounded-full border border-[#E5E3DA] shrink-0">
              Real-time AIS Telemetry Calibration
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {statisticsList.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F5] border border-[#E5E3DA] p-4 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-[#174D3F]/30 hover:shadow-subtle transition-all min-w-0 h-full"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777777] truncate">
                      {stat.label}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-[#174D3F] shrink-0" />
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight whitespace-nowrap ${stat.highlightColor}`}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[#777777] mt-1 font-medium leading-snug">
                      {stat.sub}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MARITIME VOYAGE MAP & LIVE TRACKING SHOWCASE */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
                Real-Time Oceanic Intelligence
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
                Global Maritime Route Control & Vessel Tracking
              </h2>
              <p className="mt-2 text-[#666666] text-sm sm:text-base leading-relaxed max-w-3xl">
                Preview Pareto-optimal voyage routing along the Port of Chennai (MAA) ➔ Port of Singapore (SGSIN) corridor. Toggle candidate corridors, monitor live speed profiles, and simulate real-time hydrodynamic telemetry.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onNavigateToPlanner}
                className="btn-coral px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Open in Full Planner</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Polished Maritime Route Visualization Card */}
          <div className="rounded-2xl p-2 sm:p-3 bg-white border border-[#E5E3DA] shadow-card w-full">
            <div className="p-3.5 bg-[#FAF9F5] border border-[#E5E3DA] rounded-xl mb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 flex-wrap text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-[#174D3F] shrink-0" />
                <span className="font-semibold text-[#191919]">Indian Ocean Trade Corridor</span>
                <span className="text-[#777777] hidden sm:inline">• Port of Chennai (MAA) ➔ Port of Singapore (SGSIN)</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#777777] shrink-0 text-right md:justify-end">
                <span>Optimal Speed: <strong className="text-[#174D3F]">13.8 kts</strong></span>
                <span>•</span>
                <span>Fuel Cut: <strong className="text-[#174D3F]">-12.4%</strong></span>
              </div>
            </div>

            <MaritimeMapSvg selectedRouteId="route-eco" height={480} />
          </div>
        </div>
      </section>

      {/* 4. PLATFORM FEATURES & INTELLIGENCE SUITE SHOWCASE */}
      <section className="w-full py-20 border-t border-[#E5E3DA] bg-white px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
              Platform Modules & Capabilities
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight">
              Engineered for Marine Superintendents & Fleet Teams
            </h2>
            <p className="mt-4 text-[#666666] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              A unified operating system replacing disconnected spreadsheets with deterministic speed-power curves, dynamic weather routing, and automated compliance certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformModules.map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.id}
                  onClick={() => onNavigateToView(module.id)}
                  className="bg-[#FAF9F5] border border-[#E5E3DA] rounded-2xl p-6 sm:p-7 hover:border-[#174D3F]/40 hover:bg-white hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group space-y-4 h-full"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${module.bgColor} ${module.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#777777] bg-white px-2.5 py-1 rounded-full border border-[#E5E3DA]">
                        {module.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#191919] group-hover:text-[#174D3F] transition-colors flex items-center justify-between">
                      <span>{module.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#F15F56] shrink-0" />
                    </h3>

                    <p className="text-sm text-[#666666] leading-relaxed">
                      {module.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E3DA] flex items-center justify-between text-xs font-medium text-[#174D3F]">
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. THE EFFICIENCY CHALLENGE / PROBLEMS SECTION */}
      <section className="w-full py-20 border-t border-[#E5E3DA] bg-[#FAF9F5] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
              Maritime Industry Challenges
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight">
              Every Nautical Mile Has an Environmental & Economic Cost.
            </h2>
            <p className="mt-4 text-[#666666] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Global commercial shipping accounts for ~3% of all global greenhouse gas emissions. Sub-optimal ship assignment, uncalibrated speed profiles, and ignoring ocean currents cause massive fuel waste and regulatory fines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problemCards.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-white border border-[#E5E3DA] rounded-2xl p-6 hover:shadow-card hover:border-[#D6D3C7] transition-all space-y-3.5 h-full flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#777777] bg-[#F5F5EF] px-2.5 py-0.5 rounded border border-[#E5E3DA]">
                        {item.stat}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[#191919]">{item.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW TORQUE IQ OPERATES / 6 STEP WORKFLOW */}
      <section className="w-full py-24 border-t border-[#E5E3DA] bg-white px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-3">
              Optimization Architecture
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight">
              How Torque IQ Operates
            </h2>
            <p className="mt-4 text-[#666666] text-sm sm:text-base leading-relaxed">
              From operational input constraints to explainable AI recommendations in 6 precision analytical phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="bg-[#FAF9F5] border border-[#E5E3DA] rounded-2xl p-6 hover:shadow-card hover:border-[#174D3F]/40 transition-all relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#777777] group-hover:text-[#174D3F] transition-colors">
                        PHASE {step.num}
                      </span>
                      <div className="p-2 rounded-lg bg-white border border-[#E5E3DA] text-[#174D3F] group-hover:bg-[#EDF5F2] group-hover:border-[#D2E4DC] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-[#191919] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CALL TO ACTION BANNER */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-[#174D3F] text-white rounded-3xl p-8 sm:p-12 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/[0.08] to-transparent pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4ADE80] font-bold">
                Ready for Smarter Maritime Operations?
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Begin Optimizing Your Next Voyage in Seconds.
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Compare candidate routes, evaluate cubic propulsion curves, and secure IMO CII Grade A compliance today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto relative z-10">
              <button
                onClick={onNavigateToPlanner}
                className="w-full sm:w-auto px-7 h-12 rounded-full bg-[#F15F56] hover:bg-[#E04B42] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Launch Voyage Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToFleet}
                className="w-full sm:w-auto px-6 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse 20 Ships</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <Footer onNavigateToView={onNavigateToView} />
    </div>
  )
}
