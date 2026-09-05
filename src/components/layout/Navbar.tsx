import React from 'react'
import {
  Anchor,
  LayoutDashboard,
  Navigation,
  Ship,
  MapPin,
  CloudSun,
  Zap,
  Sliders,
  Leaf,
  Boxes,
  ArrowRight,
  Activity
} from 'lucide-react'

interface NavbarProps {
  onNavigateToDashboard: (view: string) => void
  activeView: string
}

const NAV_ITEMS = [
  { id: 'landing',      label: 'Overview',           icon: null },
  { id: 'overview',     label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'planner',      label: 'Voyage Planner',     icon: Navigation },
  { id: 'fleet',        label: 'Fleet',              icon: Ship },
  { id: 'routes',       label: 'Routes',             icon: MapPin },
  { id: 'weather',      label: 'Weather',            icon: CloudSun },
  { id: 'optimization', label: 'Speed Curve',        icon: Zap },
  { id: 'simulator',    label: 'What-If Sim',        icon: Sliders },
  { id: 'carbon',       label: 'Carbon CII',         icon: Leaf },
  { id: 'cargo',        label: 'Cargo Intel',        icon: Boxes },
]

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToDashboard, activeView }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#050506]/85 backdrop-blur-xl border-b border-white/[0.06] w-full">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & System Status */}
        <div className="flex items-center gap-4 shrink-0">
          <div
            onClick={() => onNavigateToDashboard('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-brand-bright to-brand-accent p-px shadow-[0_0_15px_rgba(94,106,210,0.35)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07070A] rounded-[7px] flex items-center justify-center">
                <Anchor className="w-4 h-4 text-brand-bright group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1">
                Torque <span className="text-brand-bright">IQ</span>
              </span>
              <span className="hidden sm:inline-flex text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                SIH26138
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.06] border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL</span>
          </div>
        </div>

        {/* Center Nav Links — Linear style tabs */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto custom-scrollbar py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigateToDashboard(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-brand-bright to-transparent rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right: Quick Action CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateToDashboard('planner')}
            className="btn-primary text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            <span>Plan Voyage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
