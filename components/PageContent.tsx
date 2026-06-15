'use client'

import { useMarkPageAsReady } from '@/lib/PageReadyContext'

interface PageContentProps {
  children: React.ReactNode
  delay?: number
}

export default function PageContent({ children, delay = 150 }: PageContentProps) {
  useMarkPageAsReady(delay)

  return children
}
