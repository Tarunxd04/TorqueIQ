import { VoyagePlanInput } from './maritime'

export interface User {
  id: string
  fullName: string
  email: string
  company?: string
  role?: string
  createdAt: string
  preferredVessel?: string
}

export interface StoredUserAccount extends User {
  passwordHash: string
}

export interface UserSession {
  userId: string
  token: string
  loginTime: string
}

export interface SavedVoyagePlan {
  id: string
  userId: string
  planName: string
  createdAt: string
  origin: string
  destination: string
  selectedShipId: string
  vesselName: string
  vesselType: string
  cargoTonnes: number
  arrivalDate: string
  selectedOptionId: string
  recommendedSpeedKnots: number
  estimatedFuelTonnes: number
  estimatedFuelCostUSD: number
  estimatedCO2Tonnes: number
  estimatedDurationHours: number
  estimatedArrivalFormatted: string
  distanceNM: number
  savingsFuelPct: number
  savingsCostUSD: number
  optimizationScore: number
}

export interface UserDataStore {
  savedPlans: SavedVoyagePlan[]
  preferences?: Record<string, any>
}
