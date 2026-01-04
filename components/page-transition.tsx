"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true) // Start visible to match server
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted to prevent hydration issues
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only run transitions after component is mounted
    if (!isMounted) return

    // Reset visibility state on route change
    setIsVisible(false)

    // Force scroll to top immediately
    window.scrollTo(0, 0)

    // Trigger fade in animation after a tiny delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [pathname, isMounted])

  // During SSR and initial mount, render without transition classes
  if (!isMounted) {
    return (
      <div className="page-transition page-visible" aria-live="polite">
        {children}
      </div>
    )
  }

  return (
    <div className={`page-transition ${isVisible ? "page-visible" : "page-hidden"}`} aria-live="polite">
      {children}
    </div>
  )
}
