"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useColorContext } from "@/context/color-context"
import { useEffect } from "react"

export default function Footer() {
  const pathname = usePathname()
  const { activeTab } = useColorContext()

  // A slightly deeper tint than the about section above, to subtly differentiate the two regions
  const footerColor =
    activeTab === "ux-research" ? "#fdf0e6" : activeTab === "ui-engineering" ? "#e6e9fd" : "#EBF1F9"

  // Match the html background so overscroll shows the same color, not a white flash
  useEffect(() => {
    document.documentElement.style.backgroundColor = footerColor

    // Clean up when component unmounts
    return () => {
      document.documentElement.style.backgroundColor = ""
    }
  }, [footerColor])

  return (
    <footer
      className="py-12 transition-colors duration-700"
      style={{
        backgroundColor: footerColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left section */}
          <div className="md:col-span-4">
            {/* Pixel avatar above the title */}
            <div className="mb-3">
              <img
                src="/pixel-deco/pixel-avatar.png"
                alt="Pixel avatar"
                width={36}
                height={36}
                className="opacity-90"
              />
            </div>

            {/* Title */}
            <h2
              className="text-3xl font-medium text-gray-800 mb-6"
              style={{ textTransform: "none", letterSpacing: "-0.025em" }}
            >
              Thanks for stopping by!
            </h2>

            {/* Copyright text */}
            <p className="text-base text-gray-500 mb-1">© Lawrence Zheng 2026</p>
            <p className="text-base text-gray-500">Made with love, lo-fi beats and lots of iteration.</p>
          </div>

          {/* Spacer column on medium+ screens */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Contact section - Added padding to align properly */}
          <div className="md:col-span-2 md:pt-[39px]">
            <h3 className="text-base font-medium text-gray-800 mb-6" style={{ textTransform: "none" }}>
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

          {/* Projects section - Added padding to align properly */}
          <div className="md:col-span-2 md:pt-[39px]">
            <h3 className="text-base font-medium text-gray-800 mb-6" style={{ textTransform: "none" }}>
              Projects
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/3m" className="text-gray-600 hover:text-gray-900 transition">
                  3M M*Modal
                </Link>
              </li>
              <li>
                <Link href="/icpsr-project" className="text-gray-600 hover:text-gray-900 transition">
                  ICPSR
                </Link>
              </li>
              <li>
                <Link href="/delallo" className="text-gray-600 hover:text-gray-900 transition">
                  DeLallo
                </Link>
              </li>
            </ul>
          </div>

          {/* Download section - Added padding to align properly */}
          <div className="md:col-span-2 md:pt-[39px]">
            <h3 className="text-base font-medium text-gray-800 mb-6" style={{ textTransform: "none" }}>
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
