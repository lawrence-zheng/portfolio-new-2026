"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import "./hero-text-wrap.css"
import "./pixel-decorations.css"
// Import the animations CSS file at the top of the file
import "./animations.css"
import PixelDecoration from "@/components/pixel-decoration"
import Tooltip from "@/components/tooltip"
import "./mobile-layout-fix.css"
import Navbar from "@/components/navbar"
import { useColorContext } from "@/context/color-context"
import CompositeThumbnail from "@/components/composite-thumbnail"

// Define project data with categories for filtering
interface ProjectData {
  id: string
  title: string
  company?: string
  description: string
  image: string
  imageAlt: string
  backgroundImage?: string
  screenImage?: string
  stats: {
    icon: string
    value: string
    label: string
  }[]
  categories: string[]
  logo?: string
}

export default function Home() {
  // Use the color context
  const { primaryColor, activeTab, setActiveTab } = useColorContext()

  const bannerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [contentOpacity, setContentOpacity] = useState<number>(1)
  const [headlineOpacity, setHeadlineOpacity] = useState<number>(1)
  const [displayedHeadline, setDisplayedHeadline] = useState<string>(getHeroHeadlineByTab(activeTab))
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)
  const [isFilterChanging, setIsFilterChanging] = useState<boolean>(false)
  const [projectsOpacity, setProjectsOpacity] = useState<number>(1)
  const [projectsTransform, setProjectsTransform] = useState<string>("translateY(0)")
  const [mobileLayoutFixed, setMobileLayoutFixed] = useState<boolean>(true) // Start with layout fixed
  const [projectsVisible, setProjectsVisible] = useState<boolean>(true)

  // Mark as client-side to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if the screen is mobile size
  useEffect(() => {
    if (!isClient) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // Changed from 768px to 640px
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [isClient])

  // Get hero headline based on tab name
  function getHeroHeadlineByTab(tabName: string): string {
    switch (tabName) {
      case "ux-research":
        return "Drives deep-rooted empathy"
      case "ui-engineering":
        return "Brings technical proficiency"
      default:
        return "Creates clarity from chaos"
    }
  }

  // Handle tab change with transitions
  const handleTabChange = (tabName: string) => {
    if (tabName === activeTab || isTransitioning) return

    // Start transition
    setIsTransitioning(true)
    setContentOpacity(0)
    setHeadlineOpacity(0)

    // After headline fades out completely, update the displayed headline
    setTimeout(() => {
      setDisplayedHeadline(getHeroHeadlineByTab(tabName))
      setActiveTab(tabName)

      // After content changes, fade everything back in
      setTimeout(() => {
        setHeadlineOpacity(1)
        setContentOpacity(1)
        setIsTransitioning(false)
      }, 100)
    }, 300) // Wait for complete fade out
  }

  // Update displayed headline when activeTab changes from context
  useEffect(() => {
    setDisplayedHeadline(getHeroHeadlineByTab(activeTab))
  }, [activeTab])

  // Project data with categories
  const projectsData: ProjectData[] = [
    {
      id: "3m",
      title: "Reimagining human-AI collaboration to boost patient care for millions",
      company: "3M",
      description:
        "At 3M, I led the end-to-end UX design and research for a suite of collaborative applications used by clinicians to reduce the time needed to go back and revise medical notes every day - and increase quality face-to-face time with patients.",
      image: "/mmodal-mockup.png",
      imageAlt: "3M AI clinical documentation interface showing diagnostic code suggestions",
      backgroundImage: "/project thumbnails/mmodal background.png",
      screenImage: "/project thumbnails/mmodal screen.png",
      stats: [
        {
          icon: "/dx-capture.png",
          value: "25%",
          label: "Increase in DX capture",
        },
        {
          icon: "/clinicians.png",
          value: "250,000+",
          label: "Clinicians giving better care",
        },
      ],
      categories: ["healthcare", "ai tools", "workflow tools", "b2b"],
    },
    {
      id: "govini",
      title: "Modernizing U.S. government data workflows for critical defense operations",
      company: "Govini",
      description:
        "I led the design for a data management application that transformed how defense specialists track equipment parts, evolving the design from a MVP to a hierarchical data system that significantly improved engagement and efficiency.",
      image: "/bom-manager-mockup.png",
      imageAlt: "Defense inventory management application showing component details and hierarchical navigation",
      backgroundImage: "/project thumbnails/bom manager background.png",
      screenImage: "/project thumbnails/bom manager screen.png",
      stats: [
        {
          icon: "/search.png", // Reusing existing icon
          value: "38%",
          label: "Increase in session time",
        },
        {
          icon: "/net-promoter-score.png", // Reusing existing icon
          value: "60%",
          label: "Higher weekly active users",
        },
      ],
      categories: ["defense", "data lookup", "workflow tools", "b2b", "government"],
    },
    {
      id: "play-for-people-skills",
      title: "Creating a social game to unlock student learning motivation",
      company: "Play for People Skills",
      description:
        "After researching and testing ways to create an effective, non-boring learning environment for high school students to learn people skills, I designed a social game that was verified by learning science experts for its ability to boost student motivation.",
      image: "/social-game-mockup.png",
      imageAlt: "Social game interface showing educational cards and game mechanics for teaching interpersonal skills",
      backgroundImage: "/project thumbnails/p4ps background.png",
      screenImage: "/project thumbnails/p4ps screen.png",
      stats: [
        {
          icon: "/goal-setting.png",
          value: "2.15x",
          label: "Modified goal setting",
        },
        {
          icon: "/awards.png",
          value: "1st place",
          label: "Educational games competition",
        },
      ],
      categories: ["education", "social", "games", "b2c"],
    },
    {
      id: "icpsr-project",
      title: "Modernizing a search page to increase efficiency by 60%",
      company: "ICPSR",
      description:
        "I revamped the UX and built a modern design system for the world's largest collection of social science data, enabling social science researchers to more efficiently find and discover key information.",
      image: "/icpsr-mockup.png",
      imageAlt: "ICPSR search interface showing modernized data search and filtering capabilities",
      backgroundImage: "/project thumbnails/icpsr background.png",
      screenImage: "/project thumbnails/icpsr screen.png",
      stats: [
        {
          icon: "/search.png",
          value: "8 mins",
          label: "Saved on average",
        },
        {
          icon: "/net-promoter-score.png",
          value: "78",
          label: "Net promoter score",
        },
      ],
      categories: ["data lookup", "education", "b2b"],
    },
    {
      id: "delallo",
      title: "Elevating family culinary connections for DeLallo",
      company: "DeLallo",
      description:
        "Designed a unique digital experience for DeLallo that brings families together through personalized food gifting, integrating physical and digital touchpoints for a memorable brand experience.",
      image: "/delallo-website-screenshot.png",
      imageAlt: "DeLallo website and digital gifting experience",
      backgroundImage: "/project thumbnails/delallo background.png",
      screenImage: "/project thumbnails/delallo screen.png",
      stats: [
        {
          icon: "/placeholder-2n36l.png",
          value: "5,000+",
          label: "Gift boxes shipped",
        },
        {
          icon: "/placeholder-9msup.png",
          value: "92%",
          label: "Avg. family engagement",
        },
      ],
      categories: ["b2c", "social"],
      logo: "/delallo-logo.png",
    },
  ]

  // Filter projects based on active filter
  function getFilteredProjects() {
    if (activeFilter === "all") {
      return projectsData
    }

    // Special case for Education, Social, or Games filters - show Social Game first
    if (["education", "social", "games"].includes(activeFilter)) {
      const socialGameProject = projectsData.find((p) => p.id === "play-for-people-skills")
      const otherProjects = projectsData.filter((p) => p.id !== "play-for-people-skills" && p.categories.includes(activeFilter))
      const remainingProjects = projectsData.filter(
        (p) => p.id !== "play-for-people-skills" && !p.categories.includes(activeFilter),
      )

      return [...(socialGameProject ? [socialGameProject] : []), ...otherProjects, ...remainingProjects]
    }

    // Special case for Data Lookup filter - show ICPSR first, then Govini, then 3M
    if (activeFilter === "data lookup") {
      const icpsrProject = projectsData.find((p) => p.id === "icpsr-project")
      const goviniProject = projectsData.find((p) => p.id === "govini")
      const threeMProject = projectsData.find((p) => p.id === "3m")
      const otherProjects = projectsData.filter(
        (p) => p.id !== "icpsr-project" && p.id !== "govini" && p.id !== "3m" && p.categories.includes(activeFilter),
      )
      const remainingProjects = projectsData.filter(
        (p) => p.id !== "icpsr-project" && p.id !== "govini" && p.id !== "3m" && !p.categories.includes(activeFilter),
      )

      return [
        ...(icpsrProject ? [icpsrProject] : []),
        ...(goviniProject ? [goviniProject] : []),
        ...(threeMProject ? [threeMProject] : []),
        ...otherProjects,
        ...remainingProjects,
      ]
    }

    // Default filtering - show matching projects first, then others
    const matchingProjects = projectsData.filter((p) => p.categories.includes(activeFilter))
    const otherProjects = projectsData.filter((p) => !p.categories.includes(activeFilter))

    return [...matchingProjects, ...otherProjects]
  }

  // Get filtered and ordered projects
  const filteredProjects = getFilteredProjects()

  // Improved handle filter change with smoother animations
  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter || isFilterChanging) return

    // Set transitioning state
    setIsFilterChanging(true)

    // Different transition approach for mobile vs desktop
    if (isMobile) {
      // For mobile: completely hide the projects container first
      setProjectsVisible(false)

      // Fade out projects with a slight upward movement
      setProjectsOpacity(0)
      setProjectsTransform("translateY(10px)")

      // After projects are completely hidden, change the filter and update layout
      setTimeout(() => {
        // Change the filter
        setActiveFilter(filter)

        // Ensure mobile layout is fixed before showing content again
        setMobileLayoutFixed(true)

        // Add a small delay to ensure DOM updates are complete
        setTimeout(() => {
          // Prepare for fade in with a slight downward movement
          setProjectsTransform("translateY(-5px)")

          // Make the container visible again but still with opacity 0
          setProjectsVisible(true)

          // Start fade in after a small delay to ensure layout is complete
          setTimeout(() => {
            setProjectsOpacity(1)
            setProjectsTransform("translateY(0)")

            // Reset transitioning state after animation completes
            setTimeout(() => {
              setIsFilterChanging(false)
            }, 300)
          }, 50)
        }, 100) // Increased delay to ensure DOM updates
      }, 300) // Wait for complete fade out
    } else {
      // For desktop: use a smoother crossfade approach
      // First, start fading out
      setProjectsOpacity(0.3)
      setProjectsTransform("translateY(5px)")

      // Change the filter after a short delay
      setTimeout(() => {
        setActiveFilter(filter)

        // Then start fading back in after the filter has changed
        setTimeout(() => {
          setProjectsOpacity(1)
          setProjectsTransform("translateY(0)")

          // Reset transitioning state after animation completes
          setTimeout(() => {
            setIsFilterChanging(false)
          }, 300)
        }, 50)
      }, 250) // Shorter delay for desktop for a more fluid experience
    }
  }

  // Scroll to projects section with smooth animation
  const scrollToProjects = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollPosition = window.scrollY
        // Very subtle parallax effect (5% of scroll speed)
        const parallaxOffset = scrollPosition * 0.05
        bannerRef.current.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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

  // Get banner background color based on active tab
  const getBannerBackgroundColor = () => {
    switch (activeTab) {
      case "ux-research":
        return "#e3c8b5" // Sunset tan
      case "ui-engineering":
        return "#8095bf" // Evening deep blue
      default:
        return "#DAE4F0" // Default light blue
    }
  }

  // Get hero description based on active tab
  const getHeroDescription = () => {
    switch (activeTab) {
      case "ux-research":
        return "I have conducted deep qualitative studies into specialized domains like education, healthcare and government to get a better understand people's lived experiences and how I can augment spaces they work in or live in."
      case "ui-engineering":
        return "I studied CS and data science, and I'm fluent in HTML/CSS/JS. My dev background enables me to collaborate smoothly with engineers, design with practicality in mind, and make the most out of cutting edge tools."
      default:
        return 'With over 5 years of experience as a <span class="font-bold">Product Designer</span> driving end-to-end projects in fast-paced Agile teams, I embrace ambiguity in order to deliver powerful design solutions to complex systemic challenges.'
    }
  }

  // Get banner image source based on active tab and screen size
  const getBannerImageSrc = (tabName: string) => {
    if (isMobile) {
      // Mobile versions
      switch (tabName) {
        case "ux-research":
          return "/mobile-portfolio-space-2a-loop.gif"
        case "ui-engineering":
          return "/mobile-portfolio-space-3-loop.gif"
        default:
          return "/mobile-portfolio-space-1-edited.gif"
      }
    } else {
      // Desktop versions
      switch (tabName) {
        case "ux-research":
          return "/portfolio-space-2a-extended.gif"
        case "ui-engineering":
          return "/portfolio-space-3-extended-3.gif"
        default:
          return "/portfolio-space-1-loop-expanded.gif"
      }
    }
  }

  // Style for case study title links
  const titleLinkStyle: React.CSSProperties = {
    position: "relative",
    textDecoration: "none",
    display: "inline",
  }

  // List of filter options
  const filterOptions = [
    "All",
    "Workflow tools",
    "Education",
    "Healthcare",
    "AI tools",
    "Data lookup",
    "B2B",
    "B2C",
    "Social",
    "Games",
  ]

  // Tooltip content with normal font weight
  const tooltipContent = (
    <div className="space-y-2">
      <p className="font-normal text-xs">
        You may want to skip through the BS and just see relevant experience matching your domain when reviewing a
        portfolio. I get it. Please feel free to select an option here, and I will prioritize showing projects relevant
        to the specific industry.
      </p>
      <p className="font-normal text-xs text-gray-600">
        P.S. Design expertise is transferable across domains. Past industry experience is a factor, but don't make it
        the ONLY factor to judge a potential future teammate by. You might be pleasantly surprised :)
      </p>
    </div>
  )

  // Get company logo component based on company name
  const getCompanyLogo = (company: string) => {
    switch (company) {
      case "3M":
        return (
          <div className="h-6 mb-4">
            <Image src="/3M_wordmark.svg" alt="3M logo" width={60} height={24} className="h-6 w-auto" />
          </div>
        )
      case "Govini":
        return (
          <div className="h-8 mb-2">
            <Image src="/govini-logo.png" alt="Govini logo" width={90} height={32} className="h-8 w-auto" />
          </div>
        )
      case "ICPSR":
        return (
          <div className="h-6 mb-4">
            <Image src="/icpsr_logo.svg" alt="ICPSR logo" width={60} height={24} className="h-6 w-auto" />
          </div>
        )
      case "Play for People Skills":
        return (
          <div className="h-6 mb-2">
            <Image src="/play_for_people_skills.svg" alt="Play for People Skills logo" width={120} height={24} className="h-6 w-auto" />
          </div>
        )
      default:
        if (company && company.toLowerCase().includes("delallo")) {
          return (
            <div className="h-8 mb-2">
              <Image src="/delallo-logo.png" alt="Delallo Delights logo" width={160} height={32} className="h-8 w-auto" />
            </div>
          )
        }
        return null
    }
  }

  // Check if a project is password protected
  const isPasswordProtected = (projectId: string) => {
    return projectId === "3m" || projectId === "govini"
  }

  // If still loading, show a minimal placeholder to prevent layout shift
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-white">
  //       {/* Minimal header placeholder */}
  //       <header className="fixed top-0 left-0 right-0 py-3 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
  //         <div className="font-sans font-bold text-xl opacity-0">placeholder</div>
  //         <nav className="flex gap-6 uppercase text-sm tracking-wider font-sans opacity-0">
  //           <span>WORK</span>
  //           <span>FUN</span>
  //         </nav>
  //       </header>
  //     </div>
  //   )
  // }

  return (
    <main className="bg-white">
      {/* Main navigation */}
      <Navbar />

      {/* Hero Section with animated banner below */}
      <section
        className="pt-16 pb-3 transition-all duration-500 relative"
        style={{
          background: getBackgroundGradient(),
        }}
      >
        {/* Pixel Art Decorations */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="max-w-5xl mx-auto px-6 h-full relative pointer-events-none">
            {/* Diamond decoration - reduced size */}
            <PixelDecoration
              type="diamond"
              top="15%"
              right="10%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
              onClick={() => console.log("Diamond clicked")}
            />

            {/* Speech bubble heart decoration - reduced size */}
            <PixelDecoration
              type="speech-bubble-heart"
              top="30%"
              right="5%"
              size={28}
              className="md-larger lg-larger"
              activeTab={activeTab}
              onClick={() => console.log("Speech bubble heart clicked")}
            />

            {/* Ghost decoration - reduced size */}
            <PixelDecoration
              type="ghost"
              top="20%"
              left="8%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
              onClick={() => console.log("Ghost clicked")}
            />

            {/* Lightbulb decoration - reduced size */}
            <PixelDecoration
              type="lightbulb"
              top="40%"
              left="5%"
              size={24}
              className="md-larger lg-larger"
              activeTab={activeTab}
              onClick={() => console.log("Lightbulb clicked")}
            />

            {/* Plus decorations - reduced size */}
            <PixelDecoration
              type="plus"
              top="25%"
              left="25%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              bottom="30%"
              right="20%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              bottom="20%"
              left="35%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              top="15%"
              left="40%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              top="35%"
              right="30%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              bottom="15%"
              right="15%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />
            <PixelDecoration
              type="plus"
              bottom="25%"
              right="35%"
              size={32}
              activeTab={activeTab}
              onClick={() => console.log("Plus clicked")}
            />

            {/* Single pixel decorations */}
            <PixelDecoration
              type="pixel"
              top="10%"
              left="20%"
              size={4}
              opacity={0.6}
              activeTab={activeTab}
              onClick={() => console.log("Pixel clicked")}
            />
            <PixelDecoration
              type="pixel"
              top="20%"
              right="25%"
              size={4}
              opacity={0.6}
              activeTab={activeTab}
              onClick={() => console.log("Pixel clicked")}
            />
            <PixelDecoration
              type="pixel"
              top="30%"
              left="25%"
              size={4}
              opacity={0.6}
              activeTab={activeTab}
              onClick={() => console.log("Pixel clicked")}
            />
            <PixelDecoration
              type="pixel"
              bottom="35%"
              right="25%"
              size={4}
              opacity={0.6}
              activeTab={activeTab}
              onClick={() => console.log("Pixel clicked")}
            />
            <PixelDecoration
              type="pixel"
              bottom="25%"
              left="40%"
              size={4}
              opacity={0.6}
              activeTab={activeTab}
              onClick={() => console.log("Pixel clicked")}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Centered content container */}
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-2">
            {/* Category tabs */}
            <div className="flex justify-center mb-4 w-full">
              <div className="bg-white rounded-full shadow-sm p-1 flex border border-gray-200">
                <button
                  onClick={() => handleTabChange("product-design")}
                  className={`px-6 py-1.5 rounded-full font-sans text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeTab === "product-design" ? "text-white" : "text-gray-600 hover:text-opacity-80"
                  }`}
                  style={{
                    backgroundColor: activeTab === "product-design" ? primaryColor : "transparent",
                    color: activeTab === "product-design" ? "white" : "rgb(75 85 99)",
                  }}
                  disabled={isTransitioning}
                >
                  Product Design
                </button>
                <button
                  onClick={() => handleTabChange("ux-research")}
                  className={`px-6 py-1.5 rounded-full font-sans text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeTab === "ux-research" ? "text-white" : "text-gray-600 hover:text-opacity-80"
                  }`}
                  style={{
                    backgroundColor: activeTab === "ux-research" ? primaryColor : "transparent",
                    color: activeTab === "ux-research" ? "white" : "rgb(75 85 99)",
                  }}
                  disabled={isTransitioning}
                >
                  UX Research
                </button>
                <button
                  onClick={() => handleTabChange("ui-engineering")}
                  className={`px-6 py-1.5 rounded-full font-sans text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeTab === "ui-engineering" ? "text-white" : "text-gray-600 hover:text-opacity-80"
                  }`}
                  style={{
                    backgroundColor: activeTab === "ui-engineering" ? primaryColor : "transparent",
                    color: activeTab === "ui-engineering" ? "white" : "rgb(75 85 99)",
                  }}
                  disabled={isTransitioning}
                >
                  UI Engineering
                </button>
              </div>
            </div>

            {/* Profile Photo with hover overlay for social links */}
            <div className="mb-3 relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative">
                <Image
                  src="/profile-picture.png"
                  alt="Lawrence Zheng"
                  width={96}
                  height={96}
                  className="object-cover"
                  priority
                />
                {/* Hover overlay with social icons */}
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="https://www.linkedin.com/in/lawrence-zheng-ux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:lxzhengdesign@gmail.com"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Email Contact"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className="lucide lucide-mail"
                    >
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Heading - with transition only for the colored headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-4 text-center mx-auto hero-text-wrap">
              <div className="mb-2 font-normal normal-case" style={{ textTransform: "none" }}>
                Lawrence Zheng
              </div>
              <div
                className="transition-all duration-300 font-normal normal-case headline-text"
                style={{
                  color: primaryColor,
                  opacity: headlineOpacity,
                  transform: headlineOpacity < 1 ? "translateY(5px)" : "translateY(0)",
                }}
              >
                {displayedHeadline}
              </div>
            </h1>

            {/* Paragraph - updated with the same transition as the headline */}
            <p
              className="text-gray-800 mb-4 font-sans max-w-2xl text-center transition-all duration-300 text-base md:text-lg"
              style={{
                opacity: contentOpacity,
                transform: contentOpacity < 1 ? "translateY(5px)" : "translateY(0)",
              }}
              dangerouslySetInnerHTML={{ __html: getHeroDescription() }}
            ></p>

            {/* Button - updated to match Delallo case study styling */}
            <div className={`flex flex-wrap gap-4 pt-2 ${isMobile ? "mb-6" : "mb-2"}`}>
              <button
                onClick={scrollToProjects}
                className="px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                View projects
              </button>
              <button
                onClick={() => window.open("mailto:lxzhengdesign@gmail.com", "_blank")}
                className="px-6 py-3 border rounded-md font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Contact me
              </button>
            </div>
          </div>

          {/* Banner container with full-width wall extensions */}
          <div className="relative w-full mt-1" style={{ height: "220px", overflow: "hidden" }}>
            {/* Full-width container for the background */}
            <div
              className="absolute left-0 right-0 bottom-0 h-[180px] z-0 transition-colors duration-500"
              style={{
                backgroundColor: getBannerBackgroundColor(),
              }}
            ></div>

            {/* Left wall extension - now positioned absolutely with negative left */}
            <div
              className="absolute bottom-0 left-[calc(-100vw+50%)] h-[180px] w-[100vw] z-10 transition-colors duration-500"
              style={{
                backgroundColor: getBannerBackgroundColor(),
              }}
            ></div>

            {/* Right wall extension - now positioned absolutely with negative right */}
            <div
              className="absolute bottom-0 right-[calc(-100vw+50%)] h-[180px] w-[100vw] z-10 transition-colors duration-500"
              style={{
                backgroundColor: getBannerBackgroundColor(),
              }}
            ></div>

            {/* Animated banner with higher z-index to show character and furniture */}
            <div
              ref={bannerRef}
              className="absolute bottom-0 left-0 right-0 w-full max-w-[1200px] mx-auto z-20"
              style={{ height: "220px", minHeight: "220px", willChange: "transform" }}
            >
              {/* All three banners are always present, but only one is visible based on opacity */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: activeTab === "product-design" ? 1 : 0 }}
              >
                <Image
                  src={getBannerImageSrc("product-design") || "/placeholder.svg"}
                  alt="Animated pixel art living space with character"
                  fill
                  className="object-cover object-bottom"
                  style={{ objectPosition: "bottom center" }}
                  unoptimized
                  priority
                />
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: activeTab === "ux-research" ? 1 : 0 }}
              >
                <Image
                  src={getBannerImageSrc("ux-research") || "/placeholder.svg"}
                  alt="Animated pixel art living space with sunset lighting"
                  fill
                  className="object-cover object-bottom"
                  style={{ objectPosition: "bottom center" }}
                  unoptimized
                  priority
                />
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: activeTab === "ui-engineering" ? 1 : 0 }}
              >
                <Image
                  src={getBannerImageSrc("ui-engineering") || "/placeholder.svg"}
                  alt="Animated pixel art living space with evening lighting"
                  fill
                  className="object-cover object-bottom"
                  style={{ objectPosition: "bottom center" }}
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Title and Filters - removed border-t class */}
      <section className="" ref={filtersRef} id="filters-section">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-4">
          <div className="flex items-center justify-center gap-2 mb-6 text-center">
            <h2 className="text-lg font-serif font-normal text-gray-800 normal-case">
              Select an industry or project type
            </h2>
            <Tooltip content={tooltipContent} width="400px" position="bottom">
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
                className="text-gray-500 translate-y-[2px]"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </Tooltip>
          </div>

          {/* Filter bubbles - reduced bottom margin from mb-12 to mb-6 */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter.toLowerCase())}
                className={`px-4 py-1.5 rounded-full font-sans text-xs md:text-sm uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === filter.toLowerCase()
                    ? "text-white border-transparent"
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor: activeFilter === filter.toLowerCase() ? primaryColor : "transparent",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies - Dynamically rendered based on filtered projects */}
      <div
        ref={projectsContainerRef}
        className={`relative smooth-transition ${!projectsVisible ? "projects-transitioning" : ""}`}
        style={{
          opacity: projectsOpacity,
          transform: projectsTransform,
        }}
      >
        {filteredProjects.map((project, index) => (
          <section
            key={project.id}
            id={`${project.id}-section`}
            className={`py-16 border-b border-gray-200 project-section ${isFilterChanging ? "mobile-transition-active" : ""}`}
            style={{
              backgroundColor: index % 2 === 1 ? `${primaryColor}08` : "",
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${mobileLayoutFixed ? "mobile-layout-fixed" : ""}`}
              >
                {/* For odd-indexed projects (0, 2, etc.), text on left, image on right */}
                {index % 2 === 0 ? (
                  <>
                    <div className="space-y-6 order-2 lg:order-1 transition-all duration-500 ease-in-out project-content">
                      {project.company && getCompanyLogo(project.company)}
                      {isPasswordProtected(project.id) && (
                        <div className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
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
                          Password Protected
                        </div>
                      )}
                      <h2 className="text-4xl font-serif font-normal tracking-tight leading-tight normal-case">
                        <Link
                          href={`/${project.id}`}
                          className="transition-colors duration-300"
                          style={{
                            ...titleLinkStyle,
                            color: "rgb(31, 41, 55)"
                          }}
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <p className="text-gray-800 font-sans text-lg leading-relaxed">{project.description}</p>
                      <div className="mt-10">
                        <Link href={`/${project.id}`}>
                          <button
                            className="px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-colors"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Learn more
                          </button>
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12">
                        {project.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              <Image
                                src={stat.icon || "/placeholder.svg"}
                                alt={`${stat.label} icon`}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div>
                              <div className="text-2xl font-sans font-medium text-gray-800 normal-case">
                                {stat.value}
                              </div>
                              <div className="text-gray-700 text-sm font-sans">{stat.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-500 ease-in-out project-content">
                      {project.backgroundImage && project.screenImage ? (
                        <CompositeThumbnail
                          backgroundImage={project.backgroundImage}
                          screenImage={project.screenImage}
                          alt={project.imageAlt}
                          href={`/${project.id}`}
                        />
                      ) : (
                        <Link
                          href={`/${project.id}`}
                          className="relative border border-gray-200 overflow-hidden rounded-md"
                        >
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.imageAlt}
                            width={600}
                            height={500}
                            className="hover:scale-105 transition-all duration-500"
                          />
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  // For even-indexed projects (1, 3, etc.), image on left, text on right
                  <>
                    <div className="order-1 lg:order-1 flex justify-center lg:justify-start transition-all duration-500 ease-in-out project-content">
                      {project.backgroundImage && project.screenImage ? (
                        <CompositeThumbnail
                          backgroundImage={project.backgroundImage}
                          screenImage={project.screenImage}
                          alt={project.imageAlt}
                          href={`/${project.id}`}
                        />
                      ) : (
                        <Link
                          href={`/${project.id}`}
                          className="relative border border-gray-200 overflow-hidden rounded-md bg-white"
                        >
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.imageAlt}
                            width={600}
                            height={500}
                            className="hover:scale-105 transition-all duration-500"
                          />
                        </Link>
                      )}
                    </div>

                    <div className="order-2 lg:order-2 space-y-6 transition-all duration-500 ease-in-out project-content">
                      {project.company && getCompanyLogo(project.company)}
                      {isPasswordProtected(project.id) && (
                        <div className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
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
                          Password Protected
                        </div>
                      )}
                      <h2 className="text-4xl font-serif font-normal tracking-tight leading-tight normal-case">
                        <Link
                          href={`/${project.id}`}
                          className="transition-colors duration-300"
                          style={{
                            ...titleLinkStyle,
                            color: "rgb(31, 41, 55)"
                          }}
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <p className="text-gray-800 font-sans text-lg leading-relaxed">{project.description}</p>
                      <div className="mt-10">
                        <Link href={`/${project.id}`}>
                          <button
                            className="px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-colors"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Learn more
                          </button>
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12">
                        {project.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              <Image
                                src={stat.icon || "/placeholder.svg"}
                                alt={`${stat.label} icon`}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div>
                              <div className="text-2xl font-sans font-medium text-gray-800 normal-case">
                                {stat.value}
                              </div>
                              <div className="text-gray-700 text-sm font-sans">{stat.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
