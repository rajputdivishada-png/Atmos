"use client"

import { useEffect, useState } from "react"
import { Sun, Droplets, Wind, CloudFog, AlertTriangle, Loader2 } from "lucide-react"
import { useApp } from "@/components/providers"

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  main_condition: string;
}

export function CurrentWeather() {
  const { weather, weatherLoading, location } = useApp()
  const data = weather

  if (weatherLoading || !data) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 h-[320px] flex flex-col items-center justify-center text-muted-foreground animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>Fetching satellite data for {location}...</p>
      </div>
    )
  }

  const error = data.error

  if (error) {
    return (
      <div className="rounded-2xl bg-card border border-destructive/50 p-6 h-[320px] flex flex-col items-center justify-center text-center">
        <AlertTriangle className="w-10 h-10 text-destructive mb-3" />
        <p className="text-sm font-semibold text-destructive">API Connection Failed</p>
        <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">{error}</p>
        <p className="text-xs text-muted-foreground mt-4 italic text-primary">OpenWeatherMap activation may take up to 2 hours.</p>
      </div>
    )
  }


  return (
    <div className="rounded-2xl bg-card border border-border p-6 hover-glow-amber transition-all animate-fade-in-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Current Weather</p>
          <p className="text-sm text-foreground font-medium">{data.city}, {data.country}</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Sun className="w-10 h-10 text-primary animate-pulse" />
        </div>
      </div>

      {/* Large Temperature */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-7xl font-bold text-primary font-mono tracking-tight">{data.temperature}</span>
          <span className="text-3xl font-light text-primary/70">°C</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Feels like <span className="text-foreground font-medium">{data.feels_like}°C</span>
        </p>
      </div>

      {/* Condition */}
      <div className="flex items-center gap-2 mb-6">
        <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary capitalize">{data.main_condition}</span>
        </div>
        <span className="text-xs text-muted-foreground capitalize">{data.description}</span>
      </div>

      {/* Data Chips */}
      <div className="grid grid-cols-3 gap-3">
        {/* Humidity */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Droplets className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Humidity</span>
          </div>
          <p className="text-lg font-semibold font-mono text-foreground">{data.humidity}%</p>
        </div>
        
        {/* Wind */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Wind className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Wind</span>
          </div>
          <p className="text-lg font-semibold font-mono text-foreground">{data.wind_speed} m/s</p>
        </div>

        {/* Dynamic Warning placeholder (AQI or Alerts) */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <CloudFog className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Visibility</span>
          </div>
          <p className="text-lg font-semibold font-mono text-foreground">10km</p>
        </div>
      </div>
    </div>
  )
}
