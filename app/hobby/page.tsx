'use client'

import MusicPlayer from '@/components/music-player'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'
import SplitText from '@/components/SplitText'
import { useEffect, useState } from 'react'

export default function HobbyPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <PageContent>
      <main className="w-full relative">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <section className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
            <div className="max-w-2xl w-full">
              <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-4 overflow-visible px-2">
                {mounted && <SplitText text="Hobby" />}
              </h2>
              <p className="text-sm text-gray-400 text-center uppercase tracking-widest mb-12">
                Music & Production
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 mb-14 transition-all duration-1000 ease-out opacity-100 translate-y-0">
                <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
                  Saya memiliki ketertarikan besar pada dunia musik — sebuah passion yang telah membentuk cara saya berpikir, berkarya, dan mengekspresikan diri.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
                  Perjalanan ini dimulai sejak masa SMK, ketika saya pertama kali belajar bermain gitar. Dari situlah rasa penasaran saya terhadap musik terus tumbuh, mendorong saya untuk mendalami lebih jauh.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
                  Seiring berjalannya waktu, minat tersebut berkembang ke ranah music production — mempelajari proses arranging, mixing, dan producing sebuah lagu secara mandiri.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-8">
                  Selain itu, saya juga terus mengeksplorasi instrumen lain seperti piano dan bass untuk memperluas pemahaman musik saya secara menyeluruh.
                </p>
              </div>

              <MusicPlayer />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </PageContent>
  )
}
