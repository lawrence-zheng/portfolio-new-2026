"use client"

import type React from "react"

import { useRef } from "react"

// CSS to hide scrollbar but allow scrolling
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`

interface TimelinePhase {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  startWeek: number
  endWeek: number
}

interface ProjectTimelineProps {
  phases: TimelinePhase[]
  totalWeeks: number
  accentColor: string
}

export default function ProjectTimeline({ phases, totalWeeks, accentColor }: ProjectTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)

  // Calculate grid template columns based on total weeks
  const gridTemplateColumns = `repeat(${totalWeeks}, minmax(100px, 1fr))`

  return (
    <>
      <style jsx>{scrollbarHideStyles}</style>
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide" ref={timelineRef}>
        <div className="min-w-[800px]">
          {/* Week headers */}
          <div
            className="grid border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-medium"
            style={{ gridTemplateColumns }}
          >
            {Array.from({ length: totalWeeks }).map((_, index) => (
              <div key={`week-${index + 1}`} className="py-3 px-4 border-r border-gray-200 last:border-r-0">
                Week {index + 1}
              </div>
            ))}
          </div>

          {/* Timeline content */}
          <div className="grid gap-4" style={{ gridTemplateColumns }}>
            {phases.map((phase) => {
              // Calculate grid column position
              const startCol = phase.startWeek
              const endCol = phase.endWeek + 1

              return (
                <div
                  key={phase.id}
                  className="rounded-lg border border-gray-200 p-4 transition-all"
                  style={{
                    gridColumn: `${startCol} / ${endCol}`,
                    backgroundColor: `${accentColor}10`, // 10% opacity of accent color
                    borderColor: `${accentColor}30`, // 30% opacity of accent color
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accentColor}20` }} // 20% opacity
                    >
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">{phase.title}</h3>
                      <p className="text-xs text-gray-500">{phase.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
