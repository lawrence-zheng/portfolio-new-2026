"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import ProjectSideNav from "@/components/project-side-nav"
import KeyInsight from "@/components/key-insight"
import ProjectTimeline from "@/components/project-timeline"
import BeforeAfterSlider from "@/components/before-after-slider"
import Quotation from "@/components/quotation"
import SelectIteration from "@/components/select-iteration"
import InfoCardGroup from "@/components/info-card-group"
import FilterCards from "@/components/filter-cards"
import Learning from "@/components/learning"
import Navbar from "@/components/navbar"
import PasswordProtection from "@/components/password-protection"
import PixelDecoration from "@/components/pixel-decoration"
import EnhancedLightbox from "@/components/enhanced-lightbox"
import Lightbox from "@/components/lightbox"
import { HeartSpeechBubble } from "@/components/heart-speech-bubble"
import CompositeThumbnail from "@/components/composite-thumbnail"
import ScrollToTopLink from "@/components/scroll-to-top-link"
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

export default function PlaceholderProject() {
  const [activeSection, setActiveSection] = useState<string>("overview")
  const { primaryColor, activeTab } = useColorContext()

  // Dynamic styles for color-dependent elements
  const dynamicStyles = `
  em {
    color: ${primaryColor};
  }
`

  // Sample skills for the project
  const skills = ["UX Research", "UI Design", "Prototyping", "User Testing", "Design Systems"]

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

  // Sample iteration options for the SelectIteration component
  const iterationOptions = [
    {
      id: "iteration1",
      label: "Iteration 1",
      image: "/algebraic-equation-solution.png",
      description:
        "Initial concept focusing on core functionality with minimal visual design. The goal was to validate the basic interaction model and information architecture.",
    },
    {
      id: "iteration2",
      label: "Iteration 2",
      image: "/code-snippet-analysis.png",
      description:
        "Refined design with improved visual hierarchy and clearer information display. Added user feedback from initial testing and expanded feature set.",
    },
    {
      id: "final",
      label: "Final Version",
      image: "/modern-software-dashboard.png",
      description:
        "Polished design with complete feature set, refined visual design, and optimized user flows based on multiple rounds of testing and stakeholder feedback.",
    },
  ]

  // Sample info cards data
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
        "Conducted 15 user interviews and analyzed 200+ survey responses to identify key pain points and opportunities.",
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
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="21.17" x2="12" y1="8" y2="8"></line>
          <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
          <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
        </svg>
      ),
      subtitle: "Design",
      content:
        "Created 30+ wireframes and 5 high-fidelity prototypes, iterating based on continuous user feedback and testing.",
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
      content:
        "Collaborated with engineers to implement the design system, ensuring consistency across all touchpoints.",
    },
  ]

  // Sample filter options data
  const filterOptions = [
    {
      id: "all",
      title: "All Features",
      description: "View the complete solution with all features",
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
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 9h6" />
          <path d="M9 15h6" />
        </svg>
      ),
    },
    {
      id: "core",
      title: "Core Features",
      description: "Essential functionality for everyday use",
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
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      id: "advanced",
      title: "Advanced Features",
      description: "Specialized tools for power users",
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
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
    },
  ]

  // State for the selected filter
  const [selectedFeatureFilter, setSelectedFeatureFilter] = useState<string>("all")

  // Handler for filter changes
  const handleFeatureFilterChange = (filterId: string) => {
    setSelectedFeatureFilter(filterId)
  }

  // Refs for each section to enable scroll tracking
  const overviewRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const learningsRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const componentsRef = useRef<HTMLDivElement>(null)

  // Track scroll position to update active section in side nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching section

      // Check which section is currently in view
      const sections = [
        { ref: overviewRef, id: "overview" },
        { ref: problemRef, id: "problem" },
        { ref: processRef, id: "process" },
        { ref: solutionRef, id: "solution" },
        { ref: learningsRef, id: "learnings" },
        { ref: resultsRef, id: "results" },
        { ref: componentsRef, id: "components" },
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
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "process", label: "Process" },
    { id: "solution", label: "Solution" },
    { id: "learnings", label: "Learnings" },
    { id: "results", label: "Results" },
    { id: "components", label: "Component Library" },
  ]

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      problem: problemRef,
      process: processRef,
      solution: solutionRef,
      learnings: learningsRef,
      results: resultsRef,
      components: componentsRef,
    }

    const ref = sectionMap[sectionId]
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Offset for header
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>{`
        ${dynamicStyles}
      `}</style>

      {/* Use the shared Navbar component */}
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
            <div className="space-y-4 pt-0 mt-24 self-start">
              <div className="h-16 mb-2">
            <Image
                  src="/placeholder-logo.svg"
                  alt="Placeholder Project logo"
                  width={240}
                  height={64}
                  className="h-16 w-auto"
            />
          </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight text-black normal-case">
                Component Library & Reference
              </h2>
              <p className="text-gray-700 text-xl">
                A comprehensive showcase of all components used across case study pages for easy reference and reuse
              </p>

              {/* High-level Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Project Overview</h3>
                    <p className="text-gray-600 text-sm">
                      This page serves as a component repository showcasing all the reusable components used across the
                      portfolio case studies.
                    </p>
            </div>
<<<<<<< HEAD
            <h1 className="text-3xl md:text-4xl font-serif font-normal uppercase tracking-tight leading-tight text-center">
              Project Title Goes Here
            </h1>
          </div>

          {/* 3-column layout for project details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column: My Role, Timeframe, Skills Used */}
            <div className="space-y-6">
