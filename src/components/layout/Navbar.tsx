import React, { useState } from 'react'
import {
  Anchor,
  Navigation,
  CloudSun,
  Zap,
  Sliders,
  Boxes,
  ArrowRight,
  User,
  ChevronDown,
  Menu,
  X,
  FileText
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface NavbarProps {
  onNavigateToDashboard: (view: string) => void
  activeView: string
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToDashboard, activeView }) => {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { currentUser, isAuthenticated, openAuthModal, openProfile } = useAuth()

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

  const userInitials = currentUser?.fullName
    ? currentUser.fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('')
    : 'U'

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E3DA] w-full transition-all shadow-subtle">
      {/* 
        3 Independent Horizontal Sections via Full-Width CSS Grid:
        - Col 1 [minmax(0, 1fr)]: Pinned to the Extreme Left (Brand Logo)
        - Col 2 [auto]: Exactly Centered horizontally (Navigation Options)
        - Col 3 [minmax(0, 1fr)]: Pinned to the Extreme Right (Profile & Plan Voyage CTA)
        Using w-full with responsive side-padding pushes the logo to the extreme left
        and profile/actions to the extreme right while keeping the center links perfectly centered.
      */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 grid grid-cols-[auto_1fr] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
        {/* LEFT SECTION — BRAND LOGO */}
        <div className="flex items-center justify-start min-w-0">
          <div
            onClick={() => handleNav('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#174D3F] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0F342B] transition-colors">
              <Anchor className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            </div>
            
            <div className="flex items-center">
              <span className="text-base font-bold tracking-tight text-[#191919] flex items-center gap-1 font-sans">
                Torque <span className="text-[#F15F56]">IQ</span>
              </span>
            </div>
          </div>
        </div>

        {/* CENTER SECTION — NAVIGATION OPTIONS */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 whitespace-nowrap min-w-0">
          {primaryNavItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-[#191919] bg-[#F5F5EF] font-semibold border border-[#E5E3DA]'
                    : 'text-[#777777] hover:text-[#191919] hover:bg-[#F9F9F6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-2.5 right-2.5 xl:left-3 xl:right-3 h-[2px] bg-[#F15F56] rounded-full" />
                )}
              </button>
            )
          })}

          {/* More Modules Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
                isMoreActive
                  ? 'text-[#191919] bg-[#F5F5EF] font-semibold border border-[#E5E3DA]'
                  : 'text-[#777777] hover:text-[#191919] hover:bg-[#F9F9F6]'
              }`}
            >
              <span>More Modules</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E3DA] rounded-xl shadow-dropdown p-2 z-50 animate-fade-in">
                  <div className="text-[11px] font-mono font-semibold text-[#777777] px-2.5 py-1 uppercase tracking-wider">
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
                          <div className="text-[11px] text-[#777777] mt-1 leading-snug">{item.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* RIGHT SECTION — PROFILE AND ACTION BUTTONS */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3 min-w-0">
          {/* Profile-First Interaction Avatar */}
          {isAuthenticated && currentUser ? (
            <button
              onClick={openProfile}
              title={`Account: ${currentUser.fullName} (${currentUser.email})`}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#174D3F] hover:bg-[#0F342B] text-white text-xs font-bold transition-all shadow-subtle border border-[#174D3F] active:scale-95 shrink-0"
              aria-label="User Account"
            >
              {userInitials}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              title="Sign In / Create Account"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-[#F9F9F6] text-[#777777] hover:text-[#174D3F] border border-[#E5E3DA] transition-all shadow-subtle active:scale-95 shrink-0"
              aria-label="Sign In or Create Account"
            >
              <User className="w-4 h-4" />
            </button>
          )}

          {/* Primary Coral CTA Button */}
          <button
            onClick={() => handleNav('planner')}
            className="btn-coral text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Plan Voyage</span>
            <span className="sm:hidden text-xs">Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#191919] hover:bg-[#F5F5EF] border border-[#E5E3DA] lg:hidden shrink-0 ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E3DA] bg-white px-4 py-4 space-y-4 animate-fade-in shadow-lg">
          {/* Account status for mobile */}
          <div className="p-3 bg-[#FAF9F5] border border-[#E5E3DA] rounded-xl flex items-center justify-between">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#174D3F] text-white flex items-center justify-center text-xs font-bold">
                  {userInitials}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#191919]">{currentUser.fullName}</div>
                  <div className="text-[11px] text-[#777777]">{currentUser.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#777777]">
                <User className="w-4 h-4 text-[#174D3F]" />
                <span>Guest Visitor</span>
              </div>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  openProfile()
                }}
                className="btn-outline-warm text-xs px-3 py-1.5 rounded-lg"
              >
                My Account
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  openAuthModal('login')
                }}
                className="btn-coral text-xs px-3 py-1.5 rounded-lg"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">Primary Navigation</div>
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

          <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777] pt-2 border-t border-[#E5E3DA]">Specialized Engines</div>
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
          </div>
        </div>
      )}
    </header>
  )
}
