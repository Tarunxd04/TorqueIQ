import { WeatherCondition, WeatherForecastDay } from '../types/maritime'

export const CURRENT_OCEAN_WEATHER: WeatherCondition = {
  id: 'weather-1',
  area: 'Indian Ocean Corridor (Route B)',
  temperatureC: 28.5,
  windSpeedKnots: 14,
  windDirection: 'NW (315°)',
  waveHeightM: 1.4,
  oceanCurrentKnots: 0.8,
  visibilityKM: 14.2,
  seaCondition: 'Moderate',
  impactStatus: 'Favorable',
  fuelImpactPct: -4.8
}

export const SIMULATED_FORECAST_TIMELINE: WeatherForecastDay[] = [
  {
    day: 'Day 1',
    dateLabel: 'Departure + 24h',
    wind: 'Wind 12 kt NW',
    waves: 'Waves 1.2 m',
    current: 'Current +0.9 kt',
    status: 'Favorable',
    impactPct: -5.2,
    summary: 'Calm tailwinds exiting the Arabian Gulf corridor.'
  },
  {
    day: 'Day 2',
    dateLabel: 'Departure + 48h',
    wind: 'Wind 15 kt WNW',
    waves: 'Waves 1.5 m',
    current: 'Current +0.7 kt',
    status: 'Moderate',
    impactPct: -3.8,
    summary: 'Steady sea state with minor surface swell off Laccadive Sea.'
  },
  {
    day: 'Day 3',
    dateLabel: 'Departure + 72h',
    wind: 'Wind 10 kt NW',
    waves: 'Waves 1.1 m',
    current: 'Current +1.1 kt',
    status: 'Favorable',
    impactPct: -6.1,
    summary: 'Optimal tail current push across Equatorial Channel.'
  },
  {
    day: 'Day 4',
    dateLabel: 'Departure + 96h',
    wind: 'Wind 18 kt WSW',
    waves: 'Waves 2.0 m',
    current: 'Current +0.4 kt',
    status: 'Caution',
    impactPct: 1.4,
    summary: 'Moderate side swell approaching Malacca Strait entrance.'
  }
]