=======
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
              <div>
                    <h3 className="font-semibold text-gray-900 mb-2">My Role</h3>
                    <p className="text-gray-600 text-sm">
                      Component library curator and documentation maintainer
                    </p>
              </div>
                </div>
                <div className="space-y-4">
              <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-gray-600 text-sm">Ongoing maintenance</p>
              </div>
              <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Skills Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                    <span
                          key={skill}
                          className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="flex items-center justify-center lg:justify-end mt-12 lg:mt-24">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder-2n36l.png"
                  alt="Component library showcase"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-5 space-y-16">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="scroll-mt-24">
<<<<<<< HEAD
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Overview</h2>
              <p className="text-gray-800 mb-4">
                This section provides a comprehensive overview of the project, including the context, goals, and
                high-level approach. It sets the stage for the more detailed sections that follow.
              </p>

              {/* Info Cards Group - New Component */}
              <InfoCardGroup cards={infoCards} accentColor={primaryColor} />

              {/* Emphasized, Full-width Quotation */}
              <Quotation
                attribution="Project Stakeholder, VP of Product"
                isEmphasized={true}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                The team's approach to solving this complex problem was exceptional. They balanced user needs with
                technical constraints in a way that exceeded our expectations.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>

              {/* Key Insight Component */}
              <div className="my-12">
                <KeyInsight>
                  By understanding the core user needs and aligning them with business objectives, we created a solution
                  that increased engagement by 45%.
                </KeyInsight>
=======
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Overview</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Component Library Reference
                  </h2>
                </div>
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
              </div>
              <p className="text-gray-800 mb-6">
                This page serves as a comprehensive reference for all the reusable components used across the portfolio
                case studies. Each component is documented with usage examples and implementation details to facilitate
                easy reuse and maintenance.
              </p>
              <p className="text-gray-800 mb-6">
                The components are organized by category and include interactive examples where applicable. This library
                ensures consistency across all case study pages and provides a single source of truth for component
                behavior and styling.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Problem Section */}
            <section ref={problemRef} id="problem" className="scroll-mt-24">
