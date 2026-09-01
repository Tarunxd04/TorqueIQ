import React from 'react'
import { CURRENT_OCEAN_WEATHER, SIMULATED_FORECAST_TIMELINE } from '../../data/weatherData'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { WeatherForecastTimeline } from '../voyage/WeatherForecastTimeline'
import { CloudSun, Wind, Waves, Compass, Eye, Thermometer, ShieldCheck } from 'lucide-react'

export const WeatherView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <CloudSun className="w-4 h-4 text-emerald-400" />
            <span>Oceanic Atmosphere Engine</span>
          </div>
          <h2 className="text-2xl font-black text-white">Ocean Weather Intelligence & Current Vectors</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time wave resistance, surface wind vectors, and equatorial currents across Indian Ocean shipping lanes.
          </p>
        </div>

        <Badge variant="green" size="md">
          Favorable Ocean Conditions (-4.8% Fuel Impact)
        </Badge>
      </div>

      {/* Main Weather Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>Wind Speed</span>
          </div>
          <span className="text-xl font-extrabold text-white">{CURRENT_OCEAN_WEATHER.windSpeedKnots} kts</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{CURRENT_OCEAN_WEATHER.windDirection}</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Wave Height</span>
          </div>
          <span className="text-xl font-extrabold text-white">{CURRENT_OCEAN_WEATHER.waveHeightM} m</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Primary Swell Period 7.4s</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Ocean Current</span>
          </div>
          <span className="text-xl font-extrabold text-emerald-400">+{CURRENT_OCEAN_WEATHER.oceanCurrentKnots} kts</span>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">Equatorial Push</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span>Sea Temp</span>
          </div>
          <span className="text-xl font-extrabold text-white">{CURRENT_OCEAN_WEATHER.temperatureC}°C</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Surface Water</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Visibility</span>
          </div>
          <span className="text-xl font-extrabold text-white">{CURRENT_OCEAN_WEATHER.visibilityKM} km</span>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">Clear Horizons</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-850 border border-navy-700/80">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sea Condition</span>
          </div>
          <span className="text-xl font-extrabold text-emerald-400">{CURRENT_OCEAN_WEATHER.seaCondition}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Beaufort Scale 4</span>
        </div>
      </div>

      <WeatherForecastTimeline timeline={SIMULATED_FORECAST_TIMELINE} />
    </div>
  )
}
