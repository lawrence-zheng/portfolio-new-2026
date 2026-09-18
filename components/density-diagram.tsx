"use client"

/**
 * Two attention budgets, drawn as two seesaws.
 * Each beam balances how much lands on screen against the pressure to keep it
 * readable. The specialist's context is a light counterweight, so the beam holds
 * a heavy load. The doctor's context is a heavy counterweight, so almost nothing
 * balances it. Labels and captions are HTML so they stay legible at any width.
 */

const INK = "#111827"
const MUTED = "#6b7280"
const LINE = "#d1d5db"
const BLOCK = "#e5e7eb"

export default function DensityDiagram({ primaryColor }: { primaryColor: string }) {
  const accent = primaryColor
  const accentFill = `${primaryColor}14`

  return (
    <figure
      className="m-0 rounded-xl border border-gray-200 py-8 px-6"
      style={{ backgroundColor: `${primaryColor}08` }}
    >
      {/* shared axis */}
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
        <span>more on screen</span>
        <span>more restraint</span>
      </div>

      {/* ===== Specialist ===== */}
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.13em] text-gray-500">
        Specialist · a desk and all day
      </p>
      <svg
        viewBox="0 0 460 150"
        className="w-full h-auto mt-1"
        role="img"
        aria-label="A seesaw tipped toward the information side: a tall stack of data blocks outweighs a small counterweight labelled a desk, all day."
      >
        {/* load: many blocks */}
        {[123, 113, 103, 93].map((y) =>
          [18, 36, 54, 72].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="15" height="6" rx="2" fill={BLOCK} />)
        )}
        {/* counterweight */}
        <rect x="372" y="62" width="76" height="24" rx="5" fill="#ffffff" stroke={LINE} strokeWidth="1.2" />
        <text x="410" y="78" fontSize="9.5" fill={MUTED} textAnchor="middle" className="font-sans">
          a desk, all day
        </text>
        {/* beam + platforms */}
        <rect x="12" y="130" width="76" height="5" rx="2.5" fill={INK} />
        <rect x="372" y="86" width="76" height="5" rx="2.5" fill={INK} />
        <line x1="50" y1="130" x2="410" y2="86" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {/* fulcrum */}
        <polygon points="230,104 248,138 212,138" fill={INK} />
        <line x1="40" y1="138" x2="420" y2="138" stroke={LINE} strokeWidth="1.4" />
      </svg>
      <p className="mt-3 text-[15px] font-semibold text-gray-900">~40 data points on one screen</p>
      <p className="text-sm text-gray-600">Comparing beats calm.</p>

      <div className="my-7 border-t border-gray-200" />

      {/* ===== Doctor ===== */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.13em]" style={{ color: accent }}>
        Doctor · a patient in the room
      </p>
      <svg
        viewBox="0 0 460 150"
        className="w-full h-auto mt-1"
        role="img"
        aria-label="A seesaw tipped the other way: three data blocks are outweighed by a large counterweight labelled a patient in the room."
      >
        {/* load: three blocks */}
        {[25, 43, 61].map((x) => (
          <rect key={x} x={x} y="76" width="15" height="6" rx="2" fill={BLOCK} />
        ))}
        {/* counterweight */}
        <rect x="372" y="84" width="76" height="46" rx="6" fill={accentFill} stroke={accent} strokeWidth="1.4" />
        <text x="410" y="103" fontSize="9.5" fill={accent} textAnchor="middle" className="font-sans">
          a patient in
        </text>
        <text x="410" y="116" fontSize="9.5" fill={accent} textAnchor="middle" className="font-sans">
          the room
        </text>
        {/* beam + platforms */}
        <rect x="12" y="86" width="76" height="5" rx="2.5" fill={accent} />
        <rect x="372" y="130" width="76" height="5" rx="2.5" fill={accent} />
        <line x1="50" y1="86" x2="410" y2="130" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        {/* fulcrum */}
        <polygon points="230,104 248,138 212,138" fill={accent} />
        <line x1="40" y1="138" x2="420" y2="138" stroke={LINE} strokeWidth="1.4" />
      </svg>
      <p className="mt-3 text-[15px] font-semibold" style={{ color: accent }}>
        3 data points, one decision
      </p>
      <p className="text-sm text-gray-600">Calm beats completeness.</p>
    </figure>
  )
}
