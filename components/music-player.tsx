'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import ShapeBlur from './ShapeBlur'
import ElasticSlider from './ElasticSlider'
import AudioVisualizer from './AudioVisualizer'

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

const DEFAULT_VOLUME = 20 // percent

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const track = TRACKS[currentTrack]

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      const ctx = new AudioContext()
      const gain = ctx.createGain()
      gain.gain.value = DEFAULT_VOLUME / 100
      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(gain)
      gain.connect(ctx.destination)
      audioContextRef.current = ctx
      gainNodeRef.current = gain
      sourceRef.current = source
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = DEFAULT_VOLUME / 100
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

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
    } else {
      audio.play()
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
    }
  }, [currentTrack, isPlaying, initAudioContext])

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

  const handleVolumeChange = useCallback((val: number) => {
    setVolume(val)
    const v = val / 100
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = v
    }
    if (audioRef.current) {
      audioRef.current.volume = v
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Shape Blur Visualizer with Controls + Audio Visualizer */}
      <div className="relative w-full rounded-3xl overflow-visible mb-8" style={{ aspectRatio: '1' }}>
        {/* Main Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Audio Visualizer Ring - Absolute centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AudioVisualizer
              audioContext={audioContextRef.current}
              gainNode={gainNodeRef.current}
              isPlaying={isPlaying}
            />
          </div>

          {/* Shape Blur Visualizer with Controls */}
          <ShapeBlur
            variation={0}
            pixelRatioProp={typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1}
            shapeSize={1.2}
            roundness={0.4}
            borderSize={0.05}
            circleSize={0.3}
            circleEdge={0.5}
            className="w-5/6 h-5/6"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4">
              {/* Cover Art */}
              <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-md border border-white/5">
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-5 z-20">
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  className="text-white hover:text-white/70 transition-colors"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="text-white hover:text-white/70 transition-colors"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </ShapeBlur>
        </div>
      </div>

      {/* Track Info */}
      <h3 className="text-lg font-bold truncate mb-4 text-black text-center">{track.title}</h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
          style={{
            background: `linear-gradient(to right, #000 ${duration ? (progress / duration) * 100 : 0}%, rgb(209, 213, 219) ${duration ? (progress / duration) * 100 : 0}%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Now Playing Indicator */}
      <p className="text-center text-xs text-gray-500 mb-6">
        {isPlaying ? 'Now Playing' : 'Paused'} — {currentTrack + 1} / {TRACKS.length}
      </p>

      {/* Volume Control */}
      <div className="px-2">
        <ElasticSlider
          leftIcon={
            <motion.div
              animate={{ scale: volume === 0 ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/70">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/70">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                </svg>
              )}
            </motion.div>
          }
          rightIcon={
            <motion.div
              animate={{ scale: volume > 50 ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/70">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </motion.div>
          }
          startingValue={0}
          defaultValue={DEFAULT_VOLUME}
          maxValue={100}
          isStepped={false}
          onValueChange={handleVolumeChange}
          className="text-black"
        />
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={track.src} preload="metadata" />
    </div>
  )
}
