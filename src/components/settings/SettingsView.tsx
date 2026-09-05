import React, { useState } from 'react'
import { Card } from '../common/Card'
import {
  Settings,
  Save,
  User,
  Bell,
  Fuel,
  Sliders,
  CheckCircle2,
  RotateCcw,
  Database,
  Gauge
} from 'lucide-react'

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'fleet' | 'fuel' | 'automation' | 'notifications' | 'system'>('profile')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [toastMessage, setToastMessage] = useState('Settings updated successfully!')

  const defaultSettings = {
    userName: 'Capt. V. Sharma',
    userRole: 'Fleet Superintendent & Marine Operations Lead',
    email: 'v.sharma@greenroute-maritime.com',
    companyName: 'GreenRoute Ocean Carriers',
    defaultCargoTonnes: 65000,
    minSpeedKnots: 10,
    maxSpeedKnots: 20,
    reserveFuelMarginPct: 15,
    fuelPriceUSD: 700,
    co2Factor: 3.145,
    sulfurContentLimitPct: 0.5,
    ciiTargetGrade: 'Grade A',
    autoWeatherReroute: true,
    maxWaveHeightThresholdM: 2.5,
    maxWindThresholdKnots: 25,
    speedToleranceKnots: 0.5,
    alertEmailETA: true,
    alertSMSCII: true,
    alertWeatherFronts: true,
    darkMode: true
  }

  const [formData, setFormData] = useState(defaultSettings)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setToastMessage('Configurations saved to local enterprise store!')
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handleReset = () => {
    setFormData(defaultSettings)
    setToastMessage('Preferences restored to factory defaults!')
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Settings Top Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono font-semibold text-brand-cyan uppercase tracking-widest mb-1.5">
            <Settings className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Enterprise Fleet Control Panel</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Torque IQ System Settings</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl font-normal">
            Configure global hydrodynamic parameters, marine bunker reference prices, MARPOL CO₂ emission constants, and automated weather thresholds.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'profile', label: 'Profile & Account', icon: User },
          { id: 'fleet', label: 'Fleet Constraints', icon: Gauge },
          { id: 'fuel', label: 'Fuel & MARPOL CO₂', icon: Fuel },
          { id: 'automation', label: 'Weather Automation', icon: Sliders },
          { id: 'notifications', label: 'Alerts & Triggers', icon: Bell },
          { id: 'system', label: 'Backup & Reset', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
                isActive
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Settings Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: PROFILE & ACCOUNT */}
        {activeTab === 'profile' && (
          <Card title="Fleet Manager Profile & Designation" subtitle="Personal and operational credentials">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="input-tech w-full"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Designation / Role</label>
                <input
                  type="text"
                  value={formData.userRole}
                  onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                  className="input-tech w-full"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Enterprise Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-tech w-full"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Shipping Line / Organization</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="input-tech w-full"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 2: FLEET PARAMETERS */}
        {activeTab === 'fleet' && (
          <Card title="Fleet & Hydrodynamic Operating Constraints" subtitle="Global baseline parameters for candidate voyage simulations">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Default Voyage Cargo (DWT tonnes)</label>
                <input
                  type="number"
                  value={formData.defaultCargoTonnes}
                  onChange={(e) => setFormData({ ...formData, defaultCargoTonnes: parseInt(e.target.value) || 0 })}
                  className="input-tech w-full font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Minimum Speed Limit (knots)</label>
                <input
                  type="number"
                  value={formData.minSpeedKnots}
                  onChange={(e) => setFormData({ ...formData, minSpeedKnots: parseFloat(e.target.value) || 0 })}
                  className="input-tech w-full font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Maximum Speed Limit (knots)</label>
                <input
                  type="number"
                  value={formData.maxSpeedKnots}
                  onChange={(e) => setFormData({ ...formData, maxSpeedKnots: parseFloat(e.target.value) || 0 })}
                  className="input-tech w-full font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Reserve Fuel Buffer (%)</label>
                <input
                  type="number"
                  value={formData.reserveFuelMarginPct}
                  onChange={(e) => setFormData({ ...formData, reserveFuelMarginPct: parseInt(e.target.value) || 0 })}
                  className="input-tech w-full font-mono"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 3: FUEL & EMISSIONS */}
        {activeTab === 'fuel' && (
          <Card title="Marine Fuel Pricing & IMO Emissions Constants" subtitle="MARPOL Annex VI and IMO MEPC benchmark factors">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Bunker Fuel Reference Price ($/t)</label>
                <input
                  type="number"
                  value={formData.fuelPriceUSD}
                  onChange={(e) => setFormData({ ...formData, fuelPriceUSD: parseFloat(e.target.value) || 0 })}
                  className="input-tech w-full font-mono text-amber-400 font-bold"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">CO₂ Factor (t CO₂ / t fuel)</label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.co2Factor}
                  onChange={(e) => setFormData({ ...formData, co2Factor: parseFloat(e.target.value) || 0 })}
                  className="input-tech w-full font-mono text-brand-emerald font-bold"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5 font-medium">Fuel Sulfur Cap Limit (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sulfurContentLimitPct}
                  onChange={(e) => setFormData({ ...formData, sulfurContentLimitPct: parseFloat(e.target.value) || 0 })}
                  className="input-tech w-full font-mono"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 4: AUTOMATION */}
        {activeTab === 'automation' && (
          <Card title="Weather Rerouting & Dynamic Rules" subtitle="Automated decision support triggers">
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-card border border-white/[0.06]">
                <div>
                  <span className="font-semibold text-white block">Auto-Reroute on Swell Threshold</span>
                  <span className="text-neutral-400 text-[11px]">Automatically recommend alternate navigational corridor if wave height exceeds {formData.maxWaveHeightThresholdM}m</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoWeatherReroute}
                  onChange={(e) => setFormData({ ...formData, autoWeatherReroute: e.target.checked })}
                  className="w-4 h-4 accent-brand-primary cursor-pointer rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 block mb-1.5 font-medium">Max Wave Height Limit (meters)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.maxWaveHeightThresholdM}
                    onChange={(e) => setFormData({ ...formData, maxWaveHeightThresholdM: parseFloat(e.target.value) || 0 })}
                    className="input-tech w-full font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5 font-medium">Max Wind Velocity Limit (knots)</label>
                  <input
                    type="number"
                    value={formData.maxWindThresholdKnots}
                    onChange={(e) => setFormData({ ...formData, maxWindThresholdKnots: parseInt(e.target.value) || 0 })}
                    className="input-tech w-full font-mono"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* TAB 5: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <Card title="Enterprise Alerts & Compliance Warning Thresholds" subtitle="Configure automated notifications">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-card border border-white/[0.06]">
                <div>
                  <span className="font-semibold text-white block">ETA Variance Alert</span>
                  <span className="text-neutral-400 text-[11px]">Dispatch notification when weather delays cause ETA deviation &gt; 2.0 hours</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertEmailETA}
                  onChange={(e) => setFormData({ ...formData, alertEmailETA: e.target.checked })}
                  className="w-4 h-4 accent-brand-primary cursor-pointer rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-card border border-white/[0.06]">
                <div>
                  <span className="font-semibold text-white block">CII Rating Degradation Warning</span>
                  <span className="text-neutral-400 text-[11px]">Immediate alert if real-time voyage carbon intensity drops below Grade B benchmark</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertSMSCII}
                  onChange={(e) => setFormData({ ...formData, alertSMSCII: e.target.checked })}
                  className="w-4 h-4 accent-brand-primary cursor-pointer rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-card border border-white/[0.06]">
                <div>
                  <span className="font-semibold text-white block">Oceanic Monsoon & Tropical Storm Alerts</span>
                  <span className="text-neutral-400 text-[11px]">Push high-priority telemetry when intersecting severe sea condition zones</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertWeatherFronts}
                  onChange={(e) => setFormData({ ...formData, alertWeatherFronts: e.target.checked })}
                  className="w-4 h-4 accent-brand-primary cursor-pointer rounded"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 6: BACKUP & SYSTEM RESET */}
        {activeTab === 'system' && (
          <Card title="System Data Backup & Factory Reset" subtitle="Manage persistent settings state">
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-surface-card border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-white block">Export System Configuration Backup</span>
                  <span className="text-neutral-400 text-[11px]">Download active vessel parameters and custom settings as JSON</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2))
                    const dlAnchorElem = document.createElement('a')
                    dlAnchorElem.setAttribute("href", dataStr)
                    dlAnchorElem.setAttribute("download", "TorqueIQ_Settings_Backup.json")
                    dlAnchorElem.click()
                  }}
                  className="btn-secondary text-xs px-3.5 py-2 font-mono shrink-0"
                >
                  Export JSON Backup
                </button>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-rose-300 block">Restore Factory Defaults</span>
                  <span className="text-neutral-400 text-[11px]">Reset all bunker prices, speed limits, and simulation defaults to baseline</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-medium transition flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Bottom Save Action Bar */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 px-6 py-2.5 text-xs font-semibold"
          >
            <Save className="w-4 h-4" />
            <span>Save System Configurations</span>
          </button>
        </div>
      </form>
    </div>
  )
}
