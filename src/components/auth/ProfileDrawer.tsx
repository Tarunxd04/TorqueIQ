import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { SavedVoyagePlan } from '../../types/auth'
import {
  User,
  X,
  LogOut,
  Calendar,
  Building,
  Briefcase,
  Navigation,
  Fuel,
  TrendingDown,
  Trash2,
  ExternalLink,
  Ship,
  Compass,
  Clock,
  Sparkles,
  Settings
} from 'lucide-react'

interface ProfileDrawerProps {
  onNavigateToView: (view: string) => void
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ onNavigateToView }) => {
  const {
    currentUser,
    isProfileOpen,
    closeProfile,
    logout,
    savedPlans,
    deletePlan,
    loadPlanIntoPlanner
  } = useAuth()

  const [activeTab, setActiveTab] = useState<'plans' | 'profile'>('plans')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileOpen) {
        closeProfile()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isProfileOpen, closeProfile])

  if (!isProfileOpen || !currentUser) return null

  // Generate initials from full name
  const initials = currentUser.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || 'U'

  const handleLoadPlan = (plan: SavedVoyagePlan) => {
    loadPlanIntoPlanner(plan)
    onNavigateToView('planner')
  }

  const handleDeletePlan = (planId: string) => {
    deletePlan(planId)
    setDeleteConfirmId(null)
  }

  const formattedDate = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080808]/50 backdrop-blur-sm transition-opacity"
        onClick={closeProfile}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white border-l border-[#E5E3DA] shadow-dropdown flex flex-col justify-between text-[#191919]">
          {/* TOP DRAWER HEADER */}
          <div className="p-6 bg-[#FAF9F5] border-b border-[#E5E3DA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#174D3F] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm">
                {initials}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#191919] leading-tight">
                  {currentUser.fullName}
                </h2>
                <div className="text-xs text-[#777777] font-mono mt-0.5">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <button
              onClick={closeProfile}
              className="p-2 rounded-lg text-[#777777] hover:text-[#191919] hover:bg-[#F0EFEA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QUICK SUMMARY BADGES */}
          <div className="px-6 py-3 bg-[#F5F5EF] border-b border-[#E5E3DA] flex items-center justify-between text-xs text-[#777777]">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#174D3F]" />
              <span className="font-medium text-[#191919]">{currentUser.company || 'Independent Maritime Operator'}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined {formattedDate}</span>
            </div>
          </div>

          {/* TAB BAR */}
          <div className="px-6 pt-4 border-b border-[#E5E3DA] flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('plans')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'plans'
                  ? 'text-[#174D3F] font-bold'
                  : 'text-[#777777] hover:text-[#191919]'
              }`}
            >
              Saved Voyage Plans ({savedPlans.length})
              {activeTab === 'plans' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174D3F] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'profile'
                  ? 'text-[#174D3F] font-bold'
                  : 'text-[#777777] hover:text-[#191919]'
              }`}
            >
              Account Details
              {activeTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174D3F] rounded-full" />
              )}
            </button>
          </div>

          {/* DRAWER BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" data-lenis-prevent>
            {activeTab === 'plans' ? (
              /* SAVED VOYAGE PLANS */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#777777]">
                    Saved Routes & Hydrodynamic Decisions
                  </div>
                  <button
                    onClick={() => {
                      closeProfile()
                      onNavigateToView('planner')
                    }}
                    className="text-xs text-[#174D3F] font-medium hover:underline flex items-center gap-1"
                  >
                    <span>New Plan</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {savedPlans.length === 0 ? (
                  <div className="text-center py-12 px-4 bg-[#FAF9F5] rounded-2xl border border-dashed border-[#E5E3DA] space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#EDF5F2] text-[#174D3F] mx-auto flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-[#191919]">No Saved Voyage Plans Yet</div>
                    <p className="text-xs text-[#777777] max-w-xs mx-auto leading-relaxed">
                      Run an optimization in the Voyage Planner and click &ldquo;Save Plan&rdquo; to store and review recommended routes here.
                    </p>
                    <button
                      onClick={() => {
                        closeProfile()
                        onNavigateToView('planner')
                      }}
                      className="btn-coral px-4 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open Voyage Planner</span>
                    </button>
                  </div>
                ) : (
                  savedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white border border-[#E5E3DA] hover:border-[#D2E4DC] rounded-xl p-4 shadow-subtle hover:shadow-card transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-[#191919] leading-snug">
                            {plan.planName}
                          </div>
                          <div className="text-[11px] text-[#777777] flex items-center gap-1.5 mt-0.5">
                            <span className="font-semibold text-[#174D3F]">{plan.origin}</span>
                            <span>➔</span>
                            <span className="font-semibold text-[#174D3F]">{plan.destination}</span>
                            <span>•</span>
                            <span>{new Date(plan.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EDF5F2] text-[#174D3F] border border-[#D2E4DC]">
                          Score {plan.optimizationScore}
                        </span>
                      </div>

                      {/* Vessel & Key Decision Stats */}
                      <div className="grid grid-cols-3 gap-2 bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E5E3DA] text-xs">
                        <div>
                          <div className="text-[10px] text-[#777777] font-mono">Vessel / Speed</div>
                          <div className="font-semibold text-[#191919] truncate">{plan.vesselName}</div>
                          <div className="text-[10px] text-[#174D3F] font-mono">{plan.recommendedSpeedKnots} kts</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#777777] font-mono">Bunker Fuel</div>
                          <div className="font-semibold text-[#191919]">{plan.estimatedFuelTonnes} T</div>
                          <div className="text-[10px] text-emerald-600 font-mono">-{plan.savingsFuelPct}% burn</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#777777] font-mono">Voyage Cost</div>
                          <div className="font-semibold text-[#191919]">${Math.round(plan.estimatedFuelCostUSD).toLocaleString()}</div>
                          <div className="text-[10px] text-[#777777] font-mono">{plan.distanceNM} NM</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleLoadPlan(plan)}
                          className="btn-coral px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Load Plan into Planner</span>
                        </button>

                        {deleteConfirmId === plan.id ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-red-600 font-medium">Delete?</span>
                            <button
                              onClick={() => handleDeletePlan(plan.id)}
                              className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-medium hover:bg-red-700"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 rounded bg-[#E5E3DA] text-[#191919] text-[10px] font-medium"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(plan.id)}
                            className="p-1.5 text-[#777777] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete saved plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* ACCOUNT DETAILS */
              <div className="space-y-4">
                <div className="bg-[#FAF9F5] border border-[#E5E3DA] rounded-xl p-4 space-y-3">
                  <div className="text-xs font-bold text-[#191919]">Personal Credentials</div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[#777777] block text-[11px]">Full Name</span>
                      <span className="font-semibold text-[#191919]">{currentUser.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block text-[11px]">Registered Email</span>
                      <span className="font-semibold text-[#191919]">{currentUser.email}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block text-[11px]">Company / Organization</span>
                      <span className="font-semibold text-[#191919]">{currentUser.company || 'Not Specified'}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block text-[11px]">Operational Role</span>
                      <span className="font-semibold text-[#191919]">{currentUser.role || 'Marine Operations Lead'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E3DA] rounded-xl p-4 space-y-2 text-xs">
                  <div className="text-xs font-bold text-[#191919] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#174D3F]" />
                    <span>Session Persistence Details</span>
                  </div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Your session is actively remembered on this browser. Logging out will clear the current session while preserving your saved voyage plans and registered profile.
                  </p>
                </div>

                <button
                  onClick={() => {
                    closeProfile()
                    onNavigateToView('settings')
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E3DA] hover:bg-[#F9F9F6] text-xs font-medium text-[#191919] flex items-center justify-center gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#777777]" />
                  <span>Open Full System Settings</span>
                </button>
              </div>
            )}
          </div>

          {/* DRAWER FOOTER / LOGOUT */}
          <div className="p-5 bg-[#FAF9F5] border-t border-[#E5E3DA] flex items-center justify-between">
            <button
              onClick={() => {
                closeProfile()
                onNavigateToView('settings')
              }}
              className="text-xs text-[#777777] hover:text-[#191919] font-medium flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 border border-[#E5E3DA] hover:border-red-200 text-xs font-medium text-red-600 flex items-center gap-1.5 transition-colors shadow-subtle"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