<<<<<<< HEAD
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Problem</h2>
              <p className="text-gray-800 mb-4">
                This section clearly articulates the problem that the project aimed to solve. It includes relevant
                context, user pain points, and business challenges.
              </p>

              {/* Non-emphasized, Half-width Quotation */}
              <Quotation
                attribution="User Research Participant"
                isEmphasized={false}
                isFullWidth={false}
                accentColor={primaryColor}
              >
                I spend at least 30 minutes every day just trying to find the right information. It's frustrating and
                takes time away from my actual work.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>
              <div className="my-8 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src="/problem-analysis-diagram.png"
                  alt="Problem analysis diagram"
                  width={800}
                  height={400}
                  className="w-full"
                />
=======
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Challenge</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Maintaining Component Consistency
                  </h2>
                </div>
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
              </div>
              <p className="text-gray-800 mb-6">
                As the portfolio grew with multiple case studies, maintaining consistency across components became
                increasingly challenging. Different pages were using similar components with slight variations, making it
                difficult to update and maintain the codebase.
              </p>
              <p className="text-gray-800 mb-6">
                The need for a centralized component library became apparent to ensure consistent behavior, styling, and
                user experience across all case study pages.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Process Section */}
            <section ref={processRef} id="process" className="scroll-mt-24">
<<<<<<< HEAD
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Process</h2>
              <p className="text-gray-800 mb-4">
                This section outlines the design process, including research methods, ideation techniques, and testing
                approaches. It provides insight into how the solution was developed.
              </p>

              {/* Timeline Component */}
              <div className="my-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Project Timeline</h3>
                <div className="overflow-hidden">
                  <ProjectTimeline phases={timelinePhases} totalWeeks={8} accentColor={primaryColor} />
=======
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Process</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Component Documentation Process
                  </h2>
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                The process involved auditing all existing case study pages to identify common components, documenting
                their usage patterns, and creating a centralized reference page with interactive examples.
              </p>
              <p className="text-gray-800 mb-6">
                Each component was analyzed for its props, styling variations, and usage contexts to ensure comprehensive
                documentation for future development and maintenance.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Solution Section */}
            <section ref={solutionRef} id="solution" className="scroll-mt-24">
<<<<<<< HEAD
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Solution</h2>
              <p className="text-gray-800 mb-4">
                This section presents the final solution, including key features, design decisions, and how it addresses
                the identified problems. It showcases the outcome of the design process.
