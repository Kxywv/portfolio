'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

const TITLES = ['Web Developer', 'Music Producer', 'Multi-Instrumentalist']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fluidCanvasRef = useRef<HTMLCanvasElement>(null)
  const { language } = useLanguage()
  const [displayText, setDisplayText] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const translations = {
    en: {
      greeting: "Hey, I'm Key",
      bio: 'Muhammad Padhillah, 20 years old Web Developer, Multi-Instrumentalist, Producer, currently studying in UPI-YPTK University in Padang, Indonesia. Born in 2005, April, 3 In Jujun, Kerinci, Indonesia.'
    },
    id: {
      greeting: 'Hai, Saya Key',
      bio: 'Muhammad Padhillah, berusia 20 tahun, seorang Web Developer, Multi-Instrumentalis, dan Produser. Saat ini sedang menempuh pendidikan di Universitas UPI-YPTK Padang, Indonesia. Lahir pada 3 April 2005 di Jujun, Kerinci, Indonesia.'
    }
  }

  const t = translations[language]

  useEffect(() => {
    const current = TITLES[titleIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(current.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
        if (charIndex + 1 === current.length) {
          // Finished typing — pause then start deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting
        setDisplayText(current.slice(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTitleIndex(prev => (prev + 1) % TITLES.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    const NUM = 50
    const particles: {
      x: number; y: number; vx: number;
      len: number; alpha: number; speed: number
    }[] = []

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 1.5 + Math.random() * 2.5,
        len: 80 + Math.random() * 160,
        alpha: 0.08 + Math.random() * 0.16,
        speed: 1 + Math.random() * 2,
      })
    }

    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        const grad = ctx.createLinearGradient(p.x - p.len, p.y, p.x, p.y)
        grad.addColorStop(0, `rgba(0,0,0,0)`)
        grad.addColorStop(1, `rgba(0,0,0,${p.alpha})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2.5
        ctx.moveTo(p.x - p.len, p.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        p.x += p.vx * p.speed
        if (p.x - p.len > width) {
          p.x = -p.len
          p.y = Math.random() * height
        }
      }
      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const canvas = fluidCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let width = canvas.width = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight
    const centerX = width / 2
    const centerY = height / 2

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    class FluidParticle {
      x: number
      y: number
      vx: number
      vy: number
      ax: number
      ay: number
      lifetime: number
      maxLifetime: number
      radius: number

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
        this.vx += this.ax
        this.vy += this.ay
        this.x += this.vx
        this.y += this.vy
        this.lifetime++
      }

      draw(ctx: CanvasRenderingContext2D) {
        const progress = this.lifetime / this.maxLifetime
        const alpha = (1 - progress) * 0.4
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fill()
      }

      isDead() {
        return this.lifetime >= this.maxLifetime
      }
    }

    let particles: FluidParticle[] = []
    let frame: number
    let spawnCounter = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      spawnCounter++
      if (spawnCounter % 4 === 0 && particles.length < 60) {
        particles.push(new FluidParticle())
      }

      particles = particles.filter(p => !p.isDead())
      for (const p of particles) {
        p.update()
        p.draw(ctx)
      }

      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen bg-white flex items-center justify-center px-6 py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-3 leading-tight tracking-tight animate-fade-in-up">
            {t.greeting}
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-black mb-5 leading-snug tracking-wide animate-fade-in-up animation-delay-200">
            <span className="typewriter-text inline-block min-h-[1.2em]">
              {displayText}
            </span>
            <span className="typewriter-cursor text-black">|</span>
          </p>

          <div className="mb-6 animate-fade-in-up animation-delay-400">
            <p className="text-base text-gray-600 leading-7 tracking-normal max-w-xl">
              {t.bio}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 animate-fade-in-up animation-delay-600">
            <Link
              href="https://www.instagram.com/key.wvy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@hplss37"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1"
              aria-label="TikTok"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Profile Image */}
        <div className="flex-1 flex justify-center animate-fade-in-right animation-delay-500">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .typewriter-cursor {
          animation: blink 0.7s step-end infinite;
          font-weight: 300;
          margin-left: 1px;
        }
      `}</style>
    </section>
  )
}
