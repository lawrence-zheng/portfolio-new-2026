"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { useColorContext } from "@/context/color-context"

interface Persona {
  id: string
  icon: string
  iconAlt: string
  title: string
  body: React.ReactNode
}

const personas: Persona[] = [
  {
    id: "data",
    icon: "/about-me/data.png",
    iconAlt: "Pixel art code and magnifying glass icon",
    title: "Programmer turned designer",
    body: (
      <>
        I started off with a programming background, focusing on machine learning and AI, but later developed a
        passion for design. My dev background helps me balance blue-sky design ideation with a healthy dose of
        appreciation for technical constraints.
      </>
    ),
  },
  {
    id: "lantern",
    icon: "/about-me/lantern.png",
    iconAlt: "Pixel art Chinese lantern icon",
    title: "Third culture kid",
    body: (
      <>
        Growing up, I felt wedged in between American or Chinese culture. I found a sense of belonging online, which
        helped me contextualize my cultural self-identity. I would love to one day help design for a similar sense of
        community.
      </>
    ),
  },
  {
    id: "gradcap",
    icon: "/about-me/gradcap.png",
    iconAlt: "Pixel art graduation cap icon",
    title: "Lifelong learner",
    body: (
      <>
        I strive for constant self-improvement and learning. In 2022, I went back to school to further explore my
        interests in service design and behavioral psychology at{" "}
        <a
          href="https://design.cmu.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          CMU&apos;s design program
        </a>
        , despite already having a full time UX job.
      </>
    ),
  },
  {
    id: "bridge",
    icon: "/about-me/bridge.png",
    iconAlt: "Pixel art bridge icon",
    title: "Digital bridge builder",
    body: (
      <>
        My design career has been focused around breaking down siloes and creating better connections between people,
        whether that be between work collaborators, doctors and patients, or students and their communities.
      </>
    ),
  },
  {
    id: "bulb",
    icon: "/about-me/bulb.png",
    iconAlt: "Pixel art lightbulb icon",
    title: "Idea innovator",
    body: (
      <>
        I like to come up with ideas and thoughtful questions to challenge norms. Embracing ambiguity and healthy
        constraints fuels my passion for innovation, getting messy with design experimentation to try new things.
      </>
    ),
  },
  {
    id: "scale",
    icon: "/about-me/scale.png",
    iconAlt: "Pixel art balance scale icon",
    title: "Ethical practitioner",
    body: (
      <>
        It is important to me that I feel like I am contributing to social good in some way. While ethics are
        subjective, I believe that it is important to reflect on potential ethical pitfalls of a solution, especially
        with up-and-coming technology like AI.
      </>
    ),
  },
  {
    id: "airplane",
    icon: "/about-me/airplane.png",
    iconAlt: "Pixel art paper airplane icon",
    title: "Game nerd",
    body: (
      <>
        If the design of this portfolio hasn&apos;t tipped you off by now, I&apos;m a sucker for video game aesthetics
        - but also for games in general. I studied gamification in grad school, and am a strong believer in the power
        of play for elevating design in cool ways.
      </>
    ),
  },
  {
    id: "cooking",
    icon: "/about-me/cooking.png",
    iconAlt: "Pixel art frying pan icon",
    title: "Hobby cook",
    body: (
      <>
        I love cooking and saving recipes from different cultures in my spare time. I&apos;m confident in my ability
        to cook up a mean eggs benedict or hong shao rou pork belly, which I&apos;d be happy to serve if you&apos;re a
        guest at my apartment :)
      </>
    ),
  },
  {
    id: "art",
    icon: "/about-me/art.png",
    iconAlt: "Pixel art paint brush icon",
    title: "Pixel artist",
    body: (
      <>
        Art is the most compelling form of communication and self expression to me. I&apos;m far from being the best
        artist, but I do doodle some pixel art on my iPad for fun in my spare time. You can check out my art{" "}
        <Link href="/pixel-art" className="underline hover:opacity-80 transition-opacity">
          here
        </Link>
        !
      </>
    ),
  },
]

export default function AboutMe() {
  const { primaryColor } = useColorContext()
  const [selectedId, setSelectedId] = useState<string>("data")
  const [displayedId, setDisplayedId] = useState<string>("data")
  const [textOpacity, setTextOpacity] = useState<number>(1)
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const displayed = personas.find((p) => p.id === displayedId) ?? personas[0]

  const handleSelect = (id: string) => {
    if (id === selectedId) return
    setSelectedId(id) // icon highlight moves immediately
    setTextOpacity(0)
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current)
    fadeTimeout.current = setTimeout(() => {
      setDisplayedId(id)
      setTextOpacity(1)
    }, 200)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Section heading with character status bars */}
      <div className="lg:col-span-3 lg:pt-10">
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight normal-case mb-4">About me</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <Image
            src="/about-me/hp-bar.png"
            alt="Health bar, mostly full"
            width={110}
            height={23}
            style={{ imageRendering: "pixelated" }}
          />
          <Image
            src="/about-me/xp-bar.png"
            alt="Experience bar, mostly full"
            width={110}
            height={23}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* Trait selector - 3x3 grid; the selected icon gets a bordered plate */}
      <div className="lg:col-span-4">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-3 text-center lg:text-left">
          Select a trait
        </p>
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto lg:mx-0" role="tablist" aria-label="Traits">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              role="tab"
              aria-selected={selectedId === persona.id}
              aria-label={persona.title}
              title={persona.title}
              className={`flex flex-col items-center gap-1.5 p-3 pb-2 rounded-xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 ${
                selectedId === persona.id ? "bg-white/80" : "border-transparent hover:bg-white/50"
              }`}
              style={selectedId === persona.id ? { borderColor: `${primaryColor}55` } : undefined}
            >
              <Image
                src={persona.icon}
                alt=""
                width={68}
                height={61}
                className={`transition-all duration-300 ${
                  selectedId === persona.id ? "" : "grayscale opacity-40 hover:opacity-70"
                }`}
                style={{ imageRendering: "pixelated" }}
              />
              {/* Selected-state notch, visible beyond color alone */}
              <span
                className="block h-[3px] w-6 rounded-full transition-colors duration-300"
                style={{ backgroundColor: selectedId === persona.id ? primaryColor : "transparent" }}
              ></span>
            </button>
          ))}
        </div>
      </div>

      {/* Persona description - crossfades when a new trait is selected */}
      <div className="lg:col-span-5 lg:pt-9">
        <div
          className="transition-all duration-300 min-h-[150px]"
          style={{
            opacity: textOpacity,
            transform: textOpacity < 1 ? "translateY(5px)" : "translateY(0)",
          }}
        >
          <h3
            className="text-2xl md:text-3xl font-serif font-normal tracking-tight mb-4 normal-case transition-colors duration-300"
            style={{ color: primaryColor }}
          >
            {displayed.title}
          </h3>
          <p className="text-gray-700 font-sans text-base leading-relaxed">{displayed.body}</p>
        </div>
      </div>
    </div>
  )
}
