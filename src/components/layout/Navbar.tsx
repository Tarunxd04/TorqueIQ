import React, { useState } from 'react'
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
  Settings,
  User,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  FileText
} from 'lucide-react'

interface NavbarProps {
  onNavigateToDashboard: (view: string) => void
  activeView: string
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToDashboard, activeView }) => {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const primaryNavItems = [
    { id: 'landing',   label: 'Overview' },
    { id: 'overview',  label: 'Dashboard' },
    { id: 'fleet',     label: 'Fleet' },
    { id: 'routes',    label: 'Routes' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'carbon',    label: 'Emissions' },
  ]

  const secondaryNavItems = [
    { id: 'planner',      label: 'Voyage Planner',     icon: Navigation, desc: 'AI route & speed optimization' },
    { id: 'simulator',    label: 'What-If Simulator',  icon: Sliders,    desc: 'Interactive scenario testing' },
    { id: 'optimization', label: 'Speed Curve',        icon: Zap,        desc: 'Cubic propulsion sweet spot' },
    { id: 'weather',      label: 'Ocean Weather',      icon: CloudSun,   desc: 'Currents & wave resistance' },
    { id: 'cargo',        label: 'Cargo Intel',        icon: Boxes,      desc: 'Reefer, Ro-Ro & bulk handling' },
    { id: 'reports',      label: 'Audit Reports',      icon: FileText,   desc: 'Generate CII compliance logs' },
  ]

  const handleNav = (viewId: string) => {
    onNavigateToDashboard(viewId)
    setMoreOpen(false)
    setMobileMenuOpen(false)
  }

  const isMoreActive = secondaryNavItems.some(item => item.id === activeView)

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E3DA] w-full transition-all">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & System Status */}
        <div className="flex items-center gap-4 shrink-0">
          <div
            onClick={() => handleNav('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#174D3F] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0F342B] transition-colors">
              <Anchor className="w-4 h-4 text-[#FFFFFF] group-hover:rotate-12 transition-transform" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-[#191919] flex items-center gap-1">
                Torque <span className="text-[#F15F56]">IQ</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F5F5EF] text-[#777777] border border-[#E5E3DA]">
                Enterprise
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDF5F2] border border-[#D2E4DC] text-[10px] font-mono text-[#174D3F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#174D3F] animate-pulse" />
            <span className="font-semibold">OPERATIONAL</span>
          </div>
        </div>

        {/* Center Nav Links — Minimalist Pill Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNavItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-[#191919] bg-[#F5F5EF] font-semibold border border-[#E5E3DA]'
                    : 'text-[#777777] hover:text-[#191919] hover:bg-[#F9F9F6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#F15F56] rounded-full" />
                )}
              </button>
            )
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1 ${
                isMoreActive
                  ? 'text-[#191919] bg-[#F5F5EF] font-semibold border border-[#E5E3DA]'
                  : 'text-[#777777] hover:text-[#191919] hover:bg-[#F9F9F6]'
              }`}
            >
              <span>More Modules</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E3DA] rounded-xl shadow-dropdown p-2 z-50 animate-fade-in">
                  <div className="text-[10px] font-mono font-semibold text-[#777777] px-2.5 py-1 uppercase tracking-wider">
                    Extended Intelligence
                  </div>
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon
                    const isItemActive = activeView === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-start gap-2.5 text-xs transition-colors ${
                          isItemActive
                            ? 'bg-[#FDF1F0] text-[#F15F56] font-medium'
                            : 'text-[#191919] hover:bg-[#F5F5EF]'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md ${isItemActive ? 'bg-[#FCD8D5] text-[#D84B42]' : 'bg-[#F5F5EF] text-[#174D3F]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs leading-none">{item.label}</div>
                          <div className="text-[10px] text-[#777777] mt-1 leading-snug">{item.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Settings button */}
          <button
            onClick={() => handleNav('settings')}
            title="Settings & Configurations"
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              activeView === 'settings'
                ? 'bg-[#F5F5EF] text-[#191919] border-[#E5E3DA]'
                : 'text-[#777777] hover:text-[#191919] border-transparent hover:border-[#E5E3DA] hover:bg-[#F9F9F6]'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile user badge */}
          <button
            onClick={() => handleNav('settings')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#E5E3DA] bg-white hover:bg-[#F9F9F6] text-[#191919] transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-[#174D3F] text-white flex items-center justify-center text-[10px] font-bold">
              VS
            </div>
            <span className="text-xs font-medium">Capt. Sharma</span>
          </button>

          {/* Primary Coral CTA Button */}
          <button
            onClick={() => handleNav('planner')}
            className="btn-coral text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
          >
            <span>Plan Voyage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#191919] hover:bg-[#F5F5EF] border border-[#E5E3DA] lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E3DA] bg-white px-4 py-4 space-y-3 animate-fade-in shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">Primary Navigation</div>
          <div className="grid grid-cols-2 gap-2">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  activeView === item.id
                    ? 'bg-[#FDF1F0] text-[#F15F56] font-semibold border border-[#FCD8D5]'
                    : 'bg-[#F5F5EF] text-[#191919] hover:bg-[#EFEFEA]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] pt-2 border-t border-[#E5E3DA]">Specialized Engines</div>
          <div className="grid grid-cols-2 gap-2">
            {secondaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  activeView === item.id
                    ? 'bg-[#FDF1F0] text-[#F15F56] font-semibold border border-[#FCD8D5]'
                    : 'bg-[#F5F5EF] text-[#191919] hover:bg-[#EFEFEA]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('settings')}
              className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                activeView === 'settings'
                  ? 'bg-[#FDF1F0] text-[#F15F56] font-semibold border border-[#FCD8D5]'
                  : 'bg-[#F5F5EF] text-[#191919] hover:bg-[#EFEFEA]'
              }`}
            >
              Settings & Profile
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
