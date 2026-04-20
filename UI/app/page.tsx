import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AIBriefing } from "@/components/dashboard/ai-briefing"
import { CurrentWeather } from "@/components/dashboard/current-weather"
import { AnomalyCard } from "@/components/dashboard/anomaly-card"
import { HeatwaveAlert } from "@/components/dashboard/heatwave-alert"
import { ForecastChart } from "@/components/dashboard/forecast-chart"
import { MicroclimateMap } from "@/components/dashboard/microclimate-map"

export default function AtmospherePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Atmosphere</h1>
          <p className="text-muted-foreground">Real-time atmospheric conditions and AI insights</p>
        </div>

        {/* AI Briefing - Full Width */}
        <AIBriefing />

        {/* Heatwave Alert */}
        <HeatwaveAlert />

        {/* Current Weather + Anomaly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CurrentWeather />
          <AnomalyCard />
        </div>

        {/* 7-Day Forecast */}
        <ForecastChart />

        {/* Micro-Climate Map */}
        <MicroclimateMap />
      </div>
    </DashboardLayout>
  )
}
