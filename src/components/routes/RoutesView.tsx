import React, { useState } from 'react'
import { DEFAULT_MUMBAI_SINGAPORE_ROUTES } from '../../data/routesData'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { RouteComparisonTable } from '../voyage/RouteComparisonTable'
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react'

export const RoutesView: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState('route-eco')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-bright uppercase tracking-widest mb-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Navigation Corridor Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Route Intelligence & Corridor Analysis</h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparing candidate oceanic paths across distance, weather drag factors, and fuel consumption.
          </p>
        </div>
      </div>

      {/* Real-World Map Visual */}
      <MaritimeMapSvg selectedRouteId={activeRouteId} showAllRoutes={true} height={480} />

      {/* Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEFAULT_MUMBAI_SINGAPORE_ROUTES.map((route) => {
          const isSelected = activeRouteId === route.id

          return (
            <div
              key={route.id}
              onClick={() => setActiveRouteId(route.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-brand-bright shadow-[0_0_25px_rgba(94,106,210,0.2)] ring-1 ring-brand-bright'
                  : 'glass-panel hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{route.code}</span>
                {route.isRecommended && <Badge variant="green" size="sm" dot>RECOMMENDED</Badge>}
              </div>

              <h4 className="text-sm font-semibold text-white mb-1">{route.name}</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{route.pathDescription}</p>

              <div className="pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Distance:</span>
                  <span className="font-semibold text-white">{route.distanceNM} NM</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Est. Fuel:</span>
                  <span className="font-semibold text-emerald-400">{route.fuelConsumptionTonnes} t</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Comparison Table */}
      <RouteComparisonTable routes={DEFAULT_MUMBAI_SINGAPORE_ROUTES} />
    </div>
  )
}
