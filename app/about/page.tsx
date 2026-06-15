import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Footer from '@/components/footer'
import PageContent from '@/components/PageContent'

export default function AboutPage() {
  return (
    <PageContent>
      <main className="w-full">
        <Skills />
        <Experience />
        <Footer />
      </main>
    </PageContent>
  )
}