=======
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Solution</span>
                </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Centralized Component Library
                  </h2>
              </div>
              </div>
              <p className="text-gray-800 mb-6">
                Created a comprehensive component library page that serves as both documentation and a testing ground for
                all reusable components. This page includes interactive examples, usage guidelines, and implementation
                details for each component.
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
              </p>
              <p className="text-gray-800 mb-6">
                The library is organized by component type and includes real-world usage examples from actual case
                studies, making it easy to understand how each component should be implemented.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Learnings Section */}
            <section ref={learningsRef} id="learnings" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Learnings</span>
              </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Key Insights from Component Development
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                Throughout the development of this component library, several key insights emerged about component design
                and documentation practices.
              </p>
              <Learning summary="Component libraries improve development efficiency">
                <p>
                  Throughout the development of this component library, several key insights emerged about component design
                  and documentation practices. Consistent prop interfaces are crucial for maintainability, interactive
                  examples significantly improve developer experience, documentation should include both basic and advanced
                  usage patterns, and component libraries should be living documents that evolve with the codebase.
                </p>
              </Learning>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Results Section */}
            <section ref={resultsRef} id="results" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Results</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Impact of Component Library
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                The implementation of this component library has significantly improved the development workflow and
                consistency across the portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Reduced Development Time</h3>
                  <p className="text-gray-600 text-sm">
                    Developers can now quickly reference and implement components without searching through multiple files.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Improved Consistency</h3>
                  <p className="text-gray-600 text-sm">
                    All case study pages now use standardized components with consistent behavior and styling.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Better Maintenance</h3>
                  <p className="text-gray-600 text-sm">
                    Updates to components can be made in one place and will be reflected across all implementations.
                  </p>
                </div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Component Library Section */}
            <section ref={componentsRef} id="components" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Component Library</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Available Components
                  </h2>
                </div>
              </div>

              {/* Navigation Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Navigation Components</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">ProjectSideNav</h4>
                  <p className="text-gray-700 mb-4">
                    Side navigation component for case study pages with scroll tracking and smooth navigation.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <ProjectSideNav
                      sections={navSections}
                      activeSection={activeSection}
                      onSectionClick={scrollToSection}
                  accentColor={primaryColor}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">Navbar</h4>
                  <p className="text-gray-700 mb-4">
                    Main navigation bar with color context integration and responsive design.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">Navbar is already rendered at the top of this page</div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">ScrollToTopLink</h4>
                  <p className="text-gray-700 mb-4">
                    Floating button to scroll back to top of the page.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <ScrollToTopLink href="#top">
                      Back to top
                    </ScrollToTopLink>
                    </div>
                </div>
              </div>

              {/* Content Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Content Components</h3>
                
                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">KeyInsight</h4>
                  <p className="text-gray-700 mb-4">
                    Highlighted insight cards with background color based on active tab. Colors automatically adapt to the current tab context.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <KeyInsight>
                      Creating reusable components significantly improves development efficiency and maintains consistency across projects.
                    </KeyInsight>
                    </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p><strong>Note:</strong> The background color and accent color automatically change based on the active tab:</p>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li><strong>Product Design:</strong> Light blue background (#f0f9ff) with teal accent (#22A3B4)</li>
                      <li><strong>UX Research:</strong> Light orange background (#fdf0e6) with orange accent (#d97944)</li>
                      <li><strong>UI Engineering:</strong> Light purple background (#e6e9fd) with purple accent (#4e3380)</li>
                    </ul>
                </div>
              </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">InfoCardGroup</h4>
                  <p className="text-gray-700 mb-4">
                    Group of information cards with icons and descriptions.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <InfoCardGroup cards={infoCards} />
                  </div>
              </div>

                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">Quotation Variations</h4>
                  <p className="text-gray-700 mb-4">
                    Styled quotation component with multiple variations for different use cases.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Default Quotation</h5>
                      <div className="bg-white p-4 rounded border">
                        <Quotation attribution="Don Norman, Designer & Author">
                          Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.
                        </Quotation>
                      </div>
              </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Emphasized Full-Width Quotation</h5>
                      <div className="bg-white p-4 rounded border">
                        <Quotation 
                          attribution="Dr. Sarah Johnson, Professor of Sociology"
                          isEmphasized={true}
                          isFullWidth={true}
                          accentColor={primaryColor}
                        >
                          The new search interface has transformed how I find data for my research. What used to take me 15-20 minutes now takes just a few clicks. It's intuitive, fast, and actually makes discovering new datasets enjoyable.
                        </Quotation>
                </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Emphasized Half-Width Quotation</h5>
                      <div className="bg-white p-4 rounded border">
                        <Quotation 
                          attribution="ICPSR Director"
                          isEmphasized={true}
                          isFullWidth={false}
                          accentColor={primaryColor}
                        >
                          The search redesign has been transformative for our users. We've seen a dramatic increase in user satisfaction and engagement.
                        </Quotation>
                </div>
              </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Non-Emphasized Half-Width Quotation</h5>
                      <div className="bg-white p-4 rounded border">
              <Quotation
                          attribution="ICPSR User Research Participant"
                isEmphasized={false}
                          isFullWidth={false}
                accentColor={primaryColor}
              >
                          I've been using ICPSR for years, and I still get lost trying to find specific datasets. I often end up using Google to search for the dataset name and 'ICPSR' instead of using the site's search function.
              </Quotation>
                      </div>
                    </div>

<<<<<<< HEAD
            {/* Learnings Section - New Section */}
            <section ref={learningsRef} id="learnings" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-normal tracking-tight mb-6">Learnings</h2>
              <p className="text-gray-800 mb-6">
                Throughout this project, we gained valuable insights that will inform our approach to future work. Here
                are the key learnings from this experience:
              </p>
