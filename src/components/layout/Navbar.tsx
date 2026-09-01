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
  Boxes
} from 'lucide-react'

interface NavbarProps {
  onNavigateToDashboard: (view: string) => void
  activeView: string
}

const NAV_ITEMS = [
  { id: 'landing',      label: 'Home',               icon: null },
  { id: 'overview',     label: 'Dashboard',           icon: LayoutDashboard },
  { id: 'planner',      label: 'Voyage Planner',      icon: Navigation },
  { id: 'fleet',        label: 'Fleet',               icon: Ship },
  { id: 'routes',       label: 'Routes',              icon: MapPin },
  { id: 'weather',      label: 'Weather',             icon: CloudSun },
  { id: 'optimization', label: 'Speed Optimization',  icon: Zap },
  { id: 'simulator',    label: 'What-If Simulator',   icon: Sliders },
  { id: 'carbon',       label: 'Carbon Compliance',   icon: Leaf },
  { id: 'cargo',        label: 'Cargo Intelligence',  icon: Boxes },
]

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToDashboard, activeView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-xl border-b border-navy-700/60 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo — Top Left Corner */}
        <div
          onClick={() => onNavigateToDashboard('landing')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-navy-950 rounded-[9px] flex items-center justify-center">
              <Anchor className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold text-white tracking-tight leading-none">Torque <span className="text-cyan-400">IQ</span></span>
              <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 leading-none">SIH26138</span>
            </div>
            <p className="text-[8px] font-bold text-slate-500 tracking-widest uppercase leading-none mt-0.5">NAVIGATE SMARTER. SAIL GREENER.</p>
          </div>
        </div>

        {/* Center Nav Links — All features except Analytics, Audit, Settings */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigateToDashboard(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateToDashboard('planner')}
            className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 shadow-lg shadow-cyan-500/20 hover:opacity-95 hover:scale-[1.02] transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Optimize Voyage</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
