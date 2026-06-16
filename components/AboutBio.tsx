'use client'

import { useLanguage } from '@/lib/LanguageContext'
import SplitText from '@/components/SplitText'
import Image from 'next/image'

export default function AboutBio() {
  const { language } = useLanguage()

  const translations = {
    en: {
      heading: 'About Me',
      bio: 'Muhammad Padhillah, 20 years old Web Developer, Multi-Instrumentalist, Producer, currently studying at UPI-YPTK University in Padang, Indonesia. Born on April 3, 2005 in Jujun, Kerinci, Indonesia.',
      roles: 'Web Developer · Multi-Instrumentalist · Producer',
    },
    id: {
      heading: 'Tentang Saya',
      bio: 'Muhammad Padhillah, berusia 20 tahun, seorang Web Developer, Multi-Instrumentalis, dan Produser. Saat ini sedang menempuh pendidikan di Universitas UPI-YPTK Padang, Indonesia. Lahir pada 3 April 2005 di Jujun, Kerinci, Indonesia.',
      roles: 'Web Developer · Multi-Instrumentalis · Produser',
    },
  }

  const t = translations[language]

  return (
    <section className="relative min-h-[55vh] flex items-center justify-center px-6 py-20 bg-transparent">
      <div className="max-w-3xl w-full flex flex-col items-center gap-10 overflow-visible">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-black overflow-visible pb-2">
          <SplitText text={t.heading} />
        </h2>

        {/* Profile card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-6 shadow-sm">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-black/10">
            <Image
              src="/profilea.png"
              alt="Muhammad Padhillah"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <p className="text-lg font-bold text-black tracking-tight">Muhammad Padhillah</p>
            <p className="text-sm text-gray-500 font-medium">{t.roles}</p>
          </div>
        </div>

        {/* Bio text */}
        <p className="text-base md:text-lg text-gray-600 leading-8 tracking-normal w-full text-center sm:text-left px-1">
          {t.bio}
        </p>
      </div>
    </section>
  )
}
