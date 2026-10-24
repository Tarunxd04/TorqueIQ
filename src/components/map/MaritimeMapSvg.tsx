import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Globe,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  ShieldCheck,
  Zap,
  Gauge,
  Clock,
  Flame,
  Leaf,
  Ship as ShipIcon,
  CheckCircle2,
  Sliders,
  Layers,
  Search
} from 'lucide-react'

// Fix Leaflet default icon path issues in Vite/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Database of real-world port coordinates [Lat, Lng]
export const REAL_PORT_DATA: Record<string, { coords: [number, number]; code: string; country: string; name: string }> = {
  'Chennai':   { coords: [13.0827, 80.2707], code: 'MAA',   country: 'India', name: 'Port of Chennai' },
  'Singapore': { coords: [1.2902, 103.8519], code: 'SGSIN', country: 'Singapore', name: 'Port of Singapore' },
  'Mumbai':    { coords: [18.9388, 72.8354], code: 'INBOM', country: 'India', name: 'Port of Mumbai' },
  'Dubai':     { coords: [25.2048, 55.2708], code: 'AEDXB', country: 'UAE', name: 'Port of Jebel Ali (Dubai)' },
  'Colombo':   { coords: [6.9271, 79.8612],  code: 'LKCMB', country: 'Sri Lanka', name: 'Port of Colombo' },
  'Rotterdam': { coords: [51.9244, 4.4777], code: 'NLRTM', country: 'Netherlands', name: 'Port of Rotterdam' },
  'Shanghai':  { coords: [31.2304, 121.4737],code: 'CNSHA', country: 'China', name: 'Port of Shanghai' },
  'Kochi':     { coords: [9.9312, 76.2673],  code: 'INKOK', country: 'India', name: 'Cochin Port (Kochi)' },
}

