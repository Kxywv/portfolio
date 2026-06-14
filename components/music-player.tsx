'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Track {
  title: string
  src: string
  cover: string
}

const TRACKS: Track[] = [
  {
    title: 'Die Young (feat. 347aidan)',
    src: '/Music/Die Young (feat. 347aidan).mp3',
    cover: '/Music/Die Young (feat. 347aidan).jpg',
  },
  {
    title: 'Pain Talk (feat. Lil Tjay)',
    src: '/Music/Pain Talk (feat. Lil Tjay).mp3',
    cover: '/Music/Pain Talk (feat. Lil Tjay).jpg',
  },
  {
    title: 'Say My Name',
    src: '/Music/Say My Name.mp3',
    cover: '/Music/Say My Name.jpg',
  },
  {
    title: 'attached',
    src: '/Music/attached.mp3',
    cover: '/Music/attached.jpg',
  },
  {
    title: 'vital',
    src: '/Music/vital.mp3',
    cover: '/Music/vital.jpg',
  },
]

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number>(0)

  const track = TRACKS[currentTrack]

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)
      audioContextRef.current = ctx
      analyserRef.current = analyser
      sourceRef.current = source
    }
  }, [])

  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if (!canvas || !analyser) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      const barCount = 64
      const barWidth = width / barCount - 2
      const step = Math.floor(bufferLength / barCount)

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * step]
        const barHeight = (value / 255) * height * 0.9

        const x = i * (barWidth + 2)
        const y = height - barHeight

        // Black gradient bars
        const gradient = ctx.createLinearGradient(x, y, x, height)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0])
        ctx.fill()
      }
    }
    draw()
  }, [])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
    }
    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleNext)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleNext)
    }
  }, [currentTrack])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    initAudioContext()

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume()
    }

    if (isPlaying) {
      audio.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audio.play()
      drawVisualizer()
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = useCallback(() => {
    setCurrentTrack(prev => (prev + 1) % TRACKS.length)
    setProgress(0)
  }, [])

  const handlePrev = () => {
    setCurrentTrack(prev => (prev - 1 + TRACKS.length) % TRACKS.length)
    setProgress(0)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      initAudioContext()
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
      audio.play()
      drawVisualizer()
    }
  }, [currentTrack, isPlaying, initAudioContext, drawVisualizer])

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = parseFloat(e.target.value)
    audio.currentTime = time
    setProgress(time)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Player Card */}
      <div className="bg-black rounded-2xl p-6 text-white shadow-2xl">
        {/* Cover Art */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5">
          <Image
            src={track.cover}
            alt={track.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Track Title */}
        <h3 className="text-lg font-bold truncate mb-4">{track.title}</h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            style={{
              background: `linear-gradient(to right, #fff ${duration ? (progress / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration ? (progress / duration) * 100 : 0}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Previous */}
          <button
            onClick={handlePrev}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Now Playing Indicator */}
        <p className="text-center text-xs text-white/40 mt-4">
          {isPlaying ? 'Now Playing' : 'Paused'} — {currentTrack + 1} / {TRACKS.length}
        </p>
      </div>

      {/* Audio Visualizer */}
      <div className="mt-6 bg-black/5 rounded-xl p-4 border border-gray-200">
        <canvas
          ref={canvasRef}
          width={512}
          height={120}
          className="w-full h-24 rounded-lg"
        />
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={track.src} preload="metadata" />
    </div>
  )
}
