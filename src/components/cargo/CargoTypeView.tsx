import React, { useState } from 'react'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import {
  Boxes,
  Truck,
  Apple,
  Zap,
  Flame,
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  Dog,
  Car,
  Package,
  Layers,
  Thermometer,
  Wind
} from 'lucide-react'

export interface CargoCategoryItem {
  id: string
  title: string
  category: 'Livestock & Animals' | 'Vehicles & Ro-Ro' | 'Refrigerated & Pharma' | 'Heavy & Industrial' | 'Hazardous & Energy' | 'Dry Bulk'
  realWorldExample: string
  tradeCorridor: string
  vesselType: string
  cargoVolume: string
  tempControl: string
  auxPowerImpact: string
  riskLevel: 'Low' | 'Medium' | 'High'
  handlingSpecs: string[]
  icon: any
}

export const CARGO_CATALOG: CargoCategoryItem[] = [
  {
    id: 'cargo-1',
    title: 'Livestock & Live Animals Cargo',
    category: 'Livestock & Animals',
    realWorldExample: '5,000 Head of Dairy Cattle & Breeding Livestock',
    tradeCorridor: 'Port of Kochi → Singapore / Gulf Ports',
    vesselType: 'Dedicated Livestock Carrier (MV Echo Trader)',
    cargoVolume: '5,000 Animals / 12,000 m² Deck Space',
    tempControl: 'Active Climate Control (22°C - 25°C)',
    auxPowerImpact: '+8.5% Auxiliary Genset Load (Ventilation Fans)',
    riskLevel: 'High',
    handlingSpecs: [
      'Continuous forced ventilation (30 complete air changes / hour)',
      'Automated freshwater distribution & fodder feeding troughs',
      'Bio-security isolation pens & veterinary monitoring deck',
      'Specialized hull anti-roll stabilization for animal welfare'
    ],
    icon: Dog
  },
  {
    id: 'cargo-2',
    title: 'Automotive & Heavy Vehicles (Ro-Ro)',
    category: 'Vehicles & Ro-Ro',
    realWorldExample: '4,200 Finished Electric & Hybrid Passenger Vehicles (EVs)',
    tradeCorridor: 'Shanghai → Rotterdam / Mumbai Port',
    vesselType: 'Pure Car & Truck Carrier - PCTC (MV Pacific Horizon)',
    cargoVolume: '4,200 CEU (Car Equivalent Units)',
    tempControl: 'Ambient Cargo Deck Temperature',
    auxPowerImpact: '+3.2% Ventilation & Thermal Scanning',
    riskLevel: 'Medium',
    handlingSpecs: [
      'Lithium-ion battery State-of-Charge (SOC) capped at 30-40%',
      'Heavy-duty wheel lashing straps (4-point lashings per vehicle)',
      'Infrared thermal cameras for deck-wide fire monitoring',
      'Adjustable internal ramp height clearances up to 4.5 meters'
    ],
    icon: Car
  },
  {
    id: 'cargo-3',
    title: 'Refrigerated Perishables & Pharmaceuticals',
    category: 'Refrigerated & Pharma',
    realWorldExample: '1,200 FEU Containers of Fresh Mangoes, Frozen Seafood & Vaccines',
    tradeCorridor: 'Mumbai → Dubai / Singapore Corridor',
    vesselType: 'High-Reefer Container Vessel (MV Green Voyager)',
    cargoVolume: '1,200 Forty-Foot Reefer Containers (FEU)',
    tempControl: 'Deep Freeze (-25°C) to Chilled (+4°C)',
    auxPowerImpact: '+12.0% Auxiliary Power (Reefer Plugs)',
    riskLevel: 'Medium',
    handlingSpecs: [
      'Continuous 440V reefer plug power monitoring',
      'Controlled atmosphere (CO₂ / O₂ gas ratio logging for fruit preservation)',
      'Cold-chain data logger telemetry transmitted directly to bridge',
      'Emergency backup generator redundancy for zero-thaw guarantee'
    ],
    icon: Thermometer
  },
  {
    id: 'cargo-4',
    title: 'Heavy Industrial Machinery & Wind Energy',
    category: 'Heavy & Industrial',
    realWorldExample: '85-meter Offshore Wind Turbine Blades & Excavators',
    tradeCorridor: 'Chennai → Rotterdam / Hamburg',
    vesselType: 'Heavy Lift Project Cargo Vessel (MV Poseidon Express)',
    cargoVolume: '18,000 Freight Tonnes Heavy Lift',
    tempControl: 'Weather-Exposed Deck Storage',
    auxPowerImpact: '+4.0% Ballast Pumping Stability',
    riskLevel: 'Medium',
    handlingSpecs: [
      'High-deck strength distribution up to 25 tonnes / m²',
      'Tandem heavy-lift vessel crane operation (350t dual cranes)',
      'Custom steel sea-fastening welds & dunnage spreading beams',
      'Weather-routing requirement to avoid roll angles exceeding 12°'
    ],
    icon: Layers
  },
  {
    id: 'cargo-5',
    title: 'Hazardous Energy & Cryogenic Chemicals',
    category: 'Hazardous & Energy',
    realWorldExample: '160,000 m³ Liquefied Natural Gas (LNG) & Solvents',
    tradeCorridor: 'Dubai / Ras Laffan → Mumbai / Kochi',
    vesselType: 'Cryogenic Tanker (MV Neptune Sentinel)',
    cargoVolume: '160,000 m³ Liquid Capacity',
    tempControl: 'Cryogenic Isolation (-162°C)',
    auxPowerImpact: '+15.0% Reliquefaction Unit',
    riskLevel: 'High',
    handlingSpecs: [
      'IMO IGC Code Type 2G gas containment tanks',
      'Boil-Off Gas (BOG) re-liquefaction plant or dual-fuel engine usage',
      'Continuous nitrogen inerting of cargo hold void spaces',
      'Emergency Shutdown System (ESD) linked to shore manifold'
    ],
    icon: Flame
  },
  {
    id: 'cargo-6',
    title: 'Agricultural Grain & Dry Bulk Commodities',
    category: 'Dry Bulk',
    realWorldExample: '75,000 Tonnes Milling Wheat & Soybeans',
    tradeCorridor: 'Black Sea / Rotterdam → Colombo / Chennai',
    vesselType: 'Ultramax Bulk Carrier (MV Blue Crest)',
    cargoVolume: '75,000 Metric Tonnes Bulk',
    tempControl: 'Hold Humidity Control (< 13.5%)',
    auxPowerImpact: '+1.5% Hatch Cover Seal & Hold Fans',
    riskLevel: 'Low',
    handlingSpecs: [
      'Weather-tight hydraulic folding hatch cover seals',
      'Grain shifting stability calculations under IMO Grain Code',
      'Continuous cargo hold dew point & temperature probe logs',
      'In-transit phosphine fumigation for agricultural quarantine'
    ],
    icon: Package
  }
]

