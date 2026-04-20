"use client"

import { useEffect, useState, useMemo } from "react"

type WeatherCondition = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "stormy" | "night"

interface WeatherBackgroundProps {
  condition?: WeatherCondition
  temperature?: number
}

// Sun component with animated rays
function Sun({ isNight }: { isNight: boolean }) {
  if (isNight) {
    return (
      <div className="absolute top-16 right-20 md:top-20 md:right-32">
        {/* Moon */}
        <div className="relative w-16 h-16 md:w-24 md:h-24">
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 animate-pulse-slow"
            style={{
              boxShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.1)'
            }}
          />
          {/* Moon craters */}
          <div className="absolute top-3 left-4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-300/50" />
          <div className="absolute top-6 right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300/40" />
          <div className="absolute bottom-4 left-6 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-300/30" />
        </div>
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 200 - 100}px`,
              left: `${Math.random() * 400 - 200}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="absolute top-12 right-16 md:top-16 md:right-28">
      {/* Sun glow */}
      <div 
        className="absolute inset-0 w-24 h-24 md:w-36 md:h-36 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          transform: 'translate(-25%, -25%) scale(2)',
        }}
      />
      
      {/* Sun body */}
      <div 
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fef08a 0%, #fbbf24 50%, #f59e0b 100%)',
          boxShadow: '0 0 60px rgba(251, 191, 36, 0.6), 0 0 100px rgba(251, 191, 36, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Sun rays */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '60s' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 md:w-1.5 origin-left"
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.8), transparent)',
                transform: `rotate(${i * 30}deg) translateX(14px) md:translateX(18px)`,
                width: '20px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Cloud component with different sizes and speeds
