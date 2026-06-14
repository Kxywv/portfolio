import Hero from '@/components/hero'
import Projects from '@/components/projects'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Projects />
      <Footer />
    </main>
  )
}
