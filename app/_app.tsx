"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollBehaviorHandler() {
  const pathname = usePathname()

  // This effect runs on client-side only
  useEffect(() => {
    // Disable scroll restoration completely
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Force scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
