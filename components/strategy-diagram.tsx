"use client"

/**
 * The 3M strategy argument as a theme-native inline diagram.
 * The leadership ask opens the diagram as a chat-style message, flowing
 * into the goal, the two routes, the desk reality, and the outcomes.
 * Desktop: wide layout with gently arcing feedback loops in the margins.
 * Mobile: the same argument stacked tighter, loops omitted.
 * Inherits the page's font stack via className and takes the active
 * primaryColor so it re-tints with the rest of the page.
 */

const INK = "#111827"
const SUB = "#4b5563"
const MUTED = "#6b7280"
const FAINT = "#9ca3af"
const LINE = "#e5e7eb"
const PANEL = "#f3f4f6"
const RED = "#dc2626"

const ARIA =
  "Systems diagram opening with leadership's ask to get users working in the app instead of elsewhere, flowing into the adoption goal, two routes to it, and the clinician's real desk in between. Trying to replace other apps' functionality stalls because only about 20% work from the worklist; fitting the existing workflow compounds adoption."

export default function StrategyDiagram({ primaryColor }: { primaryColor: string }) {
  const accent = primaryColor
  const accentFill = `${primaryColor}14`
  const accentSoft = `${primaryColor}33`

  return (
    <figure className="m-0">
      {/* ===== Desktop / tablet ===== */}
      <svg viewBox="0 0 1200 675" role="img" aria-label={ARIA} className="hidden md:block w-full h-auto font-sans">
        <defs>
          <marker id="sd-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
          </marker>
          <marker id="sd-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={RED} />
          </marker>
          <marker id="sd-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>

        {/* the ask, styled like the chat-thread mockup */}
        <rect x="320" y="8" width="496" height="66" rx="14" fill={PANEL} stroke="#d1d5db" strokeWidth="1" />
        <circle cx="355" cy="42" r="17" fill={INK} />
        <text x="355" y="47" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">LT</text>
        <text x="385" y="33" fontSize="14" fontWeight="700" fill={INK}>
          Leadership <tspan fontWeight="400" fontSize="12" fill={MUTED}>product VP · at the start</tspan>
        </text>
        <text x="385" y="57" fontSize="15.5" fill={SUB}>Let’s get them working in our app instead of elsewhere.</text>
        <line x1="600" y1="74" x2="600" y2="96" stroke={INK} strokeWidth="1.5" markerEnd="url(#sd-ink)" />

        {/* goal */}
        <rect x="430" y="102" width="340" height="68" rx="11" fill="#ffffff" stroke={INK} strokeWidth="1.7" />
        <text x="600" y="128" fontSize="11" letterSpacing="1.5" fill={MUTED} textAnchor="middle">THE GOAL BEHIND THE ASK</text>
        <text x="600" y="152" fontSize="16" fontWeight="700" fill={INK} textAnchor="middle">greater adoption → revenue</text>

        {/* fork */}
        <path d="M 600 170 C 600 202, 310 200, 310 224" fill="none" stroke={INK} strokeWidth="1.5" markerEnd="url(#sd-ink)" />
        <path d="M 600 170 C 600 202, 890 200, 890 224" fill="none" stroke={INK} strokeWidth="1.5" markerEnd="url(#sd-ink)" />

        {/* routes */}
        <rect x="160" y="230" width="300" height="72" rx="11" fill="#ffffff" stroke={FAINT} strokeWidth="1.4" strokeDasharray="7 5" />
        <text x="310" y="256" fontSize="10.5" letterSpacing="1" fontWeight="700" fill={RED} textAnchor="middle">THE ASSUMED ROUTE</text>
        <text x="310" y="280" fontSize="14" fill={INK} textAnchor="middle">try to replace other apps’ functionality</text>

        <rect x="740" y="230" width="300" height="72" rx="11" fill={accentFill} stroke={accent} strokeWidth="1.7" />
        <text x="890" y="256" fontSize="10.5" letterSpacing="1" fontWeight="700" fill={accent} textAnchor="middle">THE ROUTE I ARGUED FOR</text>
        <text x="890" y="280" fontSize="14" fill={INK} textAnchor="middle">fit the workflow that already exists</text>

        <line x1="310" y1="302" x2="310" y2="348" stroke={INK} strokeWidth="1.5" markerEnd="url(#sd-ink)" />
        <line x1="890" y1="302" x2="890" y2="348" stroke={accent} strokeWidth="1.5" markerEnd="url(#sd-acc)" />

        {/* reality band with desk illustration */}
        <rect x="140" y="354" width="920" height="190" rx="11" fill="#ffffff" fillOpacity="0.55" stroke={INK} strokeWidth="1.3" />
        <text x="162" y="380" fontSize="11" letterSpacing="1.5" fill={MUTED}>REALITY CHECK: THE CLINICIAN’S DESK (MY RESEARCH)</text>

        {/* team-lead spreadsheet */}
        <rect x="230" y="420" width="140" height="80" rx="5" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <rect x="230" y="420" width="140" height="20" rx="5" fill={LINE} />
        <line x1="230" y1="460" x2="370" y2="460" stroke={LINE} strokeWidth="1.3" />
        <line x1="230" y1="480" x2="370" y2="480" stroke={LINE} strokeWidth="1.3" />
        <line x1="277" y1="440" x2="277" y2="500" stroke={LINE} strokeWidth="1.3" />
        <line x1="323" y1="440" x2="323" y2="500" stroke={LINE} strokeWidth="1.3" />
        <text x="300" y="526" fontSize="12.5" fill={SUB} textAnchor="middle">team-lead lists (Excel / Access)</text>

        {/* Epic, monitor 1 */}
        <rect x="480" y="392" width="240" height="110" rx="7" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        <rect x="490" y="402" width="220" height="12" rx="2" fill={LINE} />
        <rect x="490" y="422" width="52" height="70" rx="2" fill={PANEL} />
        <rect x="550" y="426" width="150" height="8" rx="2" fill={LINE} />
        <rect x="550" y="441" width="125" height="8" rx="2" fill={LINE} />
        <rect x="550" y="456" width="150" height="8" rx="2" fill={LINE} />
        <rect x="550" y="471" width="105" height="8" rx="2" fill={LINE} />
        <text x="600" y="526" fontSize="12.5" fill={SUB} textAnchor="middle">
          <tspan fontWeight="700" fill={INK}>Epic</tspan> · EHR of record · monitor 1
        </text>

        {/* glance annotation */}
        <path d="M 720 400 C 758 374, 794 376, 824 414" fill="none" stroke={accent} strokeWidth="1.3" strokeDasharray="5 5" />
        <polygon points="819,408 827,417 822,405" fill={accent} />
        <text x="775" y="372" fontSize="12" fontStyle="italic" fill={MUTED} textAnchor="middle">a glance, not a destination</text>

        {/* our app, monitor 2 */}
        <rect x="820" y="420" width="140" height="80" rx="6" fill="#ffffff" stroke={accent} strokeWidth="1.7" />
        <rect x="830" y="430" width="120" height="10" rx="2" fill={accentSoft} />
        <rect x="830" y="446" width="120" height="14" rx="2" fill={accent} />
        <rect x="830" y="464" width="120" height="14" rx="2" fill={accentFill} />
        <rect x="830" y="482" width="120" height="14" rx="2" fill={accentFill} />
        <text x="890" y="526" fontSize="12.5" fill={SUB} textAnchor="middle">
          <tspan fontWeight="700" fill={accent}>our app</tspan> · monitor 2
        </text>

        <line x1="310" y1="544" x2="310" y2="590" stroke={INK} strokeWidth="1.5" markerEnd="url(#sd-ink)" />
        <line x1="890" y1="544" x2="890" y2="590" stroke={accent} strokeWidth="1.5" markerEnd="url(#sd-acc)" />

        {/* outcomes */}
        <rect x="140" y="596" width="340" height="64" rx="11" fill="#ffffff" stroke={RED} strokeWidth="1.5" strokeDasharray="7 5" />
        <text x="310" y="622" fontSize="15" fontWeight="700" fill={RED} textAnchor="middle">✗  stalls</text>
        <text x="310" y="644" fontSize="13" fill={SUB} textAnchor="middle">only ~20% work from the worklist</text>

        <rect x="720" y="596" width="340" height="64" rx="11" fill={accentFill} stroke={accent} strokeWidth="1.7" />
        <text x="890" y="622" fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">✓  compounds</text>
        <text x="890" y="644" fontSize="13" fill={INK} textAnchor="middle">value lands where 100% already work</text>

        {/* return loops: single gentle arcs through the margins */}
        <path d="M 134 628 C 5 560, 5 170, 424 136" fill="none" stroke={RED} strokeWidth="1.2" strokeDasharray="6 6" opacity="0.55" markerEnd="url(#sd-red)" />
        <path d="M 1066 628 C 1195 560, 1195 170, 776 136" fill="none" stroke={accent} strokeWidth="1.3" opacity="0.65" markerEnd="url(#sd-acc)" />
      </svg>

      {/* ===== Mobile, stacked tighter, loops omitted ===== */}
      <svg viewBox="0 0 420 496" role="img" aria-label={ARIA} className="md:hidden w-full h-auto font-sans">
        <defs>
          <marker id="sdm-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
          </marker>
          <marker id="sdm-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>

        {/* the ask, styled like the chat-thread mockup */}
        <rect x="78" y="12" width="250" height="58" rx="10" fill={PANEL} stroke="#d1d5db" strokeWidth="1" />
        <circle cx="100" cy="36" r="12" fill={INK} />
        <text x="100" y="40" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">LT</text>
        <text x="122" y="30" fontSize="11" fontWeight="700" fill={INK}>
          Leadership <tspan fontWeight="400" fontSize="8.5" fill={MUTED}>product VP · at the start</tspan>
        </text>
        <text x="122" y="47" fontSize="11" fill={SUB}>Let’s get them working in our app</text>
        <text x="122" y="61" fontSize="11" fill={SUB}>instead of elsewhere.</text>
        <line x1="210" y1="70" x2="210" y2="88" stroke={INK} strokeWidth="1.2" markerEnd="url(#sdm-ink)" />

        {/* goal */}
        <rect x="85" y="94" width="250" height="52" rx="9" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <text x="210" y="114" fontSize="8.5" letterSpacing="1" fill={MUTED} textAnchor="middle">THE GOAL BEHIND THE ASK</text>
        <text x="210" y="132" fontSize="11.5" fontWeight="700" fill={INK} textAnchor="middle">greater adoption → revenue</text>

        {/* fork */}
        <path d="M 210 146 C 210 160, 107 158, 107 170" fill="none" stroke={INK} strokeWidth="1.2" markerEnd="url(#sdm-ink)" />
        <path d="M 210 146 C 210 160, 313 158, 313 170" fill="none" stroke={INK} strokeWidth="1.2" markerEnd="url(#sdm-ink)" />

        {/* routes */}
        <rect x="12" y="176" width="190" height="64" rx="9" fill="#ffffff" stroke={FAINT} strokeWidth="1.2" strokeDasharray="5 4" />
        <text x="107" y="196" fontSize="8.5" letterSpacing="0.5" fontWeight="700" fill={RED} textAnchor="middle">THE ASSUMED ROUTE</text>
        <text x="107" y="213" fontSize="10.5" fill={INK} textAnchor="middle">try to replace other</text>
        <text x="107" y="227" fontSize="10.5" fill={INK} textAnchor="middle">apps’ functionality</text>

        <rect x="218" y="176" width="190" height="64" rx="9" fill={accentFill} stroke={accent} strokeWidth="1.4" />
        <text x="313" y="196" fontSize="8.5" letterSpacing="0.5" fontWeight="700" fill={accent} textAnchor="middle">THE ROUTE I ARGUED FOR</text>
        <text x="313" y="213" fontSize="10.5" fill={INK} textAnchor="middle">fit the workflow that</text>
        <text x="313" y="227" fontSize="10.5" fill={INK} textAnchor="middle">already exists</text>

        <line x1="107" y1="240" x2="107" y2="266" stroke={INK} strokeWidth="1.2" markerEnd="url(#sdm-ink)" />
        <line x1="313" y1="240" x2="313" y2="266" stroke={accent} strokeWidth="1.2" markerEnd="url(#sdm-acc)" />

        {/* reality band */}
        <rect x="12" y="272" width="396" height="126" rx="9" fill="#ffffff" fillOpacity="0.55" stroke={INK} strokeWidth="1.1" />
        <text x="210" y="290" fontSize="8.5" letterSpacing="1" fill={MUTED} textAnchor="middle">REALITY CHECK: THE CLINICIAN’S DESK (MY RESEARCH)</text>

        {/* spreadsheet */}
        <rect x="28" y="300" width="82" height="50" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.1" />
        <rect x="28" y="300" width="82" height="14" rx="3" fill={LINE} />
        <line x1="28" y1="326" x2="110" y2="326" stroke={LINE} strokeWidth="1" />
        <line x1="28" y1="338" x2="110" y2="338" stroke={LINE} strokeWidth="1" />
        <line x1="55" y1="314" x2="55" y2="350" stroke={LINE} strokeWidth="1" />
        <line x1="83" y1="314" x2="83" y2="350" stroke={LINE} strokeWidth="1" />

        {/* Epic */}
        <rect x="128" y="296" width="134" height="62" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <rect x="134" y="302" width="122" height="7" rx="2" fill={LINE} />
        <rect x="134" y="313" width="26" height="40" rx="2" fill={PANEL} />
        <rect x="166" y="315" width="86" height="5" rx="2" fill={LINE} />
        <rect x="166" y="324" width="70" height="5" rx="2" fill={LINE} />
        <rect x="166" y="333" width="86" height="5" rx="2" fill={LINE} />
        <rect x="166" y="342" width="60" height="5" rx="2" fill={LINE} />

        {/* glance */}
        <path d="M 262 302 C 274 288, 288 290, 298 306" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4 4" />
        <polygon points="293,300 299,308 289,306" fill={accent} />

        {/* our app */}
        <rect x="286" y="310" width="92" height="48" rx="4" fill="#ffffff" stroke={accent} strokeWidth="1.3" />
        <rect x="292" y="316" width="80" height="6" rx="2" fill={accentSoft} />
        <rect x="292" y="326" width="80" height="8" rx="2" fill={accent} />
        <rect x="292" y="337" width="80" height="8" rx="2" fill={accentFill} />
        <rect x="292" y="348" width="80" height="8" rx="2" fill={accentFill} />

        {/* labels */}
        <text x="69" y="376" fontSize="9" fontWeight="700" fill={INK} textAnchor="middle">Team-lead lists</text>
        <text x="69" y="388" fontSize="8" fill={MUTED} textAnchor="middle">Excel / Access</text>
        <text x="195" y="376" fontSize="9" fontWeight="700" fill={INK} textAnchor="middle">Epic</text>
        <text x="195" y="388" fontSize="8" fill={MUTED} textAnchor="middle">EHR of record · monitor 1</text>
        <text x="332" y="376" fontSize="9" fontWeight="700" fill={accent} textAnchor="middle">our app</text>
        <text x="332" y="388" fontSize="8" fill={MUTED} textAnchor="middle">monitor 2</text>

        <line x1="107" y1="402" x2="107" y2="426" stroke={INK} strokeWidth="1.2" markerEnd="url(#sdm-ink)" />
        <line x1="313" y1="402" x2="313" y2="426" stroke={accent} strokeWidth="1.2" markerEnd="url(#sdm-acc)" />

        {/* outcomes */}
        <rect x="12" y="432" width="190" height="56" rx="9" fill="#ffffff" stroke={RED} strokeWidth="1.3" strokeDasharray="5 4" />
        <text x="107" y="452" fontSize="11" fontWeight="700" fill={RED} textAnchor="middle">✗  stalls</text>
        <text x="107" y="467" fontSize="9.5" fill={SUB} textAnchor="middle">only ~20% work from</text>
        <text x="107" y="479" fontSize="9.5" fill={SUB} textAnchor="middle">the worklist</text>

        <rect x="218" y="432" width="190" height="56" rx="9" fill={accentFill} stroke={accent} strokeWidth="1.4" />
        <text x="313" y="452" fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">✓  compounds</text>
        <text x="313" y="467" fontSize="9.5" fill={INK} textAnchor="middle">value lands where</text>
        <text x="313" y="479" fontSize="9.5" fill={INK} textAnchor="middle">100% already work</text>
      </svg>
    </figure>
  )
}
