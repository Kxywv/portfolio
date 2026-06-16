'use client'

import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'
import AboutBio from '@/components/AboutBio'
import FadeInOnLoad from '@/components/FadeInOnLoad'

export default function AboutPage() {
  return (
    <PageContent>
      <main className="w-full relative">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeInOnLoad delay={0}>
            <AboutBio />
          </FadeInOnLoad>
          <FadeInOnLoad delay={200}>
            <Skills />
          </FadeInOnLoad>
          <FadeInOnLoad delay={400}>
            <Experience />
          </FadeInOnLoad>
          <Footer />
        </div>
      </main>
    </PageContent>
  )
}
