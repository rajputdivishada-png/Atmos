"use client"

import { useState } from "react"
import Link from "next/link"
import { useApp } from "@/components/providers"
import { Lock, Mail, User } from "lucide-react"

export default function RegisterPage() {
  const { register } = useApp()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    register(name, email, password)
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
      <div className="text-center mb-10 max-w-[600px] relative z-10 px-4 drop-shadow-lg text-white">
        <h1 className="text-6xl md:text-8xl font-extrabold font-sans tracking-tighter mb-4 animate-fade-in-up">
          Atmos
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium font-sans leading-relaxed">
          Join the next generation of atmospheric intelligence. Track real-time weather anomalies and micro-climate shifts with Atmos.
        </p>
      </div>

      {/* Container */}
      <div className="w-full max-w-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold tracking-wide">Create Account</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 px-5 outline-none focus:bg-white/20 focus:border-white/40 transition-colors text-white placeholder:text-white/60 pr-12 text-sm"
              placeholder="Full Name"
            />
            <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>

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

          <button 
            type="submit"
            className="w-full bg-white text-black font-semibold rounded-full py-3.5 hover:bg-white/90 transition-colors mt-4 text-sm"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/80">
          <p>
            Already have an account? <Link href="/login" className="text-white hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
