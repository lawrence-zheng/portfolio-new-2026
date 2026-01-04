"use client"

import type React from "react"

import { useEffect } from "react"

import Image from "next/image"
import { useState, useRef } from "react"
import ProjectSideNav from "@/components/project-side-nav"
import KeyInsight from "@/components/key-insight"
import Quotation from "@/components/quotation"
import { Check } from "lucide-react"
import Navbar from "@/components/navbar" // Import the shared Navbar component
import Learning from "@/components/learning"
import { useColorContext } from "@/context/color-context"
import "@/styles/case-study.css"

export default function DeLalloProject() {
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
    
    .mobile-screenshot {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `

  // Refs for each section to enable scroll tracking
  const overviewRef = useRef<HTMLDivElement>(null)
  const recipeAppsRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const learningsRef = useRef<HTMLDivElement>(null)
  const solutionPreviewRef = useRef<HTMLDivElement>(null)

  // Track scroll position to update active section in side nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching section

      // Check which section is currently in view
      const sections = [
        { ref: overviewRef, id: "overview" },
        { ref: recipeAppsRef, id: "recipeApps" },
        { ref: problemRef, id: "problem" },
        { ref: processRef, id: "process" },
        { ref: solutionRef, id: "solution" },
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
    { id: "overview", label: "Goal" },
    { id: "recipeApps", label: "Roadblock" },
    { id: "problem", label: "Ideation" },
    { id: "process", label: "Recipient Flow" },
    { id: "solution", label: "Evaluation" },
    { id: "learnings", label: "Learnings" },
  ]

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      recipeApps: recipeAppsRef,
      problem: problemRef,
      process: processRef,
      solution: solutionRef,
      learnings: learningsRef,
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

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>{`
        ${dynamicStyles}
        .fade-overlay {
          position: absolute;
          top: 0;
          width: 40px;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        .fade-left {
          left: 0;
          background: linear-gradient(to right,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.95) 20%,
            rgba(255,255,255,0.8) 40%,
            rgba(255,255,255,0.4) 80%,
            rgba(255,255,255,0) 100%
          );
        }
        .fade-right {
          right: 0;
          background: linear-gradient(to left,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.95) 20%,
            rgba(255,255,255,0.8) 40%,
            rgba(255,255,255,0.4) 80%,
            rgba(255,255,255,0) 100%
          );
        }
      `}</style>
      {/* Use the shared Navbar component instead of custom header */}
      <Navbar />

      {/* Project Header Section with Two-Column Layout */}
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%203%20%284%29-26cL6Loiq1IJ898yzkGrYzzE3NQLtS.png"
                  alt="DeLallo Delights logo"
                  width={240}
                  height={64}
                  className="h-16 w-auto"
                />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-tight text-black normal-case">
                Elevating family culinary connections
              </h2>
              <p className="text-gray-700 text-xl">
                Creating a unique digital experience that brings families together through personalized food gifting
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
                    <p className="font-medium text-gray-800">3 months</p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Team</h3>
                    <p className="font-medium text-gray-800">Sole designer with 6 engineers and 1 PM</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Summary</h3>
                    <p className="text-gray-800 text-sm">
                      DeLallo Foods is a family-owned Italian food company seeking to expand their mobile presence. I
                      designed an <em>RFID-powered mobile gifting experience</em> that integrates physical gift boxes with
                      personalized digital messages to foster family connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Video/Visual Content */}
            <div className="w-full relative self-center">
              <div className="overflow-hidden">
                <video
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7b6cdd4f29a34e2abb5c8cdb5f8a799c-mL9HVlaM22aOIPtY8tKQyAMT2B4mwH.webm"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ background: "transparent" }}
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
          <h5
            className="text-2xl font-bold text-gray-800 mb-4"
            style={{ textTransform: "none", letterSpacing: "-0.025em" }}
          >
            Final design
          </h5>
          <p className="text-gray-700 text-lg mb-8 max-w-4xl">
            An <em>RFID powered mobile gifting experience</em> that allows users to record personalized gift messages that come integrated with the gift box.
          </p>

          {/* Mobile Screenshot Carousel */}
          {(() => {
            // Only use available images
            const mobileScreens = [
              '/delallo mobile clean 1.svg',
              '/delallo mobile clean 2.svg',
              '/delallo mobile clean 3.svg',
              '/delallo mobile clean 4.svg',
              '/delallo mobile clean 6.svg',
              '/delallo mobile clean 5.svg',
              '/delallo mobile clean 7.svg'
            ];
            const [carouselIndex, setCarouselIndex] = useState(0);
            const [cardsInView, setCardsInView] = useState(1);
            const containerRef = useRef<HTMLDivElement>(null);
            // Responsive effect: fill as many as fit
            useEffect(() => {
              function handleResize() {
                if (containerRef.current) {
                  const containerWidth = containerRef.current.offsetWidth;
                  const cardWidth = 240 + 64; // 240px card + 64px gap (increased gap)
                  const fit = Math.floor(containerWidth / cardWidth) || 1;
                  setCardsInView(fit);
                }
              }
              handleResize();
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
            }, []);
            useEffect(() => {
              if (carouselIndex > mobileScreens.length - cardsInView) {
                setCarouselIndex(Math.max(0, mobileScreens.length - cardsInView));
              }
            }, [cardsInView]);
            const handlePrev = () => setCarouselIndex((i) => Math.max(i - 1, 0));
            const handleNext = () => setCarouselIndex((i) => Math.min(i + 1, mobileScreens.length - cardsInView));
            const cardWidth = 240;
            const cardGap = 40; // Reduced gap for a more compact look
            const cardHeight = 500; // Increased to show all screenshot content
            return (
              <div className="relative flex items-center justify-start w-full -ml-[10px]" ref={containerRef}>
                {/* Left Arrow */}
                {carouselIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 z-20 bg-white/80 hover:bg-white rounded-full shadow p-2 top-1/2 -translate-y-1/2"
                    aria-label="Previous screenshot"
                  >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}
                {/* Carousel Frame */}
                <div className="overflow-hidden w-full" style={{ height: `${cardHeight}px` }}>
                  <div
                    className="flex transition-transform duration-500"
                    style={{ gap: `${cardGap}px`, transform: `translateX(-${carouselIndex * (cardWidth + cardGap)}px)` }}
                  >
                    {mobileScreens.map((src, idx) => (
                      <div key={src} className="w-[240px] h-[500px] flex-shrink-0 flex items-center justify-center relative">
                        {/* Phone frame */}
                        <div className="relative w-[220px] h-[480px] bg-white rounded-[2.5rem] shadow-lg flex items-center justify-center border-[6px] border-white">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-200 rounded-b-xl z-10" style={{ marginTop: '-2px' }} />
                          {/* Screen */}
                          <img
                            src={src}
                            alt={`Mobile screenshot ${idx + 2}`}
                            className="rounded-[2rem] w-[204px] h-[444px] object-cover"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right Arrow */}
                {carouselIndex < mobileScreens.length - cardsInView && (
                  <button
                    onClick={handleNext}
                    className="absolute right-0 z-20 bg-white/80 hover:bg-white rounded-full shadow p-2 top-1/2 -translate-y-1/2"
                    aria-label="Next screenshot"
                  >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                )}
              </div>
            );
          })()}
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
                    <span className="uppercase">Goal</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Expanding DeLallo's mobile presence
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                DeLallo Foods is an family-owned Italian food company that sells
                ingredients nationwide.
              </p>

              {/* DeLallo Website Image - with colored background */}
              <div className="my-12">
                <div className="p-6 rounded-xl" style={{ backgroundColor: `${primaryColor}10` }}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    {/* Browser frame */}
                    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center">
                      <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 truncate">
                        https://www.delallo.com
                      </div>
                    </div>
                    {/* Screenshot */}
                    <Image
                      src="/delallo-website-screenshot.png"
                      alt="DeLallo website homepage showing Italian pantry essentials and product categories"
                      width={1000}
                      height={500}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="image-caption">
                  DeLallo's current website where customers can buy premium Italian ingredients and search for recipes
                </div>
              </div>

              <p className="text-gray-800 mb-4">
                Our goal was to expand DeLallo's mobile presence to increase name recognition and brand loyalty. Our
                initial idea was to create a <em>recipe app for Italian food</em> using DeLallo ingredients.
              </p>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Recipe Apps Are Overdone Section */}
            <section ref={recipeAppsRef} id="recipeApps" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Roadblock</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Recipe apps are overdone
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-10">
                We conducted user research to test how a DeLallo recipe app might be received. The response was
                eye-opening and strongly indicated a need to find a more unique way to stand out.
              </p>

              {/* Update the quotation to use the template's large quotation component */}
              {/* Replace the div with the quotation with the Quotation component */}
              <Quotation
                attribution="DeLallo customer"
                isEmphasized={true}
                isFullWidth={true}
                accentColor={primaryColor}
              >
                "I feel like recipe apps are overdone since there are so many out there. I prefer searching for a recipe
                over downloading an app."
              </Quotation>

              {/* Update the bar graph component to match the project timeline style */}
              {/* Replace the research findings chart div with this updated version */}
              <div className="my-12 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="text-xs uppercase tracking-widest font-medium text-gray-500 mb-2">Survey Responses</div>
                <h3 className="text-lg font-medium mb-4 normal-case">Would you download a DeLallo recipe app?</h3>
                <div className="space-y-4 relative">
                  <div className="absolute top-0 bottom-0 left-[4.5rem] w-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-[4.5rem] text-sm text-gray-600 pr-2">YES</div>
                    <div className="flex-1">
                      <div className="bg-green-200 h-6 rounded-sm" style={{ width: "30%" }}></div>
                    </div>
                    <div className="text-sm text-gray-600 pl-2">4 (30%)</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[4.5rem] text-sm text-gray-600 pr-2">NO</div>
                    <div className="flex-1">
                      <div className="bg-red-200 h-6 rounded-sm" style={{ width: "85%" }}></div>
                    </div>
                    <div className="text-sm text-gray-600 pl-2">17 (85%)</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mb-6">
                Research into existing recipe apps also revealed lack of sustainability:
              </p>

              {/* Update the competitor logos section to use rounded rectangles instead of circles */}
              {/* Replace the entire grid grid-cols-2 md:grid-cols-4 gap-6 my-8 div with this updated version */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%205%20%281%29%201%20%281%29-InSz6s6owOLHmvPdi4SQB7e0OlEYw1.png"
                      alt="Betty Crocker logo"
                      width={64}
                      height={64}
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">×</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold mt-2">Betty Crocker</p>
                  <p className="text-xs text-gray-600">App discontinued 2019</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%207-xXq0JkbbfwYkCKxSSI6kfd6RPhvDf7.png"
                      alt="Kraft logo"
                      width={64}
                      height={64}
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">×</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold mt-2">Kraft</p>
                  <p className="text-xs text-gray-600">App discontinued 2018</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29-LSVIILuds1MWVPyPXkpLLs8H9hFR8I.png"
                      alt="Allrecipes logo"
                      width={64}
                      height={64}
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">×</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold mt-2">Allrecipes</p>
                  <p className="text-xs text-gray-600">App discontinued 2020</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-1TmfGecDjQxmNO0O9A5aQeicniVvnz.png"
                      alt="Campbell's logo"
                      width={64}
                      height={64}
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">×</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold mt-2">Campbell's</p>
                  <p className="text-xs text-gray-600">App discontinued 2021</p>
                </div>
              </div>

              {/* Key Insight Component */}
              <div className="my-12">
                <KeyInsight>
                  To create a successful mobile app for DeLallo, we need to create something more innovative than a
                  basic recipe app.
                </KeyInsight>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Ideation Section */}
            <section ref={problemRef} id="problem" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Ideation</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Innovating to foster family connection
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-6">
                We decided to brainstorm innovative ideas that focus on bringing out the <em>family connection</em>{" "}
                 aspect of DeLallo's brand.
              </p>

              {/* Key Insight Component */}
              <div className="my-12">
                <KeyInsight>
                  Families use food to stay connected. We can design to help bridge distance between loved ones.
                </KeyInsight>
              </div>

              {/* Ideas - Updated to align content horizontally */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-normal mb-2 text-lg">Idea 1:</h3>
                    <p className="text-lg leading-relaxed">Group gamification with "growing family tree" when recipes are added</p>
                  </div>

                  <div className="flex-grow flex items-center justify-center mb-4">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202%20%281%29%201-WoU0PtpQHlqK9mUdJBG9F5hdGh2wKp.png"
                        alt="Family tree concept showing progression from seedling to full tree as family recipes are added"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    This sounded fun but would have a heavy reliance on getting families to consistently upload recipes,
                    which we weren't confident we could achieve.
                  </p>
                </div>

                <div className="border-2 rounded-lg p-4 flex flex-col relative" style={{ borderColor: primaryColor }}>
                  {/* New ribbon implementation with darker green and checkmark */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md shadow-md flex items-center gap-1">
                      <Check size={12} />
                      <span>Selected</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-normal mb-2 text-lg">Idea 2:</h3>
                    <p className="text-lg leading-relaxed">RFID on gift boxes for video message integration</p>
                  </div>

                  <div className="flex-grow flex items-center justify-center mb-4">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%207%20%281%29-UHC2kVSwduHkqM8yHw8sO91HN101XS.png"
                        alt="Gift box diagram showing RFID tag for scanning, phone insert area, and gift box contents"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    We went with this idea to better integrate with DeLallo's physical product offerings and make
                    DeLallo's gift boxes feel more personalized.
                  </p>
                </div>
              </div>

              {/* Product Ideas Row (moved above Early Wireframes) */}
              <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4 justify-center max-w-full">
                {/* Personal message from Delallo family */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4" style={{ background: '#FEFCE8' }}>
                  Personal message from Delallo family
                </div>
                {/* Message from gift sender* */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4 border-2" style={{ background: '#ECFEFF', borderColor: '#ECFEFF' }}>
                  Message from gift sender
                  {/* Star overlay */}
                  <span className="absolute top-2 right-2 text-yellow-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </span>
                </div>
                {/* Ingredient story introduction* */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4 border-2" style={{ background: '#F0FDF4', borderColor: '#F0FDF4' }}>
                  Ingredient story introduction
                  {/* Star overlay */}
                  <span className="absolute top-2 right-2 text-yellow-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </span>
                </div>
                {/* Virtual Sunday dinner */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4" style={{ background: '#FDF2F8' }}>
                  Virtual Sunday dinner
                </div>
                {/* Have gift sender walk through family recipe* */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4 border-2" style={{ background: '#FFF7ED', borderColor: '#FFF7ED' }}>
                  Have gift sender walk through family recipe
                  {/* Star overlay */}
                  <span className="absolute top-2 right-2 text-yellow-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </span>
                </div>
                {/* Sharing family stories */}
                <div className="relative w-44 md:w-48 min-h-[120px] md:min-h-[160px] rounded-lg flex items-center justify-center text-center text-gray-800 shadow-sm p-4" style={{ background: '#F0F9FF' }}>
                  Sharing family stories
                </div>
              </div>
              <div className="image-caption mb-12">Ideas for fostering family connection and brand loyalty through a gift box integration</div>

              {/* Wireframes */}
              <div className="my-12">
                <div className="border border-gray-200 p-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%208-qzP9zsDpedREX24a7CtCmqkpddfkeu.png"
                    alt="App wireframes showing home screen, recipe recording, and step-by-step instructions"
                    width={1000}
                    height={500}
                    className="w-full"
                  />
                </div>
                <div className="image-caption">Early wireframes exploring the main app screens and user flows</div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Process Section */}
            <section ref={processRef} id="process" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Recipient Flow</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Smart RFID gift boxes that connect loved ones
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-16">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-center rounded-xl p-8" style={{ backgroundColor: getSneakPeakBackgroundColor() }}>
                  {/* Left: Text */}
                  <div className="md:w-1/3 w-full">
                    <h3 className="text-2xl font-normal mb-6">View embedded video messages from loved ones</h3>
                    <p className="text-gray-600 mb-2">
                      An RFID-enabled gift box automatically plays personalized video messages when a phone is placed on top, creating a more intimate and delightful gifting experience.
                    </p>
                  </div>
                  {/* Right: Single Video */}
                  <div className="flex items-center justify-center md:w-2/3 w-full" style={{ backgroundColor: getSneakPeakBackgroundColor() }}>
                    <video src="/delallo-user-demo-1.mp4" className="rounded-lg w-full h-[440px] object-contain md:object-cover border border-gray-200" autoPlay loop muted playsInline />
                  </div>
                </div>


                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-8 items-center rounded-xl p-8" style={{ backgroundColor: getSneakPeakBackgroundColor() }}>
                  {/* Left: Text */}
                  <div className="md:w-1/3 w-full">
                    <h3 className="text-2xl font-normal mb-6">Follow along with voice-guided family recipes</h3>
                    <p className="text-gray-600 mb-2">
                      A voice-activated recipe system guides users through signature family dishes with step-by-step instructions, optionally narrated by family members for a personal touch.
                    </p>
                  </div>
                  {/* Right: Single Video */}
                  <div className="flex items-center justify-center md:w-2/3 w-full" style={{ backgroundColor: getSneakPeakBackgroundColor() }}>
                    <video src="/delallo-user-demo-2.mp4" className="rounded-lg w-full h-[440px] object-contain md:object-cover border border-gray-200" autoPlay loop muted playsInline />
                  </div>
                </div>
              </div>
            </section>
            <hr className="border-t border-gray-200 my-16 section-divider" />

            {/* Solution Section */}
            <section ref={solutionRef} id="solution" className="scroll-mt-24">
              <div className="section-header">
                <div className="section-content relative z-10">
                  <div className="section-subtitle mb-2 text-left">
                    <span className="uppercase">Evaluation</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-8 text-left normal-case">
                    Testing and validation results
                  </h2>
                </div>
              </div>
              <p className="text-gray-800 mb-8">
                We conducted user testing to validate our design decisions and measure the effectiveness of our
                solution.
              </p>

              {/* User Testing Results */}
              <div className="my-12 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">User Testing Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-normal mb-2">Positive Feedback</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Users found the RFID scanning intuitive and engaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Video message feature created emotional connections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Integration with physical products felt natural</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-normal mb-2">Areas for Improvement</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Need clearer instructions for first-time users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Video recording interface could be simplified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>Better error handling for RFID scanning issues</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Insight Component */}
              <div className="my-12">
                <KeyInsight>
                  The combination of physical and digital experiences created a more memorable and emotionally engaging
                  gift-giving experience than traditional digital-only solutions.
                </KeyInsight>
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
                    Key insights from the project
                  </h2>
                </div>
              </div>

              <p className="text-gray-800 mb-8">
                This project taught us valuable lessons about innovation, user research, and the importance of finding
                unique positioning in crowded markets.
              </p>
              <Learning
                summary="User research prevents costly mistakes"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
              >
                <p>
                  Early user research revealed that recipe apps were oversaturated, saving us from pursuing a doomed strategy and leading us to a more innovative solution.
                </p>
              </Learning>
              <Learning
                summary="Physical-digital integration creates unique value"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
              >
                <p>
                  Combining RFID technology with DeLallo's existing gift boxes created a unique value proposition that couldn't be easily replicated by competitors.
                </p>
              </Learning>
              <Learning
                summary="Emotional connections drive adoption"
                accentColor={primaryColor}
                icon={<div className="flex items-center justify-center"><Image src="/pixel-deco/lightbulb-learning.png" alt="Lightbulb icon" width={28} height={28} /></div>}
              >
                <p>
                  The focus on family connections and emotional experiences proved more compelling than purely functional features, leading to higher user engagement.
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
