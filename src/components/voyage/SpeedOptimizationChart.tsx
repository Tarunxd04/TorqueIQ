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
    <Card title="Cubic Speed-Power Optimization Curve" subtitle="Hydrodynamic resistance curve balancing fuel burn vs voyage duration">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Recharts Curve */}
        <div className="lg:col-span-3 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedCurvePoints} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="speed"
                stroke="#64748B"
                fontSize={11}
                unit=" kts"
              />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B132B', borderColor: '#233056', borderRadius: '8px', fontSize: '12px' }}
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
                stroke="#06B6D4"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="etaHours"
                name="Voyage Duration (hours)"
                stroke="#F59E0B"
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
                  stroke="#0B132B"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Speed Tradeoff Summary Callout */}
        <div className="space-y-4 p-4 rounded-xl bg-navy-900 border border-navy-700/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Optimal Speed</span>
            <Badge variant="green">13.8 knots</Badge>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-navy-800 pb-1.5">
              <span className="text-slate-400">Optimal Fuel Burn:</span>
              <span className="font-mono font-bold text-emerald-400">428 tonnes</span>
            </div>
            <div className="flex justify-between border-b border-navy-800 pb-1.5">
              <span className="text-slate-400">Voyage Duration:</span>
              <span className="font-mono font-bold text-white">122 hours (5d 02h)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bunker Fuel Cost:</span>
              <span className="font-mono font-bold text-amber-400">$299,000</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800 text-[11px] text-slate-300 leading-relaxed">
            <p className="font-semibold text-cyan-400 mb-1">Hydrodynamic Tradeoff Rule:</p>
            Higher speed → higher fuel consumption (cubic ratio).
            Lower speed → lower fuel burn but risks port ETA delay penalties.
            <span className="text-emerald-400 font-bold block mt-1">GreenRoute 13.8 kts delivers the exact sweet spot.</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
