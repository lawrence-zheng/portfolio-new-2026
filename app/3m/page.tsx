"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import PasswordProtection from "@/components/password-protection"
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

export default function ThreeMCaseStudy() {
  const { primaryColor } = useColorContext()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("auth_3m")
    setIsAuthenticated(authStatus === "true")
  }, [])

  return (
    <main className="bg-white min-h-screen">
      {/* Password Protection Component */}
      <PasswordProtection
        projectId="3m"
        correctPassword="healthconnect"
        projectTitle="3M AI Clinical Documentation"
        companyLogo="/3M_wordmark.svg"
        companyName="3M"
      />

      {/* Case Study Content - only visible after authentication */}
      {isAuthenticated && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-8">
            <div className="h-8 mb-4">
              <Image src="/3M_wordmark.svg" alt="3M logo" width={80} height={32} className="h-8 w-auto" />
            </div>

            <h1 className="text-4xl md:text-5xl font-normal mb-6">
              Reimagining human-AI collaboration to boost patient care for millions
            </h1>

            <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 mb-6">
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
              Password Protected Case Study
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
              <p className="text-gray-700 italic">
                This case study contains confidential information about 3M's AI clinical documentation tools. Please do
                not share this information without permission.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <Image
              src="/mmodal-mockup.png"
              alt="3M AI clinical documentation interface showing diagnostic code suggestions"
              width={1200}
              height={800}
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-normal mb-2">Project Overview</h3>
              <p className="text-gray-700">
                At 3M, I led the end-to-end UX design and research for a suite of collaborative applications used by
                clinicians to reduce the time needed to revise medical notes and increase quality face-to-face time with
                patients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-normal mb-2">My Role</h3>
              <p className="text-gray-700">
                Lead UX Designer responsible for research, prototyping, testing, and implementation of AI-assisted
                clinical documentation tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-normal mb-2">Timeline</h3>
              <p className="text-gray-700">18 months (2022-2023)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image src="/dx-capture.png" alt="DX capture icon" width={48} height={48} />
              </div>
              <div>
                <div className="text-2xl font-medium text-gray-800">25%</div>
                <div className="text-gray-700 text-sm">Increase in DX capture</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image src="/clinicians.png" alt="Clinicians icon" width={48} height={48} />
              </div>
              <div>
                <div className="text-2xl font-medium text-gray-800">250,000+</div>
                <div className="text-gray-700 text-sm">Clinicians giving better care</div>
              </div>
            </div>
          </div>

          <div className="max-w-none mb-16">
            <section className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Details</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Project Details
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                This case study contains detailed information about the design and implementation of 3M's AI-assisted
                clinical documentation tools. The content is protected for confidentiality reasons.
              </p>

              <p className="text-gray-800 mb-6">
                The full case study includes information about the research process, design decisions, implementation
                challenges, and outcomes of the project.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            <section className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Challenges</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Key Challenges
                  </h2>
                </div>
              </div>
              <ul className="text-gray-800 space-y-2">
                <li>• Integrating AI suggestions in a way that enhances rather than disrupts clinical workflow</li>
                <li>• Ensuring high accuracy and relevance of AI-generated content</li>
                <li>• Designing an interface that maintains human oversight while leveraging AI capabilities</li>
                <li>• Meeting strict healthcare compliance and security requirements</li>
              </ul>
            </section>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <Link href="/">
              <button
                className="px-6 py-3 border rounded-md font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                ← Back to Portfolio
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
