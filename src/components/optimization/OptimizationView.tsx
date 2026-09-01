import React from 'react'
import { SpeedOptimizationChart } from '../voyage/SpeedOptimizationChart'
import { runVoyageOptimization } from '../../utils/calculations'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { Zap, ShieldCheck, Cpu } from 'lucide-react'

export const OptimizationView: React.FC = () => {
  const result = runVoyageOptimization({
    origin: 'Mumbai',
    destination: 'Singapore',
    cargoTonnes: 65000,
    arrivalDate: '2026-09-05T14:00',
    selectedShipId: 'ALL'
  })

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Hydrodynamic Tradeoff Matrix</span>
          </div>
          <h2 className="text-2xl font-black text-white">Speed & Propulsion Optimization Deep Dive</h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing cubic power resistance scaling and Pareto optimal speed frontiers across vessel classes.
          </p>
        </div>

        <Badge variant="cyan" size="md">
          Optimal Speed: 13.8 knots
        </Badge>
      </div>

      <SpeedOptimizationChart
        speedCurvePoints={result.speedCurvePoints}
        optimalSpeed={result.recommendedSpeedKnots}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Cubic Law of Propulsion" subtitle="Marine engineering physics model">
          <p className="text-xs text-slate-300 leading-relaxed">
            Engine power $P$ required to propel a ship scales with vessel speed $V$ as $P \propto V^3$. Increasing vessel speed from 14 knots to 16 knots requires over 45% more shaft power and fuel burn.
          </p>
        </Card>

        <Card title="Weather Drag Compensation" subtitle="Real-time wave resistance factor">
          <p className="text-xs text-slate-300 leading-relaxed">
            Headwinds and high swell cause hull resistance to spike by up to 18%. GreenRoute reroutes vessels into ocean current corridors (+0.8 kt push) to maintain speed without increasing throttle.
          </p>
        </Card>

        <Card title="Just-In-Time (JIT) Arrival" subtitle="Port demurrage avoidance">
          <p className="text-xs text-slate-300 leading-relaxed">
            Sailing faster only to anchor outside a congested port wastes thousands of tonnes of fuel. Torque IQ synchronizes voyage speed with exact port berth availability window.
          </p>
        </Card>
      </div>
    </div>
  )
}
