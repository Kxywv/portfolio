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

  // Reset state on route change, show loader again
  useEffect(() => {
    resetPageReady()
    setIsLoading(true)
    setIsFading(false)
  }, [pathname, resetPageReady])

  // When page signals ready, start the fade-out sequence
  useEffect(() => {
    if (isPageReady && isLoading && !isFading) {
      // Small minimum display time so the loader doesn't flash
      const delayTimer = setTimeout(() => {
        setIsFading(true)
        const hideTimer = setTimeout(() => {
          setIsLoading(false)
          setIsFading(false)
        }, 500)
        return () => clearTimeout(hideTimer)
      }, 300)
      return () => clearTimeout(delayTimer)
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
