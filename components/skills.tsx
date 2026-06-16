'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

type SkillItem = {
  nameEn: string
  nameId: string
  level: number
  descEn: string
  descId: string
  logos: React.ReactNode[]
}

const programmingData: SkillItem[] = [
  {
    nameEn: 'HTML',
    nameId: 'HTML',
    level: 78,
    descEn: 'Structuring semantic, accessible web pages with modern HTML5 standards.',
    descId: 'Menyusun halaman web semantik dan aksesibel dengan standar HTML5 modern.',
    logos: [
      <Image key="html" src="/html-logo.png" alt="HTML" width={24} height={24} className="rounded-sm" />
    ]
  },
  {
    nameEn: 'CSS',
    nameId: 'CSS',
    level: 72,
    descEn: 'Crafting responsive layouts and animations using modern CSS and Tailwind.',
    descId: 'Membuat tata letak responsif dan animasi menggunakan CSS modern dan Tailwind.',
    logos: [
      <Image key="css" src="/css-logo.png" alt="CSS" width={24} height={24} className="rounded-sm" />
    ]
  },
  {
    nameEn: 'PHP',
    nameId: 'PHP',
    level: 65,
    descEn: 'Building server-side logic, APIs, and dynamic web applications.',
    descId: 'Membangun logika sisi server, API, dan aplikasi web dinamis.',
    logos: [
      <Image key="php" src="/php-logo.png" alt="PHP" width={24} height={24} className="rounded-sm" />
    ]
  },
  {
    nameEn: 'JS/NodeJS',
    nameId: 'JS/NodeJS',
    level: 75,
    descEn: 'Developing backend services and API gateways using Express and Node.js environment.',
    descId: 'Mengembangkan layanan backend dan API gateway menggunakan lingkungan Express dan Node.js.',
    logos: [
      <Image key="nodejs" src="/nodejs-logo.png" alt="NodeJS" width={24} height={24} className="rounded-sm" />
    ]
  }
]

const hardSkillData: SkillItem[] = [
  {
    nameEn: 'Data Analysis',
    nameId: 'Analisis Data',
    level: 70,
    descEn: 'Analyzing clean structures and computing workflows with Excel formulas and macros.',
    descId: 'Menganalisis struktur bersih dan komputasi alur kerja dengan rumus Excel dan makro.',
    logos: [
      <Image key="excel" src="/excel-logo.png" alt="Excel" width={24} height={24} className="rounded-sm" />
    ]
  },
  {
    nameEn: 'Visual Design',
    nameId: 'Desain Visual',
    level: 78,
    descEn: 'Prototyping responsive web UI with Figma and retouching mockups & digital graphics using Photoshop.',
    descId: 'Membuat prototipe UI web responsif dengan Figma dan memoles mockups & grafis digital menggunakan Photoshop.',
    logos: [
      <Image key="figma" src="/figma-logo.png" alt="Figma" width={20} height={28} className="rounded-sm" />,
      <Image key="photoshop" src="/photoshop-logo.png" alt="Photoshop" width={24} height={24} className="rounded-sm" />
    ]
  },
  {
    nameEn: 'PC Hardware',
    nameId: 'Perangkat Komputer',
    level: 80,
    descEn: 'Understanding PC hardware architectures, custom builds, cable management, and diagnostics.',
    descId: 'Memahami arsitektur hardware PC, kustomisasi rakitan, manajemen kabel, dan diagnosa.',
    logos: [
      <svg key="pc" width="20" height="20" viewBox="0 0 24 24" fill="#374151"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 4h16v12H4V4z" /></svg>
    ]
  }
]

