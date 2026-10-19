import React, { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { LandingPage } from './components/landing/LandingPage'
import { DashboardOverview } from './components/dashboard/DashboardOverview'
import { VoyagePlanner } from './components/voyage/VoyagePlanner'
import { FleetView } from './components/fleet/FleetView'
import { RoutesView } from './components/routes/RoutesView'
import { AnalyticsView } from './components/analytics/AnalyticsView'
import { WeatherView } from './components/weather/WeatherView'
import { OptimizationView } from './components/optimization/OptimizationView'
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator'
import { CarbonView } from './components/carbon/CarbonView'
import { CargoTypeView } from './components/cargo/CargoTypeView'
import { ReportsView } from './components/reports/ReportsView'
import { SettingsView } from './components/settings/SettingsView'
import { Footer } from './components/layout/Footer'

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing')

  const handleSelectView = (view: string) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#F5F5EF] text-[#191919] font-sans selection:bg-[#F15F56] selection:text-white flex flex-col">
      {/* PERMANENT HEADER — Always visible across all views */}
      <Navbar
        onNavigateToDashboard={handleSelectView}
        activeView={currentView}
      />

      {/* BODY — Changes based on selected view */}
      <main className="w-full flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigateToPlanner={() => handleSelectView('planner')}
            onNavigateToFleet={() => handleSelectView('fleet')}
            onNavigateToView={handleSelectView}
          />
        )}

        {currentView !== 'landing' && (
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {currentView === 'overview' && <DashboardOverview onNavigateToView={handleSelectView} />}
            {currentView === 'planner' && <VoyagePlanner />}
            {currentView === 'fleet' && <FleetView />}
            {currentView === 'routes' && <RoutesView />}
            {currentView === 'analytics' && <AnalyticsView />}
            {currentView === 'carbon' && <CarbonView />}
            {currentView === 'weather' && <WeatherView />}
            {currentView === 'optimization' && <OptimizationView />}
            {currentView === 'simulator' && <WhatIfSimulator />}
            {currentView === 'cargo' && <CargoTypeView />}
            {currentView === 'reports' && <ReportsView />}
            {currentView === 'settings' && <SettingsView />}
          </div>
        )}
      </main>

      {/* FOOTER — For all views */}
      {currentView !== 'landing' && <Footer />}
    </div>
  )
}

export default App
