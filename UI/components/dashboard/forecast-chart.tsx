"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const forecastData = [
  { day: "Mon", max: 42, min: 28 },
  { day: "Tue", max: 44, min: 29 },
  { day: "Wed", max: 43, min: 28 },
  { day: "Thu", max: 41, min: 27 },
  { day: "Fri", max: 39, min: 26 },
  { day: "Sat", max: 38, min: 25 },
  { day: "Sun", max: 40, min: 27 },
]

export function ForecastChart() {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 hover-glow-amber transition-all animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">7-Day Forecast</h3>
          <p className="text-xs text-muted-foreground">Temperature trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded-full bg-primary"></span>
            <span className="text-xs text-muted-foreground">Max</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded-full bg-secondary"></span>
            <span className="text-xs text-muted-foreground">Min</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[20, 50]}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '12px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#e5e7eb', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ padding: '2px 0' }}
              formatter={(value: number, name: string) => [
                `${value}°C`,
                name === 'max' ? 'Maximum' : 'Minimum'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="max" 
              stroke="#fbbf24" 
              strokeWidth={3}
              dot={{ fill: '#fbbf24', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: '#fbbf24', strokeWidth: 2, stroke: '#0a0f1e', r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="min" 
              stroke="#7dd3fc" 
              strokeWidth={3}
              dot={{ fill: '#7dd3fc', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: '#7dd3fc', strokeWidth: 2, stroke: '#0a0f1e', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
