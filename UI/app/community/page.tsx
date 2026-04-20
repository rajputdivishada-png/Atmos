"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets, 
  Send, 
  Users,
  Clock,
  ChevronRight,
  Flame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PoliticalMap } from "@/components/dashboard/political-map"

const heatmapPoints = [
  { x: 15, y: 20, intensity: 0.9, area: "Connaught Place", reports: 45 },
  { x: 35, y: 35, intensity: 0.7, area: "Karol Bagh", reports: 32 },
  { x: 55, y: 25, intensity: 0.8, area: "Lajpat Nagar", reports: 38 },
  { x: 25, y: 55, intensity: 0.6, area: "Dwarka", reports: 24 },
  { x: 45, y: 65, intensity: 0.5, area: "Saket", reports: 19 },
  { x: 70, y: 45, intensity: 0.85, area: "Noida Sector 18", reports: 41 },
  { x: 80, y: 30, intensity: 0.75, area: "Ghaziabad", reports: 29 },
  { x: 20, y: 75, intensity: 0.4, area: "Gurgaon", reports: 15 },
  { x: 60, y: 80, intensity: 0.65, area: "Faridabad", reports: 27 },
]

const recentReports = [
  { user: "Priya S.", area: "Connaught Place", feeling: "Extremely Hot", time: "2 min ago" },
  { user: "Rahul M.", area: "Karol Bagh", feeling: "Very Hot", time: "5 min ago" },
  { user: "Ananya K.", area: "Noida", feeling: "Hot & Humid", time: "8 min ago" },
  { user: "Vikram T.", area: "Dwarka", feeling: "Hot", time: "12 min ago" },
  { user: "Meera D.", area: "Saket", feeling: "Warm", time: "15 min ago" },
]

const feelings = [
  { id: "extremely-hot", label: "Extremely Hot", color: "bg-destructive" },
  { id: "very-hot", label: "Very Hot", color: "bg-orange-500" },
  { id: "hot", label: "Hot", color: "bg-primary" },
  { id: "warm", label: "Warm", color: "bg-yellow-400" },
  { id: "comfortable", label: "Comfortable", color: "bg-success" },
  { id: "cool", label: "Cool", color: "bg-secondary" },
]

export default function CommunityPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Community Map</h1>
          <p className="text-muted-foreground">Real-time crowd-sourced temperature reports</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card border border-border p-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Active Users</span>
            </div>
            <p className="text-2xl font-bold font-mono">1,247</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Reports Today</span>
            </div>
            <p className="text-2xl font-bold font-mono">3,892</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Hotspots</span>
            </div>
            <p className="text-2xl font-bold font-mono">12</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-chart-5" />
              <span className="text-xs text-muted-foreground">Last Update</span>
            </div>
            <p className="text-lg font-medium">Just now</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Full Map */}
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Heat Map</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Intensity:</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 rounded-sm bg-success/50" />
                  <div className="w-4 h-2 rounded-sm bg-primary/50" />
                  <div className="w-4 h-2 rounded-sm bg-orange-500/50" />
                  <div className="w-4 h-2 rounded-sm bg-destructive/70" />
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-[400px] rounded-xl bg-[#0a1628] border border-border overflow-hidden">
              <PoliticalMap onSelectArea={setSelectedArea} />

              {/* Selected area info overlay (optional since map has popups, but keeps side UI in sync) */}
              {selectedArea && (
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/90 backdrop-blur-sm border border-border z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{selectedArea}</p>
                      <p className="text-xs text-muted-foreground">
                        {heatmapPoints.find(p => p.area === selectedArea)?.reports || 0} reports in last hour
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold font-mono text-destructive">
                        {Math.round(38 + (heatmapPoints.find(p => p.area === selectedArea)?.intensity || 0) * 8)}°C
                      </p>
                      <p className="text-xs text-muted-foreground">Avg reported</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report Panel */}
          <div className="space-y-6">
            {/* Submit Report */}
            <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
              <h3 className="text-lg font-semibold mb-4">Report How It Feels</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your Location</p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">New Delhi, India</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">How does it feel?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feelings.map((feeling) => (
                      <button
                        key={feeling.id}
                        onClick={() => setSelectedFeeling(feeling.id)}
                        className={cn(
                          "flex items-center gap-2 p-2.5 rounded-lg border text-sm transition-all",
                          selectedFeeling === feeling.id
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", feeling.color)} />
                        <span className="text-xs">{feeling.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all",
                    selectedFeeling 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  disabled={!selectedFeeling}
                >
                  <Send className="w-4 h-4" />
                  Submit Report
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Reports</h3>
                <span className="text-xs text-muted-foreground">Live feed</span>
              </div>
              
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-foreground">
                        {report.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{report.user}</p>
                      <p className="text-xs text-muted-foreground">{report.area}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-xs font-medium",
                        report.feeling.includes("Extremely") ? "text-destructive" :
                        report.feeling.includes("Very") ? "text-orange-500" :
                        "text-primary"
                      )}>
                        {report.feeling}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{report.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-1 mt-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all reports
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
