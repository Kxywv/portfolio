'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { useEffect, useRef, useState } from 'react'

export default function Experience() {
  const { language } = useLanguage()
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const translations = {
    en: {
      title: 'Experience & Education',
      expHeading: 'Professional Experience',
      eduHeading: 'Education',
      expRole: 'Technician',
      expCompany: 'at SMP 1 Sarolangun',
      sd: 'Elementary School',
      smp: 'Junior High School',
      smk: 'Vocational High School',
      uni: 'University'
    },
    id: {
      title: 'Pengalaman & Pendidikan',
      expHeading: 'Pengalaman Profesional',
      eduHeading: 'Pendidikan',
      expRole: 'Technician',
      expCompany: 'di SMP 1 Sarolangun',
      sd: 'Sekolah Dasar',
      smp: 'Sekolah Menengah Pertama',
      smk: 'Sekolah Menengah Kejuruan',
      uni: 'Universitas'
    }
  }

  const t = translations[language]

  const experience = [
    {
      role: t.expRole,
      company: t.expCompany,
      desc: language === 'en' ? 'Maintained IT infrastructure' : 'Memelihara infrastruktur IT'
    }
  ]

  const education = [
    {
      type: t.sd,
      name: 'SD 2 Sarolangun',
      period: '2011 - 2017'
    },
    {
      type: t.smp,
      name: 'SMP 10 Sarolangun',
      period: '2017 - 2020'
    },
    {
      type: t.smk,
      name: 'SMK 3 Sungai Penuh',
      period: '2020 - 2023'
    },
    {
      type: t.uni,
      name: 'Universitas Putra Indonesia YPTK Padang',
      period: '2024 - Present'
    }
  ]

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen bg-transparent flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-16">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 h-fit">
            <h3 className="text-2xl font-bold text-black mb-8 flex items-center">
              <span className="inline-block w-1 h-8 bg-black rounded-full mr-3"></span>
              {t.expHeading}
            </h3>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-black pl-6">
                  <h4 className="text-xl font-bold text-black">{exp.role}</h4>
                  <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                  <p className="text-gray-500">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-8 flex items-center">
              <span className="inline-block w-1 h-8 bg-black rounded-full mr-3"></span>
              {t.eduHeading}
            </h3>

            {/* Vertikal Timeline Container */}
            <div className="relative pl-8">
              {/* Animating background line */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 origin-top transition-transform duration-[2000ms] ease-out"
                style={{
                  transform: animate ? 'scaleY(1)' : 'scaleY(0)',
                }}
              />
              {/* Animating progress line */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-black origin-top transition-transform duration-[2000ms] delay-500 ease-out"
                style={{
                  transform: animate ? 'scaleY(1)' : 'scaleY(0)',
                }}
              />

              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative transition-all duration-700 ease-out"
                    style={{
                      opacity: animate ? 1 : 0,
                      transform: animate ? 'translateX(0)' : 'translateX(20px)',
                      transitionDelay: `${idx * 400}ms`,
                    }}
                  >
                    {/* Animated dot indicator */}
                    <div
                      className="absolute -left-8 top-[5px] w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 delay-[400ms]"
                      style={{
                        borderColor: animate ? '#000000' : '#d1d5db',
                        backgroundColor: animate ? '#000000' : '#f3f4f6',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        transform: animate ? 'scale(1)' : 'scale(0.8)',
                        transitionDelay: `${idx * 400 + 300}ms`
                      }}
                    />
                    
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{edu.type}</p>
                      <h4 className="text-lg font-bold text-black mt-0.5">{edu.name}</h4>
                      <p className="text-sm text-gray-400">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
