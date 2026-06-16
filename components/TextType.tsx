'use client'

import { useEffect, useState, useRef } from 'react'

interface TextTypeProps {
  text: string
  className?: string
  delay?: number
  startDelay?: number
}

export default function TextType({ text, className = '', delay = 25, startDelay = 0 }: TextTypeProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setVisibleCount(0)
    let interval: NodeJS.Timeout
    let startTimer: NodeJS.Timeout

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0
          startTimer = setTimeout(() => {
            interval = setInterval(() => {
              i++
              setVisibleCount(i)
              if (i >= text.length) clearInterval(interval)
            }, delay)
          }, startDelay)
        }
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
      clearInterval(interval)
      clearTimeout(startTimer)
    }
  }, [text, delay, startDelay])

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          style={{
            opacity: idx < visibleCount ? 1 : 0,
            transform: idx < visibleCount ? 'translateY(0)' : 'translateY(8px)',
            display: 'inline-block',
            transition: 'opacity 0.1s ease, transform 0.1s ease',
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
