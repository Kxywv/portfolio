import MusicPlayer from '@/components/music-player'
import Footer from '@/components/footer'

export default function HobbyPage() {
  return (
    <main className="w-full">
      <section className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
            Hobby
          </h2>
          <p className="text-sm text-gray-400 text-center uppercase tracking-widest mb-12">
            Music &amp; Production
          </p>

          {/* Description */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 mb-14">
            <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
              Saya memiliki ketertarikan besar pada dunia musik — sebuah passion yang telah membentuk cara saya berpikir, berkarya, dan mengekspresikan diri.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
              Perjalanan ini dimulai sejak masa SMK, ketika saya pertama kali belajar bermain gitar. Dari situlah rasa penasaran saya terhadap musik terus tumbuh, mendorong saya untuk mendalami lebih jauh.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-8 mb-4">
              Seiring berjalannya waktu, minat tersebut berkembang ke ranah <strong className="text-black">music production</strong> — mempelajari proses arranging, mixing, dan producing sebuah lagu secara mandiri.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-8">
              Selain itu, saya juga terus mengeksplorasi instrumen lain seperti <strong className="text-black">piano</strong> dan <strong className="text-black">bass</strong> untuk memperluas pemahaman musik saya secara menyeluruh.
            </p>
          </div>

          {/* Music Player */}
          <MusicPlayer />
        </div>
      </section>

      <Footer />
    </main>
  )
}
