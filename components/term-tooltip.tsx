"use client"

import { useId, type ReactNode } from "react"

// Shared tooltip look, also used by the demo's "fictional data" pill. Visibility is driven by a `group`
// ancestor; callers set horizontal position and width.
const SHOW = "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
export const TOOLTIP_BUBBLE = `pointer-events-none invisible absolute bottom-full z-20 mb-2 rounded-lg bg-gray-900 px-3 py-2 text-left font-sans text-sm font-normal normal-case leading-snug text-white opacity-0 shadow-lg transition-opacity duration-150 ${SHOW}`
export const TOOLTIP_POINTER = `pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-[3px] -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-gray-900 opacity-0 transition-opacity duration-150 ${SHOW}`

/**
 * Inline jargon with a dashed underline that reveals a definition on hover, keyboard focus, or tap
 * (tapping focuses the button on touch devices). The tooltip anchors to the term's left edge rather
 * than centering, so terms near the start of a narrow column don't push it off-screen; its pointer
 * stays centered on the term.
 */
export default function TermTooltip({ children, definition }: { children: ReactNode; definition: ReactNode }) {
  const id = useId()

  return (
    <span className="group relative inline-block">
      <button
        type="button"
        aria-describedby={id}
        className="cursor-help bg-repeat-x focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-gray-300"
        // A gradient instead of text-decoration: dashed, so the gap between dashes can be set (4px on, 4px off)
        style={{
          backgroundImage: "linear-gradient(to right, #9ca3af 50%, transparent 50%)",
          backgroundSize: "8px 1.5px",
          backgroundPosition: "0 100%",
        }}
      >
        {children}
      </button>
      {/* Pointer: centered on the term, bridging the gap down from the tooltip */}
      <span aria-hidden className={TOOLTIP_POINTER} />
      <span id={id} role="tooltip" className={`${TOOLTIP_BUBBLE} left-0 w-64`}>
        {definition}
      </span>
    </span>
  )
}
