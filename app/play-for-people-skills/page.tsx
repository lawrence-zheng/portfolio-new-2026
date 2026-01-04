"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import { useState, useRef } from "react"
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
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

export default function PlayForPeopleSkillsProject() {
  const [activeSection, setActiveSection] = useState<string>("overview")
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
  const learningsRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const finalDesignRef = useRef<HTMLDivElement>(null)

  // Track scroll position to update active section in side nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { ref: overviewRef, id: "overview" },
        { ref: problemRef, id: "problem" },
        { ref: processRef, id: "process" },
        { ref: solutionRef, id: "solution" },
        { ref: learningsRef, id: "learnings" },
        { ref: resultsRef, id: "results" },
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

  // Sample skills for the project
  const skills = ["UX Research", "UI Design", "Gamification", "User Testing", "Prototyping"]

  // Timeline phases data
  const timelinePhases = [
    {
      id: "phase1",
      title: "Research & Discovery",
      description: "User interviews and competitive analysis",
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
      title: "Design & Prototyping",
      description: "Wireframes and interactive prototypes",
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
      endWeek: 6,
    },
    {
      id: "phase3",
      title: "Development & Testing",
      description: "Implementation and user testing",
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
      endWeek: 9,
    },
    {
      id: "phase4",
      title: "Launch & Iteration",
      description: "Deployment and continuous improvement",
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
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      startWeek: 9,
      endWeek: 12,
    },
  ]

  // Sample iteration options for the SelectIteration component
  const iterationOptions = [
    {
      id: "iteration1",
      label: "Initial Concept",
      image: "/social-game-mockup.png",
      description:
        "Early wireframes focused on core gamification mechanics and basic scenario structure. The goal was to validate the fundamental learning approach.",
    },
    {
      id: "iteration2",
      label: "Refined Design",
      image: "/modern-software-dashboard.png",
      description:
        "Enhanced visual design with improved user flow and clearer feedback mechanisms. Added social features and progress tracking.",
    },
    {
      id: "final",
      label: "Final Platform",
      image: "/algebraic-equation-solution.png",
      description:
        "Polished design with complete feature set, refined gamification elements, and optimized user experience based on extensive testing.",
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
        "Conducted 25 user interviews with professionals across industries to understand soft skills training pain points and opportunities.",
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
        "Created 40+ wireframes and 8 interactive prototypes, iterating based on continuous user feedback and gamification principles.",
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
        "Built a full-stack platform with React, Next.js, and real-time collaboration features for interactive learning scenarios.",
    },
  ]

  // Sample filter options data
  const filterOptions = [
    {
      id: "all",
      title: "All Features",
      description: "Complete platform overview",
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
      id: "gamification",
      title: "Gamification",
      description: "Points, badges, and progress tracking",
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
    {
      id: "scenarios",
      title: "Interactive Scenarios",
      description: "Real-world situation simulations",
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
                  src="/play_for_people_skills.svg"
                  alt="Play for People Skills logo"
                  width={240}
                  height={64}
                  className="h-16 w-auto"
                />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight text-black normal-case">
                Gamifying soft skills development
              </h2>
              <p className="text-gray-700 text-xl">
                Creating an engaging platform that transforms traditional soft skills training into interactive, 
                game-like experiences that actually stick
              </p>

              {/* High-level Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Project Overview</h3>
                    <p className="text-gray-600 text-sm">
                      A gamified learning platform that helps professionals develop essential soft skills through 
                      interactive scenarios, real-time feedback, and social learning.
                    </p>
            </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">My Role</h3>
                    <p className="text-gray-600 text-sm">
                      Lead UX Designer responsible for research, gamification strategy, and end-to-end design
                    </p>
          </div>
        </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-gray-600 text-sm">12 weeks (2023)</p>
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
                  src="/social-game-mockup.png"
                  alt="Play for People Skills platform interface showing gamified learning scenarios"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Final Design Preview Section */}
      <div
        ref={finalDesignRef}
        id="final-design-preview"
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16"
        style={{ backgroundColor: getBackgroundGradient() }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-xl font-medium text-gray-600 mb-8"
            style={{ textTransform: "none", letterSpacing: "-0.025em" }}
          >
            A preview of the final design...
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
                  <div className="metric-value">85%</div>
                  <div className="metric-label">Increase in Completion Rates</div>
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
                  <div className="metric-value">67%</div>
                  <div className="metric-label">Skill Retention After 90 Days</div>
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
                  <div className="metric-value">92%</div>
                  <div className="metric-label">User Satisfaction Score</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Image
              src="/social-game-mockup.png"
              alt="Play for People Skills platform interface showing gamified learning scenarios"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200 shadow-lg"
            />
            <Image
              src="/modern-software-dashboard.png"
              alt="Interactive scenario interface with branching storylines"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200 shadow-lg"
            />
            <Image
              src="/algebraic-equation-solution.png"
              alt="Progress tracking and gamification elements"
              width={800}
              height={600}
              className="w-full rounded-lg border border-gray-200 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-5 space-y-16">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="scroll-mt-24">
            <div className="section-header">
              <div className="section-content relative z-10">
                <div className="section-subtitle mb-2 text-left">
                  <span className="uppercase">Overview</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Transforming soft skills training through gamification
                </h2>
              </div>
            </div>
            <p className="text-gray-800 mb-6">
                Traditional soft skills training often fails to engage learners and provide practical application. 
                Play for People Skills addresses this by creating an immersive, game-like environment where users 
                practice communication, leadership, and collaboration skills through realistic scenarios.
              </p>

              {/* Info Cards Group */}
              <InfoCardGroup cards={infoCards} />

              {/* Emphasized Quotation */}
              <Quotation
                attribution="HR Director, Fortune 500 Company"
                isEmphasized={true}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                This platform has completely changed how we approach soft skills training. Our employees are actually 
                excited to practice these skills, and we're seeing measurable improvements in team collaboration.
              </Quotation>

              {/* Key Insight */}
              <div className="my-12">
                <KeyInsight>
                  By combining gamification mechanics with realistic workplace scenarios, we created a learning 
                  experience that increased engagement by 85% compared to traditional training methods.
                </KeyInsight>
              </div>
          </section>
          <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Problem Section */}
            <section ref={problemRef} id="problem" className="scroll-mt-24">
            <div className="section-header">
              <div className="section-content relative z-10">
                <div className="section-subtitle mb-2 text-left">
                  <span className="uppercase">Challenge</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Traditional training fails to engage and stick
                </h2>
              </div>
            </div>
            <p className="text-gray-800 mb-6">
                Soft skills training has long been plagued by low engagement and poor retention. Traditional 
                methods like lectures and role-playing exercises often feel disconnected from real work situations.
              </p>

              {/* Non-emphasized Quotation */}
              <Quotation
                attribution="Learning & Development Manager"
                isEmphasized={false}
                isFullWidth={false}
                accentColor={primaryColor}
              >
                We've tried everything—workshops, online courses, coaching. But nothing seems to stick. People 
                complete the training but don't apply the skills in their daily work.
              </Quotation>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Low Engagement</h3>
                  <p className="text-red-700 text-sm">
                    Only 23% of employees complete traditional soft skills training programs
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Poor Retention</h3>
                  <p className="text-red-700 text-sm">
                    Skills learned in training are forgotten within 30 days
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">No Application</h3>
                  <p className="text-red-700 text-sm">
                    Learners struggle to apply concepts to real workplace situations
                  </p>
                </div>
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
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    User-centered design through iterative development
                </h2>
              </div>
            </div>
            <p className="text-gray-800 mb-6">
                We followed a comprehensive design process that prioritized user research, rapid prototyping, 
                and continuous testing to create an engaging learning experience.
              </p>

              {/* Timeline Component */}
              <div className="my-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Project Timeline</h3>
                <div className="overflow-hidden">
                  <ProjectTimeline phases={timelinePhases} totalWeeks={12} accentColor={primaryColor} />
                </div>
              </div>

              <p className="text-gray-800 mb-4">
                The process began with extensive user research to understand how professionals learn and apply 
                soft skills. We discovered that people learn best through practice and immediate feedback, 
                which became the foundation of our gamification strategy.
              </p>

              {/* Another Key Insight */}
              <div className="my-12">
                <KeyInsight>
                  Through iterative testing, we found that scenario-based learning with immediate feedback 
                  increased skill retention by 67% compared to traditional methods.
                </KeyInsight>
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
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 text-left normal-case">
                    Interactive platform with gamified learning mechanics
                </h2>
              </div>
            </div>
            <p className="text-gray-800 mb-6">
                Play for People Skills combines realistic workplace scenarios with game mechanics like points, 
                badges, and progress tracking to create an engaging learning experience.
              </p>

              {/* FilterCards component */}
              <div className="my-8">
                <h3 className="text-lg font-medium mb-4">Platform Features</h3>
                <FilterCards
                  options={filterOptions}
                  onFilterChange={handleFeatureFilterChange}
                  accentColor={primaryColor}
                />

                {/* Content that changes based on selected filter */}
                <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  {selectedFeatureFilter === "all" && (
                    <div>
                      <h4 className="font-medium mb-2">Complete Learning Experience</h4>
                      <p className="text-gray-700">
                        The platform provides a comprehensive soft skills development environment with interactive 
                        scenarios, social learning features, and detailed progress tracking.
                      </p>
                    </div>
                  )}

                  {selectedFeatureFilter === "gamification" && (
                    <div>
                      <h4 className="font-medium mb-2">Gamification Elements</h4>
                      <p className="text-gray-700">
                        Points, badges, leaderboards, and progress bars motivate users to continue learning and 
                        provide clear feedback on their development journey.
                      </p>
                    </div>
                  )}

                  {selectedFeatureFilter === "scenarios" && (
                    <div>
                      <h4 className="font-medium mb-2">Interactive Scenarios</h4>
                      <p className="text-gray-700">
                        Real-world workplace situations allow users to practice skills in context, with branching 
                        storylines based on their choices and immediate feedback.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Select Iteration Component */}
              <div className="my-8">
                <h3 className="text-lg font-medium mb-4">Design Evolution</h3>
                <SelectIteration options={iterationOptions} accentColor={primaryColor} />
              </div>

              {/* Before/After Slider Component */}
              <div className="my-8">
                <h3 className="text-lg font-medium mb-4">Before & After Comparison</h3>
                <BeforeAfterSlider
                  beforeImage="/algebraic-equation-solution.png"
                  afterImage="/modern-software-dashboard.png"
                  beforeAlt="Traditional training interface"
                  afterAlt="Gamified learning platform"
                  beforeLabel="Traditional"
                  afterLabel="Gamified"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Drag the slider to compare traditional training methods with our gamified approach
                </p>
              </div>

              {/* Non-emphasized, Full-width Quotation */}
              <Quotation
                attribution="UX Researcher"
                isEmphasized={false}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                The gamification elements make learning feel like play, but the scenarios are grounded in real 
                workplace challenges. This combination creates an experience that's both engaging and practical.
              </Quotation>
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
                    Key insights from the development process
                </h2>
              </div>
            </div>
            <p className="text-gray-800 mb-6">
                Throughout the development of Play for People Skills, we gained valuable insights about 
                gamification, user engagement, and effective learning design.
              </p>

              {/* Learning 1 */}
              <Learning
                summary="Gamification must serve learning objectives, not distract from them"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  We initially added too many game elements that were fun but didn't contribute to learning. 
                  Through testing, we learned to focus on mechanics that directly support skill development, 
                  such as immediate feedback and progressive difficulty.
                </p>
              </Learning>

              {/* Learning 2 */}
              <Learning
                summary="Social learning amplifies individual progress"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  Adding collaborative features like peer feedback and group challenges significantly increased 
                  engagement and learning outcomes. Users were more motivated when they could learn from and 
                  compete with colleagues.
                </p>
              </Learning>

              {/* Learning 3 */}
              <Learning
                summary="Scenario realism is crucial for skill transfer"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  Users reported that scenarios needed to feel authentic to their work environment to be effective. 
                  We invested heavily in research to create situations that resonated with different industries 
                  and roles.
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
                    Measurable impact on learning and engagement
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                The platform launched successfully and has demonstrated significant improvements in user 
                engagement, skill development, and organizational outcomes.
              </p>

              {/* Emphasized, Half-width Quotation */}
              <Quotation
                attribution="Chief Learning Officer"
                isEmphasized={true}
                isFullWidth={false}
                accentColor={primaryColor}
              >
                We've seen a complete transformation in how our employees approach soft skills development. 
                The platform has become a key part of our learning culture.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Quantitative metrics showed impressive improvements across all key performance indicators:
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
                      85% INCREASE
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">IN COMPLETION RATES</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src="/net-promoter-score.png" alt="Metric icon" width={48} height={48} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      67% RETENTION
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">SKILL RETENTION AFTER 90 DAYS</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    92%
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">User Satisfaction</div>
                  <div className="font-medium">Net Promoter Score</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Users highly recommend the platform to colleagues
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    3.2x
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">More Engagement</div>
                  <div className="font-medium">Time Spent Learning</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Users spend significantly more time practicing skills
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                    78%
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Skill Application</div>
                  <div className="font-medium">Real-world Usage</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Users report applying skills in their daily work
                  </p>
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
