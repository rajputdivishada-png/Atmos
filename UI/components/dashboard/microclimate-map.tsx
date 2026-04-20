"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Thermometer, Wind, Droplets, Cloud, Sun } from "lucide-react"
import { PoliticalMap } from "./political-map"

const feelings = [
  { id: "hotter", label: "Hotter", icon: Thermometer, color: "bg-destructive" },
  { id: "cooler", label: "Cooler", icon: Sun, color: "bg-secondary" },
  { id: "windy", label: "Windy", icon: Wind, color: "bg-primary" },
  { id: "humid", label: "Humid", icon: Droplets, color: "bg-chart-5" },
  { id: "cloudy", label: "Cloudy", icon: Cloud, color: "bg-muted-foreground" },
]

const heatmapPoints = [
  { x: 25, y: 30, intensity: 0.9 },
  { x: 45, y: 45, intensity: 0.7 },
  { x: 70, y: 35, intensity: 0.8 },
  { x: 30, y: 60, intensity: 0.6 },
  { x: 55, y: 70, intensity: 0.5 },
  { x: 80, y: 55, intensity: 0.85 },
  { x: 20, y: 75, intensity: 0.4 },
  { x: 65, y: 25, intensity: 0.75 },
]

export function MicroclimateMap() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)

  return (
    <div className="rounded-2xl bg-card border border-border p-6 hover-glow-amber transition-all animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Micro-Climate Map</h3>
          <p className="text-xs text-muted-foreground">Community heat reports</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="text-primary font-medium">247</span> reports today
        </div>
      </div>

      <div className="flex gap-4">
        {/* Map Area */}
        <div className="flex-1 relative h-64 rounded-xl bg-[#0a1628] border border-border overflow-hidden">
          <PoliticalMap onSelectArea={() => {}} />
          
          {/* Map labels */}
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs text-muted-foreground z-20 pointer-events-none">
            New Delhi Metro Area
          </div>
        </div>

        {/* Feeling Buttons */}
        <div className="w-32 space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Report Feeling</p>
          {feelings.map((feeling) => (
            <button
              key={feeling.id}
              onClick={() => setSelectedFeeling(selectedFeeling === feeling.id ? null : feeling.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all",
                selectedFeeling === feeling.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", feeling.color)} />
              <feeling.icon className="w-3.5 h-3.5" />
              <span className="text-xs">{feeling.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
