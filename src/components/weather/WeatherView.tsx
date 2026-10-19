import React from 'react'
import { CURRENT_OCEAN_WEATHER, SIMULATED_FORECAST_TIMELINE } from '../../data/weatherData'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { WeatherForecastTimeline } from '../voyage/WeatherForecastTimeline'
import { CloudSun, Wind, Waves, Compass, Eye, Thermometer, ShieldCheck } from 'lucide-react'

export const WeatherView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <CloudSun className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>Oceanic Atmosphere Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">Ocean Weather Intelligence & Current Vectors</h1>
          <p className="text-xs text-[#777777] mt-1">
            Real-time wave resistance, surface wind vectors, and equatorial currents across Indian Ocean shipping lanes.
          </p>
        </div>

        <Badge variant="green" size="md" dot>
          Favorable Ocean Conditions (-4.8% Fuel Impact)
        </Badge>
      </div>

      {/* Main Weather Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <Wind className="w-3.5 h-3.5 text-[#174D3F]" />
            <span className="text-[10px] font-mono uppercase">Wind Speed</span>
          </div>
          <span className="text-xl font-bold text-[#191919] font-mono">{CURRENT_OCEAN_WEATHER.windSpeedKnots} kts</span>
          <span className="text-[10px] font-mono text-[#777777] block mt-0.5">{CURRENT_OCEAN_WEATHER.windDirection}</span>
        </div>

        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <Waves className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-mono uppercase">Wave Height</span>
          </div>
          <span className="text-xl font-bold text-[#191919] font-mono">{CURRENT_OCEAN_WEATHER.waveHeightM} m</span>
          <span className="text-[10px] font-mono text-[#777777] block mt-0.5">Period 7.4s</span>
        </div>

        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#174D3F]" />
            <span className="text-[10px] font-mono uppercase">Ocean Current</span>
          </div>
          <span className="text-xl font-bold text-[#174D3F] font-mono">+{CURRENT_OCEAN_WEATHER.oceanCurrentKnots} kts</span>
          <span className="text-[10px] font-mono text-[#174D3F] block mt-0.5 font-medium">Equatorial Push</span>
        </div>

        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[10px] font-mono uppercase">Sea Temp</span>
          </div>
          <span className="text-xl font-bold text-[#191919] font-mono">{CURRENT_OCEAN_WEATHER.temperatureC}°C</span>
          <span className="text-[10px] font-mono text-[#777777] block mt-0.5">Density: 1.025</span>
        </div>

        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <Eye className="w-3.5 h-3.5 text-[#174D3F]" />
            <span className="text-[10px] font-mono uppercase">Visibility</span>
          </div>
          <span className="text-xl font-bold text-[#191919] font-mono">{CURRENT_OCEAN_WEATHER.visibilityKM} km</span>
          <span className="text-[10px] font-mono text-[#174D3F] block mt-0.5">Clear Atmosphere</span>
        </div>

        <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
          <div className="flex items-center gap-2 text-[#777777] text-xs mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#174D3F]" />
            <span className="text-[10px] font-mono uppercase">Risk Level</span>
          </div>
          <span className="text-xl font-bold text-[#174D3F] font-mono">Minimal</span>
          <span className="text-[10px] font-mono text-[#777777] block mt-0.5">Calm Waters</span>
        </div>
      </div>

      {/* Forecast Timeline Component */}
      <WeatherForecastTimeline timeline={SIMULATED_FORECAST_TIMELINE} />
    </div>
  )
}
