"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface CompositeThumbnailProps {
  backgroundImage: string
  screenImage: string
  alt: string
  href: string
  width?: number
  height?: number
}

export default function CompositeThumbnail({
  backgroundImage,
  screenImage,
  alt,
  href,
  width = 600,
  height = 500
}: CompositeThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="relative border border-gray-200 overflow-hidden rounded-md bg-white block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image - static */}
      <div className="relative w-full h-full">
        <Image
          src={backgroundImage}
          alt={`${alt} background`}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
        
        {/* Foreground screen image - with zoom effect */}
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
      </div>
    </Link>
  )
} 