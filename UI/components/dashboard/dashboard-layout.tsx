"use client"

import { useState } from "react"
import { TopBar } from "./top-bar"
import { WeatherBackground } from "./weather-background"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Weather-based animated background - pass condition prop to change weather */}
      <WeatherBackground condition="sunny" temperature={28} />
      
      {/* Horizontal Top Bar acts as Navigation */}
      <TopBar />

      {/* Main Content inside a glassy container */}
      <main className="flex-1 relative z-10 w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="backdrop-blur-xl bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-2xl">
          {children}
        </div>
      </main>
    </div>
  )
}
