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
import { useColorContext } from "@/context/color-context"
import PasswordProtection from "@/components/password-protection"
import { WIP_CASE_STUDY_MESSAGE, WIP_CASE_STUDY_PASSWORD } from "@/lib/case-study-access"
import "@/styles/case-study.css"

function IcpsrProject() {
  // Use the color context
  const { primaryColor, activeTab } = useColorContext()
  const [activeSection, setActiveSection] = useState<string>("overview")

  // Dynamic styles for color-dependent elements
  const dynamicStyles = `
  em {
    color: ${primaryColor};
  }
`

  // Sample skills for the project
  const skills = ["UX Research", "UI Design", "Information Architecture", "Design Systems", "Usability Testing"]

  // Sample iteration options for the SelectIteration component
  const iterationOptions = [
    {
      id: "iteration1",
      label: "Original Design",
      image: "/icpsr-mockup.png",
      description:
        "The original design had a complex interface with multiple search options and filters that were difficult to navigate. Users reported spending significant time trying to find relevant datasets.",
    },
    {
      id: "iteration2",
      label: "Wireframes",
      image: "/algebraic-equation-solution.png", // Placeholder - would be replaced with actual wireframes
      description:
        "Initial wireframes focused on simplifying the search interface and improving information hierarchy. We tested multiple navigation patterns to find the most intuitive approach.",
    },
    {
      id: "final",
      label: "Final Design",
      image: "/icpsr-desktop-mockup.jpg",
      description:
        "The final design features a streamlined search experience with clear categorization, prominent statistics, and improved filtering options. The new design reduced search time by an average of 8 minutes per session.",
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
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      subtitle: "Challenge",
      content:
        "Researchers were spending too much time navigating a complex interface to find relevant datasets, with many abandoning their search before finding what they needed.",
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      subtitle: "Approach",
      content:
        "We conducted extensive user research with social science researchers to understand their mental models and search patterns, then redesigned the interface to match their workflow.",
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      subtitle: "Outcome",
      content:
        "The redesigned interface reduced search time by 60%, increased user satisfaction scores by 45%, and resulted in a 78 Net Promoter Score from researchers.",
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
      id: "search",
      title: "Search Experience",
      description: "Improved search and filtering capabilities",
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
    },
    {
      id: "visualization",
      title: "Data Visualization",
      description: "Interactive charts and data previews",
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
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
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

  // Timeline phases data
  const timelinePhases = [
    {
      id: "phase1",
      title: "Research & Discovery",
      description: "User interviews, competitive analysis, and stakeholder alignment",
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
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      startWeek: 1,
      endWeek: 3,
    },
    {
      id: "phase2",
      title: "Information Architecture",
      description: "Card sorting, site mapping, and content organization",
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
      startWeek: 3,
      endWeek: 5,
    },
    {
      id: "phase3",
      title: "Design & Prototyping",
      description: "Wireframes, visual design, and interactive prototypes",
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
          <path d="M3 3v18h18"></path>
          <path d="M18 17V9"></path>
          <path d="M13 17V5"></path>
          <path d="M8 17v-3" />
        </svg>
      ),
      startWeek: 5,
      endWeek: 8,
    },
    {
      id: "phase4",
      title: "Testing & Refinement",
      description: "Usability testing, iterations, and final polish",
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      startWeek: 8,
      endWeek: 10,
    },
  ]

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
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
        top: ref.current.offsetTop - 80, // Offset for header
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  // If still loading, show a minimal placeholder to prevent layout shift
  const getBackgroundGradient = () => {
    switch (activeTab) {
      case "ux-research":
        return "linear-gradient(to bottom, #fdf0e6, white)"
      case "ui-engineering":
        return "linear-gradient(to bottom, #e6e9fd, white)"
      default:
        return "linear-gradient(to bottom, #f0f9ff, white)" // Teal gradient for product design
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>
        {dynamicStyles}
      </style>
      {/* Use the consistent Navbar component */}
      <Navbar />

      {/* Project Header Section with Centered Image */}
      <section
        className="pt-16 border-b border-gray-200 transition-all duration-500"
        style={{
          background: getBackgroundGradient(),
        }}
      >
        {/* Centered project image with max-width matching the text sections */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="aspect-[21:9] relative overflow-hidden h-[300px]">
            <Image
              src="/icpsr-desktop-mockup.jpg"
              alt="ICPSR search interface redesign showing the Find Data page with search functionality and dataset listings"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Project info below the image - updated to match the screenshot */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Centered logo and title */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-6 mb-4">
              <Image src="/icpsr_logo.svg" alt="ICPSR logo" width={90} height={24} className="h-6 w-auto" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-normal uppercase tracking-tight leading-tight text-center">
              Modernizing a Search Page to Increase Efficiency by 60%
            </h1>
          </div>

          {/* 3-column layout for project details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column: My Role, Timeframe, Skills Used */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">My Role</h3>
                <p className="font-medium">Lead UX Designer</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Timeframe</h3>
                <p className="font-medium">Mar 2022 - Aug 2022</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Skills Used</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle column: Summary */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Summary</h3>
              <p className="text-gray-800">
                I revamped the UX and built a modern design system for the world's largest collection of social science
                data, enabling researchers to more efficiently find and discover key information. The redesign
                <em> reduced search time by 8 minutes</em> on average and significantly improved user satisfaction.
              </p>
            </div>

            {/* Right column: What makes this project special to me? */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                What makes this project special to me?
              </h3>
              <p className="text-gray-700">
                This project was particularly meaningful because it directly impacted the research capabilities of
                thousands of social scientists worldwide. By improving the search experience, we helped researchers
                spend less time searching for data and more time analyzing it, ultimately accelerating scientific
                discovery. The challenge of balancing complex search functionality with usability pushed me to develop
                innovative solutions that respected both user needs and technical constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Side Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-5 space-y-32">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="scroll-mt-24">
              <h2 className="text-2xl font-sans font-bold uppercase tracking-tight mb-6">Overview</h2>
              <p className="text-gray-800 mb-4">
                ICPSR (Inter-university Consortium for Political and Social Research) is the world's largest archive of
                digital social science data, with over 14,000 studies and 5.5 million variables. Researchers worldwide
                rely on ICPSR to find data for their studies, but the existing search interface was outdated and
                difficult to navigate, causing frustration and wasted time.
              </p>

              {/* Info Cards Group */}
              <InfoCardGroup cards={infoCards} accentColor={primaryColor} />

              {/* Emphasized, Full-width Quotation */}
              <Quotation
                attribution="Dr. Sarah Johnson, Professor of Sociology at University of Michigan"
                isEmphasized={true}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                The new search interface has transformed how I find data for my research. What used to take me 15-20
                minutes now takes just a few clicks. It's intuitive, fast, and actually makes discovering new datasets
                enjoyable.
              </Quotation>

              <p className="text-gray-800 mb-4">
                My goal was to redesign the search experience to be more intuitive and efficient, allowing researchers
                to quickly find relevant datasets and spend more time on their actual research. The project involved
                extensive user research, information architecture restructuring, and the development of a comprehensive
                design system that could be applied across the entire platform.
              </p>

              {/* Key Insight Component */}
              <div className="my-12">
                <KeyInsight activeTab={activeTab}>
                  By focusing on researchers' mental models and search patterns, we created an interface that reduced
                  search time by 60% and increased user satisfaction by 45%.
                </KeyInsight>
              </div>
            </section>

            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Problem Section */}
            <section ref={problemRef} id="problem" className="scroll-mt-24">
              <h2 className="text-2xl font-sans font-bold uppercase tracking-tight mb-6">Problem</h2>
              <p className="text-gray-800 mb-4">
                The existing ICPSR search interface had several critical issues that were impeding researchers' ability
                to efficiently find data:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-800">
                <li>Complex, overwhelming interface with too many options and filters presented simultaneously</li>
                <li>Inconsistent information architecture that didn't match researchers' mental models</li>
                <li>Poor search relevance that often buried the most relevant results</li>
                <li>Lack of visual hierarchy making it difficult to scan and evaluate results quickly</li>
                <li>Outdated design that didn't reflect the organization's position as a leader in data archiving</li>
              </ul>

              {/* Non-emphasized, Half-width Quotation */}
              <Quotation
                attribution="ICPSR User Research Participant"
                isEmphasized={false}
                isFullWidth={false}
                accentColor={primaryColor}
              >
                I've been using ICPSR for years, and I still get lost trying to find specific datasets. I often end up
                using Google to search for the dataset name and 'ICPSR' instead of using the site's search function.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Our user research revealed that researchers were spending an average of 12 minutes per search session,
                with many abandoning their search before finding what they needed. This was particularly problematic for
                new users who weren't familiar with ICPSR's terminology and data organization. The frustration was
                leading some researchers to seek alternative data sources, despite ICPSR having the most comprehensive
                collection.
              </p>
              <div className="my-8">
                <h3 className="text-lg font-medium mb-4">Competitor Analysis</h3>
                <p className="text-gray-700 mb-4">
                  We conducted a thorough analysis of competing research data platforms to understand their strengths
                  and weaknesses, which informed our redesign approach:
                </p>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="w-[15%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Platform
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Ease of use
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Synonym identification
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Breadcrumb trails
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Information in search page
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Citation creation
                        </th>
                        <th className="w-[17%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Filter options
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* GESIS */}
                      <tr>
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">GESIS</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Easy, but not all pages translate well to English
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">No</td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">Yes</td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Top 10 results, 1-2 sentences
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Yes, multiple formats
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 bg-green-50">Easy</td>
                      </tr>

                      {/* Elsevier */}
                      <tr>
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">Elsevier</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">
                          Hard to use, information locked behind paywall
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-yellow-50">
                          No, will return similarly spelled words
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">No</td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Top 20 results, 1-2 sentences
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">No</td>
                        <td className="px-4 py-4 text-sm text-gray-700 bg-red-50">Difficult</td>
                      </tr>

                      {/* Google Scholar */}
                      <tr>
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">Google Scholar</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Easy to use, familiarity from Google interface
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-yellow-50">
                          No, but gives "related search" option
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">No</td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Top 10 results, 1-2 sentences
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          Yes, multiple formats
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 bg-yellow-50">Medium</td>
                      </tr>

                      {/* Harvard Dataverse */}
                      <tr>
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">Harvard Dataverse</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-yellow-50">
                          Relatively simple, but information can be dense
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-red-50">
                          <div className="flex items-center">
                            <span className="text-red-600 mr-1.5">✗</span>
                            No
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-yellow-50">
                          <div className="flex items-center">
                            <span className="text-amber-500 mr-1.5">⚠️</span>
                            Minimal
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-green-50">
                          <div className="flex items-center">
                            <span className="text-green-600 mr-1.5">✓</span>
                            Top 10 results, 1-2 sentences
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 bg-yellow-50">
                          <div className="flex items-center">
                            <span className="text-amber-500 mr-1.5">⚠️</span>
                            Yes, however no way to select format
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 bg-green-50">
                          <div className="flex items-center">
                            <span className="text-green-600 mr-1.5">✓</span>
                            Easy
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This analysis revealed that while competitors had strengths in certain areas, none provided a
                  comprehensive solution that balanced ease of use with powerful research capabilities.
                </p>
              </div>
              <div className="my-8 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src="/problem-analysis-diagram.png"
                  alt="Problem analysis diagram showing pain points in the search process"
                  width={800}
                  height={400}
                  className="w-full"
                />
              </div>
            </section>

            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Process Section */}
            <section ref={processRef} id="process" className="scroll-mt-24">
              <h2 className="text-2xl font-sans font-bold uppercase tracking-tight mb-6">Process</h2>
              <p className="text-gray-800 mb-4">
                To address these challenges, I led a comprehensive redesign process that included:
              </p>

              {/* Timeline Component */}
              <div className="my-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Project Timeline</h3>
                <div className="overflow-hidden">
                  <ProjectTimeline phases={timelinePhases} totalWeeks={10} accentColor={primaryColor} />
                </div>
              </div>

              <p className="text-gray-800 mb-4">
                The process began with extensive user research to understand how researchers approached data discovery.
                We conducted 18 interviews with researchers across different disciplines and experience levels, analyzed
                search logs, and ran card sorting exercises to understand how users categorized and thought about data.
              </p>

              <p className="text-gray-800 mb-4">
                Based on our research findings, we developed a new information architecture that aligned with
                researchers' mental models. We created wireframes and prototypes that were tested with users, iterating
                based on their feedback. The final design was implemented as part of a new design system that could be
                applied consistently across the platform.
              </p>

              <div className="my-8 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src="/circular-design-workflow.png"
                  alt="Design process workflow showing the iterative approach"
                  width={800}
                  height={400}
                  className="w-full"
                />
              </div>

              {/* Another Key Insight */}
              <div className="my-12">
                <KeyInsight activeTab={activeTab}>
                  Card sorting exercises revealed that researchers categorized data differently than how the system was
                  organized. Aligning the interface with users' mental models was key to improving findability.
                </KeyInsight>
              </div>
            </section>

            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Solution Section */}
            <section ref={solutionRef} id="solution" className="scroll-mt-24">
              <h2 className="text-2xl font-sans font-bold uppercase tracking-tight mb-6">Solution</h2>
              <p className="text-gray-800 mb-4">
                The redesigned search interface addressed the key pain points while maintaining the depth and
                comprehensiveness that made ICPSR valuable to researchers. Key features included:
              </p>

              {/* FilterCards component */}
              <div className="my-8">
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                <FilterCards
                  options={filterOptions}
                  accentColor={primaryColor}
                  onFilterChange={handleFeatureFilterChange}
                  defaultSelected="all"
                />

                {/* Content that changes based on selected filter */}
                <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  {selectedFeatureFilter === "all" && (
                    <div>
                      <h4 className="font-medium mb-2">Complete Solution</h4>
                      <p className="text-gray-700">
                        The redesigned interface features a streamlined search experience with clear categorization,
                        prominent statistics, improved filtering options, and interactive data previews. The design
                        balances simplicity for new users with powerful tools for experienced researchers.
                      </p>
                    </div>
                  )}

                  {selectedFeatureFilter === "search" && (
                    <div>
                      <h4 className="font-medium mb-2">Enhanced Search Experience</h4>
                      <p className="text-gray-700">
                        The new search functionality includes type-ahead suggestions, faceted filtering, saved searches,
                        and improved relevance ranking. Users can easily narrow results by topic, date range, or data
                        type, with filters that dynamically update to show only relevant options based on the current
                        result set.
                      </p>
                    </div>
                  )}

                  {selectedFeatureFilter === "visualization" && (
                    <div>
                      <h4 className="font-medium mb-2">Data Visualization</h4>
                      <p className="text-gray-700">
                        Interactive charts and data previews allow researchers to quickly assess dataset relevance
                        without downloading files. Users can explore key variables, view sample data, and understand
                        dataset structure directly in the search results, saving valuable time in the research process.
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
                  beforeImage="/icpsr-mockup.png"
                  afterImage="/icpsr-desktop-mockup.jpg"
                  beforeAlt="Original ICPSR search interface"
                  afterAlt="Redesigned ICPSR search interface"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Drag the slider to compare the before and after versions of the interface
                </p>
              </div>

              <p className="text-gray-800 mb-4">
                The redesigned interface prioritizes the most common search patterns while still providing access to
                advanced functionality for power users. We implemented a progressive disclosure approach that presents
                basic options first, with more advanced options available when needed. This approach significantly
                reduced cognitive load while maintaining the depth that researchers valued.
              </p>

              <p className="text-gray-800 mb-4">
                We also developed a comprehensive design system that ensured consistency across the platform and made
                future updates more efficient. The system included a component library, color palette, typography
                guidelines, and interaction patterns that could be applied to other parts of the ICPSR website.
              </p>

              {/* Non-emphasized, Full-width Quotation */}
              <Quotation
                attribution="ICPSR Technical Lead"
                isEmphasized={false}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                The design system has been a game-changer for our development team. We can now implement new features
                much more quickly and consistently, and the modular approach makes maintenance significantly easier.
              </Quotation>
            </section>

            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Learnings Section */}
            <section ref={learningsRef} id="learnings" className="scroll-mt-24">
              <h2 className="text-2xl font-sans font-bold tracking-tight mb-6">Learnings</h2>
              <p className="text-gray-800 mb-6">
                This project provided valuable insights that have influenced my approach to design:
              </p>

              {/* Learning 1 */}
              <Learning
                summary="Domain expertise is crucial for specialized interfaces"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  Working with social science researchers taught me the importance of deeply understanding the domain
                  before attempting to redesign specialized tools. By immersing myself in their terminology, workflows,
                  and research methods, I was able to design an interface that truly supported their needs rather than
                  imposing generic search patterns that wouldn't have addressed their specific challenges.
                </p>
              </Learning>

              {/* Learning 2 */}
              <Learning
                summary="Balance simplicity with power for expert users"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  One of the biggest challenges was creating an interface that was approachable for new users while
                  still providing the advanced functionality that experienced researchers needed. The progressive
                  disclosure approach we implemented—showing basic options first with advanced features available when
                  needed—proved to be an effective solution that satisfied both user groups without compromising on
                  capability.
                </p>
              </Learning>

              {/* Learning 3 */}
              <Learning
                summary="Design systems create long-term value beyond the immediate project"
                accentColor={primaryColor}
                icon={
                  <div className="flex items-center justify-center">
                    <Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} />
                  </div>
                }
              >
                <p>
                  Developing a comprehensive design system alongside the search interface redesign created value that
                  extended far beyond this specific project. The system not only ensured consistency across the platform
                  but also significantly reduced the time and effort required for future updates. This experience
                  reinforced the importance of thinking holistically about design solutions rather than focusing solely
                  on immediate deliverables.
                </p>
              </Learning>
            </section>

            {/* Results Section */}
            <section ref={resultsRef} id="results" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-normal uppercase tracking-tight mb-6">Results</h2>
              <p className="text-gray-800 mb-4">
                The redesigned search interface launched in August 2022 and has had a significant positive impact on
                ICPSR's user experience and business metrics:
              </p>

              {/* Emphasized, Half-width Quotation */}
              <Quotation
                attribution="ICPSR Director"
                isEmphasized={true}
                isFullWidth={false}
                accentColor={primaryColor}
              >
                The search redesign has been transformative for our users. We've seen a dramatic increase in user
                satisfaction and engagement, with researchers spending more time exploring our collections and less time
                struggling with the interface.
              </Quotation>

              <p className="text-gray-800 mb-4">
                Quantitative metrics showed impressive improvements across all key performance indicators:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src="/search.png" alt="Search time icon" width={48} height={48} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      8 MINS SAVED
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">
                      ON AVERAGE PER SEARCH
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src="/net-promoter-score.png" alt="NPS icon" width={48} height={48} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      78 NPS
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">
                      UP FROM 32 BEFORE REDESIGN
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
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
                      className="text-gray-600"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      45% INCREASE
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">IN USER SATISFACTION</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
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
                      className="text-gray-600"
                    >
                      <path d="M12 20V10"></path>
                      <path d="M18 20V4"></path>
                      <path d="M6 20v-6"></path>
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-sans font-bold transition-colors duration-500"
                      style={{ color: primaryColor }}
                    >
                      32% INCREASE
                    </div>
                    <div className="text-gray-500 uppercase text-xs tracking-wider font-sans">IN DATASET DOWNLOADS</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mt-8 mb-4">
                Beyond the metrics, the project has had a lasting impact on how ICPSR approaches design. The design
                system we developed has been applied to other parts of the platform, creating a more cohesive and
                user-friendly experience across the entire website. The success of this project has also led to
                increased investment in user experience research and design throughout the organization.
              </p>
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

// Work-in-progress case study: gated behind the shared early-look password until it ships.
export default function IcpsrProjectPage() {
  return (
    <PasswordProtection
      projectId="icpsr-project"
      correctPassword={WIP_CASE_STUDY_PASSWORD}
      projectTitle="Modernizing search for social science research"
      companyName="ICPSR"
      message={WIP_CASE_STUDY_MESSAGE}
    >
      <IcpsrProject />
    </PasswordProtection>
  )
}
