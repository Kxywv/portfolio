'use client'

import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'
import AboutBio from '@/components/AboutBio'
import FadeInOnLoad from '@/components/FadeInOnLoad'
import Particles from '@/components/Particles'

export default function AboutPage() {
  return (
    <PageContent>
      <main className="w-full relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleCount={180}
            particleSpread={10}
            speed={0.08}
            particleColors={['#000000', '#333333', '#666666']}
            alphaParticles={true}
            particleBaseSize={60}
            sizeRandomness={1.2}
            disableRotation={false}
          />
        </div>
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
