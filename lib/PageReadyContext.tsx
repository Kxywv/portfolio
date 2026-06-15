'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface PageReadyContextType {
  isPageReady: boolean
  markPageAsReady: () => void
  resetPageReady: () => void
}

const PageReadyContext = createContext<PageReadyContextType | undefined>(undefined)

export function PageReadyProvider({ children }: { children: React.ReactNode }) {
  const [isPageReady, setIsPageReady] = useState(false)

  const markPageAsReady = useCallback(() => {
    setIsPageReady(true)
  }, [])

  const resetPageReady = useCallback(() => {
    setIsPageReady(false)
  }, [])

  return (
    <PageReadyContext.Provider value={{ isPageReady, markPageAsReady, resetPageReady }}>
      {children}
    </PageReadyContext.Provider>
  )
}

export function usePageReady() {
  const context = useContext(PageReadyContext)
  if (!context) {
    throw new Error('usePageReady must be used within PageReadyProvider')
  }
  return context
}

export function useMarkPageAsReady(delay: number = 100) {
  const { markPageAsReady } = usePageReady()

  useEffect(() => {
    const timer = setTimeout(markPageAsReady, delay)
    return () => clearTimeout(timer)
  }, [markPageAsReady, delay])
}

