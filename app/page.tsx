import Hero from '@/components/hero'
import Projects from '@/components/projects'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'

export default function HomePage() {
  return (
    <PageContent>
      <main className="w-full">
        <Hero />
        <Projects />
        <Footer />
      </main>
    </PageContent>
  )
}
