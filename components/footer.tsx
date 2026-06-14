'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { language } = useLanguage()

  const translations = {
    en: {
      subtitle: 'Web Developer, Multi-Instrumentalist, Producer.',
      navigation: 'Navigation',
      contact: 'Contact',
      home: 'Home',
      about: 'About',
      hobby: 'Hobby',
      rights: 'All rights reserved.',
    },
    id: {
      subtitle: 'Web Developer, Multi-Instrumentalis, Produser.',
      navigation: 'Navigasi',
      contact: 'Kontak',
      home: 'Beranda',
      about: 'Tentang',
      hobby: 'Hobi',
      rights: 'Hak cipta dilindungi.',
    }
  }

  const t = translations[language]

  const navLinks = [
    { label: t.home, href: '/' },
    { label: t.about, href: '/about' },
    { label: t.hobby, href: '/hobby' },
  ]

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/key.wvy/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@hplss37',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Left - Profile */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-4">
              <Image
                src="/profileb.png"
                alt="Muhammad Padhillah"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-zinc-700"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Muhammad Padhillah</h3>
                <p className="text-sm text-zinc-400">{t.subtitle}</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Links */}
          <div className="flex gap-16">
            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {t.navigation}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {t.contact}
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                    >
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-500 text-center">
            &copy; {new Date().getFullYear()} Key&apos;s Portfolio. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
