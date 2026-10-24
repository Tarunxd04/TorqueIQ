import React, { useState } from 'react'
import { DEFAULT_MUMBAI_SINGAPORE_ROUTES } from '../../data/routesData'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { RouteComparisonTable } from '../voyage/RouteComparisonTable'
import { MapPin, Navigation, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const RoutesView: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState('route-eco')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Compass className="w-4 h-4 text-[#174D3F]" />
            <span>Navigation Corridor Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">Route Intelligence & Corridor Analysis</h1>
          <p className="text-sm text-[#666666] mt-1">
            Comparing candidate oceanic corridors across distance, weather drag factors, and simulated bunker fuel consumption.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" size="md" dot>
            Current Selection: {DEFAULT_MUMBAI_SINGAPORE_ROUTES.find(r => r.id === activeRouteId)?.name || 'Eco Corridor'}
          </Badge>
        </div>
      </div>

      {/* Real-World Map Visual */}
      <div className="bg-white border border-[#E5E3DA] p-2 rounded-2xl shadow-card">
        <MaritimeMapSvg selectedRouteId={activeRouteId} showAllRoutes={true} height={480} />
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DEFAULT_MUMBAI_SINGAPORE_ROUTES.map((route) => {
          const isSelected = activeRouteId === route.id
          const isRec = route.isRecommended

          return (
            <div
              key={route.id}
              onClick={() => setActiveRouteId(route.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 relative bg-white ${
                isSelected
                  ? 'border-[#F15F56] ring-1 ring-[#F15F56] shadow-card'
                  : isRec
                  ? 'border-[#D2E4DC] hover:border-[#174D3F]'
                  : 'border-[#E5E3DA] hover:border-[#D6D3C7]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#777777] uppercase">{route.code}</span>
                <div className="flex items-center gap-1.5">
                  {isRec && <Badge variant="green" size="sm" dot>AI RECOMMENDED</Badge>}
                  {route.id === 'route-standard' && <Badge variant="gray" size="sm">ORIGINAL ROUTE</Badge>}
                  {route.id === 'route-fast' && <Badge variant="cyan" size="sm">FAST TRANSIT</Badge>}
                </div>
              </div>

              <h3 className="text-sm font-semibold text-[#191919] mb-1 flex items-center justify-between">
                <span>{route.name}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F15F56]" />}
              </h3>
              <p className="text-xs text-[#777777] mb-4 leading-relaxed">{route.pathDescription}</p>

              <div className="pt-3 border-t border-[#E5E3DA] grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="text-left">
                  <span className="text-[#777777] text-[10px] block text-left">Distance:</span>
                  <span className="font-semibold text-[#191919] text-left">{route.distanceNM.toLocaleString()} NM</span>
                </div>
                <div className="text-right">
                  <span className="text-[#777777] text-[10px] block text-right">Est. Fuel:</span>
                  <span className={`font-semibold ${isRec ? 'text-[#174D3F]' : 'text-[#191919]'} text-right`}>
                    {route.fuelConsumptionTonnes} t
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E3DA] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#777777]">Weather Risk: <strong className="text-[#191919]">{route.weatherRisk}</strong></span>
                <button
                  type="button"
                  className={`text-[11px] font-medium px-3 py-1 rounded-lg transition-colors ${
                    isSelected ? 'bg-[#FDF1F0] text-[#D84B42]' : 'bg-[#F5F5EF] text-[#191919] hover:bg-[#EAE8DE]'
                  }`}
                >
                  {isSelected ? 'Active Preview' : 'Select'}
                </button>
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
