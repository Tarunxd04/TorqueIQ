import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { AuthModal } from './components/auth/AuthModal'
import { ProfileDrawer } from './components/auth/ProfileDrawer'
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
    <AuthProvider>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
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

        {/* FOOTER — For all non-landing views (LandingPage has its own Footer with identical onNavigateToView) */}
        {currentView !== 'landing' && <Footer onNavigateToView={handleSelectView} />}

        {/* GLOBAL ACCOUNT OVERLAYS */}
        <AuthModal />
        <ProfileDrawer onNavigateToView={handleSelectView} />
      </div>
    </AuthProvider>
  )
}

export default App
