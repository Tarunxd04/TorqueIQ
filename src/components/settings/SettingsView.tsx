import React, { useState } from 'react'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import {
  Settings,
  Save,
  User,
  ShieldCheck,
  Bell,
  Fuel,
  Leaf,
  Sliders,
  CheckCircle2,
  RotateCcw,
  Database,
  Globe,
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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Enterprise SaaS Control Panel</span>
          </div>
          <h2 className="text-2xl font-black text-white">Torque IQ System Settings</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage fleet operations, bunker reference pricing, MARPOL emission limits, and automated warning thresholds.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-navy-700/80 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'profile', label: 'Profile & Account', icon: User },
          { id: 'fleet', label: 'Fleet & Vessels', icon: Gauge },
          { id: 'fuel', label: 'Fuel & MARPOL CO₂', icon: Fuel },
          { id: 'automation', label: 'Weather Automation', icon: Sliders },
          { id: 'notifications', label: 'Alerts & Warnings', icon: Bell },
          { id: 'system', label: 'Backup & Reset', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                isActive
                  ? 'bg-cyan-500 text-navy-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-navy-900 border border-navy-800 text-slate-300 hover:text-white hover:border-navy-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Settings Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: PROFILE & ACCOUNT */}
        {activeTab === 'profile' && (
          <Card title="Fleet Manager Profile & Designation" subtitle="Personal and organization credentials">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-medium focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Designation / Title</label>
                <input
                  type="text"
                  value={formData.userRole}
                  onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-medium focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Enterprise Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-medium focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Company / Shipping Line</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-medium focus:border-cyan-500"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 2: FLEET PARAMETERS */}
        {activeTab === 'fleet' && (
          <Card title="Fleet & Hydrodynamic Operating Constraints" subtitle="Global vessel operational limits">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-bold">Default Voyage Cargo (tonnes)</label>
                <input
                  type="number"
                  value={formData.defaultCargoTonnes}
                  onChange={(e) => setFormData({ ...formData, defaultCargoTonnes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Minimum Speed Limit (knots)</label>
                <input
                  type="number"
                  value={formData.minSpeedKnots}
                  onChange={(e) => setFormData({ ...formData, minSpeedKnots: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Maximum Speed Limit (knots)</label>
                <input
                  type="number"
                  value={formData.maxSpeedKnots}
                  onChange={(e) => setFormData({ ...formData, maxSpeedKnots: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Reserve Fuel Buffer (%)</label>
                <input
                  type="number"
                  value={formData.reserveFuelMarginPct}
                  onChange={(e) => setFormData({ ...formData, reserveFuelMarginPct: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 3: FUEL & EMISSIONS */}
        {activeTab === 'fuel' && (
          <Card title="Marine Fuel Pricing & IMO Emissions Constants" subtitle="MARPOL Annex VI & CII benchmarks">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-bold">Bunker Fuel Reference Price ($/t)</label>
                <input
                  type="number"
                  value={formData.fuelPriceUSD}
                  onChange={(e) => setFormData({ ...formData, fuelPriceUSD: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-amber-400 font-mono font-bold focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">CO₂ Factor (t CO₂ / t fuel)</label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.co2Factor}
                  onChange={(e) => setFormData({ ...formData, co2Factor: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-emerald-400 font-mono font-bold focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-bold">Fuel Sulfur Cap Limit (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sulfurContentLimitPct}
                  onChange={(e) => setFormData({ ...formData, sulfurContentLimitPct: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 4: AUTOMATION */}
        {activeTab === 'automation' && (
          <Card title="Weather Rerouting & Automated Speed Rules" subtitle="System auto-rerouting logic">
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900 border border-navy-800">
                <div>
                  <span className="font-bold text-white block">Auto-Reroute on Swell Threshold</span>
                  <span className="text-slate-400">Automatically switch candidate route if wave height exceeds {formData.maxWaveHeightThresholdM}m</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoWeatherReroute}
                  onChange={(e) => setFormData({ ...formData, autoWeatherReroute: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Max Wave Height Limit (meters)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.maxWaveHeightThresholdM}
                    onChange={(e) => setFormData({ ...formData, maxWaveHeightThresholdM: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Max Wind Velocity Limit (knots)</label>
                  <input
                    type="number"
                    value={formData.maxWindThresholdKnots}
                    onChange={(e) => setFormData({ ...formData, maxWindThresholdKnots: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-white font-mono focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* TAB 5: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <Card title="Enterprise Alerts & Compliance Warning Thresholds" subtitle="Notification preferences">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900 border border-navy-800">
                <div>
                  <span className="font-bold text-white block">ETA Delay Notifications</span>
                  <span className="text-slate-400">Send email alert if ETA shifts by more than 2 hours</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertEmailETA}
                  onChange={(e) => setFormData({ ...formData, alertEmailETA: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900 border border-navy-800">
                <div>
                  <span className="font-bold text-white block">CII Carbon Threshold Alert</span>
                  <span className="text-slate-400">Notify if vessel CII drops below Grade B rating</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertSMSCII}
                  onChange={(e) => setFormData({ ...formData, alertSMSCII: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900 border border-navy-800">
                <div>
                  <span className="font-bold text-white block">Weather Front Warnings</span>
                  <span className="text-slate-400">Alert captain when encountering monsoon wave fronts</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.alertWeatherFronts}
                  onChange={(e) => setFormData({ ...formData, alertWeatherFronts: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 6: BACKUP & SYSTEM RESET */}
        {activeTab === 'system' && (
          <Card title="System Data Backup & Factory Reset" subtitle="Local storage management">
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Export System Configuration Backup</span>
                  <span className="text-slate-400">Download active vessel parameters and custom settings as JSON</span>
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
                  className="px-4 py-2 rounded-lg bg-navy-800 text-cyan-400 border border-navy-700 hover:bg-navy-750 font-bold transition"
                >
                  Export JSON Backup
                </button>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-300 block">Restore Factory Defaults</span>
                  <span className="text-slate-400">Reset all fuel prices, speed limits, and preferences to baseline</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-rose-900/80 text-rose-200 border border-rose-700 hover:bg-rose-800 font-bold transition flex items-center gap-1.5"
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
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save System Configurations</span>
          </button>
        </div>
      </form>
    </div>
  )
}
