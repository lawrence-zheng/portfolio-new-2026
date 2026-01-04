"use client"

import type React from "react"

interface InfoCardProps {
  icon: React.ReactNode
  subtitle: string
  children: React.ReactNode
  accentColor?: string
}

export default function InfoCard({ icon, subtitle, children, accentColor = "#4EB1B3" }: InfoCardProps) {
  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: `${accentColor}05`, // 5% opacity version of accent color
        borderColor: `${accentColor}15`, // 15% opacity version of accent color
      }}
    >
      <div className="flex flex-col items-center mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
          style={{ backgroundColor: `${accentColor}10` }} // 10% opacity version of accent color
        >
          {icon}
        </div>
        <div className="text-xs uppercase tracking-widest font-medium" style={{ color: accentColor }}>
          {subtitle}
        </div>
      </div>
      <div className="text-center text-gray-700 text-lg leading-relaxed">{children}</div>
    </div>
  )
}
