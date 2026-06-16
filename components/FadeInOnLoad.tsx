'use client'

import { useEffect, useState } from 'react'

interface FadeInOnLoadProps {
  children: React.ReactNode
  delay?: number
}

export default function FadeInOnLoad({ children, delay = 0 }: FadeInOnLoadProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
