"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isCaseStudyUnlocked } from "@/lib/case-study-access"

interface PasswordProtectionProps {
  projectId: string
  /** Rendered only after the case study is unlocked, so gated content never mounts before then. */
  children: React.ReactNode
}

/**
 * Gate for a password-protected case study page. The password itself is entered in a modal on the
 * homepage, so a direct visit without an unlock is sent back there with that modal open.
 */
export default function PasswordProtection({ projectId, children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isCaseStudyUnlocked(projectId)) {
      setIsAuthenticated(true)
    } else {
      router.replace(`/?unlock=${encodeURIComponent(projectId)}`)
    }
  }, [projectId, router])

  if (!isAuthenticated) return null

  return <>{children}</>
}
