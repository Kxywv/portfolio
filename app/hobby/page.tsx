'use client'

import MusicPlayer from '@/components/music-player'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'
import SplitText from '@/components/SplitText'
import Particles from '@/components/Particles'
import FadeInOnLoad from '@/components/FadeInOnLoad'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function HobbyPage() {
  const { language } = useLanguage()

  const content = {
    id: [
      "Saya memiliki ketertarikan besar pada dunia musik — sebuah passion yang telah membentuk cara saya berpikir, berkarya, dan mengekspresikan diri.",
      "Perjalanan ini dimulai sejak masa SMK, ketika saya pertama kali belajar bermain gitar. Dari situlah rasa penasaran saya terhadap musik terus tumbuh, mendorong saya untuk mendalami lebih jauh.",
      "Seiring berjalannya waktu, minat tersebut berkembang ke ranah music production — mempelajari proses arranging, mixing, dan producing sebuah lagu secara mandiri.",
      "Selain itu, saya juga terus mengeksplorasi instrumen lain seperti piano dan bass untuk memperluas pemahaman musik saya secara menyeluruh."
    ],
    en: [
      "I have a huge interest in the world of music — a passion that has shaped the way I think, create, and express myself.",
      "This journey began in vocational high school when I first learned to play the guitar. From there, my curiosity about music continued to grow, pushing me to delve deeper.",
      "Over time, this interest expanded into the realm of music production — learning the process of arranging, mixing, and producing a song independently.",
      "In addition, I also continue to explore other instruments such as piano and bass to broaden my overall understanding of music."
    ]
  }

  const texts = content[language as 'id' | 'en'] || content.id

  return (
    <PageContent>
      <main className="w-full relative">
        <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
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
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeInOnLoad delay={0}>
            <section className="min-h-screen bg-transparent flex items-center justify-center px-6 py-24">
              <div className="max-w-2xl w-full flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-4 overflow-visible px-2">
                  <SplitText text="Hobby" />
                </h2>
                <p className="text-sm text-gray-400 text-center uppercase tracking-widest mb-12">
                  Music & Production
                </p>

                <div className="w-full bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-200 mb-14 text-center sm:text-left transition-all duration-1000 ease-out opacity-100 translate-y-0 shadow-sm">
                  {texts.map((text, idx) => (
                    <p key={idx} className={`text-gray-700 text-base md:text-lg leading-8 ${idx !== texts.length - 1 ? 'mb-4' : ''}`}>
                      {text}
                    </p>
                  ))}
                </div>

                <div className="w-full">
                  <MusicPlayer />
                </div>
              </div>
            </section>
          </FadeInOnLoad>

          <Footer />
        </div>
      </main>
    </PageContent>
  )
}
