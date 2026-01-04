"use client"

import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"

// Use useLayoutEffect when in the browser, useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function ScrollManager() {
  const pathname = usePathname()

  useIsomorphicLayoutEffect(() => {
    // Immediately reset scroll position when pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // Ensure scroll restoration is set to manual
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Add event listener for navigation
    const handleRouteChangeStart = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("beforeunload", handleRouteChangeStart)

    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart)
    }
  }, [])

  return null
}
