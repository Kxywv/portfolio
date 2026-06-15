'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Hatch } from 'ldrs/react'
import { usePageReady } from '@/lib/PageReadyContext'
import 'ldrs/react/Hatch.css'

export default function PageTransition() {
  const pathname = usePathname()
  const { isPageReady, resetPageReady } = usePageReady()
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Reset page ready state and show loader on route change
    resetPageReady()
    setIsLoading(true)
    setIsFading(false)

    // Don't fade out until page is ready
    const timer = setTimeout(() => {
      if (!isPageReady) {
        // Page not ready yet, keep waiting but check again
        return
      }
      // Page is ready, start fade-out
      setIsFading(true)
      const hideTimer = setTimeout(() => {
        setIsLoading(false)
        setIsFading(false)
      }, 500)
      return () => clearTimeout(hideTimer)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, resetPageReady])

  useEffect(() => {
    // When page becomes ready and loading is still active, start fade-out
    if (isPageReady && isLoading && !isFading) {
      setIsFading(true)
      const hideTimer = setTimeout(() => {
        setIsLoading(false)
        setIsFading(false)
      }, 500)
      return () => clearTimeout(hideTimer)
    }
  }, [isPageReady, isLoading, isFading])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Hatch
        size="28"
        stroke="4"
        speed="3.5"
        color="black"
      />
    </div>
  )
}
