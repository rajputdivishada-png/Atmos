"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Cloud, 
  Lightbulb, 
  Calendar, 
  History, 
  MapPin, 
  Settings,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp } from "@/components/providers"

const navItems = [
  { name: "Atmosphere", href: "/", icon: Cloud },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Forecast", href: "/forecast", icon: Calendar },
  { name: "Historical", href: "/historical", icon: History },
  { name: "Community Map", href: "/community", icon: MapPin },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useApp()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[220px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary tracking-tight">AURA INTEL</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Atmospheric AI</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary glow-amber" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive && "text-primary")} />
                  {item.name}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Upgrade Card */}
      <div className="p-3">
        <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-4 hover-glow-amber cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Pro</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Unlock advanced forecasts & anomaly detection</p>
          <button className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        {user ? (
          <div className="flex flex-col gap-2">
            <Link href="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <Settings className="w-4 h-4 text-muted-foreground" />
            </Link>
            <button 
              onClick={logout}
              className="w-full text-left px-3 py-2 text-xs text-destructive hover:bg-accent rounded-lg transition-colors font-medium"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold text-sm">
            Sign In
          </Link>
        )}
      </div>
    </aside>
  )
}
