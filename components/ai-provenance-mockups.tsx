"use client"

import type React from "react"

/**
 * Three ways to mark which diagnoses the AI found, drawn as compact widget
 * mockups. Every variant shows the same four diagnoses (two found by humans,
 * two by AI) so the only thing that changes between cards is the provenance
 * treatment. HTML rather than screenshots so they stay crisp and fill the frame.
 */

type Variant = "separate" | "icon" | "italic"

type Dx = { name: string; code: string; ai: boolean; queried?: boolean }

const NEEDS_DOCS: Dx[] = [
  { name: "Type 2 diabetes w/ neuropathy", code: "E11.42", ai: false, queried: true },
  { name: "Polyneuropathy, unspecified", code: "G62.9", ai: true },
]

const READY: Dx[] = [
  { name: "Chronic atrial fibrillation", code: "I48.20", ai: false },
  { name: "Morbid obesity", code: "E66.01", ai: true },
]

const RED = "#b4535a"
const GREEN = "#5d8a3a"
const AMBER = "#c27c2c"

function StatusIcon({ ok }: { ok: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" className="shrink-0" aria-hidden="true">
      <circle cx="6" cy="6" r="6" fill={ok ? GREEN : RED} />
      {ok ? (
        <path d="M3.4 6.2l1.7 1.7 3.5-3.6" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4.2 4.2l3.6 3.6M7.8 4.2l-3.6 3.6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  )
}

function Bolt({ color = AMBER }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" className="shrink-0" aria-hidden="true">
      <path d="M7 0.5L2 7h3.5L4.5 11.5 10 5H6.5L7 0.5z" fill={color} />
    </svg>
  )
}

function QueryIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" className="shrink-0" aria-hidden="true">
      <path
        d="M1.5 2.5h9v6H5l-2.5 2v-2h-1z"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GroupLabel({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 text-[11px] font-semibold leading-none mt-2.5 mb-1"
      style={{ color: ok ? GREEN : RED }}
    >
      <StatusIcon ok={ok} />
      {children}
    </div>
  )
}

function Row({ dx, variant }: { dx: Dx; variant: Variant }) {
  const italic = variant === "italic" && dx.ai
  return (
    <div className="flex items-center gap-1.5 py-[3px] text-[11px] leading-tight text-gray-800">
      {variant === "icon" && (
        <span className="w-2.5 flex justify-center">
          {dx.ai ? <Bolt color="#6b7280" /> : dx.queried ? <QueryIcon /> : null}
        </span>
      )}
      <span className={`flex-1 min-w-0 truncate ${italic ? "italic" : ""}`}>{dx.name}</span>
      <span className={`shrink-0 tabular-nums text-gray-400 ${italic ? "italic" : ""}`}>{dx.code}</span>
    </div>
  )
}

function Header({ subtitle }: { subtitle?: React.ReactNode }) {
  return (
    <div className="pb-1.5 border-b border-gray-100">
      <div className="text-[12px] font-semibold leading-none" style={{ color: AMBER }}>
        HCC Summary
      </div>
      {subtitle && <div className="mt-1 text-[10px] leading-tight text-gray-500">{subtitle}</div>}
    </div>
  )
}

function SeparateMockup() {
  const human = [...NEEDS_DOCS, ...READY].filter((d) => !d.ai)
  const ai = [...NEEDS_DOCS, ...READY].filter((d) => d.ai)
  return (
    <div className="w-full space-y-2">
      <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm">
        <Header />
        <GroupLabel ok={false}>Needs documentation</GroupLabel>
        <Row dx={human[0]} variant="separate" />
        <GroupLabel ok>Ready to code</GroupLabel>
        <Row dx={human[1]} variant="separate" />
      </div>
      <div className="rounded-md border border-dashed px-3 py-2" style={{ borderColor: `${AMBER}80`, backgroundColor: `${AMBER}0d` }}>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold leading-none mb-1" style={{ color: AMBER }}>
          <Bolt />
          AI Evidence
        </div>
        {ai.map((dx) => (
          <Row key={dx.code} dx={dx} variant="separate" />
        ))}
      </div>
    </div>
  )
}

function ListMockup({ variant }: { variant: "icon" | "italic" }) {
  return (
    <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <Header subtitle={variant === "italic" ? <span className="italic">Items in italics were identified by AI.</span> : undefined} />
      <GroupLabel ok={false}>Needs documentation</GroupLabel>
      {NEEDS_DOCS.map((dx) => (
        <Row key={dx.code} dx={dx} variant={variant} />
      ))}
      <GroupLabel ok>Ready to code</GroupLabel>
      {READY.map((dx) => (
        <Row key={dx.code} dx={dx} variant={variant} />
      ))}
    </div>
  )
}

export default function AiProvenanceMockup({ variant, label }: { variant: Variant; label: string }) {
  return (
    <div role="img" aria-label={label} className="w-full font-sans select-none">
      {variant === "separate" ? <SeparateMockup /> : <ListMockup variant={variant} />}
    </div>
  )
}