=======
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Non-Emphasized Full-Width Quotation</h5>
                      <div className="bg-white p-4 rounded border">
                        <Quotation 
                          attribution="ICPSR Technical Lead"
                          isEmphasized={false}
                          isFullWidth={true}
                          accentColor={primaryColor}
                        >
                          The design system has been a game-changer for our development team. We can now implement new features much more quickly and consistently, and the modular approach makes maintenance significantly easier.
                        </Quotation>
                  </div>
                </div>
              </div>
                </div>
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf

                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">Learning Component Variations</h4>
                  <p className="text-gray-700 mb-4">
                    Component for displaying key learnings and insights with different styling options.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Default Learning</h5>
                      <div className="bg-white p-4 rounded border">
                        <Learning summary="Component libraries improve development efficiency">
                          <p>
                            Component libraries improve development efficiency, documentation is as important as the code itself,
                            consistency leads to better user experience, and reusable components reduce maintenance overhead.
                          </p>
                        </Learning>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Learning with Custom Icon</h5>
                      <div className="bg-white p-4 rounded border">
              <Learning
                summary="User context is more important than feature completeness"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  We discovered that understanding the environment in which users operate was crucial to designing an
                  effective solution. By spending time observing users in their actual work context, we were able to
                  prioritize features that addressed real pain points rather than simply adding capabilities that seemed
                            valuable in isolation.
                </p>
              </Learning>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Learning with Custom Accent Color</h5>
                      <div className="bg-white p-4 rounded border">
              <Learning
                summary="Cross-functional collaboration leads to more innovative solutions"
                          accentColor="#d97944"
              >
                <p>
                  By involving engineers, product managers, and subject matter experts early in the design process, we
                  were able to identify technical constraints and business requirements that influenced our design
                  decisions. This collaborative approach not only resulted in a more feasible solution but also sparked
                            creative ideas that wouldn't have emerged from a siloed design process.
                </p>
              </Learning>
<<<<<<< HEAD

              {/* Learning 3 */}
              <Learning
                summary="Iterative testing reveals unexpected user behaviors and preferences"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  Our initial assumptions about how users would interact with certain features were often challenged
                  during testing. For example, we found that users preferred a more guided approach to complex tasks
                  than we had anticipated. By conducting multiple rounds of testing and being willing to pivot based on
                  feedback, we were able to refine the design to better match actual user behaviors. This iterative
                  approach, while requiring more time upfront, ultimately saved resources by ensuring we built the right
                  solution.
                </p>
              </Learning>
            </section>

            {/* Results Section */}
            <section ref={resultsRef} id="results" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Results</h2>
              <p className="text-gray-800 mb-4">
                This section presents the outcomes and impact of the project, including metrics, user feedback, and
                business results. It demonstrates the value of the design solution.
              </p>

              {/* Emphasized, Half-width Quotation */}
              <Quotation attribution="End User" isEmphasized={true} isFullWidth={false} accentColor={primaryColor}>
                The new system has completely transformed how I work. What used to take me hours now takes minutes, and
                I can focus on more important tasks.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src="/dx-capture.png" alt="Metric icon" width={48} height={48} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      45% INCREASE
=======
                      </div>
