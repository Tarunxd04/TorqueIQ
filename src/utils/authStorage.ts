/**
 * Torque IQ Client-Side Authentication & User Data Storage
 * 
 * IMPORTANT ARCHITECTURAL & SECURITY NOTICE:
 * This implementation provides LocalStorage-based persistence for client-side prototype
 * and demonstration purposes. In a commercial production environment, authentication
 * should be handled by an authoritative backend API or an identity provider (e.g., OAuth/OIDC,
 * Firebase Auth, Supabase) using secure, HTTP-only session cookies and server-side credential verification.
 * Client browser storage cannot guarantee cryptographic protection against local inspection.
 *
 * To minimize exposure, passwords are never stored in plaintext and are hashed using SHA-256.
 */

import { User, StoredUserAccount, UserSession, SavedVoyagePlan, UserDataStore } from '../types/auth'

export const STORAGE_KEYS = {
  USERS: 'torque_iq_users',
  SESSION: 'torque_iq_session',
  USER_DATA_PREFIX: 'torque_iq_user_data_',
}

/**
 * Hash a password using browser Web Crypto SHA-256 with a salt.
 * Ensures plaintext passwords are never stored in LocalStorage.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = 'torque_iq_maritime_salt_2026'
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } catch {
      // Fallback pseudo-hash if crypto.subtle is unavailable
    }
  }
  
  // Safe basic hash fallback
  let hash = 0
  const str = password + salt
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return 'h_' + Math.abs(hash).toString(16)
}

/**
 * Read stored users from LocalStorage safely.
 */
export function getStoredUsers(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to parse stored users:', err)
    return []
  }
}

/**
 * Persist users list to LocalStorage.
 */
function setStoredUsers(users: StoredUserAccount[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  } catch (err) {
    console.error('Failed to save users to localStorage:', err)
  }
}

/**
 * Read active session from LocalStorage.
 */
export function getStoredSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (!raw) return null
    const session = JSON.parse(raw) as UserSession
    if (session && session.userId && session.token) {
      return session
    }
    return null
  } catch (err) {
    console.error('Failed to read user session:', err)
    return null
  }
}

/**
 * Save active session to LocalStorage.
 */
export function setStoredSession(session: UserSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
  } catch (err) {
    console.error('Failed to save session:', err)
  }
}

/**
 * Clear only the active session (preserving user accounts and user data).
 */
export function clearStoredSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SESSION)
  } catch (err) {
    console.error('Failed to clear session:', err)
  }
}

/**
 * Read user-specific data store (plans, preferences).
 */
export function getUserData(userId: string): UserDataStore {
  try {
    const key = STORAGE_KEYS.USER_DATA_PREFIX + userId
    const raw = localStorage.getItem(key)
    if (!raw) {
      return { savedPlans: [] }
    }
    const data = JSON.parse(raw)
    return {
      savedPlans: Array.isArray(data.savedPlans) ? data.savedPlans : [],
      preferences: data.preferences || {}
    }
  } catch (err) {
    console.error(`Failed to read user data for ${userId}:`, err)
    return { savedPlans: [] }
  }
}

/**
 * Persist user-specific data store.
 */
export function setUserData(userId: string, data: UserDataStore): void {
  try {
    const key = STORAGE_KEYS.USER_DATA_PREFIX + userId
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.error(`Failed to write user data for ${userId}:`, err)
  }
}

/**
 * Strip sensitive hashes to return a safe User object.
 */
export function sanitizeUser(account: StoredUserAccount): User {
  const { passwordHash, ...safeUser } = account
  return safeUser
}

/**
 * Initialize default demo user account and starter plan if empty,
 * enabling immediate testing while allowing custom registrations.
 */
export async function initializeDefaultUser(): Promise<void> {
  const users = getStoredUsers()
  if (users.length === 0) {
    const defaultPasswordHash = await hashPassword('password123')
    const demoUser: StoredUserAccount = {
      id: 'usr_demo_capt_sharma',
      fullName: 'Capt. Vikram Sharma',
      email: 'v.sharma@greenroute-maritime.com',
      company: 'GreenRoute Ocean Carriers',
      role: 'Fleet Superintendent',
      createdAt: '2026-03-15T08:30:00.000Z',
      preferredVessel: 'MV Ocean Star',
      passwordHash: defaultPasswordHash
    }
    setStoredUsers([demoUser])

    // Seed starter saved voyage plan for demo user
    const starterPlan: SavedVoyagePlan = {
      id: 'plan_seed_1',
      userId: demoUser.id,
      planName: 'Chennai to Singapore — Eco Passage 13.8 kts',
      createdAt: '2026-08-20T10:15:00.000Z',
      origin: 'Chennai',
      destination: 'Singapore',
      selectedShipId: 'ship-0',
      vesselName: 'MV Ocean Star',
      vesselType: 'Container',
      cargoTonnes: 65000,
      arrivalDate: '2026-09-05T14:00',
      selectedOptionId: 'route-eco',
      recommendedSpeedKnots: 13.8,
      estimatedFuelTonnes: 142.6,
      estimatedFuelCostUSD: 99820,
      estimatedCO2Tonnes: 448.5,
      estimatedDurationHours: 119,
      estimatedArrivalFormatted: '5.0 days (Sep 5, 14:00)',
      distanceNM: 1650,
      savingsFuelPct: 12.4,
      savingsCostUSD: 14100,
      optimizationScore: 94
    }
    setUserData(demoUser.id, { savedPlans: [starterPlan] })
  }
}

/**
 * Register a new user with validation and deduplication.
 */
export async function registerAccount(
  fullName: string,
  email: string,
  password: string,
  company?: string,
  role?: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const cleanEmail = email.trim().toLowerCase()
  const cleanName = fullName.trim()

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: 'Please enter your full name.' }
  }
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { success: false, error: 'Please provide a valid email address.' }
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' }
  }

  const existingUsers = getStoredUsers()
  if (existingUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please log in.' }
  }

  const passwordHash = await hashPassword(password)
  const newAccount: StoredUserAccount = {
    id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
    fullName: cleanName,
    email: cleanEmail,
    company: company?.trim() || undefined,
    role: role?.trim() || undefined,
    createdAt: new Date().toISOString(),
    passwordHash
  }

  existingUsers.push(newAccount)
  setStoredUsers(existingUsers)

  // Initialize empty data store
  setUserData(newAccount.id, { savedPlans: [] })

  return { success: true, user: sanitizeUser(newAccount) }
}

/**
 * Authenticate credentials against stored users.
 */
export async function authenticateAccount(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const cleanEmail = email.trim().toLowerCase()
  if (!cleanEmail || !password) {
    return { success: false, error: 'Please enter both email and password.' }
  }

  const users = getStoredUsers()
  const account = users.find(u => u.email.toLowerCase() === cleanEmail)
  if (!account) {
    return { success: false, error: 'No account found with this email. Please sign up.' }
  }

  const inputHash = await hashPassword(password)
  if (account.passwordHash !== inputHash) {
    return { success: false, error: 'Incorrect password. Please try again.' }
  }

  return { success: true, user: sanitizeUser(account) }
}
