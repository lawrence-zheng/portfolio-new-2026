"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ColorContextType = {
  primaryColor: string
  activeTab: string
  setActiveTab: (tab: string) => void
  isMounted: boolean
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

// Helper function to darken a hex color
function darkenColor(hex: string, percent: number): string {
  // Remove the hash if present
  hex = hex.replace("#", "")

  // Parse the hex values
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Darken each component
  const darkenedR = Math.floor(r * (1 - percent / 100))
  const darkenedG = Math.floor(g * (1 - percent / 100))
  const darkenedB = Math.floor(b * (1 - percent / 100))

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0")
  return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`
}

export function ColorProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("product-design")
  const [primaryColor, setPrimaryColor] = useState<string>("#22A3B4") // Default teal
  const [isMounted, setIsMounted] = useState(false)

  // Mark as mounted to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update primary color and selection colors when active tab changes
  useEffect(() => {
    let newPrimaryColor: string

    if (activeTab === "ux-research") {
      newPrimaryColor = "#d97944" // Sunset orange
    } else if (activeTab === "ui-engineering") {
      newPrimaryColor = "#4e3380" // Evening purple
    } else {
      newPrimaryColor = "#22A3B4" // Default teal
    }

    setPrimaryColor(newPrimaryColor)

    // Update CSS custom properties for text selection
    if (typeof window !== "undefined") {
      const darkerColor = darkenColor(newPrimaryColor, 25) // Darken by 25%
      document.documentElement.style.setProperty("--selection-bg", darkerColor)
      document.documentElement.style.setProperty("--selection-text", "#ffffff")
    }

    // Save to localStorage for persistence (only after mounted)
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("activeTab", activeTab)
    }
  }, [activeTab, isMounted])

  // Load the saved tab preference on initial render (only after mounted)
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const savedTab = localStorage.getItem("activeTab") || "product-design"
      setActiveTab(savedTab)
    }
  }, [isMounted])

  return <ColorContext.Provider value={{ primaryColor, activeTab, setActiveTab, isMounted }}>{children}</ColorContext.Provider>
}

export function useColorContext() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error("useColorContext must be used within a ColorProvider")
  }
  return context
}
