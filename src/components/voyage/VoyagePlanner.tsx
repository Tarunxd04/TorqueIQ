import React, { useState } from 'react'
import { PORTS_LIST, FLEET_SHIPS } from '../../data/shipsData'
import { VoyagePlanInput, OptimizationResult } from '../../types/maritime'
import { runVoyageOptimization } from '../../utils/calculations'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { AnalysisLoading } from './AnalysisLoading'
import { RecommendationCard } from './RecommendationCard'
import { RouteComparisonTable } from './RouteComparisonTable'
import { SpeedOptimizationChart } from './SpeedOptimizationChart'
import { ShipComparisonTable } from './ShipComparisonTable'
import { WeatherForecastTimeline } from './WeatherForecastTimeline'
import { AiRecommendationPanel } from './AiRecommendationPanel'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import { Navigation, Play, RefreshCw, Compass, Sliders, Layers } from 'lucide-react'

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
    <div className="space-y-8 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white border border-[#E5E3DA] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>AI Hydrodynamic Optimization Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">Voyage Planner & Decision Matrix</h1>
          <p className="text-xs text-[#777777] mt-1">
            Configure origin, destination, cargo payload, and berth arrival deadlines to synthesize Pareto-optimal routes.
          </p>
        </div>

        {optimizationResult && (
          <button
            onClick={handleAnalyze}
            className="btn-outline-warm px-4 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>Re-Analyze Parameters</span>
          </button>
        )}
      </div>

      {/* VOYAGE INPUT FORM */}
      <Card title="1. Configure Operational Constraints" subtitle="Specify voyage variables for hydrodynamic speed-power optimization">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Origin Dropdown */}
          <div>
            <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Origin Port</label>
            <select
              value={formInput.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className="input-warm w-full px-3 py-2 text-xs font-medium bg-white"
            >
              {PORTS_LIST.map((port) => (
                <option key={port.id} value={port.name}>
                  {port.name} ({port.code}) — {port.country}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Destination Port</label>
            <select
              value={formInput.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="input-warm w-full px-3 py-2 text-xs font-medium bg-white"
            >
              {PORTS_LIST.map((port) => (
                <option key={port.id} value={port.name}>
                  {port.name} ({port.code}) — {port.country}
                </option>
              ))}
            </select>
          </div>

          {/* Cargo Load */}
          <div>
            <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Cargo Payload (DWT tonnes)</label>
            <input
              type="number"
              value={formInput.cargoTonnes}
              onChange={(e) => handleInputChange('cargoTonnes', Number(e.target.value))}
              placeholder="e.g. 65,000"
              className="input-warm w-full px-3 py-2 text-xs font-mono"
            />
          </div>

          {/* Required Arrival Date */}
          <div>
            <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Target Arrival Time</label>
            <input
              type="datetime-local"
              value={formInput.arrivalDate}
              onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
              className="input-warm w-full px-3 py-2 text-xs font-mono"
            />
          </div>

          {/* Available Ships Filter */}
          <div>
            <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Vessel Assignment</label>
            <select
              value={formInput.selectedShipId}
              onChange={(e) => handleInputChange('selectedShipId', e.target.value)}
              className="input-warm w-full px-3 py-2 text-xs font-medium bg-white"
            >
              <option value="ALL">All Available Fleet (20 Vessels)</option>
              {FLEET_SHIPS.map((ship) => (
                <option key={ship.id} value={ship.id}>
                  {ship.name} ({ship.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn-coral px-7 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 disabled:opacity-50 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>ANALYZE OPTIMAL VOYAGE</span>
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
          {/* MARITIME MAP & REAL-TIME VESSEL TRACKING */}
          <div className="bg-white border border-[#E5E3DA] p-2 rounded-2xl shadow-card">
            <MaritimeMapSvg
              origin={formInput.origin}
              destination={formInput.destination}
              selectedShipName={
                FLEET_SHIPS.find(s => s.id === formInput.selectedShipId)?.name || 'MV Ocean Star'
              }
              selectedRouteId={selectedOptionId}
              onRouteSelect={(rId) => setSelectedOptionId(rId)}
              height={500}
            />
          </div>

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
