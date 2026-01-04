"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "./lightbox"

interface PixelArtItem {
  src: string
  alt: string
  width: number
  height: number
  thumbnailWidth: number
  thumbnailHeight: number
}

interface PixelArtGalleryProps {
  items: PixelArtItem[]
}

export default function PixelArtGallery({ items }: PixelArtGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                width={item.thumbnailWidth}
                height={item.thumbnailHeight}
                className="object-contain p-2"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-3 py-1 rounded-full text-sm">
                View
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && <Lightbox images={items} initialIndex={selectedIndex} onClose={() => setLightboxOpen(false)} />}
    </div>
  )
}
