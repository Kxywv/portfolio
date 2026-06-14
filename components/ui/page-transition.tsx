'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'

export default function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true)
    setIsFading(false)

    const timer = setTimeout(() => {
      // Start fade-out after loader has time to animate
      setIsFading(true)
      const hideTimer = setTimeout(() => {
        setIsLoading(false)
        setIsFading(false)
      }, 500) // matches fade-out duration
      return () => clearTimeout(hideTimer)
    }, 800) // show loader long enough for full Hatch animation

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-400 ${
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
