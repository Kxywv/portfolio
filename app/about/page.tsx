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
