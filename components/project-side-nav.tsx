"use client"

interface ProjectSideNavProps {
  sections: {
    id: string
    label: string
  }[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  accentColor: string
}

export default function ProjectSideNav({
  sections,
  activeSection,
  onSectionClick,
  accentColor = "#4EB1B3",
}: ProjectSideNavProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`text-left py-2 px-4 text-base transition-colors duration-200 relative ${
            activeSection === section.id ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-700"
          }`}
          style={{ letterSpacing: "0em" }}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-200 ${
              activeSection === section.id ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundColor: accentColor }}
          />
          {section.label}
        </button>
      ))}
    </nav>
  )
}
