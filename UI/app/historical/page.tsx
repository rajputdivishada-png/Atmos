"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"

// Generate calendar heatmap data for 12 months
const generateCalendarData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(month => ({
    month,
    weeks: Array.from({ length: 4 }, () => 
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
    )
  }))
}

const calendarData = generateCalendarData()

const trendData = [
  { month: "Jan", avgTemp: 22, maxTemp: 28, minTemp: 15 },
  { month: "Feb", avgTemp: 25, maxTemp: 31, minTemp: 18 },
  { month: "Mar", avgTemp: 30, maxTemp: 36, minTemp: 23 },
  { month: "Apr", avgTemp: 36, maxTemp: 42, minTemp: 28 },
  { month: "May", avgTemp: 40, maxTemp: 46, minTemp: 32 },
  { month: "Jun", avgTemp: 42, maxTemp: 48, minTemp: 34 },
  { month: "Jul", avgTemp: 38, maxTemp: 44, minTemp: 30 },
  { month: "Aug", avgTemp: 35, maxTemp: 40, minTemp: 28 },
  { month: "Sep", avgTemp: 34, maxTemp: 39, minTemp: 27 },
  { month: "Oct", avgTemp: 32, maxTemp: 37, minTemp: 25 },
  { month: "Nov", avgTemp: 28, maxTemp: 33, minTemp: 20 },
  { month: "Dec", avgTemp: 23, maxTemp: 28, minTemp: 16 },
]

const historicalRecords = [
  { year: 2024, avgTemp: "34.2°C", hottest: "48°C", coldest: "8°C", heatwaves: 12 },
  { year: 2023, avgTemp: "33.8°C", hottest: "47°C", coldest: "7°C", heatwaves: 10 },
  { year: 2022, avgTemp: "33.5°C", hottest: "46°C", coldest: "9°C", heatwaves: 8 },
  { year: 2021, avgTemp: "33.1°C", hottest: "45°C", coldest: "10°C", heatwaves: 7 },
  { year: 2020, avgTemp: "32.9°C", hottest: "44°C", coldest: "8°C", heatwaves: 6 },
]

const getHeatmapColor = (level: number) => {
  switch(level) {
    case 0: return "bg-muted/30"
    case 1: return "bg-success/30"
    case 2: return "bg-primary/40"
    case 3: return "bg-destructive/60"
    default: return "bg-muted/30"
  }
}

export default function HistoricalPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Historical Data</h1>
          <p className="text-muted-foreground">Climate patterns and temperature records</p>
        </div>

        {/* Calendar Heatmap */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Temperature Heatmap</h3>
              <p className="text-xs text-muted-foreground">Daily temperature intensity over the year</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted/30" />
                <div className="w-3 h-3 rounded-sm bg-success/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/40" />
                <div className="w-3 h-3 rounded-sm bg-destructive/60" />
              </div>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
          
          <div className="min-w-[800px]">
            <div className="flex gap-3">
              {calendarData.map((monthData) => (
                <div key={monthData.month} className="flex-1">
                  <p className="text-xs text-muted-foreground text-center mb-2">{monthData.month}</p>
                  <div className="space-y-1">
                    {monthData.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex gap-1 justify-center">
                        {week.map((day, dayIndex) => (
                          <div 
                            key={dayIndex}
                            className={cn(
                              "w-3 h-3 rounded-sm transition-all hover:scale-125",
                              getHeatmapColor(day)
                            )}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Graph */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Annual Temperature Trend</h3>
              <p className="text-xs text-muted-foreground">Monthly average, max, and min temperatures</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 rounded-full bg-destructive"></span>
                <span className="text-xs text-muted-foreground">Max</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 rounded-full bg-primary"></span>
                <span className="text-xs text-muted-foreground">Avg</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 rounded-full bg-secondary"></span>
                <span className="text-xs text-muted-foreground">Min</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={[0, 55]}
                  tickFormatter={(value) => `${value}°`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1f2937',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#e5e7eb', fontWeight: 600 }}
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = { maxTemp: 'Maximum', avgTemp: 'Average', minTemp: 'Minimum' }
                    return [`${value}°C`, labels[name] || name]
                  }}
                />
                <Line type="monotone" dataKey="maxTemp" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} />
                <Line type="monotone" dataKey="avgTemp" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24', r: 3 }} />
                <Line type="monotone" dataKey="minTemp" stroke="#7dd3fc" strokeWidth={2} dot={{ fill: '#7dd3fc', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Records Table */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-2">Historical Records</h3>
          <p className="text-xs text-muted-foreground mb-6">Year-by-year temperature data</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3 px-4">Year</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3 px-4">Avg Temp</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3 px-4">Hottest</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3 px-4">Coldest</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3 px-4">Heatwaves</th>
                </tr>
              </thead>
              <tbody>
                {historicalRecords.map((record, index) => (
                  <tr key={record.year} className={cn(
                    "border-b border-border/50 hover:bg-muted/30 transition-colors",
                    index === 0 && "bg-primary/5"
                  )}>
                    <td className="py-4 px-4 text-sm font-semibold">{record.year}</td>
                    <td className="py-4 px-4 text-sm font-mono">{record.avgTemp}</td>
                    <td className="py-4 px-4 text-sm font-mono text-destructive">{record.hottest}</td>
                    <td className="py-4 px-4 text-sm font-mono text-secondary">{record.coldest}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {record.heatwaves} events
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
