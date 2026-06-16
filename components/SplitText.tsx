'use client'

import { useEffect, useRef, useState } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

export default function SplitText({ text, className = '', delay = 40 }: SplitTextProps) {
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setRevealed(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [text])

  return (
    // Use <span> (inline) not <div> (block) — avoids inline-flex layout clipping
    // Use CSS transition-delay per char — no setInterval race conditions in Strict Mode
    <span ref={containerRef} className={`inline ${className}`} style={{ display: 'inline' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(10px)',
            display: 'inline-block',
            transition: `opacity 0.3s ease ${index * delay}ms, transform 0.3s ease ${index * delay}ms`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
