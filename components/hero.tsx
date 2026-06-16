'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { LogoLoop, LogoItem } from '@/components/LogoLoop'
import TextType from '@/components/TextType'
import Particles from '@/components/Particles'

// Roles that loop after the greeting
const ROLES_EN = ['Music Producer.', 'Multi-Instrumentalist.', 'Web Developer.']
const ROLES_ID = ['Produser Musik.', 'Multi-Instrumentalis.', 'Web Developer.']

function RoleLoop({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [textKey, setTextKey] = useState(0)

  useEffect(() => {
    setRoleIndex(0)
    setDisplayIndex(0)
    setTextKey(k => k + 1)
    setFading(false)
  }, [roles])

  useEffect(() => {
    const holdTime = roles[roleIndex].length * 60 + 900
    const holdTimer = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        const next = (roleIndex + 1) % roles.length
        setRoleIndex(next)
        setDisplayIndex(next)
        setTextKey(k => k + 1)
        setFading(false)
      }, 350)
    }, holdTime)
    return () => clearTimeout(holdTimer)
  }, [roleIndex, roles])

  return (
    <span
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease',
        display: 'inline-block',
        minWidth: '280px',
      }}
    >
      <TextType key={textKey} text={roles[displayIndex]} />
    </span>
  )
}

export default function Hero() {
  const fluidCanvasRef = useRef<HTMLCanvasElement>(null)
  const { language } = useLanguage()
  const [greetingDone, setGreetingDone] = useState(false)

  const translations = {
    en: { greeting: "Hey, I'm Key" },
    id: { greeting: 'Hai, Saya Key' },
  }

  const t = translations[language]
  const roles = language === 'en' ? ROLES_EN : ROLES_ID

  const logoItems: LogoItem[] = [
    {
      node: (
        <img src="/instagram.png" alt="Instagram" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
      ),
      href: 'https://www.instagram.com/key.wvy/',
      ariaLabel: 'Instagram',
    },
    {
      node: (
        <img src="/tiktok.png" alt="TikTok" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
      ),
      href: 'https://www.tiktok.com/@hplss37',
      ariaLabel: 'TikTok',
    },
    {
      node: (
        <img src="/github.png" alt="GitHub" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
      ),
      href: 'https://github.com/Kxywv',
      ariaLabel: 'GitHub',
    },
    {
      node: (
        <span className="relative group/discord inline-flex items-center justify-center">
          <img src="/discord.png" alt="Discord" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none opacity-0 group-hover/discord:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            okayw
          </span>
        </span>
      ),
      ariaLabel: 'Discord',
    },
  ]

  // Fluid canvas around profile image
  useEffect(() => {
    const canvas = fluidCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const centerX = width / 2
    const centerY = height / 2

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    class FluidParticle {
      x: number; y: number; vx: number; vy: number
      ax: number; ay: number; lifetime: number; maxLifetime: number; radius: number

      constructor() {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 3
        this.x = centerX + Math.cos(angle) * 20
        this.y = centerY + Math.sin(angle) * 20
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.ax = (Math.random() - 0.5) * 0.15
        this.ay = (Math.random() - 0.5) * 0.15
        this.lifetime = 0
        this.maxLifetime = 120 + Math.random() * 80
        this.radius = 8 + Math.random() * 12
      }

      update() {
        this.vx += this.ax; this.vy += this.ay
        this.x += this.vx; this.y += this.vy
        this.lifetime++
      }

      draw(ctx: CanvasRenderingContext2D) {
        const p = this.lifetime / this.maxLifetime
        ctx.fillStyle = `rgba(0,0,0,${(1 - p) * 0.4})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * (1 - p * 0.5), 0, Math.PI * 2)
        ctx.fill()
      }

      isDead() { return this.lifetime >= this.maxLifetime }
    }

    let particles: FluidParticle[] = []
    let frame: number
    let counter = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      counter++
      if (counter % 4 === 0 && particles.length < 60) particles.push(new FluidParticle())
      particles = particles.filter(p => !p.isDead())
      for (const p of particles) { p.update(); p.draw(ctx) }
      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])

  // Start RoleLoop after greeting finishes typing
  const greetingLen = t.greeting.length
  useEffect(() => {
    setGreetingDone(false)
    // Add 1000ms to the timer to account for the startDelay of the greeting
    const timer = setTimeout(() => setGreetingDone(true), greetingLen * 60 + 1500)
    return () => clearTimeout(timer)
  }, [language, greetingLen])

  return (
    <section id="hero" className="relative min-h-screen bg-transparent flex items-center justify-center px-6 py-20 overflow-hidden">

      {/* Reactbits Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={500}
          particleSpread={10}
          speed={0.08}
          particleColors={['#000000', '#333333', '#666666']}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={1.2}
          disableRotation={false}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          {/* Greeting — types once */}
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-3 leading-tight tracking-tight">
            <TextType key={language} text={t.greeting} startDelay={1000} />
          </h1>

          {/* Role — starts after greeting, then loops */}
          <p className="text-2xl md:text-3xl font-semibold text-black mb-5 leading-snug tracking-wide min-h-[1.5em]">
            {greetingDone && <RoleLoop roles={roles} />}
          </p>

          <div className="mb-6" />

          {/* Social links */}
          <div className="animate-fade-in animation-delay-1000 w-[240px] flex justify-center md:justify-start">
            <LogoLoop
              logos={logoItems}
              speed={40}
              logoHeight={28}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              width={240}
            />
          </div>
        </div>

        {/* Profile image with fluid canvas */}
        <div className="flex-1 flex justify-center animate-fade-in-right animation-delay-500 mt-8 md:mt-0">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <canvas ref={fluidCanvasRef} className="absolute inset-0 w-full h-full rounded-full" />
            <Image
              src="/profilea.png"
              alt="Muhammad Padhillah - Key"
              width={400}
              height={400}
              className="relative w-full h-full rounded-full object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 1.2s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out both; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out both; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
      `}</style>
    </section>
  )
}