>>>>>>> 24d84734baacd3ca5b424b55b7ff04ae5849a8bf
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Interactive Components</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">SelectIteration</h4>
                  <p className="text-gray-700 mb-4">
                    Interactive component for selecting between different design iterations.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <SelectIteration options={iterationOptions} />
                  </div>
                </div>

                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">FilterCards</h4>
                  <p className="text-gray-700 mb-4">
                    Filterable card interface for showcasing different features or aspects. Supports custom accent colors and callback functions.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <FilterCards
                      options={filterOptions}
                      onFilterChange={handleFeatureFilterChange}
                accentColor={primaryColor}
                    />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p><strong>Features:</strong></p>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>Automatic state management with internal selected filter</li>
                      <li>Custom accent color support</li>
                      <li>Callback function for filter changes</li>
                      <li>Responsive grid layout</li>
                      <li>Hover and selection states</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">BeforeAfterSlider</h4>
                  <p className="text-gray-700 mb-4">
                    Interactive slider to compare before and after states.
                  </p>
                                     <div className="bg-white p-4 rounded border">
                     <BeforeAfterSlider
                       beforeImage="/algebraic-equation-solution.png"
                       afterImage="/modern-software-dashboard.png"
                       beforeAlt="Before redesign"
                       afterAlt="After redesign"
                       beforeLabel="Before"
                       afterLabel="After"
                     />
                   </div>
                </div>
              </div>

              {/* Timeline Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Timeline Components</h3>
                
                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">ProjectTimeline Variations</h4>
                  <p className="text-gray-700 mb-4">
                    Visual timeline component for displaying project milestones and phases with different layouts.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Single Row Timeline (Current)</h5>
                      <div className="bg-white p-4 rounded border">
                        <ProjectTimeline
                          phases={[
                            {
                              id: "research",
                              title: "Research",
                              description: "User interviews and market analysis",
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
                              endWeek: 2
                            },
                            {
                              id: "design",
                              title: "Design",
                              description: "Wireframes and prototypes",
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
                                </svg>
                              ),
                              startWeek: 3,
                              endWeek: 5
                            },
                            {
                              id: "development",
                              title: "Development",
                              description: "Implementation and testing",
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
                              startWeek: 6,
                              endWeek: 9
                            }
                          ]}
                          totalWeeks={9}
                          accentColor={primaryColor}
                        />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Multi-Row Timeline with Overlaps</h5>
                      <p className="text-xs text-gray-500 mb-2">
                        This variation shows how phases can overlap and be displayed in multiple rows for better visualization.
                      </p>
                      <div className="bg-white p-4 rounded border">
                        <div className="w-full overflow-x-auto pb-4">
                          <div className="min-w-[800px]">
                            {/* Week headers */}
                            <div className="grid border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-medium" style={{ gridTemplateColumns: "repeat(12, minmax(100px, 1fr))" }}>
                              {Array.from({ length: 12 }).map((_, index) => (
                                <div key={`week-${index + 1}`} className="py-3 px-4 border-r border-gray-200 last:border-r-0">
                                  Week {index + 1}
                                </div>
                              ))}
                            </div>

                            {/* Multi-row timeline content */}
                            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(12, minmax(100px, 1fr))" }}>
                              {/* Row 1: Research and Design phases */}
                              <div
                                className="rounded-lg border border-gray-200 p-4 transition-all"
                                style={{
                                  gridColumn: "1 / 4",
                                  backgroundColor: `${primaryColor}10`,
                                  borderColor: `${primaryColor}30`,
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${primaryColor}20` }}
                                  >
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
                  </div>
                  <div>
                                    <h3 className="font-medium text-gray-800 mb-1">Research</h3>
                                    <p className="text-xs text-gray-500">User interviews and analysis</p>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="rounded-lg border border-gray-200 p-4 transition-all"
                                style={{
                                  gridColumn: "3 / 7",
                                  backgroundColor: `${primaryColor}10`,
                                  borderColor: `${primaryColor}30`,
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${primaryColor}20` }}
                    >
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
                                    </svg>
                    </div>
                                  <div>
                                    <h3 className="font-medium text-gray-800 mb-1">Design</h3>
                                    <p className="text-xs text-gray-500">Wireframes and prototypes</p>
                                  </div>
                  </div>
                </div>

                              {/* Row 2: Development and Testing phases (overlapping with Design) */}
                              <div
                                className="rounded-lg border border-gray-200 p-4 transition-all"
                                style={{
                                  gridColumn: "6 / 10",
                                  backgroundColor: `${primaryColor}10`,
                                  borderColor: `${primaryColor}30`,
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${primaryColor}20` }}
                                  >
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
                  </div>
                  <div>
                                    <h3 className="font-medium text-gray-800 mb-1">Development</h3>
                                    <p className="text-xs text-gray-500">Implementation and testing</p>
                                  </div>
                                </div>
                              </div>

                              {/* Row 3: Launch and Iteration phases */}
                              <div
                                className="rounded-lg border border-gray-200 p-4 transition-all"
                                style={{
                                  gridColumn: "9 / 13",
                                  backgroundColor: `${primaryColor}10`,
                                  borderColor: `${primaryColor}30`,
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${primaryColor}20` }}
                    >
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
                                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                      <path d="m9 12 2 2 4-4" />
                                    </svg>
                    </div>
                                  <div>
                                    <h3 className="font-medium text-gray-800 mb-1">Launch</h3>
                                    <p className="text-xs text-gray-500">Deployment and iteration</p>
                  </div>
                </div>
              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p><strong>Key Features:</strong></p>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          <li>Phases can overlap in time (e.g., Design starts during Research)</li>
                          <li>Multiple rows allow for better visual organization</li>
                          <li>Shows realistic project timelines where phases don't always follow sequentially</li>
                          <li>Maintains the same styling and interaction patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Media Components</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">EnhancedLightbox</h4>
                  <p className="text-gray-700 mb-4">
                    Advanced lightbox component for image viewing with navigation.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">
                      EnhancedLightbox requires image selection to demonstrate. Used in pixel art gallery and other image-heavy pages.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">Lightbox</h4>
                  <p className="text-gray-700 mb-4">
                    Basic lightbox component for simple image viewing.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">
                      Lightbox requires image selection to demonstrate. Used for basic image viewing functionality.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">CompositeThumbnail</h4>
                  <p className="text-gray-700 mb-4">
                    Composite thumbnail component for displaying multiple images in a single thumbnail.
                  </p>
                                     <div className="bg-white p-4 rounded border">
                     <CompositeThumbnail
                       backgroundImage="/algebraic-equation-solution.png"
                       screenImage="/modern-software-dashboard.png"
                       alt="Component library example"
                       href="#"
                     />
                   </div>
                </div>
              </div>

              {/* Decorative Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Decorative Components</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">PixelDecoration Variations</h4>
                  <p className="text-gray-700 mb-4">
                    Pixel art decorative elements for visual enhancement with different types and positioning options.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Available Decoration Types</h5>
                      <div className="bg-white p-4 rounded border">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {([
                            "lightbulb", "speech-bubble-heart", "ghost", "diamond",
                            "pixel", "plus", "notification"
                          ] as const).map((type) => (
                            <div key={type} className="flex flex-col items-center p-2 border rounded">
                              <PixelDecoration type={type} size={32} />
                              <span className="text-xs text-gray-500 mt-1">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Positioned Decorations</h5>
                      <div className="bg-white p-4 rounded border relative h-32">
                        <PixelDecoration type="lightbulb" size={32} top="10px" left="10px" />
                        <PixelDecoration type="diamond" size={24} top="20px" right="20px" />
                        <PixelDecoration type="ghost" size={28} bottom="10px" left="50%" />
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                          Hover over decorations to see interaction
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Different Sizes</h5>
                      <div className="bg-white p-4 rounded border">
                        <div className="flex items-center gap-4">
                          <PixelDecoration type="lightbulb" size={24} />
                          <PixelDecoration type="lightbulb" size={32} />
                          <PixelDecoration type="lightbulb" size={48} />
                          <PixelDecoration type="lightbulb" size={64} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">HeartSpeechBubble</h4>
                  <p className="text-gray-700 mb-4">
                    Animated heart speech bubble for interactive feedback.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <HeartSpeechBubble />
                  </div>
                </div>
              </div>

              {/* Utility Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Utility Components</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">PasswordProtection</h4>
                  <p className="text-gray-700 mb-4">
                    Password protection component for sensitive case studies.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">
                      PasswordProtection is used in the 3M case study. It requires authentication to view protected content.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">ClientOnly</h4>
                  <p className="text-gray-700 mb-4">
                    Wrapper component to ensure client-side only rendering.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">
                      ClientOnly is used to wrap components that require client-side functionality like localStorage access.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-4">PageTransition</h4>
                  <p className="text-gray-700 mb-4">
                    Page transition component for smooth navigation between pages.
                  </p>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm text-gray-500 italic">
                      PageTransition provides smooth animations when navigating between pages.
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Usage Patterns */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Component Usage Patterns</h3>
                <p className="text-gray-700 mb-6">
                  Common patterns and best practices for using components across case study pages.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Section Structure Pattern</h4>
                    <p className="text-gray-700 mb-4">
                      Most case study sections follow this consistent structure:
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <pre className="text-sm text-gray-600 overflow-x-auto">
{`<section ref={sectionRef} id="section-name" className="scroll-mt-24">
  <div className="section-header">
    <div className="section-content relative z-10">
      <div className="section-subtitle mb-2 text-left">
        <span className="uppercase">Section Title</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
        Section Heading
      </h2>
    </div>
  </div>
  <p className="text-gray-800 mb-6">
    Section content...
  </p>
  {/* Component examples */}
            </section>
<hr className="border-t border-gray-200 my-16 section-divider" />`}
                      </pre>
          </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Color Context Integration</h4>
                    <p className="text-gray-700 mb-4">
                      Components automatically adapt to the current tab context using the color context:
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded" style={{ backgroundColor: "#f0f9ff" }}>
                          <h5 className="font-medium mb-2">Product Design</h5>
                          <p className="text-sm text-gray-600">Teal accent (#22A3B4)</p>
                        </div>
                        <div className="text-center p-4 rounded" style={{ backgroundColor: "#fdf0e6" }}>
                          <h5 className="font-medium mb-2">UX Research</h5>
                          <p className="text-sm text-gray-600">Orange accent (#d97944)</p>
                        </div>
                        <div className="text-center p-4 rounded" style={{ backgroundColor: "#e6e9fd" }}>
                          <h5 className="font-medium mb-2">UI Engineering</h5>
                          <p className="text-sm text-gray-600">Purple accent (#4e3380)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Component Composition</h4>
                    <p className="text-gray-700 mb-4">
                      Common component combinations used throughout case studies:
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li><strong>InfoCardGroup + Quotation:</strong> Overview sections often combine info cards with emphasized quotations</li>
                        <li><strong>KeyInsight + Learning:</strong> Results sections use key insights followed by detailed learnings</li>
                        <li><strong>ProjectTimeline + FilterCards:</strong> Process sections combine timeline with feature filtering</li>
                        <li><strong>BeforeAfterSlider + SelectIteration:</strong> Solution sections show design evolution</li>
                        <li><strong>PixelDecoration + Content:</strong> Decorative elements enhance content sections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI Components */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">UI Components (shadcn/ui)</h3>
                <p className="text-gray-700 mb-6">
                  The portfolio also uses shadcn/ui components located in <code className="bg-gray-100 px-2 py-1 rounded">components/ui/</code>.
                  These include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Button", "Card", "Dialog", "Dropdown Menu",
                    "Form", "Input", "Label", "Select",
                    "Tabs", "Toast", "Tooltip", "Badge",
                    "Avatar", "Alert", "Progress", "Slider"
                  ].map((component) => (
                    <div key={component} className="bg-gray-100 p-3 rounded text-center text-sm">
                      {component}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Side Navigation */}
          <div className="hidden lg:block">
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
