"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useRouter } from "next/navigation"

type AppContextType = {
  user: any;
  login: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string) => void;
  logout: () => void;
  location: string;
  setLocation: (loc: string) => void;
  weather: any;
  weatherLoading: boolean;
  refreshWeather: () => void;
}

const AppContext = createContext<AppContextType | null>(null)

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [location, setLocation] = useState("Delhi")
  const [weather, setWeather] = useState<any>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const router = useRouter()

  const fetchWeather = async (loc: string) => {
    setWeatherLoading(true)
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(loc)}`)
      const data = await res.json()
      setWeather(data)
    } catch (e) {
      console.error("Weather refresh failed", e)
    } finally {
      setWeatherLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(location)
  }, [location])

  useEffect(() => {
    const savedUser = localStorage.getItem("aura-user")
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = (email: string, pass: string) => {
    if (email && pass) {
      const u = { name: email.split('@')[0], email }
      localStorage.setItem("aura-user", JSON.stringify(u))
      setUser(u)
      router.push("/")
    }
  }

  const register = (name: string, email: string, pass: string) => {
    if (name && email && pass) {
      const u = { name, email }
      localStorage.setItem("aura-user", JSON.stringify(u))
      setUser(u)
      router.push("/")
    }
  }

  const logout = () => {
    localStorage.removeItem("aura-user")
    setUser(null)
    router.push("/login")
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AppContext.Provider value={{ 
        user, login, register, logout, 
        location, setLocation, 
        weather, weatherLoading, 
        refreshWeather: () => fetchWeather(location) 
      }}>
        {children}
      </AppContext.Provider>
    </NextThemesProvider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be inside Providers")
  return ctx
}
