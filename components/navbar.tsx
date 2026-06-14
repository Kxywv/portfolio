'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      hobby: 'Hobby',
    },
    id: {
      home: 'Beranda',
      about: 'Tentang',
      hobby: 'Hobi',
    }
  }

  const t = translations[language]

  const navLinks = [
    { label: t.home, href: '/' },
    { label: t.about, href: '/about' },
    { label: t.hobby, href: '/hobby' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Desktop: Language Switcher in top right corner */}
      <div className="hidden md:flex fixed top-6 right-6 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-300 dark:border-zinc-800 rounded-full p-1 shadow-md">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'en'
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('id')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'id'
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
        >
          ID
        </button>
      </div>

      {/* Desktop: Centered Nav Bar */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 justify-center gap-10 px-10 py-3 transition-all duration-300 ${isScrolled
          ? 'bg-black/30 backdrop-blur-[24px] border border-gray-800'
          : 'bg-black/10 backdrop-blur-[24px] border border-black/20'
          }`}
        style={{ borderRadius: '15px', width: 'fit-content' }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link font-medium transition-all duration-200 transform hover:scale-115 active:scale-105 relative pb-1 ${
              isActive(link.href)
                ? isScrolled ? 'text-white' : 'text-black'
                : isScrolled ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            {link.label}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-current transition-transform duration-300 origin-left ${
                isActive(link.href) ? 'w-full scale-x-100' : 'w-full scale-x-0'
              }`}
            />
          </Link>
        ))}
      </nav>

      {/* Mobile: Nav Links Only - Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-3 py-3">
        <div
          className={`flex items-center justify-between gap-0.5 px-2 py-2 w-full transition-all duration-300 ${isScrolled
            ? 'bg-black/40 backdrop-blur-[20px] border border-gray-800'
            : 'bg-black/10 backdrop-blur-[20px] border border-black/20'
            }`}
          style={{ borderRadius: '12px' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 text-center px-1.5 py-1.5 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive(link.href)
                  ? isScrolled ? 'text-white bg-white/15' : 'text-black bg-black/10'
                  : isScrolled ? 'text-white/70 hover:text-white active:bg-white/10' : 'text-gray-600 hover:text-black active:bg-black/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile: Language Switcher - Bottom Right */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-300 dark:border-zinc-700 rounded-full p-1 shadow-lg">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === 'en'
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('id')}
          className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === 'id'
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
        >
          ID
        </button>
      </div>
    </>
  )
}
