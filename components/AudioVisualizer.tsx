'use client'

import { useEffect, useRef } from 'react'

interface AudioVisualizerProps {
  audioContext?: AudioContext | null
  gainNode?: GainNode | null
  isPlaying: boolean
}

export default function AudioVisualizer({
  audioContext,
  gainNode,
  isPlaying,
}: AudioVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  useEffect(() => {
    if (!audioContext || !gainNode) return

    if (!analyserRef.current) {
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 128
      gainNode.connect(analyser)
      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
    }

    const svg = svgRef.current
    if (!svg) return

    const radius = 110
    const barCount = analyserRef.current.frequencyBinCount
    const bars: SVGLineElement[] = []

    svg.innerHTML = ''

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2
      const x1 = Math.cos(angle) * radius
      const y1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle) * (radius + 20)
      const y2 = Math.sin(angle) * (radius + 20)

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', x1.toString())
      line.setAttribute('y1', y1.toString())
      line.setAttribute('x2', x2.toString())
      line.setAttribute('y2', y2.toString())
      line.setAttribute('stroke', '#000000')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('stroke-linecap', 'round')
      line.setAttribute('opacity', '0.3')

      svg.appendChild(line)
      bars.push(line)
    }

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)

        bars.forEach((bar, i) => {
          const value = dataArrayRef.current![i] || 0
          const normalizedValue = value / 255
          const barHeight = 10 + normalizedValue * 30
          const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2

          const x1 = Math.cos(angle) * radius
          const y1 = Math.sin(angle) * radius
          const x2 = Math.cos(angle) * (radius + barHeight)
          const y2 = Math.sin(angle) * (radius + barHeight)

          bar.setAttribute('x2', x2.toString())
          bar.setAttribute('y2', y2.toString())
          bar.setAttribute('opacity', (0.3 + normalizedValue * 0.7).toString())
          bar.setAttribute('stroke-width', (1 + normalizedValue * 2).toString())
        })
      }
    }

    if (isPlaying && audioContext.state === 'running') {
      draw()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioContext, gainNode, isPlaying])

  return (
    <svg
      ref={svgRef}
      viewBox="-140 -140 280 280"
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))' }}
    />
  )
}