function Cloud({ 
  className, 
  size = "medium", 
  speed = 30,
  opacity = 1,
  delay = 0,
  isDark = false,
}: { 
  className?: string
  size?: "small" | "medium" | "large"
  speed?: number
  opacity?: number
  delay?: number
  isDark?: boolean
}) {
  const sizeClasses = {
    small: "w-16 h-8 md:w-24 md:h-12",
    medium: "w-24 h-12 md:w-40 md:h-20",
    large: "w-32 h-16 md:w-56 md:h-28",
  }

  const cloudColor = isDark 
    ? 'from-gray-400 via-gray-500 to-gray-600' 
    : 'from-white via-gray-100 to-gray-200'

  return (
    <div 
      className={`absolute ${className}`}
      style={{
        animation: `float-horizontal ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        opacity,
      }}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Main cloud body */}
        <div 
          className={`absolute bottom-0 left-1/4 w-1/2 h-3/5 rounded-full bg-gradient-to-b ${cloudColor}`}
          style={{ 
            boxShadow: isDark 
              ? 'inset 0 -10px 20px rgba(0,0,0,0.1)' 
              : 'inset 0 -10px 20px rgba(0,0,0,0.05)'
          }}
        />
        {/* Left puff */}
        <div 
          className={`absolute bottom-1/4 left-0 w-2/5 h-3/5 rounded-full bg-gradient-to-br ${cloudColor}`}
        />
        {/* Right puff */}
        <div 
          className={`absolute bottom-1/4 right-0 w-2/5 h-1/2 rounded-full bg-gradient-to-bl ${cloudColor}`}
        />
        {/* Top puff */}
        <div 
          className={`absolute top-0 left-1/3 w-1/3 h-2/3 rounded-full bg-gradient-to-b ${cloudColor}`}
        />
      </div>
    </div>
  )
}

// Rain drops
function RainDrops({ intensity = "medium" }: { intensity?: "light" | "medium" | "heavy" }) {
  const dropCount = intensity === "heavy" ? 100 : intensity === "medium" ? 50 : 25

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(dropCount)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300 to-blue-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            height: `${Math.random() * 20 + 10}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `rain ${Math.random() * 0.5 + 0.5}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Lightning effect
function Lightning() {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true)
        setTimeout(() => setFlash(false), 100)
        setTimeout(() => {
          setFlash(true)
          setTimeout(() => setFlash(false), 50)
        }, 150)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${
        flash ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.3), transparent 70%)'
      }}
    />
  )
}

// Birds flying
function Birds() {
  return (
    <div className="absolute top-1/4 left-0 w-full h-20 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            animation: `bird-fly ${20 + i * 5}s linear infinite`,
            animationDelay: `${i * 4}s`,
            top: `${Math.random() * 60}px`,
          }}
        >
          <svg 
            width="20" 
            height="10" 
            viewBox="0 0 20 10" 
            className="text-gray-700/60"
            style={{ animation: 'bird-wing 0.3s ease-in-out infinite alternate' }}
          >
            <path 
              d="M0 5 Q5 0 10 5 Q15 0 20 5" 
              stroke="currentColor" 
              fill="none" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

// Mountains/hills silhouette
function Mountains({ isNight }: { isNight: boolean }) {
  const color1 = isNight ? '#1a1f35' : '#1e3a5f'
  const color2 = isNight ? '#151929' : '#0f2744'
  const color3 = isNight ? '#0d1424' : '#0a1628'

  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 overflow-hidden">
      {/* Far mountains */}
      <svg 
        viewBox="0 0 1440 320" 
        className="absolute bottom-8 md:bottom-12 w-full h-32 md:h-40"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,160 L120,140 L240,180 L360,120 L480,160 L600,100 L720,150 L840,110 L960,140 L1080,90 L1200,130 L1320,100 L1440,160 L1440,320 L0,320 Z"
          fill={color1}
        />
      </svg>
      
      {/* Mid mountains */}
      <svg 
        viewBox="0 0 1440 320" 
        className="absolute bottom-4 md:bottom-6 w-full h-28 md:h-36"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,200 L180,160 L360,200 L540,140 L720,180 L900,130 L1080,170 L1260,150 L1440,190 L1440,320 L0,320 Z"
          fill={color2}
        />
      </svg>
      
      {/* Near hills with trees */}
      <svg 
        viewBox="0 0 1440 320" 
        className="absolute bottom-0 w-full h-24 md:h-32"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,260 L240,220 L480,250 L720,210 L960,240 L1200,200 L1440,230 L1440,320 L0,320 Z"
          fill={color3}
        />
        {/* Trees on hills */}
        {[100, 200, 350, 500, 650, 800, 950, 1100, 1250, 1350].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${220 + Math.sin(x * 0.01) * 20})`}>
            <path 
              d="M0,0 L-8,15 L-4,15 L-10,30 L-5,30 L-12,45 L12,45 L5,30 L10,30 L4,15 L8,15 Z"
              fill={isNight ? '#0a1020' : '#0a2030'}
            />
            <rect x="-2" y="45" width="4" height="8" fill={isNight ? '#0a0f18' : '#0a1525'} />
          </g>
        ))}
      </svg>
      
      {/* Grass/ground texture */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-4 md:h-6"
        style={{
          background: `linear-gradient(to top, ${isNight ? '#0a0f1e' : '#0a1628'}, transparent)`
        }}
      />
    </div>
  )
}

