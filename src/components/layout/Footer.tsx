import React from 'react'
import { Anchor, ArrowUpRight } from 'lucide-react'

interface FooterProps {
  onNavigateToView?: (view: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToView }) => {
  const handleModuleClick = (viewId: string) => {
    if (onNavigateToView) {
      onNavigateToView(viewId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const moduleLinks = [
    { label: 'Planner & Optimization', viewId: 'planner' },
    { label: '20-Vessel Fleet Directory', viewId: 'fleet' },
    { label: 'What-If Hydrodynamic Simulator', viewId: 'simulator' },
    { label: 'IMO CII Carbon Compliance Suite', viewId: 'carbon' },
    { label: 'Oceanic Weather & Current Routing', viewId: 'weather' },
  ]

  return (
    <footer className="border-t border-[#E5E3DA] bg-[#080808] text-[#A3A3A3] text-sm py-16 px-4 sm:px-6 lg:px-8 relative z-10 w-full reveal-fade-up">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
        {/* LEFT COLUMN: TORQUE IQ BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#174D3F] flex items-center justify-center text-white">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              Torque <span className="text-[#F15F56]">IQ</span>
            </span>
          </div>
          <p className="text-[#999999] text-sm leading-relaxed max-w-sm">
            AI-powered maritime voyage optimization and fleet intelligence platform helping shipping operators reduce fuel consumption, forecast hydrodynamic resistance, and improve fleet efficiency.
          </p>
        </div>

        {/* MIDDLE COLUMN: PLATFORM MODULES (FUNCTIONAL NAVIGATION) */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
            Platform Modules
          </h4>
          <ul className="space-y-3 text-sm text-[#999999]">
            {moduleLinks.map((item) => (
              <li key={item.viewId}>
                <button
                  type="button"
                  onClick={() => handleModuleClick(item.viewId)}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F15F56]" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN: VERIFICATION PROTOCOL */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
            Verification Protocol
          </h4>
          <p className="text-[#999999] text-sm leading-relaxed max-w-sm">
            Mathematical model calibrated against realistic Admiralty sea distances, cubic engine loads, and Indian Ocean currents.
          </p>
        </div>
      </div>

      {/* SUBTLE BOTTOM STRIP */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
        <p>© 2026 Torque IQ. All rights reserved.</p>
        <p className="font-mono text-[#666666]">React • TypeScript • Tailwind CSS • Recharts</p>
      </div>
    </footer>
  )
}
