import React, { useState } from 'react'
import { Search, Bell, ShieldCheck, User, ChevronDown, CheckCircle2 } from 'lucide-react'

interface TopbarProps {
  onSearch?: (query: string) => void
  currentViewTitle: string
}

export const Topbar: React.FC<TopbarProps> = ({ onSearch, currentViewTitle }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const notifications = [
    { id: 1, title: 'Route B Weather Alert', time: '10m ago', text: 'Equatorial current push increased to +0.8 kt (Favorable).', unread: true },
    { id: 2, title: 'MV Green Voyager ETA Update', time: '1h ago', text: 'Target arrival Singapore on schedule (5d 02h).', unread: false },
    { id: 3, title: 'CII Carbon Audit Complete', time: '3h ago', text: 'August 2026 fleet emissions reduced by 11.6%.', unread: false },
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  return (
    <header className="h-16 bg-navy-900/90 border-b border-navy-700/60 px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-extrabold text-white tracking-tight capitalize">{currentViewTitle}</h1>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <span className="text-xs text-slate-400 hidden sm:inline font-mono">TORQUE IQ CONTROL CENTER</span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search vessels (e.g. MV Green Voyager), routes, ports, reports..."
            className="w-full pl-9 pr-4 py-1.5 bg-navy-950/80 border border-navy-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      {/* Right Actions & Status */}
      <div className="flex items-center gap-4">
        {/* System Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-[11px] font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All Systems Operational • 20 Ships Online</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-300 hover:text-white hover:border-cyan-500/40 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-850 border border-navy-700 rounded-xl shadow-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-navy-700 pb-2 mb-3">
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">System Notifications</h4>
                <span className="text-[10px] text-cyan-400 font-semibold">3 New</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-navy-900/80 border border-navy-800 hover:border-navy-700 transition">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-300">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-navy-700/60">
          <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-xs">
            VS
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-white leading-tight">Capt. V. Sharma</p>
            <p className="text-[10px] text-slate-400">Fleet Superintendent</p>
          </div>
        </div>
      </div>
    </header>
  )
}
