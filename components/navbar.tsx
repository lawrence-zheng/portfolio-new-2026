"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useColorContext } from "@/context/color-context"
import ScrollToTopLink from "./scroll-to-top-link"

export default function Navbar() {
  const { primaryColor } = useColorContext()
  const [showFunMenu, setShowFunMenu] = useState<boolean>(false)
  const funMenuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const pathname = usePathname()

  // "Work" scrolls to the projects on the homepage; from any other page it navigates to /#work,
  // which the homepage picks up and scrolls to once it mounts.
  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return
    const projects = document.getElementById("work")
    if (!projects) return
    e.preventDefault()
    projects.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", "/#work")
  }

  // Handle click outside to close fun menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside both the button and dropdown
      if (funMenuRef.current && !funMenuRef.current.contains(event.target as Node)) {
        setShowFunMenu(false)
      }
    }

    // Only add the event listener if the menu is open
    if (showFunMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFunMenu])

  // Track mouse movement to close dropdown when mouse is far away
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!showFunMenu) return

      // Get the positions of the navbar button and dropdown
      const buttonRect = funMenuRef.current?.getBoundingClientRect()
      const dropdownRect = dropdownRef.current?.getBoundingClientRect()

      if (!buttonRect || !dropdownRect) return

      // Calculate if mouse is far from both elements
      const isMouseFarFromButton =
        event.clientX < buttonRect.left - 50 ||
        event.clientX > buttonRect.right + 50 ||
        event.clientY < buttonRect.top - 50 ||
        event.clientY > buttonRect.bottom + 50

      const isMouseFarFromDropdown =
        event.clientX < dropdownRect.left - 50 ||
        event.clientX > dropdownRect.right + 50 ||
        event.clientY < dropdownRect.top - 50 ||
        event.clientY > dropdownRect.bottom + 50

      // If mouse is far from both elements, close the dropdown after a short delay
      if (isMouseFarFromButton && isMouseFarFromDropdown) {
        // Clear any existing timeout to prevent multiple calls
        if (mouseLeaveTimeoutRef.current) {
          clearTimeout(mouseLeaveTimeoutRef.current)
        }

        // Set a timeout to close the dropdown after a short delay
        mouseLeaveTimeoutRef.current = setTimeout(() => {
          setShowFunMenu(false)
        }, 300) // 300ms delay before closing
      } else {
        // If mouse is close to either element, clear the timeout
        if (mouseLeaveTimeoutRef.current) {
          clearTimeout(mouseLeaveTimeoutRef.current)
          mouseLeaveTimeoutRef.current = null
        }
      }
    }

    // Only add the event listener if the menu is open
    if (showFunMenu) {
      document.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      // Clear any existing timeout on cleanup
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current)
      }
    }
  }, [showFunMenu])

  // Track scroll position to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-3 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <ScrollToTopLink
          href="/"
          className="font-sans font-bold text-xl transition-colors duration-300"
          style={{ color: primaryColor }}
        >
          lawrence zheng
        </ScrollToTopLink>
        <nav className="flex gap-6 text-sm font-sans">
          <Link
            href="/#work"
            onClick={handleWorkClick}
            className="transition-colors duration-300 hover:text-opacity-80 uppercase tracking-wider"
            style={{ color: "rgb(75 85 99)" }}
          >
            WORK
          </Link>
          <div ref={funMenuRef} className="relative">
            <button
              className="transition-colors duration-300 hover:text-opacity-80 text-sm font-sans flex items-center uppercase tracking-wider"
              style={{ color: "rgb(75 85 99)" }}
              aria-expanded={showFunMenu}
              aria-haspopup="true"
              onClick={() => setShowFunMenu(!showFunMenu)}
              onMouseEnter={() => setShowFunMenu(true)}
            >
              FUN
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-3 w-3 transition-transform duration-200"
                style={{ transform: showFunMenu ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Dropdown menu */}
            {showFunMenu && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fadeIn"
                style={{
                  animation: "fadeIn 0.2s ease-out forwards",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                <ScrollToTopLink
                  href="/pixel-art"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowFunMenu(false)}
                >
                  <div className="font-bold">Pixel art</div>
                  <div className="text-xs text-gray-500 mt-0.5">Gallery of my hobby pixel art</div>
                </ScrollToTopLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
