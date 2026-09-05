import React from 'react'
import { SpeedCurvePoint } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  Legend
} from 'recharts'
import { Zap, Gauge, Flame, Clock } from 'lucide-react'

interface SpeedOptimizationChartProps {
  speedCurvePoints: SpeedCurvePoint[]
  optimalSpeed: number
}

export const SpeedOptimizationChart: React.FC<SpeedOptimizationChartProps> = ({
  speedCurvePoints,
  optimalSpeed = 13.8
}) => {
  const optimalPoint = speedCurvePoints.find(p => p.isOptimal) || speedCurvePoints[7]

  return (
    <Card
      title="Cubic Speed-Power Optimization Curve"
      subtitle="Hydrodynamic power law (P ∝ V^2.7) balancing fuel burn vs voyage duration"
      action={<Badge variant="cyan" size="sm" dot>Sweet Spot: {optimalSpeed} kts</Badge>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Recharts Curve */}
        <div className="lg:col-span-3 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedCurvePoints} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="speed"
                stroke="#4B5563"
                fontSize={11}
                unit=" kts"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090A0E',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#EDEDEF',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                }}
                formatter={(val: number, name: string) => [
                  name === 'fuel' ? `${val} tonnes` : name === 'etaHours' ? `${val} hrs` : `$${(val / 1000).toFixed(0)}K`,
                  name === 'fuel' ? 'Total Fuel Burn' : name === 'etaHours' ? 'Voyage Duration' : 'Bunker Cost'
                ]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="fuel"
                name="Fuel Consumption (tonnes)"
                stroke="#5E6AD2"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#6872D9' }}
              />
              <Line
                type="monotone"
                dataKey="etaHours"
                name="Voyage Duration (hours)"
                stroke="#06B6D4"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              {optimalPoint && (
                <ReferenceDot
                  x={optimalPoint.speed}
                  y={optimalPoint.fuel}
                  r={7}
                  fill="#10B981"
                  stroke="#050508"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sweet Spot Insight Card */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Optimal Sweet Spot</span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white font-mono">{optimalSpeed}</span>
              <span className="text-xs font-mono text-slate-400">knots</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Minimum fuel consumption per nautical mile while strictly fulfilling requested arrival window.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/[0.06] text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Fuel Savings:</span>
              <span className="font-bold text-emerald-400">-14.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Over-speed Penalty:</span>
              <span className="font-bold text-rose-400">+28% @ 16.5 kts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Engine Load:</span>
              <span className="font-bold text-slate-200">74% (Eco Mode)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
