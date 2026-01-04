"use client"

import type React from "react"
import InfoCard from "./info-card"

interface InfoCardItem {
  icon: React.ReactNode
  subtitle: string
  content: React.ReactNode
}

interface InfoCardGroupProps {
  cards: InfoCardItem[]
  accentColor?: string
}

export default function InfoCardGroup({ cards, accentColor = "#4EB1B3" }: InfoCardGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {cards.map((card, index) => (
        <InfoCard key={index} icon={card.icon} subtitle={card.subtitle} accentColor={accentColor}>
          {card.content}
        </InfoCard>
      ))}
    </div>
  )
}
