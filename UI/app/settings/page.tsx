"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  User, 
  Bell, 
  MapPin, 
  Thermometer, 
  Shield, 
  Smartphone,
  Globe,
  Palette,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    title: "Profile",
    icon: User,
    settings: [
      { name: "Display Name", value: "Alex Chen", type: "text" },
      { name: "Email", value: "alex@aura.io", type: "text" },
      { name: "Location", value: "New Delhi, IN", type: "location" },
    ]
  },
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { name: "Heatwave Alerts", value: true, type: "toggle" },
      { name: "Daily Briefing", value: true, type: "toggle" },
      { name: "Anomaly Detection", value: true, type: "toggle" },
      { name: "Community Reports", value: false, type: "toggle" },
    ]
  },
  {
    title: "Units & Display",
    icon: Thermometer,
    settings: [
      { name: "Temperature Unit", value: "Celsius", type: "select", options: ["Celsius", "Fahrenheit"] },
      { name: "Wind Speed", value: "km/h", type: "select", options: ["km/h", "mph", "m/s"] },
      { name: "Date Format", value: "DD/MM/YYYY", type: "select", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
    ]
  },
  {
    title: "Privacy",
    icon: Shield,
    settings: [
      { name: "Share Location", value: true, type: "toggle" },
      { name: "Anonymous Reports", value: false, type: "toggle" },
      { name: "Data Analytics", value: true, type: "toggle" },
    ]
  },
]

export default function SettingsPage() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "Heatwave Alerts": true,
    "Daily Briefing": true,
    "Anomaly Detection": true,
    "Community Reports": false,
    "Share Location": true,
    "Anonymous Reports": false,
    "Data Analytics": true,
  })

  const handleToggle = (name: string) => {
    setToggleStates(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account</p>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div 
            key={section.title}
            className="rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${sectionIndex * 100}ms` }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
              <section.icon className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">{section.title}</h2>
            </div>

            {/* Settings Items */}
            <div className="divide-y divide-border">
              {section.settings.map((setting) => (
                <div 
                  key={setting.name}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{setting.name}</p>
                    {setting.type === "text" && (
                      <p className="text-xs text-muted-foreground mt-0.5">{setting.value}</p>
                    )}
                    {setting.type === "location" && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-primary" />
                        <p className="text-xs text-muted-foreground">{setting.value}</p>
                      </div>
                    )}
                  </div>

                  {/* Toggle */}
                  {setting.type === "toggle" && (
                    <button
                      onClick={() => handleToggle(setting.name)}
                      className={cn(
                        "relative w-11 h-6 rounded-full transition-colors",
                        toggleStates[setting.name] ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                          toggleStates[setting.name] && "translate-x-5"
                        )}
                      />
                    </button>
                  )}

                  {/* Select */}
                  {setting.type === "select" && (
                    <select 
                      className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      defaultValue={setting.value as string}
                    >
                      {setting.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {/* Text/Location - Edit Button */}
                  {(setting.type === "text" || setting.type === "location") && (
                    <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Connected Devices */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden animate-fade-in-up">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
            <Smartphone className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Connected Devices</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">This Browser</p>
                <p className="text-xs text-muted-foreground">Chrome on MacOS • New Delhi</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl bg-card border border-destructive/30 overflow-hidden animate-fade-in-up">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-destructive/20 bg-destructive/5">
            <Shield className="w-5 h-5 text-destructive" />
            <h2 className="font-semibold text-destructive">Danger Zone</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-muted-foreground">Download all your data</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-border hover:bg-accent text-sm transition-colors">
                Export
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
