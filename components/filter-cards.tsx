"use client"

import type React from "react"
import { useState } from "react"

interface FilterOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface FilterCardsProps {
  options: FilterOption[]
  accentColor?: string
  onFilterChange?: (filterId: string) => void
  defaultSelected?: string
}

export default function FilterCards({
  options,
  accentColor = "#4EB1B3",
  onFilterChange,
  defaultSelected,
}: FilterCardsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultSelected || options[0]?.id || "")

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId)
    if (onFilterChange) {
      onFilterChange(filterId)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {options.map((option) => {
        const isSelected = selectedFilter === option.id
        return (
          <button
            key={option.id}
            onClick={() => handleFilterSelect(option.id)}
            className={`rounded-lg border p-4 text-left transition-all hover:shadow-md ${
              isSelected ? "" : "bg-white hover:bg-gray-50"
            }`}
            style={{
              backgroundColor: isSelected ? `${accentColor}10` : "", // 10% opacity of accent color when selected
              borderColor: isSelected ? `${accentColor}30` : "#e5e7eb", // 30% opacity of accent color when selected
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: isSelected ? `${accentColor}20` : "#f3f4f6" }} // 20% opacity when selected
              >
                {option.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{option.title}</h3>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
