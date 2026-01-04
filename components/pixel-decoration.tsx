"use client"

import { useState } from "react"
import Image from "next/image"

type PixelDecorationType = "diamond" | "plus" | "notification" | "pixel" | "speech-bubble-heart" | "lightbulb" | "ghost"

interface PixelDecorationProps {
  type: PixelDecorationType
  top?: string
  left?: string
  right?: string
  bottom?: string
  size?: number
  opacity?: number
  onClick?: () => void
  className?: string
  activeTab?: string
}

const getImagePath = (type: PixelDecorationType): string => {
  switch (type) {
    case "diamond":
      return "/pixel-deco/diamond.png"
    case "speech-bubble-heart":
      return "/pixel-deco/speech-bubble-heart.png"
    case "plus":
      return "/pixel-deco/plus.png"
    case "notification":
      return "/pixel-deco/notification.png"
    case "pixel":
      return "/pixel-deco/pixel.png"
    case "lightbulb":
      return "/pixel-deco/lightbulb.png"
    case "ghost":
      return "/pixel-deco/ghost.png"
    default:
      return "/pixel-deco/pixel.png"
  }
}

export default function PixelDecoration({
  type,
  top,
  left,
  right,
  bottom,
  size = 32,
  opacity = 0.7,
  onClick,
  className = "",
  activeTab = "product-design",
}: PixelDecorationProps) {
  const [isClicked, setIsClicked] = useState(false)

  // Get tint color based on active tab
  const getTintColor = () => {
    switch (activeTab) {
      case "ux-research":
        return "rgba(217, 121, 68, 0.3)" // Orange tint for UX Research
      case "ui-engineering":
        return "rgba(78, 51, 128, 0.3)" // Purple tint for UI Engineering
      default:
        return "rgba(78, 177, 179, 0.3)" // Teal tint for Product Design
    }
  }

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
    if (onClick) onClick()
  }

  return (
    <div
      className={`pixel-decoration ${isClicked ? "opacity-100 scale-125" : ""} ${className}`}
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: `${size}px`,
        height: `${size}px`,
        opacity: isClicked ? 1 : opacity,
        filter: `drop-shadow(0 0 5px ${getTintColor()})`,
        transition: "all 0.3s ease",
      }}
      onClick={handleClick}
    >
      <Image
        src={getImagePath(type) || "/placeholder.svg"}
        alt={`Pixel decoration ${type}`}
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