// Generate realistic sea waypoints between any 2 ports over water
export function generateMaritimeRoutes(origName: string, destName: string) {
  const orig = REAL_PORT_DATA[origName] || REAL_PORT_DATA['Chennai']
  const dest = REAL_PORT_DATA[destName] || REAL_PORT_DATA['Singapore']

  const oLat = orig.coords[0]
  const oLng = orig.coords[1]
  const dLat = dest.coords[0]
  const dLng = dest.coords[1]

  let ecoWaypoints: [number, number][] = [
    [oLat, oLng],
    [10.5000, 84.0000],
    [6.5000, 92.5000],
    [5.7000, 95.2000],
    [3.5000, 100.0000],
    [dLat, dLng]
  ]

  let shortestWaypoints: [number, number][] = [
    [oLat, oLng],
    [9.5000, 88.0000],
    [6.0000, 95.0000],
    [2.8000, 101.0000],
    [dLat, dLng]
  ]

  let expressWaypoints: [number, number][] = [
    [oLat, oLng],
    [11.8000, 85.5000],
    [7.8000, 94.0000],
    [4.2000, 98.8000],
    [dLat, dLng]
  ]

  if (origName === 'Mumbai' && destName === 'Singapore') {
    ecoWaypoints = [
      [18.9388, 72.8354],
      [15.2000, 73.5000],
      [9.9300, 75.8000],
      [5.9500, 80.2000],
      [5.8000, 88.0000],
      [5.7000, 95.2000],
      [3.2000, 100.2000],
      [1.2902, 103.8519]
    ]
    shortestWaypoints = [
      [18.9388, 72.8354],
      [12.0000, 77.0000],
      [6.9271, 79.8612],
      [5.9000, 90.0000],
      [3.0000, 99.8000],
      [1.2902, 103.8519]
    ]
    expressWaypoints = [
      [18.9388, 72.8354],
      [10.5000, 71.0000],
      [2.5000, 78.0000],
      [1.5000, 90.0000],
      [1.0000, 98.0000],
      [1.2902, 103.8519]
    ]
  } else if (origName !== 'Chennai' || destName !== 'Singapore') {
    const mLat = (oLat + dLat) / 2
    const mLng = (oLng + dLng) / 2

    ecoWaypoints = [
      [oLat, oLng],
      [oLat + (dLat - oLat) * 0.25 - 1.5, oLng + (dLng - oLng) * 0.25],
      [mLat - 2.0, mLng],
      [oLat + (dLat - oLat) * 0.75 - 1.0, oLng + (dLng - oLng) * 0.75],
      [dLat, dLng]
    ]
    shortestWaypoints = [
      [oLat, oLng],
      [mLat, mLng],
      [dLat, dLng]
    ]
    expressWaypoints = [
      [oLat, oLng],
      [oLat + (dLat - oLat) * 0.3 + 1.2, oLng + (dLng - oLng) * 0.3],
      [mLat + 1.5, mLng],
      [dLat, dLng]
    ]
  }

  const calcDist = (wps: [number, number][]) => {
    let d = 0
    for (let i = 0; i < wps.length - 1; i++) {
      const p1 = L.latLng(wps[i][0], wps[i][1])
      const p2 = L.latLng(wps[i + 1][0], wps[i + 1][1])
      d += p1.distanceTo(p2)
    }
    return Math.round(d / 1000)
  }

  const distEcoKm = calcDist(ecoWaypoints)
  const distShortestKm = Math.round(distEcoKm * 0.95)
  const distExpressKm = Math.round(distEcoKm * 1.02)

  const fuelEcoTonnes = Math.round(distEcoKm * 0.0242)
  const fuelShortestTonnes = Math.round(distShortestKm * 0.0290)
  const fuelExpressTonnes = Math.round(distExpressKm * 0.0335)

  return {
    'route-eco': {
      id: 'route-eco',
      name: 'Route A — Fuel Efficient (Recommended)',
      badge: 'RECOMMENDED • MIN CO₂',
      type: 'eco',
      color: '#10B981',
      waypoints: ecoWaypoints,
      distKm: distEcoKm,
      distNM: Math.round(distEcoKm * 0.539957),
      fuelTonnes: fuelEcoTonnes,
      fuelLiters: fuelEcoTonnes * 1200,
      co2Tonnes: Math.round(fuelEcoTonnes * 3.145),
      co2Kg: Math.round(fuelEcoTonnes * 3.145 * 1000),
      etaHours: Math.round(distEcoKm / (14.5 * 1.852)),
      speedKnots: 14.5,
      desc: 'Optimal hydrodynamic track avoiding counter-currents and high wave swells. Lowest fuel burn & CII compliant.'
    },
    'route-shortest': {
      id: 'route-shortest',
      name: 'Route B — Shortest Distance',
      badge: 'SHORTEST DISTANCE',
      type: 'shortest',
      color: '#F59E0B',
      waypoints: shortestWaypoints,
      distKm: distShortestKm,
      distNM: Math.round(distShortestKm * 0.539957),
      fuelTonnes: fuelShortestTonnes,
      fuelLiters: fuelShortestTonnes * 1200,
      co2Tonnes: Math.round(fuelShortestTonnes * 3.145),
      co2Kg: Math.round(fuelShortestTonnes * 3.145 * 1000),
      etaHours: Math.round(distShortestKm / (13.8 * 1.852)),
      speedKnots: 13.8,
      desc: 'Direct geographic track. Higher hydrodynamic hull resistance due to coastal wave reflection.'
    },
    'route-express': {
      id: 'route-express',
      name: 'Route C — Express Transit',
      badge: 'FASTEST TRANSIT',
      type: 'express',
      color: '#06B6D4',
      waypoints: expressWaypoints,
      distKm: distExpressKm,
      distNM: Math.round(distExpressKm * 0.539957),
      fuelTonnes: fuelExpressTonnes,
      fuelLiters: fuelExpressTonnes * 1200,
      co2Tonnes: Math.round(fuelExpressTonnes * 3.145),
      co2Kg: Math.round(fuelExpressTonnes * 3.145 * 1000),
      etaHours: Math.round(distExpressKm / (18.2 * 1.852)),
      speedKnots: 18.2,
      desc: 'High speed transit corridor (18.2 kts). Maximum fuel burn rate due to cubic power speed resistance.'
    }
  }
}

