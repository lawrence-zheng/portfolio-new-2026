"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import PixelDecoration from "@/components/pixel-decoration"
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

interface PixelArtItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  size: { width: number; height: number }
  aspectRatio: "landscape" | "square" | "portrait"
  objectPosition?: string
}

export default function PixelArtPage() {
  const { primaryColor, activeTab } = useColorContext()
  const [selectedImage, setSelectedImage] = useState<PixelArtItem | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(true) // Set to true to remove loading spinner

  const pixelArtItems: PixelArtItem[] = [
    {
      id: "beach-scene",
      title: "Seaside Contemplation",
      description: "Me sitting at a beach",
      imageUrl: "/pixel-art/beach-scene.png",
      category: "Landscapes",
      size: { width: 720, height: 405 },
      aspectRatio: "landscape",
    },
    {
      id: "comfort-food",
      title: "Comfort Food",
      description: "My go-to college meal for when I was lazy to cook. I love spicy food so I have a soft spot for Shin Ramyun.",
      imageUrl: "/pixel-art/comfort-food.png",
      category: "Still Life",
      size: { width: 320, height: 320 },
      aspectRatio: "square",
    },
    {
      id: "salmon-don",
      title: "Salmon Don",
      description: "Salmon poke don",
      imageUrl: "/pixel-art/salmon-don.png",
      category: "Food",
      size: { width: 320, height: 320 },
      aspectRatio: "square",
    },
    {
      id: "five-spice",
      title: "Five Spice",
      description: "Chinese five spice",
      imageUrl: "/pixel-art/five-spice.png",
      category: "Food",
      size: { width: 320, height: 320 },
      aspectRatio: "square",
    },
    {
      id: "schenley-fall",
      title: "Autumn Building",
      description: "Schenley Park in Pittsburgh, PA. I stayed in Pittsburgh for most of my twenties so it's a place I hold dear.",
      imageUrl: "/pixel-art/schenley-fall.png",
      category: "Seasonal",
      size: { width: 640, height: 480 },
      aspectRatio: "landscape",
      objectPosition: "center bottom", // Crop from bottom
    },
    {
      id: "evening-drive",
      title: "Evening Drive",
      description: "City night scene",
      imageUrl: "/pixel-art/evening-drive.png",
      category: "Urban",
      size: { width: 480, height: 480 },
      aspectRatio: "square",
    },
    {
      id: "symbiotic",
      title: "Symbiotic",
      description: "Wolf/dragon. Done for a Pixel Dailies challenge with the theme \"symbiosis\"",
      imageUrl: "/pixel-art/symbiotic.png",
      category: "Fantasy",
      size: { width: 320, height: 320 },
      aspectRatio: "square",
    },
    {
      id: "flame-torch",
      title: "Flame Torch",
      description: "Animation practice",
      imageUrl: "/pixel-art/flame-torch.gif",
      category: "Fantasy",
      size: { width: 320, height: 320 },
      aspectRatio: "square",
    },
    {
      id: "office-coffee",
      title: "Office View",
      description: "The office lounge at one of my college internships, back when I was doing data work",
      imageUrl: "/pixel-art/office-coffee.gif",
      category: "Interior",
      size: { width: 640, height: 360 },
      aspectRatio: "landscape",
    },
    {
      id: "choi-hung",
      title: "Choi Hung Estate",
      description: "Choi Hung Estate in Hong Kong. I would pass by a lot since it was close to where I had to transfer via bus. I drew this after being sad about it being planned for demolition starting 2028, so this is a sort of tribute.",
      imageUrl: "/pixel-art/choi-hung.png",
      category: "Urban",
      size: { width: 640, height: 480 },
      aspectRatio: "landscape",
      objectPosition: "center bottom", // Crop from bottom
    },
    {
      id: "autumn-bonfire",
      title: "Autumn Bonfire",
      description: "Another fall scene, animation practice. I like how the bonfire turned out more than the leaves",
      imageUrl: "/pixel-art/autumn-bonfire.gif",
      category: "Seasonal",
      size: { width: 480, height: 480 },
      aspectRatio: "square",
    },
    {
      id: "pagoda",
      title: "Hilltop Pagoda",
      description: "Pagoda, one of my first pixel art drawings",
      imageUrl: "/pixel-art/pagoda.png",
      category: "Architecture",
      size: { width: 480, height: 480 },
      aspectRatio: "square",
    },
  ]

  const openLightbox = (item: PixelArtItem) => {
    setSelectedImage(item)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  // The lightbox steps through pieces in the order the gallery grid shows them, not array order
  const displayOrder = ["beach-scene", "comfort-food", "salmon-don", "five-spice", "flame-torch", "schenley-fall", "office-coffee", "evening-drive", "symbiotic", "autumn-bonfire", "pagoda", "choi-hung"]
  const displayIndex = selectedImage ? displayOrder.indexOf(selectedImage.id) : -1

  const navigateImage = (direction: "next" | "prev") => {
    if (displayIndex === -1) return

    const step = direction === "next" ? 1 : -1
    const nextId = displayOrder[(displayIndex + step + displayOrder.length) % displayOrder.length]
    const next = pixelArtItems.find((item) => item.id === nextId)
    if (next) setSelectedImage(next)
  }

  // Get background gradient based on active tab
  const getBackgroundGradient = () => {
    switch (activeTab) {
      case "ux-research":
        return "linear-gradient(to bottom, #fdf0e6, white)"
      case "ui-engineering":
        return "linear-gradient(to bottom, #e6e9fd, white)"
      default:
        return "linear-gradient(to bottom, #f0f9ff, white)"
    }
  }

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, selectedImage])

  return (
    <main className="bg-white min-h-screen">
      {/* Main navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-10 relative" style={{ background: getBackgroundGradient() }}>
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="max-w-5xl mx-auto px-6 h-full relative pointer-events-none">
            {/* Pixel Art Decorations */}
            <PixelDecoration
              type="diamond"
              top="15%"
              right="10%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
            />
            <PixelDecoration
              type="speech-bubble-heart"
              top="30%"
              right="5%"
              size={28}
              className="md-larger lg-larger"
              activeTab={activeTab}
            />
            <PixelDecoration
              type="ghost"
              top="20%"
              left="8%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
            />
            <PixelDecoration
              type="lightbulb"
              top="40%"
              left="5%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
            />
            <PixelDecoration type="plus" top="25%" left="25%" size={32} activeTab={activeTab} />
            <PixelDecoration type="plus" bottom="30%" right="20%" size={32} activeTab={activeTab} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-6" style={{ color: primaryColor }}>
              My pixel art
            </h1>
            <p className="type-body text-gray-700 max-w-2xl mx-auto">
              I enjoy drawing pixel art as a creative outlet. I've added it to my portfolio as a way of showing the
              human behind the designer—a gamer who loves the nostalgia that pixel art evokes, and also loves the
              challenge of creating scenes with a limited canvas.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div
              className="col-span-2 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[0])}
            >
              <div className="aspect-video w-full h-full relative">
                <img
                  src={pixelArtItems[0].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[1])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[1].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[1].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[2])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[2].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[2].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[3])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[3].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[3].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[7])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[7].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[7].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-2 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[4])}
            >
              <div className="aspect-video w-full h-full relative">
                <img
                  src={pixelArtItems[4].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[4].title}
                  className="w-full h-full object-cover object-bottom" // Crop from bottom
                  style={{ objectPosition: pixelArtItems[4].objectPosition || "center center" }}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div
              className="col-span-2 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[8])}
            >
              <div className="aspect-video w-full h-full relative">
                <img
                  src={pixelArtItems[8].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[8].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[5])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[5].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[5].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[6])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[6].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[6].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[10])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[10].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[10].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[11])}
            >
              <div className="aspect-square w-full h-full relative">
                <img
                  src={pixelArtItems[11].imageUrl || "/placeholder.svg"}
                  alt={pixelArtItems[11].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-2 row-span-1 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(pixelArtItems[9])}
            >
              <div className="aspect-video w-full h-full relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-05-17%20at%207.58.49%20AM-vIONjjTxtggI5TwFIBxYBWcCjnNArb.png" // New thumbnail image URL
                  alt={pixelArtItems[9].title}
                  className="w-full h-full object-cover object-bottom" // Crop from bottom
                  style={{ objectPosition: pixelArtItems[9].objectPosition || "center center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Lightbox */}
      {isLightboxOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={closeLightbox}>
          <div
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
              onClick={closeLightbox}
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
            <div className="relative flex-1 w-full flex flex-col items-center justify-center gap-5">
              <img
                src={selectedImage.imageUrl || "/placeholder.svg"}
                alt={selectedImage.title}
                className="max-h-[65vh] max-w-full object-contain"
              />
              <div className="max-w-2xl px-2 md:px-12 text-center">
                <p className="type-body text-white">{selectedImage.description}</p>
                <p className="type-caption text-white/60 mt-2">
                  {displayIndex + 1} / {displayOrder.length}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
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
                navigateImage("next")
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
          </div>
        </div>
      )}
    </main>
  )
}
