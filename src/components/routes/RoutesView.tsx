import React, { useState } from 'react'
import { DEFAULT_MUMBAI_SINGAPORE_ROUTES } from '../../data/routesData'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { RouteComparisonTable } from '../voyage/RouteComparisonTable'
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react'

export const RoutesView: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState('route-b')

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Navigation Corridor Engine</span>
          </div>
          <h2 className="text-2xl font-black text-white">Route Intelligence & Corridor Analysis</h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparing candidate oceanic paths across distance, weather drag factors, and fuel consumption.
          </p>
        </div>
      </div>

      {/* 2D SVG Map Visual */}
      <MaritimeMapSvg selectedRouteId={activeRouteId} showAllRoutes={true} height={420} />

      {/* Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEFAULT_MUMBAI_SINGAPORE_ROUTES.map((route) => {
          const isSelected = activeRouteId === route.id

          return (
            <div
              key={route.id}
              onClick={() => setActiveRouteId(route.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-navy-850 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'bg-navy-900 border-navy-700/80 hover:border-navy-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 font-mono">{route.code}</span>
                {route.isRecommended && <Badge variant="green" size="sm">RECOMMENDED</Badge>}
              </div>

              <h4 className="text-base font-extrabold text-white mb-1">{route.name}</h4>
              <p className="text-xs text-slate-400 mb-4">{route.pathDescription}</p>

              <div className="pt-3 border-t border-navy-700/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Distance:</span>
                  <span className="font-mono font-bold text-white">{route.distanceNM} NM</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Est. Fuel:</span>
                  <span className="font-mono font-bold text-emerald-400">{route.fuelConsumptionTonnes} t</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Est. Cost:</span>
                  <span className="font-mono font-bold text-amber-400">${(route.estimatedCostUSD / 1000).toFixed(0)}K</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Weather Drag:</span>
                  <span className={`font-mono font-bold ${route.weatherImpactPct < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {route.weatherImpactPct > 0 ? `+${route.weatherImpactPct}%` : `${route.weatherImpactPct}%`}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <RouteComparisonTable routes={DEFAULT_MUMBAI_SINGAPORE_ROUTES} />
    </div>
  )
}