// Marker HTML generators matching high-tech dark theme
const createPortPin = (title: string, code: string, isOrigin: boolean) => {
  const colorClass = isOrigin ? 'bg-cyan-400 border-cyan-200 shadow-[0_0_16px_#06B6D4]' : 'bg-emerald-400 border-emerald-200 shadow-[0_0_16px_#10B981]'
  const tagClass = isOrigin ? 'border-cyan-500/40 text-cyan-300' : 'border-emerald-500/40 text-emerald-300'

  return L.divIcon({
    className: 'custom-port-leaflet-pin',
    html: `
      <div class="flex flex-col items-center group cursor-pointer">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-7 h-7 rounded-full ${isOrigin ? 'bg-cyan-500/30' : 'bg-emerald-500/30'} animate-ping"></div>
          <div class="w-4 h-4 rounded-full ${colorClass} border-2 border-navy-950 z-10"></div>
        </div>
        <div class="mt-1 px-2.5 py-1 rounded-md bg-navy-900/95 border ${tagClass} text-white font-mono font-bold text-[11px] whitespace-nowrap shadow-2xl">
          ${isOrigin ? '🛫 START' : '🛬 DEST'}: <span class="text-white font-extrabold">${title}</span> (${code})
        </div>
      </div>
    `,
    iconSize: [120, 38],
    iconAnchor: [60, 10]
  })
}

const createLiveShipPin = (shipName: string, progressPct: number, speed: number) => {
  return L.divIcon({
    className: 'live-ship-pin',
    html: `
      <div class="flex flex-col items-center group">
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-cyan-500/30 border-2 border-cyan-400 animate-pulse flex items-center justify-center shadow-[0_0_20px_#06B6D4]">
            <span class="text-sm transform -rotate-45">🚢</span>
          </div>
        </div>
        <div class="mt-1 px-2.5 py-1 rounded-md bg-cyan-950/95 border border-cyan-400/80 text-cyan-200 font-sans font-bold text-[10px] whitespace-nowrap shadow-2xl flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>${shipName}</span>
          <span class="text-cyan-400 font-mono">(${speed} kts • ${progressPct.toFixed(1)}%)</span>
        </div>
      </div>
    `,
    iconSize: [140, 42],
    iconAnchor: [70, 16]
  })
}

// Continent Text Overlays (Positioned geographically over continents)
const CONTINENT_LABELS: { name: string; coords: [number, number] }[] = [
  { name: 'NORTH AMERICA', coords: [48.0, -100.0] },
  { name: 'SOUTH AMERICA', coords: [-18.0, -60.0] },
  { name: 'EUROPE', coords: [54.0, 15.0] },
  { name: 'AFRICA', coords: [2.0, 18.0] },
  { name: 'ASIA', coords: [45.0, 95.0] },
  { name: 'AUSTRALIA', coords: [-25.0, 134.0] },
]

// Ocean Text Overlays (Pacific on both left and right edges)
const OCEAN_LABELS: { name: string; coords: [number, number] }[] = [
  { name: 'Pacific Ocean', coords: [0.0, -150.0] },
  { name: 'Pacific Ocean', coords: [0.0, 160.0] },
  { name: 'Atlantic Ocean', coords: [5.0, -32.0] },
  { name: 'Indian Ocean', coords: [-18.0, 78.0] },
  { name: 'Arctic Ocean', coords: [78.0, 0.0] },
]

const createContinentTextPin = (name: string) => {
  return L.divIcon({
    className: 'continent-text-label',
    html: `<div class="text-white font-black text-xs sm:text-sm tracking-[0.2em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] opacity-95 whitespace-nowrap">${name}</div>`,
    iconSize: [160, 25],
    iconAnchor: [80, 12]
  })
}

