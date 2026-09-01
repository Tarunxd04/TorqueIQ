import React from 'react'
import {
  LayoutDashboard,
  Navigation,
  Ship,
  MapPin,
  CloudSun,
  Zap,
  Sliders,
  Leaf,
  Boxes,
  BarChart3,
  FileText,
  Settings,
  Anchor,
  ArrowLeft
} from 'lucide-react'

interface SidebarProps {
  currentView: string
  onSelectView: (view: string) => void
  onReturnToLanding: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, onReturnToLanding }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner', label: 'Voyage Planner', icon: Navigation, badge: 'Core' },
    { id: 'fleet', label: 'Fleet Management', icon: Ship, count: '20' },
    { id: 'routes', label: 'Route Intelligence', icon: MapPin },
    { id: 'weather', label: 'Weather Matrix', icon: CloudSun },
    { id: 'optimization', label: 'Speed Optimization', icon: Zap },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders, badge: 'AI' },
    { id: 'carbon', label: 'Carbon Compliance', icon: Leaf },
    { id: 'cargo', label: 'Cargo Intelligence', icon: Boxes, badge: 'Real World' },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
    { id: 'reports', label: 'Audit Reports', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-700/60 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-navy-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onReturnToLanding}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center">
                <Anchor className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-slate-100 tracking-tight text-base">Torque <span className="text-cyan-400">IQ</span></span>
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">GreenRoute Maritime</p>
            </div>
          </div>
        </div>

        {/* Back to Landing Page button */}
        <div className="p-2">
          <button
            onClick={onReturnToLanding}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 hover:bg-navy-800 rounded-lg transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Landing Page</span>
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-emerald-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-950/40'
                    : 'text-slate-300 hover:bg-navy-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-navy-800 text-slate-300">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-navy-700/60 bg-navy-950/60">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div>
            <p className="font-bold text-slate-200">SIH Project SIH26138</p>
            <p className="text-[10px] text-slate-400">v1.0.0 Presentation Ready</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="System Online"></span>
        </div>
      </div>
    </aside>
  )
}
