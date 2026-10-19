import React from 'react'
import { Anchor, ShieldCheck, ArrowUpRight } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5E3DA] bg-[#080808] text-[#A3A3A3] text-xs py-14 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#174D3F] flex items-center justify-center text-white">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              Torque <span className="text-[#F15F56]">IQ</span>
            </span>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed max-w-sm">
            AI-powered maritime voyage optimization and fleet intelligence platform helping shipping operators reduce fuel consumption, forecast hydrodynamic resistance, and improve fleet efficiency.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#191919] border border-[#262626] text-[10px] font-mono text-[#174D3F]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#E5E3DA] font-semibold">Enterprise Maritime Intelligence</span>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-white font-semibold mb-3.5">
            Platform Modules
          </h4>
          <ul className="space-y-2 text-[#888888] text-xs">
            <li><span className="hover:text-white transition cursor-pointer">Voyage Planner & Optimization</span></li>
            <li><span className="hover:text-white transition cursor-pointer">20-Vessel Fleet Directory</span></li>
            <li><span className="hover:text-white transition cursor-pointer">What-If Hydrodynamic Simulator</span></li>
            <li><span className="hover:text-white transition cursor-pointer">IMO CII Carbon Compliance Suite</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Oceanic Weather & Current Routing</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-white font-semibold mb-3.5">
            Efficiency Standards
          </h4>
          <ul className="space-y-2 text-[#888888] text-xs">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174D3F]" />
              <span>Avg 12.4% Bunker Fuel Reduction</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F15F56]" />
              <span>11.6% Net CO₂ Emissions Abatement</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Hydrodynamic Cubic Power Physics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>MARPOL Annex VI & CII Grade A</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-white font-semibold mb-3.5">
            Verification Protocol
          </h4>
          <p className="text-[#888888] text-xs leading-relaxed mb-3">
            Mathematical model calibrated against realistic Admiralty sea distances, cubic engine loads, and Indian Ocean currents.
          </p>
          <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-2 text-[#4ADE80] text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-[#4ADE80] shrink-0" />
            <span>IMO CII & MARPOL Compliant</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
        <p>© 2026 Torque IQ. All rights reserved.</p>
        <p className="font-mono text-[#777777]">React • TypeScript • Tailwind CSS • Recharts</p>
      </div>
    </footer>
  )
}
