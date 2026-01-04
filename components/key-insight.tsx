"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useColorContext } from "@/context/color-context"

interface KeyInsightProps {
  children: React.ReactNode
  activeTab?: string
}

export default function KeyInsight({ children, activeTab }: KeyInsightProps) {
  const { activeTab: contextActiveTab } = useColorContext()
  const [backgroundColor, setBackgroundColor] = useState<string>("#f0f9ff")
  const [accentColor, setAccentColor] = useState<string>("#22A3B4")

  // Use the activeTab prop if provided, otherwise use the context
  const currentActiveTab = activeTab || contextActiveTab

  useEffect(() => {
    // Set colors based on active tab - matching the color context exactly
    if (currentActiveTab === "ux-research") {
      setBackgroundColor("#fdf0e6")
      setAccentColor("#d97944")
    } else if (currentActiveTab === "ui-engineering") {
      setBackgroundColor("#e6e9fd")
      setAccentColor("#4e3380")
    } else {
      setBackgroundColor("#f0f9ff")
      setAccentColor("#22A3B4")
    }
  }, [currentActiveTab])

  return (
    <div
      className="p-8 rounded-lg border"
      style={{
        backgroundColor: backgroundColor,
        borderColor: `${accentColor}20`, // 20% opacity version of accent color
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
          style={{ backgroundColor: `${accentColor}15` }} // 15% opacity version of accent color
        >
          <Image src="/pixel-deco/lightbulb-insight.png" alt="Lightbulb icon" width={24} height={24} />
        </div>
        <div
          className="text-xs uppercase tracking-widest font-medium"
          style={{ color: accentColor, letterSpacing: "0.05em" }}
        >
          Key Insight
        </div>
      </div>
      <p
        className="text-center font-medium text-gray-600"
        style={{ 
          letterSpacing: "normal",
          fontSize: "1.25rem", /* 20px - matches emphasized quotation */
          lineHeight: "1.6"
        }}
      >
        {children}
      </p>
    </div>
  )
}
