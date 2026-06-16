import Hero from '@/components/hero'
import Projects from '@/components/projects'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'

export default function HomePage() {
  return (
    <PageContent>
      <main className="w-full relative">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Projects />
          <Footer />
        </div>
      </main>
    </PageContent>
  )
}
