"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useColorContext } from "@/context/color-context"
import { useEffect, useState } from "react"
import { HeartSpeechBubble } from "./heart-speech-bubble"

export default function Footer() {
  const pathname = usePathname()
  const { primaryColor } = useColorContext()
  const [imageError, setImageError] = useState(false)

  // Add background color to html element to prevent white flash when overscrolling
  useEffect(() => {
    // Set the background color of the html element to match the end of our gradient
    document.documentElement.style.backgroundColor = `${primaryColor}10`

    // Clean up when component unmounts
    return () => {
      document.documentElement.style.backgroundColor = ""
    }
  }, [primaryColor])

  return (
    <footer
      className="py-12 mt-20 pb-24"
      style={{
        background: `linear-gradient(to bottom, white 40%, ${primaryColor}10)`,
        minHeight: "50vh", // Ensure footer has a minimum height
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left section */}
          <div className="md:col-span-4">
            <h2 className="text-3xl font-medium text-gray-800 mb-4" style={{ textTransform: "none" }}>
              Thanks for stopping by!
            </h2>

            <p className="text-base text-gray-500 mb-1">© Lawrence Zheng 2025</p>
            <p className="text-base text-gray-500 mb-4">Made with love, lo-fi beats and lots of iteration.</p>

            {/* Decorative pixel art elements - with SVG fallback */}
            <div className="flex items-center">
              <img src="/pixel-deco/pixel-avatar.png" alt="Pixel avatar" width={48} height={48} className="mr-3" />
              {imageError ? (
                <HeartSpeechBubble width={48} height={48} />
              ) : (
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/backdeco5-export-3Fxaiv24BAN1G2NNgMaFaOHdxr50TC.png"
                  alt="Speech bubble with heart"
                  width={48}
                  height={48}
                  crossOrigin="anonymous"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          {/* Spacer column on medium+ screens */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Contact section */}
          <div className="md:col-span-2">
            <h3 className="text-base font-medium text-gray-800 mb-3" style={{ textTransform: "none" }}>
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com/in/lawrencezheng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@lawrencezheng.com" className="text-gray-600 hover:text-gray-900 transition">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Projects section */}
          <div className="md:col-span-2">
            <h3 className="text-base font-medium text-gray-800 mb-3" style={{ textTransform: "none" }}>
              Projects
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/placeholder-project" className="text-gray-600 hover:text-gray-900 transition">
                  3M M*Modal
                </Link>
              </li>
              <li>
                <Link href="/play-for-people-skills" className="text-gray-600 hover:text-gray-900 transition">
                  Play For People Skills
                </Link>
              </li>
              <li>
                <Link href="/icpsr-project" className="text-gray-600 hover:text-gray-900 transition">
                  ICPSR
                </Link>
              </li>
              <li>
                <Link href="/pixel-art" className="text-gray-600 hover:text-gray-900 transition">
                  Pixel art
                </Link>
              </li>
              <li>
                <Link href="/delallo" className="text-gray-600 hover:text-gray-900 transition">
                  DeLallo
                </Link>
              </li>
            </ul>
          </div>

          {/* Download section */}
          <div className="md:col-span-2">
            <h3 className="text-base font-medium text-gray-800 mb-3" style={{ textTransform: "none" }}>
              Download
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition"
                  rel="noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
