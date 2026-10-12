"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Layers, FileSpreadsheet } from "lucide-react"
import Navbar from "@/components/navbar"
import StrategyDiagram from "@/components/strategy-diagram"
import DensityDiagram from "@/components/density-diagram"
import AiProvenanceMockup from "@/components/ai-provenance-mockups"
import TermTooltip, { TOOLTIP_BUBBLE, TOOLTIP_POINTER } from "@/components/term-tooltip"
import { useColorContext } from "@/context/color-context"
import "@/app/animations.css"
import "@/styles/case-study.css"

const DEMO = {
  src: "/3m-demo/HCC%20Review%20Modernized.dc.html?patient=1",
  poster: "/3m/demo-review.png",
  caption:
    "Patient review screen for a fictional patient: AI-found diagnoses grouped by HCC, with evidence status readable at a glance.",
}

const FEATURES = [
  {
    number: "01",
    title: "A hierarchy built around HCCs",
    body: "Specialists think in HCCs, the categories that decide reimbursement. Grouping by HCC and flagging outranked categories ended review work that could never matter.",
    image: "/3m/change-2.png",
    imageAlt: "Diagnoses grouped under an HCC category card with status icons",
  },
  {
    number: "02",
    title: "Status that can be read at a glance",
    body: "Prior-year, current-year, and billing state used to hide behind a click into every diagnosis. I tested five treatments; tinted icon chips shipped.",
    image: "/3m/change-1.png",
    imageAlt: "Tinted status icon chips showing prior-year, current-year, and billed states on a diagnosis",
  },
  {
    number: "03",
    title: "Quick views from existing tools",
    body: "Upload the CSV or Access export a team lead already maintains, and every specialist gets a one-click, pre-filtered worklist.",
    image: "/3m/change-3.png",
    imageAlt: "Add new quick view menu with options to create from current filters or import a patient list",
  },
  {
    number: "04",
    title: "Stay in flow across a patient list",
    body: "A sticky pager (“Reviewing 1 of 5 patients”) moves straight to the next chart. No round-trips to the worklist between patients.",
    image: "/3m/change-4.png",
    imageAlt: "Sticky pager reading Reviewing 3 of 5 patients floating over the worklist",
  },
]

/**
 * Renders the demo at a native laptop-proportioned size (1280 × 800, 16:10)
 * and scales it down to fit the container width, so nothing is cropped at any
 * viewport. Screens taller than the frame scroll internally — sticky elements
 * like the patient pager stay pinned to the visible frame.
 */
function ScaledIframe({
  src,
  title,
  designWidth = 1280,
  designHeight = 800,
}: {
  src: string
  title: string
  designWidth?: number
  designHeight?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / designWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden"
      style={{
        height: scale ? designHeight * scale : undefined,
        aspectRatio: scale ? undefined : `${designWidth} / ${designHeight}`,
        backgroundColor: "#eef1f4",
      }}
    >
      {scale !== null && (
        <iframe
          src={src}
          title={title}
          style={{
            width: designWidth,
            height: designHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
          }}
        />
      )}
    </div>
  )
}

