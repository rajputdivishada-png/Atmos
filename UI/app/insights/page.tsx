"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Thermometer, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts"

const stats = [
  { label: "Avg Temperature", value: "38.4°C", change: "+2.1°C", trend: "up", icon: Thermometer, color: "text-primary" },
  { label: "Hottest Day", value: "44°C", date: "Apr 15", trend: "up", icon: TrendingUp, color: "text-destructive" },
  { label: "Coolest Day", value: "32°C", date: "Apr 8", trend: "down", icon: TrendingDown, color: "text-secondary" },
  { label: "Anomalies", value: "12", period: "This month", trend: "up", icon: AlertCircle, color: "text-chart-5" },
]

const temperatureHistory = [
  { date: "Apr 1", temp: 35 },
  { date: "Apr 3", temp: 36 },
  { date: "Apr 5", temp: 38 },
  { date: "Apr 7", temp: 37 },
  { date: "Apr 9", temp: 39 },
  { date: "Apr 11", temp: 40 },
  { date: "Apr 13", temp: 42 },
  { date: "Apr 15", temp: 44 },
  { date: "Apr 17", temp: 41 },
  { date: "Apr 19", temp: 40 },
  { date: "Apr 21", temp: 42 },
]

const weatherConditions = [
  { name: "Clear", value: 45, color: "#fbbf24" },
  { name: "Partly Cloudy", value: 25, color: "#7dd3fc" },
  { name: "Hazy", value: 20, color: "#9ca3af" },
  { name: "Overcast", value: 10, color: "#4b5563" },
]

const anomalies = [
  { date: "Apr 15", type: "Heat Spike", deviation: "+8°C", severity: "High" },
  { date: "Apr 13", type: "Heat Spike", deviation: "+6°C", severity: "Medium" },
  { date: "Apr 11", type: "Heat Spike", deviation: "+4°C", severity: "Low" },
  { date: "Apr 9", type: "Cold Drop", deviation: "-3°C", severity: "Low" },
  { date: "Apr 5", type: "Heat Spike", deviation: "+5°C", severity: "Medium" },
]

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-balance">Insights</h1>
          <p className="text-muted-foreground">Temperature analytics and patterns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="rounded-xl bg-card border border-border p-5 hover-glow-amber transition-all animate-fade-in-up"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                {stat.change && (
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-destructive' : 'text-success'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold font-mono mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {stat.date && <p className="text-xs text-muted-foreground mt-1">{stat.date}</p>}
              {stat.period && <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>}
            </div>
          ))}
        </div>

        {/* Temperature History Chart */}
        <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-2">Temperature History</h3>
          <p className="text-xs text-muted-foreground mb-6">April 2024</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempHistoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  domain={[30, 50]}
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
                  formatter={(value: number) => [`${value}°C`, 'Temperature']}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  fill="url(#tempHistoryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Conditions + Anomalies Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Weather Conditions</h3>
            <p className="text-xs text-muted-foreground mb-6">Distribution this month</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={weatherConditions}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {weatherConditions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #1f2937',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {weatherConditions.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Anomalies Table */}
          <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Recent Anomalies</h3>
            <p className="text-xs text-muted-foreground mb-6">Detected deviations</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3">Date</th>
                    <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3">Type</th>
                    <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3">Deviation</th>
                    <th className="text-left text-xs uppercase tracking-wider text-muted-foreground py-3">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {anomalies.map((anomaly, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 text-sm">{anomaly.date}</td>
                      <td className="py-3 text-sm">{anomaly.type}</td>
                      <td className={`py-3 text-sm font-mono font-medium ${anomaly.deviation.startsWith('+') ? 'text-destructive' : 'text-secondary'}`}>
                        {anomaly.deviation}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          anomaly.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                          anomaly.severity === 'Medium' ? 'bg-primary/20 text-primary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {anomaly.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
