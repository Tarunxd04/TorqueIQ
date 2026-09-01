import React, { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { LandingPage } from './components/landing/LandingPage'
import { DashboardOverview } from './components/dashboard/DashboardOverview'
import { VoyagePlanner } from './components/voyage/VoyagePlanner'
import { FleetView } from './components/fleet/FleetView'
import { RoutesView } from './components/routes/RoutesView'
import { WeatherView } from './components/weather/WeatherView'
import { OptimizationView } from './components/optimization/OptimizationView'
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator'
import { CarbonView } from './components/carbon/CarbonView'
import { CargoTypeView } from './components/cargo/CargoTypeView'

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing')

  const handleSelectView = (view: string) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-navy-950">
      {/* PERMANENT HEADER — Always visible across all views */}
      <Navbar
        onNavigateToDashboard={handleSelectView}
        activeView={currentView}
      />

      {/* BODY — Changes based on selected view */}
      <main className="w-full">
        {currentView === 'landing' && (
          <LandingPage
            onNavigateToPlanner={() => handleSelectView('planner')}
            onNavigateToFleet={() => handleSelectView('fleet')}
            onNavigateToView={handleSelectView}
          />
        )}

        {currentView !== 'landing' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {currentView === 'overview' && <DashboardOverview onNavigateToView={handleSelectView} />}
            {currentView === 'planner' && <VoyagePlanner />}
            {currentView === 'fleet' && <FleetView />}
            {currentView === 'routes' && <RoutesView />}
            {currentView === 'weather' && <WeatherView />}
            {currentView === 'optimization' && <OptimizationView />}
            {currentView === 'simulator' && <WhatIfSimulator />}
            {currentView === 'carbon' && <CarbonView />}
            {currentView === 'cargo' && <CargoTypeView />}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