export default function ThreeMCaseStudy() {
  const { primaryColor, activeTab } = useColorContext()

  const demoRef = useRef<HTMLDivElement>(null)
  const changesRef = useRef<HTMLDivElement>(null)

  const dynamicStyles = `
   em {
     color: ${primaryColor};
   }
 `

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

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>
        {dynamicStyles}
      </style>
      <Navbar />

      {/* ========== Hero ========== */}
      <section
        className="relative transition-all duration-500"
        style={{ background: getBackgroundGradient() }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 flex flex-col items-center text-center">
          {/* Project chip */}
          <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur border border-gray-200 px-4 py-1.5 rounded-full mb-8 fade-in">
            <Image src="/3M_wordmark.svg" alt="3M logo" width={32} height={14} className="h-3.5 w-auto" />
            <span className="type-caption text-gray-600">M*Modal · Enterprise healthcare AI · 2 years</span>
          </div>

          <h1 className="type-h1 mb-6 fade-in">
            <span className="block">
              3M&apos;s AI had the answers.
            </span>
            <span className="block">
              Clinicians had a workflow.
            </span>
            <span
              className="block mt-4 type-h2"
              style={{ color: primaryColor }}
            >
              I designed where the two meet.
            </span>
          </h1>

          <p className="type-body text-gray-700 max-w-2xl mb-12 fade-in">
            After I redesigned how clinicians review its suggestions, 3M&apos;s AI saw 25% more of its flagged
            diagnoses accepted, recovering millions of dollars more in missed billing.
          </p>
        </div>

        {/* ========== Playground (overlapping hero fade) ========== */}
        <div ref={demoRef} id="demo" className="max-w-6xl mx-auto px-4 md:px-6 pb-20 scroll-mt-20">
          {/* Browser chrome */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-2xl">
            {/* Chrome bar */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="hidden sm:flex flex-1 justify-center">
                <span className="group relative">
                  <button
                    type="button"
                    aria-describedby="demo-data-note"
                    className="flex items-center gap-1.5 px-4 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-mono cursor-default transition-colors group-hover:border-gray-300 group-hover:text-gray-700"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 7.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="8" cy="5.1" r="0.9" fill="currentColor" />
                    </svg>
                    interactive recreation · fictional data
                  </button>
                  <span aria-hidden className={TOOLTIP_POINTER} />
                  <span id="demo-data-note" role="tooltip" className={`${TOOLTIP_BUBBLE} left-1/2 -translate-x-1/2 w-72`}>
                    This is a working recreation I built in 2026. All patient data is fictional, and no confidential
                    material appears in the demo.
                  </span>
                </span>
              </div>
              <a
                href={DEMO.src}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 text-xs md:text-sm font-medium hover:underline"
                style={{ color: primaryColor }}
              >
                Open full screen ↗
              </a>
            </div>

            {/* Interactive demo, scaled to fit the frame with no cropping (tablet and up) */}
            <div className="hidden md:block overflow-hidden rounded-b-xl">
              <ScaledIframe src={DEMO.src} title="Interactive demo" />
            </div>

            {/* Screenshot fallback (phones — the scaled-down UI would be too small to use) */}
            <a href={DEMO.src} target="_blank" rel="noopener noreferrer" className="block md:hidden overflow-hidden rounded-b-xl">
              <Image src={DEMO.poster} alt={DEMO.caption} width={1440} height={900} className="w-full h-auto" />
            </a>
          </div>

        </div>
      </section>

      {/* ========== Before state (compact) ========== */}
      <section className="w-full py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <p className="type-eyebrow text-gray-500 mb-3">The problem</p>
            <h2 className="type-h2 mb-4">
              AI output without <span style={{ color: primaryColor }}>information hierarchy</span> is just more work,
              particularly in a complex space like medical billing
            </h2>
            <p className="type-body text-gray-600 mb-5">
              3M&apos;s AI-based HCC Management software (dating back to 2016) scans medical documentation and prior
              billing to identify evidence of missed diagnoses. The evidence is reviewed by specialists before being
              forwarded to doctors.
            </p>
            <p className="type-body text-gray-600 mb-5">
              Prior to the redesign I worked on, the AI just showed each finding as an identical row in a table, which
              was inefficient for medical specialists to work from.
            </p>
            <p className="type-body text-gray-600">
              I worked with subject matter experts (learning the ropes how HCC medical coding works) and conducted
              contextual inquiries, shadowing medical documentation specialists to identify problems and
              opportunities.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src="/3m/before-flat-list-trim.png"
                alt="Legacy diagnosis list: AI findings rendered as identical rows with only a code, source note, and date"
                width={799}
                height={678}
                className="w-full h-auto grayscale"
              />
            </div>
          </div>
        </div>

        {/* Problems found, one per card */}
        <div className="relative max-w-6xl mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Layers,
                label: "Wasted review",
                text: (
                  <>
                    No{" "}
                    <TermTooltip definition="Hierarchical Condition Categories (HCCs) group related diagnoses for reimbursement. Within a hierarchy, only the most severe category counts, so the lower ones are outranked.">
                      HCC grouping
                    </TermTooltip>
                    , so outranked categories still demanded attention.
                  </>
                ),
              },
              { icon: EyeOff, label: "Hidden status", text: "Prior-year, current-year, and billing state sat one click deep." },
              {
                icon: FileSpreadsheet,
                label: "Tool switching",
                text: "Specialists were spending most of their time away from our app and in other tools.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 border-t-2 border-t-red-500 bg-white p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 shrink-0">
                    <item.icon className="w-4 h-4" aria-hidden />
                  </span>
                  <h3 className="type-h3">{item.label}</h3>
                </div>
                <p className="type-small text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Elbow arrow from the tool-switching card to the stakeholder section's title (desktop only).
              Starts at the third grid column's center (gap-4 = 16px) and lands on the center of the
              "Convincing stakeholders" eyebrow, which is ~186px wide. */}
          <div className="hidden md:block absolute top-full inset-x-6 z-10 pointer-events-none" aria-hidden>
            <div
              className="absolute top-2 h-14 border-r-[1.5px] border-b-[1.5px] border-gray-300 rounded-br-2xl"
              style={{ left: "109px", right: "calc((100% - 32px) / 6)" }}
            />
            <div
              className="absolute top-[62.5px] h-[58px] w-4 border-l-[1.5px] border-t-[1.5px] border-gray-300 rounded-tl-2xl"
              style={{ left: "93px" }}
            />
            {/* Arrowhead: tip sits on the line's end (y 120.5px) and its center (x 93.75px), same stroke */}
            <svg
              className="absolute text-gray-300"
              style={{ left: "87.75px", top: "114.5px" }}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
            >
              <path d="M0.75 0.75 6 6 11.25 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== Research insight band ========== */}
      <section
        className="w-full py-20 transition-colors duration-500"
        style={{ backgroundColor: `${primaryColor}0A` }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* The reality we found: text left, ecosystem graphic right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="type-eyebrow text-gray-500 mb-3">Convincing stakeholders</p>
              <h2 className="type-h2 mb-6">
                The data said we weren&apos;t the main character. I made the case for us to avoid the{" "}
                <span style={{ color: primaryColor }}>trap of doing everything</span>.
              </h2>
              <p className="type-body text-gray-600 mb-4">
                Only about <em>20% of specialists</em> worked from our worklist. The rest lived in Epic, and in
                Excel or Access lists their team leads assigned. That number, backed by what I saw at every site
                visit, convinced leadership to stop competing for the center of the workflow.
              </p>
              <p className="type-body text-gray-600 mb-8">
                So instead of replacing the lists specialists already trusted, the redesign would plug into them
                and stay out of the way.
              </p>
            </div>
            <div>
              <Image
                src="/3m/integrations-3.png"
                alt="Epic at the center of the specialist's tool ecosystem, ringed by Excel, Access, and other everyday tools, with our app connected as one supporting node"
                width={3072}
                height={2210}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* The strategy argument that made room for that reality: two routes to the same goal */}
          <div className="mt-16 xl:-mx-12">
            <StrategyDiagram primaryColor={primaryColor} />
            <p className="type-caption text-gray-600 mt-6 text-center max-w-2xl mx-auto">
              The strategy argument behind the redesign: leadership wanted us to be the main tool in the
              clinician&apos;s ecosystem. My research showed the faster route to their own adoption goal was to be a
              great supporting tool.
            </p>
          </div>
        </div>
      </section>

      {/* ========== What changed ========== */}
      <section ref={changesRef} id="changes" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="type-eyebrow text-gray-500 mb-3">The redesign</p>
          <h2 className="type-h2">
            Meeting clinicians where they work
          </h2>
          <p className="type-body text-gray-600 mt-4">
            After testing prototypes with engineering stakeholders and vocal power users, I gave the flat diagnosis
            list the hierarchy it was missing: HCC grouping and status at a glance. Then, rather than competing with
            team leads&apos; lists, I pushed leadership toward smaller changes that plug into them, earning power
            users major time savings at a fraction of the engineering cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((f) => (
            <div key={f.number} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              {/* Visual - thumbnails share a 1416x624 canvas, so they render full-bleed at a uniform aspect */}
              <div className="border-b border-gray-100">
                <Image src={f.image} alt={f.imageAlt} width={1416} height={624} className="w-full h-auto" />
              </div>

              {/* Copy */}
              <div className="p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs font-semibold" style={{ color: primaryColor }}>
                    {f.number}
                  </span>
                  <h3 className="type-h3">{f.title}</h3>
                </div>
                <p className="type-small text-gray-600">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== Two attention budgets ========== */}
      <section className="w-full py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="type-eyebrow text-gray-500 mb-3">Same AI, two contexts</p>
              <h2 className="type-h2 mb-5">
                Designing for different <span style={{ color: primaryColor }}>attention contexts</span>
              </h2>
              <p className="type-body text-gray-600 mb-4">
                The worklist you just played with is a full-day professional tool, information-dense on purpose. But
                the same AI also surfaces nudges to doctors <em>mid-visit, while a patient sits across from them</em>.
              </p>
              <p className="type-body text-gray-600">
                I led both ends: a compact desktop widget that earns a glance without competing with the patient, and
                the dense review workspace it hands off to. Same engine, opposite information densities, because the
                attention economics of the two users are opposite.
              </p>
            </div>
            <div>
              <DensityDiagram primaryColor={primaryColor} />
            </div>
          </div>
        </div>
      </section>

      {/* ========== AI trust iterations ========== */}
      <section
        className="w-full py-20 transition-colors duration-500"
        style={{ backgroundColor: `${primaryColor}0A` }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="type-eyebrow text-gray-500 mb-3">The hardest call</p>
            <h2 className="type-h2">
              How loudly should the AI announce itself?
            </h2>
            <p className="type-body text-gray-600 mt-4">
              Meeting clinicians where they are includes their trust posture. Doctors asked us to label what the AI
              found versus what humans found. Too loud, and they dismissed the AI wholesale. Too quiet, and they
              couldn&apos;t calibrate trust. I tested three levels:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                variant: "separate" as const,
                alt: "Iteration A: separate AI evidence section",
                title: "A · Separate AI section",
                body: "Doctors disregarded AI content entirely. Hard separation turned into bias against the machine.",
                verdict: "Rejected",
                pass: false,
              },
              {
                variant: "icon" as const,
                alt: "Iteration B: icon marking AI-found items",
                title: "B · Icon on AI items",
                body: "Fewer dismissals, but the icon needed training to understand and collided with existing icons.",
                verdict: "Rejected",
                pass: false,
              },
              {
                variant: "italic" as const,
                alt: "Iteration C: italic text for AI-found items",
                title: "C · Italics for AI items",
                body: "Subtle provenance. Power users could read the source; nobody was dissuaded from acting.",
                verdict: "Shipped",
                pass: true,
              },
            ].map((it) => (
              <div
                key={it.title}
                className={`rounded-xl border bg-white overflow-hidden ${
                  it.pass ? "border-green-200 shadow-lg" : "border-gray-200"
                }`}
              >
                <div className="h-56 flex items-center justify-center bg-gray-50 border-b border-gray-100 px-5">
                  <AiProvenanceMockup variant={it.variant} label={it.alt} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="type-h3">{it.title}</h3>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        it.pass ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {it.verdict}
                    </span>
                  </div>
                  <p className="type-small text-gray-600">{it.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="type-h3 text-center text-gray-900 max-w-2xl mx-auto mt-12">
            The middle ground existed. Finding it took <span style={{ color: primaryColor }}>behavioral evidence</span>,
            not opinion.
          </p>
        </div>
      </section>

      {/* ========== Proof ========== */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="font-serif leading-none select-none mb-4"
          style={{ color: primaryColor, opacity: 0.3, fontSize: "4.5rem" }}
        >
          &ldquo;
        </div>
        <blockquote className="type-h2 text-gray-900 mb-8">
          The new 3M redesign is a lot better to look at compared to the old design. It has been{" "}
          <span style={{ color: primaryColor }}>much easier for the team to prioritize</span> what to work on.
        </blockquote>
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-10">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: primaryColor }}
          />
          <cite className="not-italic type-caption text-gray-600">
            CDI team · Lehigh Valley Health Network
          </cite>
        </div>
        <p className="type-body text-gray-600">
          This work contributed to a <em>25% lift in chronic-condition diagnosis capture</em>, recovering millions of
          dollars in missed diagnoses and contributing to 3M retaining major contracts from large world-class
          healthcare organizations.
        </p>

        {/* Adoption showcase */}
        <div className="mt-12">
          <p className="type-eyebrow text-gray-500 mb-6">Widespread adoption at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            <Image
              src="/3m/logos/lvhn.png"
              alt="Lehigh Valley Health Network"
              width={960}
              height={194}
              className="h-7 w-auto"
            />
            <Image
              src="/3m/logos/baylor-scott-white.png"
              alt="Baylor Scott & White Health"
              width={1200}
              height={212}
              className="h-7 w-auto"
            />
            <Image
              src="/3m/logos/ohiohealth.png"
              alt="OhioHealth"
              width={582}
              height={128}
              className="h-6 w-auto"
            />
            <Image
              src="/3m/logos/mayo.png"
              alt="Mayo Clinic"
              width={1420}
              height={273}
              className="h-7 w-auto"
            />
          </div>
        </div>
      </section>

      {/* ========== Learnings ========== */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="type-eyebrow text-gray-500 mb-3">Learnings</p>
          <h2 className="type-h2">
            Three things 3M taught me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              title: "Clicks are a buyer's metric, not a user's",
              body: "Stakeholders judged designs by click count, because clicks are countable. I learned to re-anchor debates on what specialists actually lose: errors, wasted reviews, broken flow.",
            },
            {
              n: "02",
              title: "Not knowing the domain is a research tool",
              body: "I had no medical training in a field full of experts. Asking the basic questions surfaced assumptions everyone else had stopped seeing, and made the tool legible to newcomers too.",
            },
            {
              n: "03",
              title: "Spotting a problem isn't the same as fixing it",
              body: "As the only designer among ~30, I owned whatever I flagged: research recruiting, analytics, advocacy. That instinct is why this rebuild exists at all.",
            },
          ].map((l) => (
            <div
              key={l.n}
              className={`relative rounded-xl border border-gray-200 p-6 ${l.n === "03" ? "md:pb-20" : ""}`}
              style={{ backgroundColor: `${primaryColor}05` }}
            >
              <div className="font-mono text-xs font-semibold mb-3" style={{ color: primaryColor }}>
                {l.n}
              </div>
              <h3 className="type-h3 mb-2">{l.title}</h3>
              <p className="type-small text-gray-600">{l.body}</p>
              {l.n === "03" && (
                <div
                  className="mt-5 w-full h-36 md:mt-0 md:absolute md:-bottom-12 md:-right-3 md:w-56 md:h-[120px] rounded-md overflow-hidden bg-white p-1 shadow-lg"
                  title="From an internal design-advocacy talk I gave at 3M"
                >
                  <Image
                    src="/3m/advocacy-talk.webp"
                    alt="Lawrence presenting an internal design advocacy talk at 3M, in front of a slide about balancing business, technology, and users"
                    width={448}
                    height={240}
                    className="w-full h-full object-cover rounded-[4px] saturate-[0.85]"
                    style={{ objectPosition: "50% 42%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== Closing CTA ========== */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl px-8 py-14 text-center text-white transition-colors duration-500"
          style={{ backgroundColor: primaryColor }}
        >
          <h2 className="type-h2 mb-4">
            Liked poking around the demo?
          </h2>
          <p className="type-body text-white/85 max-w-xl mx-auto mb-8">
            There&apos;s more where that came from. Or reach out and I&apos;ll walk you through the decisions behind
            it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <button className="px-6 py-3 bg-white rounded-md font-medium hover:opacity-90 transition-opacity" style={{ color: primaryColor }}>
                View more projects
              </button>
            </Link>
            <a href="mailto:lxzhengdesign@gmail.com">
              <button className="px-6 py-3 border border-white/60 rounded-md font-medium text-white hover:bg-white/10 transition-colors">
                Contact me
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
