import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, SavedVoyagePlan } from '../types/auth'
import {
  initializeDefaultUser,
  getStoredSession,
  setStoredSession,
  clearStoredSession,
  getStoredUsers,
  getUserData,
  setUserData,
  sanitizeUser,
  authenticateAccount,
  registerAccount
} from '../utils/authStorage'

interface AuthContextType {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  savedPlans: SavedVoyagePlan[]
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (fullName: string, email: string, password: string, company?: string, role?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  savePlan: (planData: Omit<SavedVoyagePlan, 'id' | 'userId' | 'createdAt'>) => SavedVoyagePlan | null
  deletePlan: (planId: string) => void
  updateProfile: (updates: Partial<User>) => void
  
  // UI Dialog states
  isAuthModalOpen: boolean
  authModalMode: 'login' | 'signup'
  openAuthModal: (mode?: 'login' | 'signup') => void
  closeAuthModal: () => void
  isProfileOpen: boolean
  openProfile: () => void
  closeProfile: () => void
  
  // Communication with Voyage Planner
  loadedPlanToExecute: SavedVoyagePlan | null
  loadPlanIntoPlanner: (plan: SavedVoyagePlan) => void
  clearLoadedPlan: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [savedPlans, setSavedPlans] = useState<SavedVoyagePlan[]>([])
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [loadedPlanToExecute, setLoadedPlanToExecute] = useState<SavedVoyagePlan | null>(null)

  // Initialize storage and restore session on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDefaultUser()
        const session = getStoredSession()
        if (session && session.userId) {
          const users = getStoredUsers()
          const matched = users.find(u => u.id === session.userId)
          if (matched) {
            const user = sanitizeUser(matched)
            setCurrentUser(user)
            const userData = getUserData(user.id)
            setSavedPlans(userData.savedPlans)
          } else {
            clearStoredSession()
          }
        }
      } catch (err) {
        console.error('Failed to initialize session:', err)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  // Sync saved plans when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const data = getUserData(currentUser.id)
      setSavedPlans(data.savedPlans)
    } else {
      setSavedPlans([])
    }
  }, [currentUser])

  const login = async (email: string, password: string) => {
    const res = await authenticateAccount(email, password)
    if (res.success && res.user) {
      setCurrentUser(res.user)
      setStoredSession({
        userId: res.user.id,
        token: 'tok_' + Math.random().toString(36).substring(2),
        loginTime: new Date().toISOString()
      })
      const userData = getUserData(res.user.id)
      setSavedPlans(userData.savedPlans)
      setIsAuthModalOpen(false)
      return { success: true }
    }
    return { success: false, error: res.error || 'Authentication failed' }
  }

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    company?: string,
    role?: string
  ) => {
    const res = await registerAccount(fullName, email, password, company, role)
    if (res.success && res.user) {
      setCurrentUser(res.user)
      setStoredSession({
        userId: res.user.id,
        token: 'tok_' + Math.random().toString(36).substring(2),
        loginTime: new Date().toISOString()
      })
      setSavedPlans([])
      setIsAuthModalOpen(false)
      return { success: true }
    }
    return { success: false, error: res.error || 'Registration failed' }
  }

  const logout = () => {
    clearStoredSession()
    setCurrentUser(null)
    setSavedPlans([])
    setIsProfileOpen(false)
  }

  const savePlan = (planData: Omit<SavedVoyagePlan, 'id' | 'userId' | 'createdAt'>): SavedVoyagePlan | null => {
    if (!currentUser) {
      // Prompt user to sign in or create an account
      setAuthModalMode('login')
      setIsAuthModalOpen(true)
      return null
    }

    const newPlan: SavedVoyagePlan = {
      ...planData,
      id: 'plan_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    }

    const currentStore = getUserData(currentUser.id)
    const updatedPlans = [newPlan, ...currentStore.savedPlans]
    setUserData(currentUser.id, { ...currentStore, savedPlans: updatedPlans })
    setSavedPlans(updatedPlans)
    return newPlan
  }

  const deletePlan = (planId: string) => {
    if (!currentUser) return
    const currentStore = getUserData(currentUser.id)
    const updatedPlans = currentStore.savedPlans.filter(p => p.id !== planId)
    setUserData(currentUser.id, { ...currentStore, savedPlans: updatedPlans })
    setSavedPlans(updatedPlans)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return
    const users = getStoredUsers()
    const index = users.findIndex(u => u.id === currentUser.id)
    if (index !== -1) {
      const updatedAccount = { ...users[index], ...updates }
      users[index] = updatedAccount
      localStorage.setItem('torque_iq_users', JSON.stringify(users))
      setCurrentUser(sanitizeUser(updatedAccount))
    }
  }

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const openProfile = () => {
    setIsProfileOpen(true)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
  }

  const loadPlanIntoPlanner = (plan: SavedVoyagePlan) => {
    setLoadedPlanToExecute(plan)
    setIsProfileOpen(false)
  }

  const clearLoadedPlan = () => {
    setLoadedPlanToExecute(null)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        savedPlans,
        login,
        signup,
        logout,
        savePlan,
        deletePlan,
        updateProfile,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isProfileOpen,
        openProfile,
        closeProfile,
        loadedPlanToExecute,
        loadPlanIntoPlanner,
        clearLoadedPlan
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