const softSkillData: SkillItem[] = [
  {
    nameEn: 'Communication',
    nameId: 'Komunikasi',
    level: 75,
    descEn: 'Conveying technical ideas and operational terms efficiently across audiences.',
    descId: 'Menyampaikan ide teknis dan istilah operasional secara efisien kepada audiens.',
    logos: [
      <svg key="comm" width="20" height="20" viewBox="0 0 24 24" fill="#374151"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0-3h12v2H6V6zm0 6h9v2H6v-2z" /></svg>
    ]
  },
  {
    nameEn: 'Teamwork',
    nameId: 'Kerja Sama Tim',
    level: 80,
    descEn: 'Fostering collective collaboration to deliver project goals with agile execution.',
    descId: 'Mendorong kolaborasi kolektif untuk mencapai tujuan proyek dengan eksekusi gesit.',
    logos: [
      <svg key="team" width="20" height="20" viewBox="0 0 24 24" fill="#374151"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
    ]
  },
  {
    nameEn: 'Time Management',
    nameId: 'Manajemen Waktu',
    level: 70,
    descEn: 'Prioritizing critical tasks to respect project schedules and milestones.',
    descId: 'Memprioritaskan tugas-tugas kritis untuk mematuhi jadwal proyek dan tenggat waktu.',
    logos: [
      <svg key="time" width="20" height="20" viewBox="0 0 24 24" fill="#374151"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
    ]
  },
  {
    nameEn: 'Problem Solving',
    nameId: 'Pemecahan Masalah',
    level: 78,
    descEn: 'Deconstructing complex engineering workflows into direct analytical resolutions.',
    descId: 'Mengurai alur kerja rekayasa yang rumit menjadi resolusi analitis langsung.',
    logos: [
      <svg key="solve" width="20" height="20" viewBox="0 0 24 24" fill="#374151"><path d="M12.04 3.5c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1zm6.03 2.12c.39-.39 1.02-.39 1.41 0l1.41 1.41c.39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0l-1.41-1.41c-.39-.39-.39-1.02 0-1.41l1.41-1.41zm-10.6 0l1.41 1.41c.39.39.39 1.02 0 1.41L7.47 9.85c-.39.39-1.02.39-1.41 0L4.65 8.44c-.39-.39-.39-1.02 0-1.41l1.41-1.41c.39-.39 1.03-.39 1.42 0zm4.56 5.88c-1.93 0-3.5 1.57-3.5 3.5h7c0-1.93-1.57-3.5-3.5-3.5zM12 9c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" /></svg>
    ]
  }
]

type TabType = 'programming' | 'hard' | 'soft'

function AnimatedNumber({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setDisplay(0)
      return
    }
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [value, isVisible])

  return (
    <p className="text-2xl font-bold text-black text-center mx-auto">
      {display}%
    </p>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<TabType>('programming')
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const getCurrentData = () => {
    switch (activeTab) {
      case 'hard': return hardSkillData
      case 'soft': return softSkillData
      default: return programmingData
    }
  }

  const currentData = getCurrentData()

  const translations = {
    en: {
      title: 'Skills',
      progTab: 'Programming',
      hardTab: 'Hard Skill',
      softTab: 'Soft Skill'
    },
    id: {
      title: 'Keahlian',
      progTab: 'Pemrograman',
      hardTab: 'Kemampuan Teknis',
      softTab: 'Keahlian Non-Teknis'
    }
  }

  const t = translations[language]

  const getName = (skill: SkillItem) => language === 'en' ? skill.nameEn : skill.nameId

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen bg-transparent flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-10">
          {t.title}
        </h2>

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 md:gap-4 mb-10 flex-wrap">
          <button
            onClick={() => setActiveTab('programming')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'programming'
              ? 'bg-black/10 backdrop-blur-md border border-black/20 text-black shadow-sm'
              : 'text-gray-500 hover:text-black border border-transparent'
              }`}
          >
            {t.progTab}
          </button>
          <button
            onClick={() => setActiveTab('hard')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'hard'
              ? 'bg-black/10 backdrop-blur-md border border-black/20 text-black shadow-sm'
              : 'text-gray-500 hover:text-black border border-transparent'
              }`}
          >
            {t.hardTab}
          </button>
          <button
            onClick={() => setActiveTab('soft')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'soft'
              ? 'bg-black/10 backdrop-blur-md border border-black/20 text-black shadow-sm'
              : 'text-gray-500 hover:text-black border border-transparent'
              }`}
          >
            {t.softTab}
          </button>
        </div>

        {/* Chart & Description Container */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            {/* Custom Responsive Horizontal Bar Chart (Kiri) */}
            <div key={activeTab} className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
              {currentData.map((skill) => (
                <div key={getName(skill)} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>{getName(skill)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full rounded-full transition-transform duration-[1200ms] ease-out origin-left"
                      style={{
                        width: `${skill.level}%`,
                        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Description (Kanan) */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-10">
              {currentData.map((skill) => (
                <div key={getName(skill)} className="border-l-2 border-gray-400 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-black font-bold">{getName(skill)}</h3>
                    <div className="flex gap-1 items-center">
                      {skill.logos}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {language === 'en' ? skill.descEn : skill.descId}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div key={`stats-${activeTab}`} className="flex flex-wrap justify-center gap-4 mt-12">
          {currentData.map((skill) => (
            <div
              key={getName(skill)}
              className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200 hover:border-gray-400 transition-colors w-[calc(50%-8px)] md:w-[calc(25%-12px)] min-w-[160px]"
            >
              <h3 className="text-black font-bold mb-2">{getName(skill)}</h3>
              <AnimatedNumber value={skill.level} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
