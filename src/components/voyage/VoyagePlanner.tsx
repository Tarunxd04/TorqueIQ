import React, { useState } from 'react'
import { PORTS_LIST, FLEET_SHIPS } from '../../data/shipsData'
import { VoyagePlanInput, OptimizationResult } from '../../types/maritime'
import { runVoyageOptimization } from '../../utils/calculations'
import { Card } from '../common/Card'
import { AnalysisLoading } from './AnalysisLoading'
import { RecommendationCard } from './RecommendationCard'
import { RouteComparisonTable } from './RouteComparisonTable'
import { SpeedOptimizationChart } from './SpeedOptimizationChart'
import { ShipComparisonTable } from './ShipComparisonTable'
import { WeatherForecastTimeline } from './WeatherForecastTimeline'
import { AiRecommendationPanel } from './AiRecommendationPanel'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Navigation, Play, RefreshCw, Compass } from 'lucide-react'

interface VoyagePlannerProps {
  autoAnalyze?: boolean
}

export const VoyagePlanner: React.FC<VoyagePlannerProps> = () => {
  const [formInput, setFormInput] = useState<VoyagePlanInput>({
    origin: 'Chennai',
    destination: 'Singapore',
    cargoTonnes: 65000,
    arrivalDate: '2026-09-05T14:00',
    selectedShipId: 'ship-0'
  })

  const [selectedOptionId, setSelectedOptionId] = useState<string>('route-eco')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(() => {
    return runVoyageOptimization(formInput)
  })

  const handleInputChange = (field: keyof VoyagePlanInput, value: any) => {
    setFormInput(prev => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
  }

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false)
    const res = runVoyageOptimization(formInput)
    setOptimizationResult(res)
  }

  const activeOption = optimizationResult?.fourCandidateOptions.find(o => o.id === selectedOptionId) ||
                       optimizationResult?.fourCandidateOptions[1] ||
                       optimizationResult?.fourCandidateOptions[0]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Core AI Voyage Engine</span>
          </div>
          <h2 className="text-2xl font-black text-white">Voyage Planner & Multi-Criteria Decision Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select origin, destination, cargo load, and arrival windows to analyze fleet vessels and route options.
          </p>
        </div>

        {optimizationResult && (
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white border border-navy-700 hover:border-cyan-500/40 text-xs font-bold transition flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Re-Analyze Voyage</span>
          </button>
        )}
      </div>

      {/* VOYAGE INPUT FORM */}
      <Card title="1. Configure Voyage Parameters" subtitle="Specify operational constraints for AI synthesis">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Origin Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Origin Port</label>
            <select
              value={formInput.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs font-medium text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              {PORTS_LIST.map((port) => (
                <option key={port.id} value={port.name}>{port.name} ({port.code}) — {port.country}</option>
              ))}
            </select>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Destination Port</label>
            <select
              value={formInput.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs font-medium text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              {PORTS_LIST.map((port) => (
                <option key={port.id} value={port.name}>{port.name} ({port.code}) — {port.country}</option>
              ))}
            </select>
          </div>

          {/* Cargo Load */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Cargo Load (tonnes)</label>
            <input
              type="number"
              value={formInput.cargoTonnes}
              onChange={(e) => handleInputChange('cargoTonnes', Number(e.target.value))}
              placeholder="e.g. 65,000"
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Required Arrival Date */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Required Arrival</label>
            <input
              type="datetime-local"
              value={formInput.arrivalDate}
              onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Available Ships Filter */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Ship Selection</label>
            <select
              value={formInput.selectedShipId}
              onChange={(e) => handleInputChange('selectedShipId', e.target.value)}
              className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs font-medium text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="ALL">All Available Ships (20 Vessels)</option>
              {FLEET_SHIPS.map((ship) => (
                <option key={ship.id} value={ship.id}>{ship.name} ({ship.type})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition flex items-center gap-3 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-navy-950" />
            <span>ANALYZE VOYAGE</span>
          </button>
        </div>
      </Card>

      {/* ANALYSIS LOADING ANIMATION */}
      {isAnalyzing && (
        <AnalysisLoading
          onComplete={handleAnalysisComplete}
          origin={formInput.origin}
          destination={formInput.destination}
        />
      )}

      {/* RESULTS DISPLAY */}
      {!isAnalyzing && optimizationResult && (
        <div className="space-y-8 animate-fade-in">
          {/* REAL-WORLD MARITIME GEOGRAPHIC MAP & TELEMETRY TRACKING SUITE */}
          <MaritimeMapSvg
            origin={formInput.origin}
            destination={formInput.destination}
            selectedShipName={
              FLEET_SHIPS.find(s => s.id === formInput.selectedShipId)?.name || 'MV Ocean Star'
            }
            selectedRouteId={selectedOptionId}
            onRouteSelect={(rId) => setSelectedOptionId(rId)}
            height={550}
          />

          {/* 4 Candidate Voyage Options Selection Component */}
          <RecommendationCard
            result={optimizationResult}
            selectedOptionId={selectedOptionId}
            onSelectOption={(optId) => setSelectedOptionId(optId)}
          />

          {/* AI Rationale & Optimization Score */}
          <AiRecommendationPanel result={optimizationResult} />

          {/* Route Comparison Matrix */}
          <RouteComparisonTable routes={optimizationResult.routeOptions} />

          {/* Speed Optimization Chart */}
          <SpeedOptimizationChart
            speedCurvePoints={optimizationResult.speedCurvePoints}
            optimalSpeed={activeOption?.speedKnots || optimizationResult.recommendedSpeedKnots}
          />

          {/* Weather Forecast Timeline */}
          <WeatherForecastTimeline timeline={optimizationResult.forecastTimeline} />

          {/* Candidate Ships Comparison Table */}
          <ShipComparisonTable ships={optimizationResult.shipComparisonList} />
        </div>
      )}
    </div>
  )
}
