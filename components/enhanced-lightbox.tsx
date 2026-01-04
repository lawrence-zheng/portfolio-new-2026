"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"

interface LightboxItem {
  title: string
  description: string
  imageUrl: string
  category: string
  size: { width: number; height: number }
}

interface EnhancedLightboxProps {
  items: LightboxItem[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function EnhancedLightbox({ items, currentIndex, onClose, onNavigate }: EnhancedLightboxProps) {
  const currentItem = items[currentIndex]
  const [imageLoaded, setImageLoaded] = useState(false)

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    onNavigate(newIndex)
    setImageLoaded(false)
  }, [currentIndex, items.length, onNavigate])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
    setImageLoaded(false)
  }, [currentIndex, items.length, onNavigate])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, goToPrevious, goToNext])

  useEffect(() => {
    // Reset image loaded state when the index changes
    setImageLoaded(false)

    // Preload the image
    const img = new Image()
    img.src = currentItem.imageUrl
    img.onload = () => setImageLoaded(true)
  }, [currentItem.imageUrl, currentIndex])

  if (!currentItem) return null

  // Determine if the current item is a GIF
  const isGif = currentItem.imageUrl.toLowerCase().endsWith(".gif")

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Main content */}
      <div
        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image container */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <div className="relative max-w-full max-h-[70vh]">
            <Image
              src={currentItem.imageUrl || "/placeholder.svg"}
              alt={currentItem.title}
              width={Math.min(currentItem.size.width * 2, 1200)}
              height={Math.min(currentItem.size.height * 2, 800)}
              className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              unoptimized={isGif} // Don't optimize GIFs to preserve animation
              onLoadingComplete={() => setImageLoaded(true)}
              priority
            />
          </div>
        </div>

        {/* Caption */}
        <div className="w-full max-w-2xl bg-black/30 backdrop-blur-sm text-white p-4 rounded-lg mt-4">
          <h3 className="text-xl font-medium mb-1">{currentItem.title}</h3>
          <p className="text-white/90 mb-2">{currentItem.description}</p>
          <p className="text-sm text-white/70">Category: {currentItem.category}</p>
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  )
}
