"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from "lucide-react"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Bar,
  BarChart,
  Line,
  ComposedChart
} from "recharts"

const weeklyForecast = [
  { day: "Mon", date: "Apr 22", max: 42, min: 28, condition: "Sunny", icon: Sun, precipitation: 0, wind: 12 },
  { day: "Tue", date: "Apr 23", max: 44, min: 29, condition: "Sunny", icon: Sun, precipitation: 0, wind: 15 },
  { day: "Wed", date: "Apr 24", max: 43, min: 28, condition: "Partly Cloudy", icon: Cloud, precipitation: 10, wind: 10 },
  { day: "Thu", date: "Apr 25", max: 41, min: 27, condition: "Cloudy", icon: Cloud, precipitation: 20, wind: 8 },
  { day: "Fri", date: "Apr 26", max: 39, min: 26, condition: "Rain", icon: CloudRain, precipitation: 60, wind: 18 },
  { day: "Sat", date: "Apr 27", max: 38, min: 25, condition: "Rain", icon: CloudRain, precipitation: 45, wind: 14 },
  { day: "Sun", date: "Apr 28", max: 40, min: 27, condition: "Partly Cloudy", icon: Cloud, precipitation: 15, wind: 11 },
]

const hourlyForecast = [
  { time: "6 AM", temp: 28, condition: "Clear" },
  { time: "9 AM", temp: 32, condition: "Sunny" },
  { time: "12 PM", temp: 38, condition: "Sunny" },
  { time: "3 PM", temp: 42, condition: "Hot" },
  { time: "6 PM", temp: 39, condition: "Warm" },
  { time: "9 PM", temp: 34, condition: "Clear" },
  { time: "12 AM", temp: 30, condition: "Clear" },
]

const chartData = weeklyForecast.map(d => ({
  day: d.day,
  max: d.max,
  min: d.min,
  precipitation: d.precipitation,
}))

export default function ForecastPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Forecast</h1>
          <p className="text-muted-foreground">7-day weather predictions</p>
        </div>

        {/* Weekly Chart */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Weekly Overview</h3>
              <p className="text-xs text-muted-foreground">Temperature & precipitation forecast</p>
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
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-chart-5/50"></span>
                <span className="text-xs text-muted-foreground">Rain %</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="temp"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={[20, 50]}
                  tickFormatter={(value) => `${value}°`}
                />
                <YAxis 
                  yAxisId="precip"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1f2937',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#e5e7eb', fontWeight: 600 }}
                />
                <Bar yAxisId="precip" dataKey="precipitation" fill="#a78bfa" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
                <Line yAxisId="temp" type="monotone" dataKey="max" stroke="#fbbf24" strokeWidth={3} dot={{ fill: '#fbbf24', r: 4 }} />
                <Line yAxisId="temp" type="monotone" dataKey="min" stroke="#7dd3fc" strokeWidth={3} dot={{ fill: '#7dd3fc', r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weeklyForecast.map((day, index) => (
            <div 
              key={day.day}
              className={`rounded-xl bg-card border border-border p-4 text-center hover-glow-amber transition-all animate-fade-in-up ${index === 0 ? 'ring-2 ring-primary' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="text-sm font-semibold mb-1">{day.day}</p>
              <p className="text-xs text-muted-foreground mb-3">{day.date}</p>
              <day.icon className={`w-8 h-8 mx-auto mb-3 ${day.condition.includes('Rain') ? 'text-secondary' : 'text-primary'}`} />
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg font-bold font-mono text-primary">{day.max}°</span>
                <span className="text-sm font-mono text-muted-foreground">{day.min}°</span>
              </div>
              <p className="text-xs text-muted-foreground">{day.condition}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                <Droplets className="w-3 h-3" />
                <span>{day.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hourly Breakdown */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-2">Today&apos;s Hourly Forecast</h3>
          <p className="text-xs text-muted-foreground mb-6">Temperature throughout the day</p>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {hourlyForecast.map((hour, index) => (
              <div 
                key={hour.time}
                className="flex-shrink-0 w-24 p-4 rounded-xl bg-muted/30 border border-border text-center"
              >
                <p className="text-xs text-muted-foreground mb-2">{hour.time}</p>
                <p className="text-2xl font-bold font-mono text-primary mb-1">{hour.temp}°</p>
                <p className="text-xs text-muted-foreground">{hour.condition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card border border-border p-5 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">Heat Index</span>
            </div>
            <p className="text-3xl font-bold font-mono text-destructive mb-1">46°C</p>
            <p className="text-xs text-muted-foreground">Dangerous heat levels expected</p>
          </div>
          
          <div className="rounded-xl bg-card border border-border p-5 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Wind Forecast</span>
            </div>
            <p className="text-3xl font-bold font-mono text-secondary mb-1">12 km/h</p>
            <p className="text-xs text-muted-foreground">Light breeze from NW</p>
          </div>
          
          <div className="rounded-xl bg-card border border-border p-5 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-5 h-5 text-chart-5" />
              <span className="text-sm font-medium">Humidity</span>
            </div>
            <p className="text-3xl font-bold font-mono text-chart-5 mb-1">23%</p>
            <p className="text-xs text-muted-foreground">Very dry conditions</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
