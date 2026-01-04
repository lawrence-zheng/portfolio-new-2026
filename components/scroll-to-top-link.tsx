"use client"

import type React from "react"

import Link from "next/link"
import { forwardRef } from "react"

interface ScrollToTopLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
}

const ScrollToTopLink = forwardRef<HTMLAnchorElement, ScrollToTopLinkProps>(
  ({ children, href, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e)

      // If it's an internal link (not external URL or anchor)
      if (typeof href === "string" && !href.startsWith("http") && !href.startsWith("#")) {
        // Force scroll to top immediately
        window.scrollTo(0, 0)
      }
    }

    return (
      <Link href={href} onClick={handleClick} {...props} ref={ref}>
        {children}
      </Link>
    )
  },
)

ScrollToTopLink.displayName = "ScrollToTopLink"

export default ScrollToTopLink
