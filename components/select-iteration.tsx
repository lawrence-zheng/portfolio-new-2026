"use client"

import { useState } from "react"
import Image from "next/image"

interface IterationOption {
  id: string
  label: string
  image: string
  description: string
}

interface SelectIterationProps {
  options: IterationOption[]
  accentColor?: string
}

export default function SelectIteration({ options, accentColor = "#4EB1B3" }: SelectIterationProps) {
  const [selectedIteration, setSelectedIteration] = useState<string>(options[0]?.id || "")

  // Find the currently selected option
  const selectedOption = options.find((option) => option.id === selectedIteration) || options[0]

  return (
    <div className="my-8 space-y-6">
      {/* Iteration selector */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedIteration(option.id)}
            className={`px-4 py-1.5 rounded-full font-sans text-xs md:text-sm uppercase tracking-wider transition-all duration-300 border ${
              selectedIteration === option.id
                ? "text-white border-transparent"
                : "text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor: selectedIteration === option.id ? accentColor : "transparent",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Content that changes based on selection */}
      <div className="transition-all duration-300 ease-in-out">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image
              src={selectedOption.image || "/placeholder.svg"}
              alt={`${selectedOption.label} visualization`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 bg-gray-50">
            <p className="text-gray-700 text-lg leading-relaxed">{selectedOption.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
