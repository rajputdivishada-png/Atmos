"use client"

import { Search, MapPin, Bell, Settings, Sun, Moon, Cloud, Lightbulb, Calendar, History, LogOut } from "lucide-react"
import { useApp } from "@/components/providers"
import { useTheme } from "next-themes"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Atmosphere", href: "/", icon: Cloud },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Forecast", href: "/forecast", icon: Calendar },
  { name: "Historical", href: "/historical", icon: History },
  { name: "Community Map", href: "/community", icon: MapPin },
]

export function TopBar() {
  const { location, setLocation, user, logout } = useApp()
  const { theme, setTheme } = useTheme()
  const [searchInput, setSearchInput] = useState("")
  const pathname = usePathname()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      setLocation(searchInput.trim())
      setSearchInput("")
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-2xl mx-auto w-full">
        
        {/* Left: Brand and Navigation */}
        <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 pr-4 border-r border-border/50">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold font-sans tracking-tight text-lg hidden lg:inline">Atmos</span>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: Search and Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="flex-1 md:w-48 lg:w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search city... (Press Enter)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="w-px h-6 bg-border/50 hidden md:block" />

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg p-1 pr-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-sm font-medium hidden lg:block">{user.name}</span>
              <button onClick={logout} className="ml-1 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors" title="Log out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  )
}
