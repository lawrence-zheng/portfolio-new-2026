"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import { useState, useRef } from "react"
import ProjectSideNav from "@/components/project-side-nav"
import KeyInsight from "@/components/key-insight"
import Quotation from "@/components/quotation"
import InfoCardGroup from "@/components/info-card-group"
import BeforeAfterSlider from "@/components/before-after-slider"
import ProjectTimeline from "@/components/project-timeline"
import FilterCards from "@/components/filter-cards"
import Navbar from "@/components/navbar"
import Learning from "@/components/learning"
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

export default function BOMManagerProject() {
  const [activeSection, setActiveSection] = useState<string>("solution-preview")
  const { primaryColor, activeTab } = useColorContext()

  // Dynamic styles for color-dependent elements
  const dynamicStyles = `
   em {
     color: ${primaryColor};
   }

   .metric-value {
     color: ${primaryColor};
   }
 `

  // Refs for each section to enable scroll tracking
  const overviewRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const collaborationRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const learningsRef = useRef<HTMLDivElement>(null)
  const solutionPreviewRef = useRef<HTMLDivElement>(null)



  // Track scroll position to update active section in side nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { ref: solutionPreviewRef, id: "solution-preview" },
        { ref: overviewRef, id: "overview" },
        { ref: problemRef, id: "problem" },
        { ref: processRef, id: "process" },
        { ref: collaborationRef, id: "collaboration" },
        { ref: resultsRef, id: "results" },
        { ref: learningsRef, id: "learnings" },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation sections for the side nav
  const navSections = [
    { id: "solution-preview", label: "Solution Preview" },
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "process", label: "Process" },
    { id: "collaboration", label: "Collaboration" },
    { id: "results", label: "Results" },
    { id: "learnings", label: "Learnings" },
  ]

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      problem: problemRef,
      process: processRef,
      solution: solutionRef,
      collaboration: collaborationRef,
      results: resultsRef,
      learnings: learningsRef,
      "solution-preview": solutionPreviewRef,
    }

    const ref = sectionMap[sectionId]
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
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

  // Get sneak peak background color based on active tab (matching Key Insight cards)
  const getSneakPeakBackgroundColor = () => {
    switch (activeTab) {
      case "ux-research":
        return "#fdf0e6" // Same as Key Insight background for UX Research
      case "ui-engineering":
        return "#e6e9fd" // Same as Key Insight background for UI Engineering
      default:
        return "#f0f9ff" // Same as Key Insight background for Product Design
    }
  }

  // Sample skills for the project
  const skills = ["UX Design", "Information Architecture", "User Research", "Prototyping", "Design Systems"]

  // Info cards data
  const infoCards = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: primaryColor }}
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      subtitle: "Research",
      content:
        "Conducted user interviews with defense specialists to understand pain points in inventory management workflows.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: primaryColor }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      subtitle: "Design",
      content:
        "Redesigned the platform from an image gallery to an expandable list design, improving usability and performance.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: primaryColor }}
        >
          <path d="M22 2 11 13"></path>
          <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
        </svg>
      ),
      subtitle: "Implementation",
      content: "Collaborated closely with 8 engineers to ensure design system alignment and optimal performance.",
    },
  ]

  // Timeline phases data
  const timelinePhases = [
    {
      id: "phase1",
      title: "Problem Discovery",
      description: "User research and stakeholder alignment",
      icon: (
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
          className="text-gray-600"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      startWeek: 1,
      endWeek: 3,
    },
    {
      id: "phase2",
      title: "MVP Redesign",
      description: "Information architecture and wireframing",
      icon: (
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
          className="text-gray-600"
        >
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      ),
      startWeek: 3,
      endWeek: 6,
    },
    {
      id: "phase3",
      title: "Design Polish",
      description: "High-fidelity prototypes and usability testing",
      icon: (
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
          className="text-gray-600"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="21.17" x2="12" y1="8" y2="8"></line>
          <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
          <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
        </svg>
      ),
      startWeek: 6,
      endWeek: 9,
    },
    {
      id: "phase4",
      title: "Implementation & QA",
      description: "Development oversight and design system alignment",
      icon: (
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
          className="text-gray-600"
        >
          <path d="M22 2 11 13"></path>
          <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
        </svg>
      ),
      startWeek: 9,
      endWeek: 10,
    },
  ]

  // Filter options for design approaches
  const designApproaches = [
    {
      id: "drag-match",
      title: "Drag to Match",
      description: "Interactive drag-and-drop interface for data mapping",
      icon: (
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
          style={{ color: primaryColor }}
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      ),
    },
    {
      id: "dropdown",
      title: "Select from Dropdown",
      description: "Simple dropdown selection for field mapping",
      icon: (
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
          style={{ color: primaryColor }}
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      ),
    },
    {
      id: "step-by-step",
      title: "Step by Step",
      description: "Guided wizard approach for complex data mapping",
      icon: (
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
          style={{ color: primaryColor }}
        >
          <path d="M9 6 5 2 1 6"></path>
          <path d="M15 6 19 2 23 6"></path>
          <path d="M1 14h22"></path>
          <path d="M5 18h14"></path>
        </svg>
      ),
    },
  ]

  const [selectedApproach, setSelectedApproach] = useState<string>("dropdown")

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>
        {dynamicStyles}
      </style>
      <Navbar />

      {/* Project Header Section */}
      <section
        className="pt-4 transition-all duration-500 relative"
        style={{
          background: getBackgroundGradient(),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Text Content */}
            <div className="space-y-6 pt-0 mt-24 self-start">
              <div className="h-12 mb-4">
                <Image src="/govini-logo.png" alt="Govini logo" width={180} height={48} className="h-12 w-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-tight text-black normal-case">
                Simplifying inventory management in complex data workflows
              </h1>
              <p className="text-gray-700 text-lg">
                Redesigning a defense platform to streamline critical supply chain workflows for government agencies
              </p>

              {/* High-level Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">My Role</h3>
                    <p className="font-medium text-gray-800">Lead UX Designer</p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Timeframe</h3>
                    <p className="font-medium text-gray-800">2.5 months</p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Team</h3>
                    <p className="font-medium text-gray-800">Sole designer with 8 engineers and 1 PM</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Summary</h3>
                    <p className="text-gray-800 text-sm">
                      Govini is a B2B SaaS startup providing AI-powered workflow tools for government agencies. I
                      redesigned their inventory management platform to address critical usability issues and{" "}
                      <em>transform an unused feature into a core product driver</em>.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Impact</h3>
                    <p className="text-gray-700 text-sm">
                      Successfully transformed a completely unused feature into one of the main drivers behind product
                      and sales decisions, becoming critical for future ATO approval and company growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  className="px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-colors"
                  onClick={() => scrollToSection("overview")}
                  style={{ backgroundColor: primaryColor }}
                >
                  View case study
                </button>
                <button
                  className="px-6 py-3 border rounded-md font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => scrollToSection("solution")}
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  See solution
                </button>
              </div>
            </div>

            {/* Right Column: Platform Screenshot */}
            <div className="w-full relative self-center">
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/bom-manager-mockup.png"
                  alt="BOM Manager platform interface"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Preview Section */}
      <div
        ref={solutionPreviewRef}
        id="solution-preview"
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16"
        style={{ backgroundColor: getSneakPeakBackgroundColor() }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-xl font-medium text-gray-600 mb-8"
            style={{ textTransform: "none", letterSpacing: "-0.025em" }}
          >
            A sneak peak of the final design...
          </h2>

          {/* Success Metrics Container */}
          <div className="metrics-container mb-8">
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: primaryColor }}
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <div className="metric-content">
                  <div className="metric-value">38%</div>
                  <div className="metric-label">Increase in Session Time</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: primaryColor }}
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="m22 21-3-3m0 0a5 5 0 1 0-7-7 5 5 0 0 0 7 7z"></path>
                  </svg>
                </div>
                <div className="metric-content">
                  <div className="metric-value">60%+</div>
                  <div className="metric-label">Weekly Active Users</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: primaryColor }}
                  >
                    <path d="M12 2v20m8-10H4"></path>
                  </svg>
                </div>
                <div className="metric-content">
                  <div className="metric-value">Exceeded</div>
                  <div className="metric-label">Sales Target</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add more images as needed */}
            <Image
              src="/bom-manager-mockup.png"
              alt="Solution Preview 1"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200"
            />
            <Image
              src="/modern-software-dashboard.png"
              alt="Solution Preview 2"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200"
            />
            <Image
              src="/problem-analysis-diagram.png"
              alt="Solution Preview 3"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Main Content with Side Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-5">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Overview</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Modernizing defense supply workflows
                  </h2>
                </div>
              </div>

              {/* Info Cards Group */}
              <InfoCardGroup cards={infoCards} accentColor={primaryColor} />

              <p className="text-gray-800 mb-4">
                The challenge was to take something that <em>wasn't used at all</em> and turn it into a driving force
                behind product and sales decisions. This required understanding both user needs and business objectives
                to create a solution that would actually be adopted.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Problem Section */}
            <section ref={problemRef} id="problem" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Problem</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Outdated processes for high-tech systems
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                Defense specialists managing high-tech weapon systems were stuck with outdated, paper-based processes
                that didn't match the sophistication of the systems they were managing.
              </p>

              {/* Expectation vs Reality Comparison */}
              <div className="my-12">
                <BeforeAfterSlider
                  beforeImage="/problem-analysis-diagram.png"
                  afterImage="/modern-software-dashboard.png"
                  beforeAlt="Reality: Paper-based processes and cluttered spreadsheets"
                  afterAlt="Expectation: Modern, digital workflow management"
                  beforeLabel="Reality"
                  afterLabel="Expectation"
                />
                <div className="image-caption">
                  The stark contrast between expectations of modern digital workflows and the reality of paper-based
                  inventory management
                </div>
              </div>

              <p className="text-gray-800 mb-6">
                The traditional inventory management process suffered from three critical issues:
              </p>

              {/* Problem breakdown with visual elements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div className="p-6 border border-gray-200 rounded-lg bg-red-50">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                      className="text-red-600"
                    >
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
                    </svg>
                  </div>
                  <h3 className="font-normal mb-2">Tedious to get through</h3>
                  <p className="text-sm text-gray-700">
                    Manual processes required extensive time and effort to complete basic inventory tasks
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg bg-orange-50">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
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
                      className="text-orange-600"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-normal mb-2">Lacking version control</h3>
                  <p className="text-sm text-gray-700">
                    Multiple CSV files with no clear versioning system led to confusion and errors
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg bg-yellow-50">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
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
                      className="text-yellow-600"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-normal mb-2">Lacks real-time context</h3>
                  <p className="text-sm text-gray-700">
                    Static spreadsheets provided no dynamic insights or contextual information
                  </p>
                </div>
              </div>

              {/* User and Business Alignment */}
              <div className="my-12 p-8 rounded-lg" style={{ backgroundColor: `${primaryColor}05` }}>
                <h3 className="text-xl font-medium mb-6 text-center">Aligning User Needs with Business Objectives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">The User</h4>
                    <p className="text-gray-700 italic">
                      "I want a more convenient way to manage my inventory in a centralized location where I can view
                      additional insights"
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <path d="M12 2v20m8-10H4"></path>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">The Business</h4>
                    <p className="text-gray-700 italic">
                      "I want users to upload their data so they spend more time in the platform and so we can surface
                      more relevant alerts elsewhere"
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="my-12">
                <KeyInsight activeTab={activeTab}>
                  User needs and business objectives were perfectly aligned - both required a centralized, intelligent
                  inventory management solution.
                </KeyInsight>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Process Section */}
            <section ref={processRef} id="process" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Process</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Rethinking the MVP approach
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                It was critical to identify the main problems with Govini's existing design to make the platform
                actually usable for inventory management.
              </p>

              {/* Timeline Component */}
              <div className="my-12 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Project Timeline</h3>
                <div className="overflow-hidden">
                  <ProjectTimeline phases={timelinePhases} totalWeeks={10} accentColor={primaryColor} />
                </div>
              </div>

              {/* Problems with existing design */}
              <div className="my-12">
                <h3 className="text-xl font-medium mb-6">Problems with the Existing Design</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 border-l-4 bg-gray-50" style={{ borderColor: primaryColor }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      1
                    </div>
                    <div>
                      <h4 className="font-normal mb-2">Lack of information</h4>
                      <Quotation
                        attribution="Defense Specialist"
                        isEmphasized={false}
                        isFullWidth={false}
                        accentColor={primaryColor}
                      >
                        I don't see enough information on this page compared to having everything laid out on the
                        spreadsheet
                      </Quotation>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 border-l-4 bg-gray-50" style={{ borderColor: primaryColor }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      2
                    </div>
                    <div>
                      <h4 className="font-normal mb-2">Overreliance on image uploads</h4>
                      <p className="text-gray-700">
                        Despite the prominence of images in the UI, users only uploaded images for{" "}
                        <em>less than 1% of parts</em>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 border-l-4 bg-gray-50" style={{ borderColor: primaryColor }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      3
                    </div>
                    <div>
                      <h4 className="font-normal mb-2">Nested data hierarchy</h4>
                      <p className="text-gray-700">
                        The breadcrumb navigation became too crowded for customers with 30+ levels of nested assemblies
                        and groups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design approach comparison */}
              <div className="my-12">
                <h3 className="text-xl font-medium mb-6">From Gallery to List Design</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-normal mb-4 text-center">"Gallery" Design</h4>
                    <div className="bg-gray-100 rounded-lg p-4 h-48 flex flex-col">
                      <div className="bg-white rounded mb-2 h-16 flex items-center justify-center text-gray-500">
                        Large Image
                      </div>
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="bg-white rounded flex items-center justify-center text-xs text-gray-500"
                          >
                            Img {i}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-2 rounded-lg p-4" style={{ borderColor: primaryColor }}>
                    <h4 className="font-normal mb-4 text-center">Expandable List Design</h4>
                    <div className="bg-gray-100 rounded-lg p-4 h-48 flex flex-col">
                      <div className="bg-white rounded mb-2 p-2 text-xs">🔍 Search</div>
                      <div className="space-y-1 flex-1">
                        {["Part name", "Part name", "Part name", "Part name"].map((name, i) => (
                          <div key={i} className="bg-white rounded p-2 text-xs flex justify-between">
                            <span>{name}</span>
                            <span>▶</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image-caption mt-4">
                  The redesigned expandable list structure provided better information density and navigation
                </div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Solution Section */}
            <section ref={solutionRef} id="solution" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Solution</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Design polish with user-centered principles
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                I designed the management platform with Nielsen Norman Group's heuristics for complex workflows in mind,
                focusing on three key principles.
              </p>

              {/* Design Principles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: primaryColor }}
                    >
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    </svg>
                  </div>
                  <h4 className="font-normal mb-2">Promoting learning by doing</h4>
                  <p className="text-sm text-gray-700">
                    Users are more motivated to begin tasks immediately than spend time on tutorials or documentation
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: primaryColor }}
                    >
                      <path d="M12 2v20m8-10H4"></path>
                    </svg>
                  </div>
                  <h4 className="font-normal mb-2">Reduce clutter without reducing capability</h4>
                  <p className="text-sm text-gray-700">
                    Complex applications must support both novice and expert users with advanced features when needed
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: primaryColor }}
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <h4 className="font-normal mb-2">Coordinate transition between tools</h4>
                  <p className="text-sm text-gray-700">
                    Reduce the burden of tool switching by supporting transitions between different environments
                  </p>
                </div>
              </div>

              {/* Data Mapping Approaches */}
              <div className="my-12">
                <h3 className="text-xl font-medium mb-6">Testing Data Mapping Approaches</h3>
                <p className="text-gray-800 mb-6">
                  Users preferred simplicity for mapping their complex data to our system, even if it looked less
                  high-tech and "fancy".
                </p>

                <FilterCards
                  options={designApproaches}
                  accentColor={primaryColor}
                  onFilterChange={setSelectedApproach}
                  defaultSelected="dropdown"
                />

                <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  {selectedApproach === "drag-match" && (
                    <div>
                      <h4 className="font-medium mb-2">Drag to Match</h4>
                      <p className="text-gray-700">
                        This approach allowed users to drag fields from their uploaded data to match with system fields.
                        While visually appealing, it proved confusing for users dealing with complex datasets.
                      </p>
                    </div>
                  )}

                  {selectedApproach === "dropdown" && (
                    <div>
                      <h4 className="font-medium mb-2">Select from Dropdown ✓</h4>
                      <p className="text-gray-700 mb-4">
                        <strong>This approach performed the best in usability testing!</strong> Simple dropdown
                        selection proved most intuitive for users, allowing them to quickly map their data fields
                        without confusion.
                      </p>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Why it worked:</strong> Users could see all available options at once and make
                          informed decisions without the cognitive overhead of drag-and-drop interactions.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedApproach === "step-by-step" && (
                    <div>
                      <h4 className="font-medium mb-2">Step by Step</h4>
                      <p className="text-gray-700">
                        A guided wizard approach that walked users through data mapping one field at a time. While
                        thorough, users found it too time-consuming for their workflow needs.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Insight */}
              <div className="my-12">
                <KeyInsight activeTab={activeTab}>
                  Simplicity trumps sophistication - users consistently chose functional, straightforward interfaces
                  over visually complex ones when dealing with critical workflows.
                </KeyInsight>
              </div>
            </section>

            {/* Collaboration Section */}
            <section ref={collaborationRef} id="collaboration" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Collaboration</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Balancing design vision with technical constraints
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                I made sure to keep all stakeholders involved throughout the process, including keeping development
                teams informed early to avoid costly redesigns.
              </p>

              {/* Stakeholder collaboration diagram */}
              <div className="my-12 p-8 rounded-lg" style={{ backgroundColor: `${primaryColor}05` }}>
                <h3 className="text-xl font-medium mb-6 text-center">Collaborative Process</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="4"></circle>
                        <line x1="21.17" x2="12" y1="8" y2="8"></line>
                        <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                        <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">Design (me)</h4>
                    <p className="text-sm text-gray-700">Generate requirements, find research opportunities</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">Users</h4>
                    <p className="text-sm text-gray-700">Real humans who use this! Provide validation and feedback</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <path d="M12 2v20m8-10H4"></path>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">PMs</h4>
                    <p className="text-sm text-gray-700">Convince leadership together, align on shared goals</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: primaryColor }}
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                      </svg>
                    </div>
                    <h4 className="font-normal mb-2">Engineering</h4>
                    <p className="text-sm text-gray-700">Understand constraints, explore technical possibilities</p>
                  </div>
                </div>
              </div>

              {/* Technical constraint story */}
              <div className="my-12">
                <h3 className="text-xl font-medium mb-6">When Good Design Meets Technical Reality</h3>
                <p className="text-gray-800 mb-6">
                  A well-liked design would take too long to load... Engineering revealed that our hierarchical table
                  design would take <em>up to 5 minutes to load</em> for users!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-normal mb-4 text-red-800">❌ Original Design</h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>▼ Component A</span>
                          <span>Details</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>▼ Subcomponent 1</span>
                            <span>Details</span>
                          </div>
                          <div className="ml-4 text-xs text-gray-500">
                            <div>Part 1</div>
                            <div>Part 2</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-red-700">
                      <strong>Problem:</strong> Loading all nested data at once caused 5+ minute load times
                    </p>
                  </div>

                  <div className="p-6 border-2 rounded-lg bg-green-50" style={{ borderColor: primaryColor }}>
                    <h4 className="font-normal mb-4" style={{ color: primaryColor }}>
                      ✓ Optimized Design
                    </h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Component A</span>
                          <span>View Details →</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Component B</span>
                          <span>View Details →</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Component C</span>
                          <span>View Details →</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: primaryColor }}>
                      <strong>Solution:</strong> Lazy loading with drill-down navigation reduced load time to under 3
                      seconds
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-lg" style={{ backgroundColor: `${primaryColor}05` }}>
                  <h4 className="font-medium mb-2">The Compromise</h4>
                  <p className="text-gray-700">
                    We maintained the hierarchical information architecture users needed while implementing a drill-down
                    navigation pattern that loaded data on-demand. This preserved the user experience while making the
                    technical implementation feasible.
                  </p>
                </div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Results Section */}
            <section ref={resultsRef} id="results" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Results</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    From zero to hero feature
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                The redesigned inventory management platform exceeded all expectations, transforming from an unused
                feature to a core product driver.
              </p>

              {/* Success metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    38%
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Increase</div>
                  <div className="font-medium">Session Time</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Users spent significantly more time engaging with the platform
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    60%+
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Weekly</div>
                  <div className="font-medium">Active Users</div>
                  <p className="text-sm text-gray-600 mt-2">
                    More than half of users now actively use the inventory feature
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    Exceeded
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Target</div>
                  <div className="font-medium">Sales Goals</div>
                  <p className="text-sm text-gray-600 mt-2">Feature became a key selling point for new customers</p>
                </div>
              </div>

              {/* Business impact */}
              <div className="my-12 p-8 rounded-lg" style={{ backgroundColor: `${primaryColor}05` }}>
                <h3 className="text-xl font-medium mb-6">Business Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-normal mb-4">Product Strategy</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Became a core feature in product roadmap discussions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Influenced development of related inventory features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Critical for future ATO (Authority to Operate) approval</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-normal mb-4">Sales & Growth</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Featured prominently in sales demos and presentations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Helped secure contracts with new government agencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Increased platform stickiness and user retention</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* User feedback */}
              <div className="my-12">
                <h3 className="text-xl font-medium mb-6">User Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Quotation attribution="Defense Specialist" isEmphasized={true} accentColor={primaryColor}>
                    This is exactly what we needed. I can finally manage my inventory in one place and see all the
                    information I need without switching between multiple spreadsheets.
                  </Quotation>
                  <Quotation attribution="Program Manager" isEmphasized={true} accentColor={primaryColor}>
                    The new design makes it so much easier to onboard new team members. They can understand the system
                    immediately without extensive training.
                  </Quotation>
                </div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Learnings Section */}
            <section ref={learningsRef} id="learnings" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span>Learnings</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Key takeaways from the project
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                This project taught me valuable lessons about balancing user needs, business objectives, and technical
                constraints in a fast-paced startup environment.
              </p>
              <Learning
                summary="Centralized, intelligent inventory management is key"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
              >
                <p>
                  Both user and business needs pointed to the importance of a centralized, intelligent inventory management solution. Aligning these needs was crucial for adoption and long-term success.
                  </p>
              </Learning>
              <Learning
                summary="User research prevents costly mistakes"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
                    >
                <p>
                  Early user research revealed pain points and saved us from pursuing ineffective strategies, leading to a more innovative and sustainable solution.
                  </p>
              </Learning>
              <Learning
                summary="Design systems create long-term value"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
              >
                <p>
                  Building a design system alongside the product ensured consistency and made future updates more efficient, reinforcing the value of scalable design thinking.
                </p>
              </Learning>
            </section>
          </div>

          {/* Side Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <ProjectSideNav
                sections={navSections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
                accentColor={primaryColor}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
