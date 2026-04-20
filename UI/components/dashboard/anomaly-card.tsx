"use client"

import { AlertTriangle, TrendingUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

const sparklineData = [
  { day: 1, temp: 36 },
  { day: 2, temp: 37 },
  { day: 3, temp: 35 },
  { day: 4, temp: 38 },
  { day: 5, temp: 36 },
  { day: 6, temp: 37 },
  { day: 7, temp: 39 },
  { day: 8, temp: 38 },
  { day: 9, temp: 40 },
  { day: 10, temp: 38 },
  { day: 11, temp: 39 },
  { day: 12, temp: 37 },
  { day: 13, temp: 38 },
  { day: 14, temp: 36 },
  { day: 15, temp: 37 },
  { day: 16, temp: 38 },
  { day: 17, temp: 39 },
  { day: 18, temp: 38 },
  { day: 19, temp: 40 },
  { day: 20, temp: 39 },
  { day: 21, temp: 38 },
  { day: 22, temp: 40 },
  { day: 23, temp: 41 },
  { day: 24, temp: 39 },
  { day: 25, temp: 40 },
  { day: 26, temp: 41 },
  { day: 27, temp: 40 },
  { day: 28, temp: 42 },
  { day: 29, temp: 41 },
  { day: 30, temp: 42 },
]

import { useApp } from "@/components/providers"

export function AnomalyCard() {
  const { weather, weatherLoading } = useApp()
  
  if (weatherLoading || !weather) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 h-[330px] flex items-center justify-center animate-pulse">
        <p className="text-sm text-muted-foreground">Calculating climate anomalies...</p>
      </div>
    )
  }

  const baseTemp = 30; // Defined normal for this time of year
  const rawDiff = weather.temperature - baseTemp;
  const isAbove = rawDiff >= 0;
  const diffString = isAbove ? `+${rawDiff}` : `${rawDiff}`;

  return (
    <div className={cn(
      "rounded-2xl bg-card border p-6 hover-glow-amber transition-all animate-fade-in-up relative overflow-hidden",
      isAbove ? "border-destructive/30" : "border-secondary/30"
    )}>
      {/* Pulsing indicator */}
      <div className="absolute top-4 right-4">
        <span className="flex h-3 w-3">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            isAbove ? "bg-destructive" : "bg-secondary"
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full h-3 w-3",
            isAbove ? "bg-destructive" : "bg-secondary"
          )}></span>
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          isAbove ? "bg-destructive/10" : "bg-secondary/10"
        )}>
          <AlertTriangle className={cn("w-5 h-5", isAbove ? "text-destructive" : "text-secondary")} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Anomaly Detected</h3>
          <p className="text-xs text-muted-foreground">Atmospheric deviation</p>
        </div>
      </div>

      {/* Anomaly Value */}
      <div className="flex items-baseline gap-2 mb-4">
        <TrendingUp className={cn("w-5 h-5", isAbove ? "text-destructive" : "text-secondary")} />
        <span className={cn("text-4xl font-bold font-mono tracking-tight", isAbove ? "text-destructive" : "text-secondary")}>{diffString}</span>
        <span className={cn("text-xl", isAbove ? "text-destructive/70" : "text-secondary/70")}>°C</span>
        <span className="text-sm text-muted-foreground ml-2">{isAbove ? "above" : "below"} avg</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Current temperature for {weather.city} is {Math.abs(rawDiff)}°C {isAbove ? 'higher' : 'lower'} than the historical seasonal average for this sector.
      </p>


      {/* Sparkline Chart */}
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#ef4444' }}
              formatter={(value: number) => [`${value}°C`, 'Temp']}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#tempGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-muted-foreground mt-2 text-center">Last 30 days trend</p>
    </div>
  )
}
