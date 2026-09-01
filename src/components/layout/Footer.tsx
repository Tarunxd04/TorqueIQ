import React from 'react'
import { Anchor, ShieldCheck } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-cyan-400" />
            <span className="text-base font-extrabold text-white">Torque <span className="text-cyan-400">IQ</span></span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            AI-powered maritime voyage optimization platform built for Smart India Hackathon (SIH26138). Empowering fleet managers to sail greener and operate smarter.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Core Modules</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#planner" className="hover:text-cyan-400 transition">Voyage Planner</a></li>
            <li><a href="#fleet" className="hover:text-cyan-400 transition">20-Vessel Fleet Control</a></li>
            <li><a href="#simulator" className="hover:text-cyan-400 transition">What-If Speed Simulator</a></li>
            <li><a href="#carbon" className="hover:text-cyan-400 transition">IMO CII Carbon Audit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Sustainability Targets</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Average 12.4% Fuel Reduction</li>
            <li>11.6% CO₂ Emission Cut</li>
            <li>Zero-API Dependency Architecture</li>
            <li>Fully Compliant MARPOL & CII</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Hackathon Info</h4>
          <p className="text-slate-400 leading-relaxed mb-2">
            Project ID: <span className="text-white font-mono font-bold">SIH26138</span>
          </p>
          <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Presentation Ready Demo</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© 2026 Torque IQ (SIH26138). All rights reserved.</p>
        <p>Built with React + TypeScript + Vite + Tailwind CSS + Recharts</p>
      </div>
    </footer>
  )
}