export const CargoTypeView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCargo = CARGO_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.realWorldExample.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tradeCorridor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Boxes className="w-4 h-4 text-emerald-400" />
            <span>Real-World Maritime Freight Intelligence</span>
          </div>
          <h2 className="text-2xl font-black text-white">Cargo Classification & Handling Catalog</h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore operational specifications, power requirements, and trade corridors across diverse freight types (Livestock, Vehicles, Perishables, Energy, Bulk).
          </p>
        </div>

        <Badge variant="green" size="md">
          6 Active Freight Categories
        </Badge>
      </div>

      {/* Controls Bar */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cargo example (e.g. Cattle, EVs, Fruit, LNG)..."
              className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {['ALL', 'Livestock & Animals', 'Vehicles & Ro-Ro', 'Refrigerated & Pharma', 'Heavy & Industrial', 'Hazardous & Energy', 'Dry Bulk'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-navy-950 font-bold'
                    : 'bg-navy-950 border border-navy-700 text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Freight' : cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Cargo Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCargo.map((item) => {
          const IconComponent = item.icon

          return (
            <Card key={item.id} className="hover:border-cyan-500/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={item.riskLevel === 'Low' ? 'green' : item.riskLevel === 'Medium' ? 'yellow' : 'red'}>
                    {item.riskLevel} Operational Risk
                  </Badge>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.category}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-navy-900 border border-navy-700 text-cyan-400 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug">{item.title}</h3>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">{item.realWorldExample}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-navy-700/60">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trade Corridor:</span>
                    <span className="font-mono text-slate-200 text-right">{item.tradeCorridor}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Recommended Vessel:</span>
                    <span className="font-bold text-white text-right">{item.vesselType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Cargo Volume / Unit:</span>
                    <span className="font-mono text-cyan-400 text-right">{item.cargoVolume}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Temp / Climate Specs:</span>
                    <span className="font-mono text-amber-400 text-right">{item.tempControl}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Auxiliary Power Impact:</span>
                    <span className="font-mono font-bold text-rose-400 text-right">{item.auxPowerImpact}</span>
                  </div>
                </div>

                {/* Handling Requirements List */}
                <div className="mt-4 pt-3 border-t border-navy-800">
                  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Special Cargo Protocols:</h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {item.handlingSpecs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0"></span>
                        <span className="leading-tight">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
