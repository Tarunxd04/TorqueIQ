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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E5E3DA] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#174D3F] uppercase tracking-wider mb-1.5">
            <Boxes className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>Maritime Freight Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">Cargo Classification & Handling Catalog</h1>
          <p className="text-xs text-[#777777] mt-1">
            Explore operational specifications, genset power requirements, and trade corridors across diverse freight types.
          </p>
        </div>

        <Badge variant="green" size="md" dot>
          6 Active Freight Categories
        </Badge>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border border-[#E5E3DA] p-4 rounded-xl shadow-subtle">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3.5">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cargo example (e.g. Cattle, EVs, Fruit, LNG)..."
              className="input-warm w-full pl-9 pr-4 py-2 text-xs font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-[#777777] shrink-0" />
            {['ALL', 'Livestock & Animals', 'Vehicles & Ro-Ro', 'Refrigerated & Pharma', 'Heavy & Industrial', 'Hazardous & Energy', 'Dry Bulk'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#EDF5F2] text-[#174D3F] border border-[#174D3F] font-bold shadow-subtle'
                    : 'bg-[#FFFFFF] border border-[#E5E3DA] text-[#777777] hover:text-[#191919] hover:bg-[#FAF9F5]'
                }`}
              >
                {cat === 'ALL' ? 'All Freight' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cargo Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCargo.map((item) => {
          const IconComponent = item.icon

          return (
            <Card key={item.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <Badge variant={item.riskLevel === 'Low' ? 'green' : item.riskLevel === 'Medium' ? 'yellow' : 'red'} size="sm" dot>
                    {item.riskLevel} Risk
                  </Badge>
                  <span className="text-[10px] font-mono text-[#174D3F] font-semibold uppercase">{item.category}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] text-[#174D3F] shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#191919] tracking-tight leading-snug">{item.title}</h3>
                    <p className="text-xs text-[#174D3F] font-medium mt-0.5">{item.realWorldExample}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-[#E5E3DA]">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Trade Corridor:</span>
                    <span className="font-mono text-[#191919] text-right font-medium">{item.tradeCorridor}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Recommended Vessel:</span>
                    <span className="font-medium text-[#191919] text-right">{item.vesselType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Cargo Volume / Unit:</span>
                    <span className="font-mono text-[#191919] text-right font-medium">{item.cargoVolume}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Climate Specs:</span>
                    <span className="font-mono text-[#D97706] text-right font-medium">{item.tempControl}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Aux Genset Load:</span>
                    <span className="font-mono font-bold text-[#F15F56] text-right">{item.auxPowerImpact}</span>
                  </div>
                </div>

                {/* Handling Requirements List */}
                <div className="mt-4 pt-3 border-t border-[#E5E3DA]">
                  <h4 className="text-[10px] font-mono font-bold text-[#777777] uppercase tracking-wider mb-2">Special Protocols:</h4>
                  <ul className="space-y-1.5 text-xs text-[#555555]">
                    {item.handlingSpecs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#174D3F] mt-1.5 shrink-0" />
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
