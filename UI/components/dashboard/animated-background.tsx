"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle colors - mix of amber, ice blue, and white for air quality feel
    const colors = [
      "rgba(251, 191, 36, 0.6)",  // amber
      "rgba(251, 191, 36, 0.4)",  // amber lighter
      "rgba(125, 211, 252, 0.5)", // ice blue
      "rgba(125, 211, 252, 0.3)", // ice blue lighter
      "rgba(255, 255, 255, 0.4)", // white
      "rgba(255, 255, 255, 0.2)", // white lighter
      "rgba(239, 68, 68, 0.3)",   // red for pollution particles
    ]

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3 - 0.1, // slight upward drift
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Add subtle glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        )
        gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, "0.2)"))
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient overlays for depth */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/3 -left-20 w-72 h-72 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(125, 211, 252, 0.06) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />

      {/* Horizontal light rays */}
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)',
          animation: 'shimmer 8s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-1/2 left-0 w-full h-px opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.4), transparent)',
          animation: 'shimmer 12s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 30, 0.4) 100%)',
        }}
      />
    </div>
  )
}
