"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width

    // Calculate percentage (constrained between 0 and 100)
    const percentage = Math.min(Math.max((x / containerWidth) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return

    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const containerWidth = rect.width

    // Calculate percentage (constrained between 0 and 100)
    const percentage = Math.min(Math.max((x / containerWidth) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return (
    <div className="w-full border border-gray-200 rounded-lg">
      {/* Labels above the images */}
      <div className="flex justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="font-medium text-sm">{beforeLabel}</div>
        <div className="font-medium text-sm">{afterLabel}</div>
      </div>

      {/* Image container */}
      <div ref={containerRef} className="relative w-full h-[500px] overflow-hidden">
        {/* Before image (full width) */}
        <div className="absolute inset-0 w-full h-full">
          <Image src={beforeImage || "/placeholder.svg"} alt={beforeAlt} fill className="object-cover" />
        </div>

        {/* After image (clipped) */}
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <Image
            src={afterImage || "/placeholder.svg"}
            alt={afterAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Slider control */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 select-none"
          style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center select-none">
            {/* New horizontal double-headed arrow icon */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path 
                d="M21.7 12L16.36 6.5V10.9H7.64V6.5L2.3 12L7.64 17.5V13.1H16.36V17.5L21.7 12Z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
