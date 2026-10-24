import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Anchor, X, Lock, Mail, User, Building, Briefcase, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Sign up form state
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  // UI status
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMode(authModalMode)
    setErrorMessage(null)
    setSuccessMessage(null)
  }, [authModalMode, isAuthModalOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAuthModalOpen, closeAuthModal])

  if (!isAuthModalOpen) return null

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    const res = await login(loginEmail, loginPassword)
    setIsSubmitting(false)
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to authenticate')
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.')
      return
    }

    setIsSubmitting(true)
    const res = await signup(fullName, signupEmail, signupPassword, company, role)
    setIsSubmitting(false)
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to register account')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in" data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080808]/50 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white border border-[#E5E3DA] rounded-2xl shadow-dropdown max-w-md w-full overflow-hidden z-10 transition-all text-[#191919]">
        {/* Top Header Strip */}
        <div className="p-6 bg-[#FAF9F5] border-b border-[#E5E3DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#174D3F] flex items-center justify-center text-white shadow-sm">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-[#191919] flex items-center gap-1">
                Torque <span className="text-[#F15F56]">IQ</span>
              </div>
              <div className="text-[11px] text-[#777777]">Maritime Fleet Intelligence Account</div>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-[#777777] hover:text-[#191919] hover:bg-[#F0EFEA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-2 bg-[#F5F5EF] border-b border-[#E5E3DA]">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setErrorMessage(null)
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#191919] shadow-subtle border border-[#E5E3DA]'
                : 'text-[#777777] hover:text-[#191919]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup')
              setErrorMessage(null)
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#191919] shadow-subtle border border-[#E5E3DA]'
                : 'text-[#777777] hover:text-[#191919]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#EDF5F2] border border-[#D2E4DC] text-[#174D3F] text-xs flex items-start gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#174D3F]" />
              <div className="leading-relaxed">{successMessage}</div>
            </div>
          )}

          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191919] mb-1.5">
                  Corporate or Marine Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#777777] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. captain@shipping.com"
                    className="input-warm w-full pl-9 pr-3 py-2.5 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#191919]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#777777] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="input-warm w-full pl-9 pr-10 py-2.5 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#777777] hover:text-[#191919]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-coral w-full py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Torque IQ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#191919] mb-1">
                  Full Name <span className="text-[#F15F56]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#777777] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="input-warm w-full pl-9 pr-3 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191919] mb-1">
                  Email Address <span className="text-[#F15F56]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#777777] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="elena@maersk-line.com"
                    className="input-warm w-full pl-9 pr-3 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191919] mb-1">
                    Company / Line
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Nordic Maritime"
                      className="input-warm w-full pl-8 pr-2 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#191919] mb-1">
                    Job Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Marine Ops Lead"
                      className="input-warm w-full pl-8 pr-2 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191919] mb-1">
                    Password <span className="text-[#F15F56]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="input-warm w-full px-3 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#191919] mb-1">
                    Confirm Password <span className="text-[#F15F56]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="input-warm w-full px-3 py-2 text-xs text-[#191919] bg-white border border-[#E5E3DA] rounded-xl focus:border-[#174D3F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-coral w-full py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Creating Profile...' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
