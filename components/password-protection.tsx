"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useColorContext } from "@/context/color-context"

interface PasswordProtectionProps {
  projectId: string
  correctPassword: string
  projectTitle: string
  companyLogo?: string
  companyName?: string
  /** Overrides the default "confidential information" explanation. */
  message?: string
  /** When given, rendered only after the password is entered, so gated content never mounts before unlock. */
  children?: React.ReactNode
}

export default function PasswordProtection({
  projectId,
  correctPassword,
  projectTitle,
  companyLogo,
  companyName,
  message = "This case study contains confidential information and requires a password to view.",
  children,
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { primaryColor } = useColorContext()

  // Check if user is already authenticated for this project
  useEffect(() => {
    const authStatus = localStorage.getItem(`auth_${projectId}`)
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [projectId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (password === correctPassword) {
        // Store authentication in localStorage
        localStorage.setItem(`auth_${projectId}`, "true")
        setIsAuthenticated(true)
        setError("")
      } else {
        setError("Incorrect password. Please try again.")
      }
      setIsLoading(false)
    }, 800)
  }

  // If authenticated, don't render the protection screen
  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          {companyLogo && (
            <div className="flex justify-center mb-4">
              <Image
                src={companyLogo || "/placeholder.svg"}
                alt={companyName || "Company logo"}
                width={80}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2" style={{ textTransform: "none" }}>
            Password Protected
          </h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 mb-2">
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
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {projectTitle}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            style={{
              backgroundColor: primaryColor,
              focusRingColor: primaryColor,
            }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Access Case Study"
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Return to portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
