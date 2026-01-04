"use client"

import type React from "react"

interface LearningProps {
  summary: string
  children: React.ReactNode
  accentColor?: string
  icon?: React.ReactNode
}

export default function Learning({ summary, children, accentColor = "#4EB1B3", icon }: LearningProps) {
  // Default icon if none provided
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-600"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: "32px", height: "32px" }} // Removed background and border, increased size
        >
          {icon || defaultIcon}
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2 normal-case text-gray-600">{summary}</h4>
          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