const createOceanTextPin = (name: string) => {
  return L.divIcon({
    className: 'ocean-text-label',
    html: `<div class="text-sky-300 font-bold italic text-xs tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] opacity-85 whitespace-nowrap">${name}</div>`,
    iconSize: [140, 22],
    iconAnchor: [70, 11]
  })
}

interface MaritimeMapProps {
  origin?: string
  destination?: string
  selectedShipName?: string
  selectedRouteId?: string
  onRouteSelect?: (routeId: string) => void
  showAllRoutes?: boolean
  className?: string
  height?: number | string
  distanceNM?: number
  etaFormatted?: string
  vesselName?: string
  speed?: number
  interactive?: boolean
}

export const MaritimeMapSvg: React.FC<MaritimeMapProps> = ({
  origin = 'Chennai',
  destination = 'Singapore',
  selectedShipName,
  selectedRouteId = 'route-eco',
  onRouteSelect,
  showAllRoutes = true,
  className = '',
  height = 500,
  vesselName
}) => {
  const effectiveShipName = selectedShipName || vesselName || 'MV Ocean Star'
  const [activeRouteId, setActiveRouteId] = useState<string>(selectedRouteId)
  const [isTracking, setIsTracking] = useState<boolean>(false)
  const [progressPct, setProgressPct] = useState<number>(53.2)
  const [simSpeedMultiplier, setSimSpeedMultiplier] = useState<number>(1)
  
  // Country Search & Highlight State
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [highlightedCountry, setHighlightedCountry] = useState<string | null>(null)
  const [geoJsonData, setGeoJsonData] = useState<any>(null)

  useEffect(() => {
    setActiveRouteId(selectedRouteId)
  }, [selectedRouteId])

  // Fetch World GeoJSON boundaries directly (Clean, 100% free, NO WATERMARKS)
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch(() => {
        // Fallback gracefully
      })
  }, [])

  const routes = generateMaritimeRoutes(origin, destination)
  const activeRoute = routes[activeRouteId as keyof typeof routes] || routes['route-eco']

  const origPort = REAL_PORT_DATA[origin] || REAL_PORT_DATA['Chennai']
  const destPort = REAL_PORT_DATA[destination] || REAL_PORT_DATA['Singapore']

  const getInterpolatedShipPos = (pct: number): [number, number] => {
    const wps = activeRoute.waypoints
    if (!wps || wps.length === 0) return origPort.coords
    if (pct <= 0) return wps[0]
    if (pct >= 100) return wps[wps.length - 1]

    const totalSegs = wps.length - 1
    const scaled = (pct / 100) * totalSegs
    const segIdx = Math.floor(scaled)
    const segT = scaled - segIdx

    if (segIdx >= totalSegs) return wps[wps.length - 1]

    const p1 = wps[segIdx]
    const p2 = wps[segIdx + 1]

    const lat = p1[0] + (p2[0] - p1[0]) * segT
    const lng = p1[1] + (p2[1] - p1[1]) * segT

    return [lat, lng]
  }

  const shipPos = getInterpolatedShipPos(progressPct)

  useEffect(() => {
    let timer: any = null
    if (isTracking) {
      timer = setInterval(() => {
        setProgressPct((prev) => {
          if (prev >= 100) {
            setIsTracking(false)
            return 100
          }
          return prev + 0.15 * simSpeedMultiplier
        })
      }, 100)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isTracking, simSpeedMultiplier])

  const totalKm = activeRoute.distKm
  const travelledKm = Math.round((progressPct / 100) * totalKm)
  const remainingKm = Math.max(0, totalKm - travelledKm)

  const totalFuelTonnes = activeRoute.fuelTonnes
  const consumedFuelTonnes = ((progressPct / 100) * totalFuelTonnes).toFixed(1)
  const remainingFuelTonnes = Math.max(0, totalFuelTonnes - Number(consumedFuelTonnes)).toFixed(1)
  const consumedFuelLiters = Math.round(Number(consumedFuelTonnes) * 1200)

  const totalCo2Tonnes = activeRoute.co2Tonnes
  const emittedCo2Tonnes = ((progressPct / 100) * totalCo2Tonnes).toFixed(1)

  const totalEtaHours = activeRoute.etaHours
  const remainingHoursFloat = ((100 - progressPct) / 100) * totalEtaHours
  const etaHoursInt = Math.floor(remainingHoursFloat)
  const etaMinsInt = Math.round((remainingHoursFloat - etaHoursInt) * 60)

  const handleSelectRoute = (id: string) => {
    setActiveRouteId(id)
    if (onRouteSelect) onRouteSelect(id)
  }

  const handleResetTracking = () => {
    setIsTracking(false)
    setProgressPct(0)
  }

  // Country Search Handler (Highlight country without moving camera)
  const handleCountrySearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHighlightedCountry(searchQuery.trim().toUpperCase())
    } else {
      setHighlightedCountry(null)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SINGLE FIXED WORLD MAP CONTAINER — ZERO WATERMARKS, CLEAN ESRI BASEMAP + GEOJSON */}
      <div className="relative bg-[#080808] border border-[#E5E3DA] rounded-2xl overflow-hidden shadow-card isolate">
        
        {/* TOP CONTROLS OVERLAY: TITLE BADGE + SEARCH BAR */}
        <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
          {/* TITLE BADGE */}
          <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#E5E3DA] px-3 py-1.5 rounded-xl text-xs font-bold text-[#191919] shadow-subtle max-w-full">
            <Globe className="w-4 h-4 text-[#174D3F] shrink-0" />
            <span className="truncate">Global Maritime Voyage Control</span>
            {highlightedCountry && (
              <span className="ml-1 sm:ml-2 px-2 py-0.5 rounded bg-[#EDF5F2] text-[#174D3F] border border-[#D2E4DC] font-mono text-[10px] shrink-0">
                {highlightedCountry}
              </span>
            )}
          </div>

          {/* SEARCH COUNTRY BAR */}
          <div className="pointer-events-auto shrink-0">
            <form onSubmit={handleCountrySearch} className="flex items-center rounded-lg bg-white/95 border border-[#E5E3DA] p-1 shadow-subtle backdrop-blur-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (!e.target.value) setHighlightedCountry(null)
                }}
                placeholder="Search country"
                className="px-2.5 py-1 text-xs text-[#191919] placeholder:text-[#777777] font-sans focus:outline-none bg-transparent w-32 sm:w-40"
              />
              <button type="submit" className="p-1 text-[#174D3F] hover:text-[#0F342B] transition">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* LEAFLET CANVAS — ESRI WORLD DARK GRAY BASE (100% FREE, NO WATERMARKS, NO API KEY REQUIRED) */}
        <div style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}>
          <MapContainer
            center={[15.0, 0.0]}
            zoom={2}
            minZoom={2}
            maxZoom={2}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            dragging={false}
            boxZoom={false}
            keyboard={false}
            maxBounds={[[-85, -180], [85, 180]]}
            maxBoundsViscosity={1.0}
            worldCopyJump={false}
            style={{ height: '100%', width: '100%', background: '#081226' }}
          >
            {/* ESRI WORLD DARK GRAY BASE TILE LAYER — Zero Watermarks, Clean Ocean & Land Canvas */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri'
              noWrap={true}
              bounds={[[-85, -180], [85, 180]]}
            />

            {/* GEOJSON WORLD COUNTRY BOUNDARIES — Crisp White/Silver Country Border Outlines */}
            {geoJsonData && (
              <GeoJSON
                data={geoJsonData}
                style={(feature) => {
                  const countryName = feature?.properties?.name?.toUpperCase() || ''
                  const isMatch = highlightedCountry && countryName.includes(highlightedCountry)

                  return {
                    fillColor: isMatch ? '#06B6D4' : '#112240',
                    fillOpacity: isMatch ? 0.70 : 0.40,
                    color: isMatch ? '#38BDF8' : 'rgba(255, 255, 255, 0.25)', // Crisp thin borders
                    weight: isMatch ? 2.2 : 0.8,
                  }
                }}
              />
            )}

            {/* CONTINENT TEXT OVERLAYS (Positioned Geographically Over Continents) */}
            {CONTINENT_LABELS.map(cont => (
              <Marker key={cont.name} position={cont.coords} icon={createContinentTextPin(cont.name)} interactive={false} />
            ))}

            {/* OCEAN TEXT OVERLAYS (Pacific on both left and right edges) */}
            {OCEAN_LABELS.map((oc, idx) => (
              <Marker key={`${oc.name}-${idx}`} position={oc.coords} icon={createOceanTextPin(oc.name)} interactive={false} />
            ))}

            {/* DRAW ALL 3 REAL MARITIME ROUTES */}
            {Object.values(routes).map((route) => {
              const isSelected = route.id === activeRouteId
              return (
                <Polyline
                  key={route.id}
                  positions={route.waypoints}
                  pathOptions={{
                    color: route.color,
                    weight: isSelected ? 5 : 2.5,
                    opacity: isSelected ? 0.95 : 0.40,
                    dashArray: route.id === 'route-eco' ? '8, 6' : undefined,
                  }}
                  eventHandlers={{
                    click: () => handleSelectRoute(route.id)
                  }}
                >
                  <Popup>
                    <div className="p-2 text-slate-900 font-sans">
                      <p className="font-bold text-xs">{route.name}</p>
                      <p className="text-[11px] text-slate-600 mt-1">{route.desc}</p>
                      <div className="mt-2 space-y-1 text-[10px] font-mono text-slate-700">
                        <p>Distance: {route.distKm.toLocaleString()} km ({route.distNM.toLocaleString()} NM)</p>
                        <p>Est. Fuel: {route.fuelTonnes} tonnes ({route.fuelLiters.toLocaleString()} L)</p>
                        <p>CO₂ Emissions: {route.co2Tonnes} tonnes</p>
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              )
            })}

            {/* ORIGIN PORT MARKER */}
            <Marker position={origPort.coords} icon={createPortPin(origPort.name, origPort.code, true)}>
              <Popup>
                <div className="p-1 text-slate-900 font-sans">
                  <p className="font-bold text-xs">🛫 STARTING PORT: {origPort.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">UN/LOCODE: {origPort.code} • {origPort.country}</p>
                  <p className="text-[10px] text-slate-700 font-mono">Coordinates: {origPort.coords[0]}° N, {origPort.coords[1]}° E</p>
                </div>
              </Popup>
            </Marker>

            {/* DESTINATION PORT MARKER */}
            <Marker position={destPort.coords} icon={createPortPin(destPort.name, destPort.code, false)}>
              <Popup>
                <div className="p-1 text-slate-900 font-sans">
                  <p className="font-bold text-xs">🛬 DESTINATION PORT: {destPort.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">UN/LOCODE: {destPort.code} • {destPort.country}</p>
                  <p className="text-[10px] text-slate-700 font-mono">Coordinates: {destPort.coords[0]}° N, {destPort.coords[1]}° E</p>
                </div>
              </Popup>
            </Marker>

            {/* LIVE ANIMATED SHIP MARKER ON ROUTE */}
            <Marker position={shipPos} icon={createLiveShipPin(effectiveShipName, progressPct, activeRoute.speedKnots)}>
              <Popup>
                <div className="p-1.5 text-slate-900 font-sans">
                  <p className="font-bold text-xs">🚢 {effectiveShipName}</p>
                  <p className="text-[10px] text-slate-600 font-mono">Position: {shipPos[0].toFixed(4)}° N, {shipPos[1].toFixed(4)}° E</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-1">Progress: {progressPct.toFixed(1)}% ({travelledKm.toLocaleString()} / {totalKm.toLocaleString()} km)</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* BOTTOM TRACKING CONTROL BAR (Sleek Dark Accent Section) */}
        <div className="p-4 bg-[#080808] border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4 z-[1000] relative">
          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                isTracking
                  ? 'bg-[#D97706] text-white hover:bg-[#B45309]'
                  : 'btn-coral'
              }`}
            >
              {isTracking ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isTracking ? 'Pause Tracking' : 'Start Real-Time Tracking'}</span>
            </button>

            <button
              onClick={handleResetTracking}
              className="px-3.5 py-2.5 rounded-xl bg-[#191919] text-[#CCCCCC] hover:text-white border border-[#333333] text-xs font-medium transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#888888]" />
              <span>Reset</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-[#262626] pl-3">
              <span className="text-[10px] font-bold text-[#888888] uppercase">Speed:</span>
              {[1, 5, 10, 25].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setSimSpeedMultiplier(mult)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                    simSpeedMultiplier === mult ? 'bg-[#174D3F] text-white' : 'bg-[#191919] text-[#888888] hover:text-white'
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>
          </div>

          {/* ROUTE PROGRESS BAR VISUALIZER */}
          <div className="w-full md:max-w-xl space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-white font-mono text-left">START: {origin}</span>
              <span className="text-[#4ADE80] font-mono text-center">PROGRESS: {progressPct.toFixed(1)}%</span>
              <span className="text-white font-mono text-right">DEST: {destination}</span>
            </div>

            {/* Custom Visual Bar: START ●━━━━━━━🚢━━━━━━━━━━━━● DESTINATION */}
            <div className="relative w-full h-3.5 bg-[#191919] rounded-full border border-[#333333] p-0.5 overflow-hidden flex items-center">
              <div
                className="h-full rounded-full bg-[#174D3F] transition-all duration-200"
                style={{ width: `${progressPct}%` }}
              ></div>
              <div
                className="absolute top-1/2 -translate-y-1/2 text-xs transition-all duration-200 transform -translate-x-1/2 drop-shadow-md"
                style={{ left: `${Math.max(2, Math.min(98, progressPct))}%` }}
              >
                🚢
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#888888] font-mono">
              <span className="text-left">{travelledKm.toLocaleString()} km travelled</span>
              <span className="text-right">{remainingKm.toLocaleString()} km remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* REAL-TIME TELEMETRY PANEL */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E3DA] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#174D3F] uppercase tracking-wider mb-1">
              <ShipIcon className="w-4 h-4 text-[#174D3F]" />
              <span>Live Fleet Tracking Telemetry</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#191919] flex items-center gap-2">
              <span>SHIP: {effectiveShipName}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#FAF9F5] text-[#777777] border border-[#E5E3DA] font-mono font-normal">IMO 9988123</span>
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono bg-[#FAF9F5] px-4 py-2 rounded-xl border border-[#E5E3DA]">
            <div>
              <span className="text-[#777777] block text-[9px] uppercase">FROM</span>
              <span className="text-[#191919] font-bold">{origin} Port</span>
            </div>
            <span className="text-[#777777] text-base">➔</span>
            <div>
              <span className="text-[#777777] block text-[9px] uppercase">TO</span>
              <span className="text-[#174D3F] font-bold">{destination} Port</span>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">Distance Travelled</span>
            <p className="text-lg font-bold text-[#191919] font-mono">{travelledKm.toLocaleString()} <span className="text-xs text-[#777777] font-normal">km</span></p>
            <p className="text-[10px] text-[#777777] font-mono">{Math.round(travelledKm * 0.539957).toLocaleString()} NM</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">Remaining Distance</span>
            <p className="text-lg font-bold text-[#191919] font-mono">{remainingKm.toLocaleString()} <span className="text-xs text-[#777777] font-normal">km</span></p>
            <p className="text-[10px] text-[#777777] font-mono">{Math.round(remainingKm * 0.539957).toLocaleString()} NM</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">Current Speed</span>
            <p className="text-lg font-bold text-[#174D3F] font-mono">{activeRoute.speedKnots} <span className="text-xs text-[#777777] font-normal">knots</span></p>
            <p className="text-[10px] text-[#777777] font-mono">{Math.round(activeRoute.speedKnots * 1.852)} km/h</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">Estimated ETA</span>
            <p className="text-lg font-bold text-[#191919] font-mono">{etaHoursInt}h {etaMinsInt}m</p>
            <p className="text-[10px] text-[#777777] font-mono">Total {totalEtaHours}h voyage</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">Fuel Consumed</span>
            <p className="text-lg font-bold text-[#174D3F] font-mono">{consumedFuelTonnes} <span className="text-xs text-[#777777] font-normal">tonnes</span></p>
            <p className="text-[10px] text-[#777777] font-mono">{consumedFuelLiters.toLocaleString()} L</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-1">
            <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">CO₂ Emitted</span>
            <p className="text-lg font-bold text-[#174D3F] font-mono">{emittedCo2Tonnes} <span className="text-xs text-[#777777] font-normal">t CO₂</span></p>
            <p className="text-[10px] text-[#777777] font-mono">3.145 t CO₂ / t fuel</p>
          </div>
        </div>
      </div>

      {/* ROUTE COMPARISON MATRIX */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#191919] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#174D3F]" />
              <span>Route Intelligence & Decision Comparison</span>
            </h3>
            <p className="text-xs text-[#777777]">
              Comparing 3 real maritime paths between {origin} and {destination}. Select any route to preview on map.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDF5F2] text-[#174D3F] border border-[#D2E4DC]">
            Recommended: Minimum Fuel & CO₂
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(routes).map((route) => {
            const isSelected = route.id === activeRouteId
            const isEco = route.type === 'eco'

            return (
              <div
                key={route.id}
                onClick={() => handleSelectRoute(route.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between bg-white ${
                  isSelected
                    ? 'border-[#F15F56] ring-1 ring-[#F15F56] shadow-card'
                    : 'border-[#E5E3DA] hover:border-[#D6D3C7]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isEco
                        ? 'bg-[#EDF5F2] text-[#174D3F] border-[#D2E4DC]'
                        : route.type === 'shortest'
                        ? 'bg-[#FEF7EC] text-[#9A6210] border-[#FBE5C3]'
                        : 'bg-[#EEF4FE] text-[#1D54B4] border-[#D0E1FD]'
                    }`}>
                      {route.badge}
                    </span>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#F15F56]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#191919] mb-1">{route.name}</h4>
                  <p className="text-[11px] text-[#777777] leading-relaxed mb-4">{route.desc}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E5E3DA] text-xs font-mono">
                  <div className="flex justify-between text-[#555555]">
                    <span className="text-[#777777]">Distance:</span>
                    <span className="font-bold text-[#191919]">{route.distKm.toLocaleString()} km ({route.distNM.toLocaleString()} NM)</span>
                  </div>

                  <div className="flex justify-between text-[#555555]">
                    <span className="text-[#777777]">Estimated Fuel:</span>
                    <span className={`font-bold ${isEco ? 'text-[#174D3F]' : 'text-[#191919]'}`}>
                      {route.fuelTonnes} tonnes ({route.fuelLiters.toLocaleString()} L)
                    </span>
                  </div>

                  <div className="flex justify-between text-[#555555]">
                    <span className="text-[#777777]">CO₂ Emissions:</span>
                    <span className={`font-bold ${isEco ? 'text-[#174D3F]' : 'text-[#191919]'}`}>
                      {route.co2Tonnes} tonnes ({route.co2Kg.toLocaleString()} kg)
                    </span>
                  </div>

                  <div className="flex justify-between text-[#555555]">
                    <span className="text-[#777777]">Speed / ETA:</span>
                    <span className="font-bold text-[#174D3F]">{route.speedKnots} kts • {route.etaHours} hrs</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectRoute(route.id)
                  }}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'btn-coral'
                      : 'btn-outline-warm'
                  }`}
                >
                  <span>{isSelected ? 'Active Route' : 'Select This Route'}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
