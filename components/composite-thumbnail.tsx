"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface CompositeThumbnailProps {
  backgroundImage: string
  screenImage: string
  alt: string
  href: string
  /** CSS aspect-ratio for the thumbnail frame. The background crops to fill it; the screen stays fully visible. */
  aspectRatio?: string
}

export default function CompositeThumbnail({
  backgroundImage,
  screenImage,
  alt,
  href,
  aspectRatio = "3 / 2"
}: CompositeThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="relative border border-gray-200 overflow-hidden rounded-md bg-white block w-full"
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image - static, crops vertically to fill the wide frame */}
      <Image
        src={backgroundImage}
        alt={`${alt} background`}
        fill
        className="object-cover"
      />

      {/* Foreground screen image - fully visible within the frame, with zoom effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={screenImage}
          alt={`${alt} screen`}
          fill
          className={`object-contain w-full h-full transition-transform duration-500 ease-out ${
            isHovered ? 'scale-[1.04]' : 'scale-100'
          }`}
          sizes="(max-width: 600px) 100vw, 600px"
        />
      </div>
    </Link>
  )
} 