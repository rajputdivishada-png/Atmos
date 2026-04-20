"use client"

import { useState } from "react"
import { AlertTriangle, X, ThermometerSun } from "lucide-react"
import { useApp } from "@/components/providers"

export function HeatwaveAlert() {
  const { weather } = useApp()
  const [dismissed, setDismissed] = useState(false)

  // Only show if temperature is significantly high (Anomaly)
  const isHighHeat = weather && weather.temperature > 35

  if (dismissed || !isHighHeat) return null

  return (
    <div className="rounded-xl bg-destructive/10 border-l-4 border-destructive p-4 flex items-center gap-4 animate-fade-in-up">
      <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
        <ThermometerSun className="w-6 h-6 text-destructive" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <h3 className="font-semibold text-destructive">Heatwave Warning Active</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Extreme heat advisory in effect for {weather.city}. Ambient temperature reaching {weather.temperature}°C. Stay hydrated and avoid peak sun exposure.
        </p>
      </div>

      <button 
        onClick={() => setDismissed(true)}
        className="p-2 rounded-lg hover:bg-destructive/20 transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4 text-destructive" />
      </button>
    </div>
  )
}
