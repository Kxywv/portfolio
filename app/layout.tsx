import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { LanguageProvider } from '@/lib/LanguageContext'
import { TailedCursor } from '@/components/ui/tailed-cursor'
import PageTransition from '@/components/ui/page-transition'
import Navbar from '@/components/navbar'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: "Key's Portfolio",
  description: 'Portfolio of Muhammad Padhillah, a multi-instrumentalist, producer and day dreamer from Padang, Indonesia.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white">
        <LanguageProvider>
          <TailedCursor colors={["#000000"]} baseSpring={0.1} baseFriction={0.7} baseThickness={14} />
          <PageTransition />
          <Navbar />
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