// Grass with wind animation
function Grass({ isNight }: { isNight: boolean }) {
  const grassColor = isNight ? '#1a2e40' : '#2d5a45'
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 overflow-hidden">
      <svg 
        viewBox="0 0 100 20" 
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {[...Array(50)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 2},20 Q${i * 2 + 0.5},${10 + Math.random() * 5} ${i * 2 + 1},20`}
            stroke={grassColor}
            fill="none"
            strokeWidth="0.3"
            style={{
              animation: `grass-sway ${2 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transformOrigin: `${i * 2}px 20px`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Fog/mist effect
function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64"
        style={{
          background: 'linear-gradient(to top, rgba(200, 200, 200, 0.3), transparent)',
          animation: 'fog-drift 20s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute bottom-10 md:bottom-20 left-0 right-0 h-32 md:h-48"
        style={{
          background: 'linear-gradient(to top, rgba(180, 180, 180, 0.2), transparent)',
          animation: 'fog-drift 25s ease-in-out infinite reverse',
        }}
      />
    </div>
  )
}

export function WeatherBackground({ condition = "sunny", temperature = 28 }: WeatherBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if it's night based on time or explicit condition
  const isNight = condition === "night"
  
  // Sky gradient based on condition and temperature
  const skyGradient = useMemo(() => {
    if (isNight) {
      return 'linear-gradient(to bottom, #0a0f1e 0%, #1a1f35 30%, #1e2744 60%, #0d1424 100%)'
    }
    if (condition === "stormy") {
      return 'linear-gradient(to bottom, #1f2937 0%, #374151 30%, #4b5563 60%, #1f2937 100%)'
    }
    if (condition === "rainy") {
      return 'linear-gradient(to bottom, #374151 0%, #4b5563 30%, #6b7280 60%, #374151 100%)'
    }
    if (condition === "cloudy") {
      return 'linear-gradient(to bottom, #64748b 0%, #94a3b8 30%, #cbd5e1 60%, #64748b 100%)'
    }
    if (condition === "partly-cloudy") {
      return 'linear-gradient(to bottom, #0ea5e9 0%, #38bdf8 30%, #7dd3fc 60%, #0284c7 100%)'
    }
    // Sunny - adjust based on temperature
    if (temperature > 35) {
      return 'linear-gradient(to bottom, #ea580c 0%, #f97316 20%, #fbbf24 50%, #0ea5e9 80%, #0284c7 100%)'
    }
    return 'linear-gradient(to bottom, #0284c7 0%, #0ea5e9 20%, #38bdf8 50%, #7dd3fc 80%, #0ea5e9 100%)'
  }, [condition, isNight, temperature])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyGradient }}
      />

      {/* Sun or Moon */}
      <Sun isNight={isNight} />

      {/* Clouds - vary based on condition */}
      {(condition === "sunny" || condition === "partly-cloudy") && (
        <>
          <Cloud className="top-16 md:top-24" size="small" speed={45} opacity={0.9} delay={0} />
          <Cloud className="top-28 md:top-36" size="medium" speed={35} opacity={0.85} delay={5} />
          <Cloud className="top-8 md:top-12" size="small" speed={50} opacity={0.7} delay={10} />
        </>
      )}

      {condition === "partly-cloudy" && (
        <>
          <Cloud className="top-20 md:top-28" size="large" speed={30} opacity={0.95} delay={2} />
          <Cloud className="top-36 md:top-44" size="medium" speed={40} opacity={0.9} delay={8} />
        </>
      )}

      {condition === "cloudy" && (
        <>
          <Cloud className="top-8 md:top-12" size="large" speed={25} opacity={1} delay={0} />
          <Cloud className="top-20 md:top-28" size="large" speed={30} opacity={0.95} delay={3} />
          <Cloud className="top-32 md:top-44" size="medium" speed={35} opacity={0.9} delay={6} />
          <Cloud className="top-12 md:top-20" size="medium" speed={28} opacity={0.85} delay={9} />
          <Cloud className="top-40 md:top-56" size="small" speed={40} opacity={0.8} delay={12} />
        </>
      )}

      {(condition === "rainy" || condition === "stormy") && (
        <>
          <Cloud className="top-4 md:top-8" size="large" speed={20} opacity={1} delay={0} isDark />
          <Cloud className="top-12 md:top-20" size="large" speed={22} opacity={0.95} delay={2} isDark />
          <Cloud className="top-24 md:top-32" size="medium" speed={25} opacity={0.9} delay={4} isDark />
          <Cloud className="top-8 md:top-16" size="large" speed={18} opacity={1} delay={6} isDark />
          <Cloud className="top-32 md:top-44" size="medium" speed={28} opacity={0.85} delay={8} isDark />
        </>
      )}

      {isNight && (
        <>
          <Cloud className="top-24 md:top-32" size="medium" speed={40} opacity={0.4} delay={0} />
          <Cloud className="top-40 md:top-52" size="small" speed={50} opacity={0.3} delay={5} />
        </>
      )}

      {/* Rain */}
      {condition === "rainy" && <RainDrops intensity="medium" />}
      {condition === "stormy" && (
        <>
          <RainDrops intensity="heavy" />
          <Lightning />
        </>
      )}

      {/* Fog for certain conditions */}
      {(condition === "rainy" || condition === "cloudy") && <Fog />}

      {/* Birds (only during day and good weather) */}
      {(condition === "sunny" || condition === "partly-cloudy") && !isNight && <Birds />}

      {/* Mountains and landscape */}
      <Mountains isNight={isNight} />

      {/* Grass */}
      <Grass isNight={isNight} />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />

      {/* Content overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 15, 30, 0.7) 0%, rgba(10, 15, 30, 0.4) 50%, rgba(10, 15, 30, 0.6) 100%)',
        }}
      />
    </div>
  )
}
