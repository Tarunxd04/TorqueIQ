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
  Legend,
  CartesianGrid
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
      action={<Badge variant="green" size="sm" dot>Sweet Spot: {optimalSpeed} kts</Badge>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Recharts Curve */}
        <div className="lg:col-span-3 h-72 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedCurvePoints} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#E5E3DA" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="speed"
                stroke="#777777"
                fontSize={11}
                unit=" kts"
                tickLine={false}
                axisLine={{ stroke: '#E5E3DA' }}
              />
              <YAxis stroke="#777777" fontSize={11} tickLine={false} axisLine={{ stroke: '#E5E3DA' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E3DA',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#191919',
                  boxShadow: '0 4px 16px rgba(25, 25, 25, 0.08)'
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
                stroke="#174D3F"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#174D3F' }}
              />
              <Line
                type="monotone"
                dataKey="etaHours"
                name="Voyage Duration (hours)"
                stroke="#777777"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              {optimalPoint && (
                <ReferenceDot
                  x={optimalPoint.speed}
                  y={optimalPoint.fuel}
                  r={7}
                  fill="#F15F56"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sweet Spot Insight Card */}
        <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DA] space-y-3.5">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#174D3F]">
            <Zap className="w-3.5 h-3.5 text-[#174D3F]" />
            <span>Optimal Sweet Spot</span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#191919] font-mono">{optimalSpeed}</span>
              <span className="text-xs font-mono text-[#777777]">knots</span>
            </div>
            <p className="text-[11px] text-[#777777] mt-1 leading-relaxed">
              Minimum fuel consumption per nautical mile while strictly fulfilling requested arrival window.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#E5E3DA] text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#777777]">Fuel Savings:</span>
              <span className="font-bold text-[#174D3F]">-14.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Over-speed Penalty:</span>
              <span className="font-bold text-[#F15F56]">+28% @ 16.5 kts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Engine Load:</span>
              <span className="font-bold text-[#191919]">74% (Eco Mode)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
