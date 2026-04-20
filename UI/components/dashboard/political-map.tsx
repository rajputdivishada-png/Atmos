"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

// We must dynamically import the leaflet map components
// because they try to reference `window` which breaks SSR
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then(m => m.CircleMarker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false })

interface Hotspot {
  lat: number;
  lng: number;
  intensity: number;
  area: string;
  reports: number;
}

export const hotspots: Hotspot[] = [
  { lat: 28.6304, lng: 77.2177, intensity: 0.9, area: "Connaught Place", reports: 45 },
  { lat: 28.6517, lng: 77.1901, intensity: 0.7, area: "Karol Bagh", reports: 32 },
  { lat: 28.5677, lng: 77.2433, intensity: 0.8, area: "Lajpat Nagar", reports: 38 },
  { lat: 28.5823, lng: 77.0500, intensity: 0.6, area: "Dwarka", reports: 24 },
  { lat: 28.5245, lng: 77.2066, intensity: 0.5, area: "Saket", reports: 19 },
  { lat: 28.5708, lng: 77.3235, intensity: 0.85, area: "Noida Sector 18", reports: 41 },
  { lat: 28.6692, lng: 77.4538, intensity: 0.75, area: "Ghaziabad", reports: 29 },
  { lat: 28.4595, lng: 77.0266, intensity: 0.4, area: "Gurgaon", reports: 15 },
  { lat: 28.4089, lng: 77.3178, intensity: 0.65, area: "Faridabad", reports: 27 },
]

export function PoliticalMap({ onSelectArea }: { onSelectArea?: (area: string) => void }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-full w-full bg-[#0a1628] rounded-xl flex items-center justify-center text-muted-foreground animate-pulse">Loading map...</div>
  }

  // Use a political tile layer (CartoDB dark or light matter depending on theme)
  const tileUrl = theme === "light" 
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

  return (
    <div className="h-full w-full rounded-xl overflow-hidden [&>.leaflet-container]:bg-[#0a1628]">
      <MapContainer
        center={[28.59, 77.2]}
        zoom={11}
        style={{ height: "100%", width: "100%", zIndex: 10 }}
        zoomControl={false}
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; CARTO'
        />
        
        {hotspots.map((point, index) => (
          <CircleMarker
            key={index}
            center={[point.lat, point.lng]}
            radius={2 + point.intensity * 25}
            pathOptions={{
              fillColor: '#fbbf24',
              fillOpacity: point.intensity * 0.7,
              color: '#ef4444',
              weight: 1,
              opacity: point.intensity * 0.4
            }}
            eventHandlers={{
              click: () => onSelectArea?.(point.area)
            }}
          >
            <Popup className="!bg-card !border-border !text-foreground">
              <div className="text-center p-1 font-sans">
                <span className="font-semibold block">{point.area}</span>
                <span className="text-xs text-muted-foreground block">{point.reports} reports</span>
                <span className="text-destructive font-bold mt-1 block">
                  {Math.round(38 + point.intensity * 8)}°C felt
                </span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
