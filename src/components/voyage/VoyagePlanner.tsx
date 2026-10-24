import React, { useState, useEffect } from 'react'
import { PORTS_LIST, FLEET_SHIPS } from '../../data/shipsData'
import { VoyagePlanInput, OptimizationResult } from '../../types/maritime'
import { runVoyageOptimization } from '../../utils/calculations'
import { useAuth } from '../../context/AuthContext'
import { Card } from '../common/Card'
import { AnalysisLoading } from './AnalysisLoading'
import { RecommendationCard } from './RecommendationCard'
import { RouteComparisonTable } from './RouteComparisonTable'
import { SpeedOptimizationChart } from './SpeedOptimizationChart'
import { ShipComparisonTable } from './ShipComparisonTable'
import { WeatherForecastTimeline } from './WeatherForecastTimeline'
import { AiRecommendationPanel } from './AiRecommendationPanel'
import { MaritimeMapSvg } from '../map/MaritimeMapSvg'
import {
  Compass,
  Play,
  RefreshCw,
  BookmarkPlus,
  CheckCircle2,
  X,
  FileCheck
} from 'lucide-react'

interface VoyagePlannerProps {
  autoAnalyze?: boolean
}

export const VoyagePlanner: React.FC<VoyagePlannerProps> = () => {
  const {
    isAuthenticated,
    openAuthModal,
    savePlan,
    loadedPlanToExecute,
    clearLoadedPlan
  } = useAuth()

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

  // Save plan dialog state
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [planNameInput, setPlanNameInput] = useState('')
  const [saveSuccessToast, setSaveSuccessToast] = useState(false)

  // Listen to plan loaded from Profile Drawer
  useEffect(() => {
    if (loadedPlanToExecute) {
      const newInput: VoyagePlanInput = {
        origin: loadedPlanToExecute.origin,
        destination: loadedPlanToExecute.destination,
        cargoTonnes: loadedPlanToExecute.cargoTonnes,
        arrivalDate: loadedPlanToExecute.arrivalDate,
        selectedShipId: loadedPlanToExecute.selectedShipId
      }
      setFormInput(newInput)
      setSelectedOptionId(loadedPlanToExecute.selectedOptionId)
      const res = runVoyageOptimization(newInput)
      setOptimizationResult(res)
      clearLoadedPlan()
    }
  }, [loadedPlanToExecute, clearLoadedPlan])

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

  const handleOpenSaveModal = () => {
    if (!isAuthenticated) {
      openAuthModal('login')
      return
    }
    const defaultName = `${formInput.origin} to ${formInput.destination} — ${activeOption?.badgeText || 'Eco Optimal'}`
    setPlanNameInput(defaultName)
    setSaveModalOpen(true)
  }

  const handleConfirmSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!optimizationResult || !activeOption) return

    const ship = activeOption.ship || optimizationResult.bestShip
    savePlan({
      planName: planNameInput.trim() || `${formInput.origin} to ${formInput.destination} — ${activeOption.badgeText}`,
      origin: formInput.origin,
      destination: formInput.destination,
      selectedShipId: formInput.selectedShipId,
      vesselName: ship.name,
      vesselType: ship.type,
      cargoTonnes: formInput.cargoTonnes,
      arrivalDate: formInput.arrivalDate,
      selectedOptionId: selectedOptionId,
      recommendedSpeedKnots: activeOption.speedKnots,
      estimatedFuelTonnes: activeOption.expectedFuelTonnes,
      estimatedFuelCostUSD: activeOption.estimatedCostUSD,
      estimatedCO2Tonnes: activeOption.expectedCo2Tonnes,
      estimatedDurationHours: activeOption.etaHours,
      estimatedArrivalFormatted: activeOption.etaFormatted,
      distanceNM: optimizationResult.totalDistanceNM,
      savingsFuelPct: optimizationResult.savings.fuelPct,
      savingsCostUSD: optimizationResult.savings.costUSD,
      optimizationScore: optimizationResult.optimizationScore
    })

    setSaveModalOpen(false)
    setSaveSuccessToast(true)
    setTimeout(() => setSaveSuccessToast(false), 3500)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white border border-[#E5E3DA] p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Compass className="w-4 h-4 text-[#174D3F]" />
            <span>AI Hydrodynamic Optimization Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
            Voyage Planner & Decision Matrix
          </h1>
          <p className="text-sm text-[#666666] mt-1 max-w-2xl leading-relaxed">
            Configure origin, destination, cargo payload, and berth arrival deadlines to synthesize Pareto-optimal routes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {saveSuccessToast && (
            <div className="px-3.5 py-2 rounded-xl bg-[#EDF5F2] border border-[#D2E4DC] text-[#174D3F] text-xs font-medium flex items-center gap-1.5 animate-fade-in shadow-subtle">
              <CheckCircle2 className="w-4 h-4 text-[#174D3F]" />
              <span>Plan Saved to Profile!</span>
            </div>
          )}

          {optimizationResult && (
            <>
              <button
                onClick={handleOpenSaveModal}
                className="btn-coral px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>Save Voyage Plan</span>
              </button>

              <button
                onClick={handleAnalyze}
                className="btn-outline-warm px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#174D3F]" />
                <span>Re-Analyze</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* VOYAGE INPUT FORM */}
      <Card title="1. Configure Operational Constraints" subtitle="Specify voyage variables for hydrodynamic speed-power optimization">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Origin Dropdown */}
          <div>
            <label className="text-xs font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Origin Port</label>
            <select
              value={formInput.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className="input-warm w-full px-3 py-2.5 text-sm font-medium bg-white border border-[#E5E3DA] rounded-xl"
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
            <label className="text-xs font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Destination Port</label>
            <select
              value={formInput.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="input-warm w-full px-3 py-2.5 text-sm font-medium bg-white border border-[#E5E3DA] rounded-xl"
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
            <label className="text-xs font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Cargo Payload (DWT tonnes)</label>
            <input
              type="number"
              value={formInput.cargoTonnes}
              onChange={(e) => handleInputChange('cargoTonnes', Number(e.target.value))}
              placeholder="e.g. 65,000"
              className="input-warm w-full px-3 py-2.5 text-sm font-mono border border-[#E5E3DA] rounded-xl"
            />
          </div>

          {/* Required Arrival Date */}
          <div>
            <label className="text-xs font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Target Arrival Time</label>
            <input
              type="datetime-local"
              value={formInput.arrivalDate}
              onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
              className="input-warm w-full px-3 py-2.5 text-sm font-mono border border-[#E5E3DA] rounded-xl"
            />
          </div>

          {/* Available Ships Filter */}
          <div>
            <label className="text-xs font-mono font-semibold text-[#777777] uppercase tracking-wider block mb-2">Vessel Assignment</label>
            <select
              value={formInput.selectedShipId}
              onChange={(e) => handleInputChange('selectedShipId', e.target.value)}
              className="input-warm w-full px-3 py-2.5 text-sm font-medium bg-white border border-[#E5E3DA] rounded-xl"
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
            className="btn-coral w-full sm:w-auto px-8 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
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

      {/* SAVE VOYAGE PLAN MODAL */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E5E3DA] rounded-2xl shadow-dropdown max-w-md w-full p-6 text-[#191919] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DA]">
              <div className="flex items-center gap-2">
                <BookmarkPlus className="w-5 h-5 text-[#174D3F]" />
                <h3 className="font-bold text-base text-[#191919]">Save Voyage Plan to Profile</h3>
              </div>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="p-1 rounded-lg text-[#777777] hover:text-[#191919] hover:bg-[#F5F5EF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191919] mb-1.5">
                  Plan Name / Label
                </label>
                <input
                  type="text"
                  required
                  value={planNameInput}
                  onChange={(e) => setPlanNameInput(e.target.value)}
                  className="input-warm w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  placeholder="e.g. Chennai-Singapore Eco Corridor"
                />
              </div>

              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E5E3DA] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#777777]">
                  <span>Corridor:</span>
                  <span className="font-semibold text-[#191919]">{formInput.origin} ➔ {formInput.destination}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Vessel:</span>
                  <span className="font-semibold text-[#191919]">{activeOption?.ship.name || 'MV Ocean Star'}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Speed / ETA:</span>
                  <span className="font-semibold text-[#174D3F]">{activeOption?.speedKnots} kts ({activeOption?.etaFormatted})</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Fuel Burn:</span>
                  <span className="font-semibold text-[#191919]">{activeOption?.expectedFuelTonnes} Tonnes</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E3DA] hover:bg-[#F9F9F6] text-xs font-medium text-[#777777]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-coral px-5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Confirm & Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
