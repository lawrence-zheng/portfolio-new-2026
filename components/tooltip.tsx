"use client"

import type React from "react"

import { useState, useRef } from "react"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  width?: string
  position?: "top" | "bottom" | "left" | "right"
}

export default function Tooltip({ children, content, width = "300px", position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Get positioning styles based on the position prop
  const getPositionStyles = () => {
    switch (position) {
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2"
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2"
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2"
      case "top":
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
    }
  }

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="cursor-help">
        {children}
      </div>
      {isVisible && (
        <div ref={tooltipRef} className={`absolute z-50 ${getPositionStyles()}`} style={{ width }}>
          <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200 text-left">{content}</div>
        </div>
      )}
    </div>
  )
}
