"use client"

import { useState } from "react"
import Link from "next/link"
import { useApp } from "@/components/providers"
import { Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const { login } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/rainbow-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Text and Title */}
      <div className="text-center mb-10 max-w-[600px] relative z-10 px-4 drop-shadow-lg">
        <h1 className="text-6xl md:text-8xl font-extrabold font-sans tracking-tighter text-white mb-4 animate-fade-in-up">
          Atmos
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium font-sans leading-relaxed">
          An advanced atmospheric intelligence and micro-climate visualization platform processing satellite weather data into real-time interactive mapping.
        </p>
      </div>

      {/* Container */}
      <div className="w-full max-w-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold tracking-wide">Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 px-5 outline-none focus:bg-white/20 focus:border-white/40 transition-colors text-white placeholder:text-white/60 pr-12 text-sm"
              placeholder="Email ID"
            />
            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>

          {/* Password */}
          <div className="relative">
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 px-5 outline-none focus:bg-white/20 focus:border-white/40 transition-colors text-white placeholder:text-white/60 pr-12 text-sm"
              placeholder="Password"
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-[11px] text-white/80 px-1">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/30 bg-white/10 checked:bg-white checked:border-white focus:ring-0 focus:ring-offset-0 cursor-pointer text-black" />
              <span>Remember me</span>
            </label>
            <button type="button" className="hover:text-white transition-colors">
              Forgot Password?
            </button>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-white text-black font-semibold rounded-full py-3.5 hover:bg-white/90 transition-colors mt-2 text-sm"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/80">
          <p>
            Don't have an account? <Link href="/register" className="text-white hover:underline font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
