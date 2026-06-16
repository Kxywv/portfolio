'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Projects() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'My Projects',
      projDesc: 'An environmental sustainability platform designed to educate and promote eco-friendly lifestyles and nature conservation through educational articles and real actions.'
    },
    id: {
      title: 'Projek Saya',
      projDesc: 'Platform keberlanjutan lingkungan yang dirancang untuk mengedukasi dan mempromosikan gaya hidup ramah lingkungan serta konservasi alam melalui artikel edukatif dan aksi nyata.'
    }
  }

  const t = translations[language]

  const projects = [
    {
      title: 'Hijau - Agriculture Platform',
      description: t.projDesc,
      url: 'https://hijauan.vercel.app/',
    },
  ]

  return (
    <section id="projects" className="bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-12">
          {t.title}
        </h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 border-2 border-black rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xl mx-auto w-full"
            >
              <div className="relative w-full h-36 md:h-44 bg-black overflow-hidden">
                <Image
                  src={`https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">Loading preview...</span>
                  </div>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-black">
                    {project.title}
                  </h3>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 ml-4"
                    aria-label="Visit project"
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
