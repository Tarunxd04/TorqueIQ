import React from 'react'
import { Anchor, ShieldCheck } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030305] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
              <Anchor className="w-3.5 h-3.5 text-brand-bright" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">Torque <span className="text-brand-bright">IQ</span></span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            AI-powered maritime voyage intelligence platform built for Smart India Hackathon (SIH26138). Optimizing speed, fuel consumption, and decarbonization.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold mb-3">Core Modules</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><span className="hover:text-slate-200 transition">Voyage Planner & Optimization</span></li>
            <li><span className="hover:text-slate-200 transition">20-Vessel Fleet Directory</span></li>
            <li><span className="hover:text-slate-200 transition">What-If Hydrodynamic Simulator</span></li>
            <li><span className="hover:text-slate-200 transition">IMO CII Carbon Compliance</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold mb-3">Sustainability Benchmark</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Avg 12.4% Fuel Reduction</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> 11.6% Carbon Emission Cut</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-bright" /> Real-World Nautical Physics</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> MARPOL & CII Tier A/B Rating</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold mb-3">Hackathon Protocol</h4>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            Project ID: <span className="text-white font-mono font-semibold">SIH26138</span>
          </p>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Production Grade Prototype</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <p>© 2026 Torque IQ (SIH26138). Precision Maritime Fleet Optimization.</p>
        <p className="font-mono text-slate-400">Next-Gen React × TypeScript × Recharts</p>
      </div>
    </footer>
  )
}
