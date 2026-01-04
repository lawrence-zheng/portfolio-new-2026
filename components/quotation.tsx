"use client"

import type React from "react"

interface QuotationProps {
  children: React.ReactNode
  attribution?: string
  isEmphasized?: boolean
  isFullWidth?: boolean
  accentColor?: string
}

export default function Quotation({
  children,
  attribution,
  isEmphasized = false,
  isFullWidth = true,
  accentColor = "#4EB1B3",
}: QuotationProps) {
  return (
    <div
      className={`my-8 ${isFullWidth ? "w-full" : "w-full md:w-1/2 mx-auto"} ${
        isEmphasized ? "py-8 px-8" : "py-6 px-6"
      } relative bg-white`}
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: `${accentColor}15`, // 15% opacity of accent color
        borderLeftWidth: "4px", // Keep the left border thicker
        borderLeftColor: accentColor, // Keep the left border with full accent color
        backgroundColor: isEmphasized ? `${accentColor}05` : "white", // 5% opacity
        borderRadius: "0 0.5rem 0.5rem 0", // Only round the right corners, keep left corners square
      }}
    >
      {/* Quotation mark using the provided SVG */}
      <div
        className="absolute -top-6 left-4"
        style={{
          opacity: isEmphasized ? 0.25 : 0.15,
          width: isEmphasized ? "60px" : "48px",
          height: isEmphasized ? "60px" : "48px",
        }}
      >
        <svg
          viewBox="0 0 349.078 349.078"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: accentColor,
            width: "100%",
            height: "100%",
          }}
        >
          <g>
            <path
              d="M150.299,26.634v58.25c0,7.9-6.404,14.301-14.304,14.301c-28.186,0-43.518,28.909-45.643,85.966h45.643
              c7.9,0,14.304,6.407,14.304,14.304v122.992c0,7.896-6.404,14.298-14.304,14.298H14.301C6.398,336.745,0,330.338,0,322.447V199.455
              c0-27.352,2.754-52.452,8.183-74.611c5.568-22.721,14.115-42.587,25.396-59.048c11.608-16.917,26.128-30.192,43.16-39.44
              C93.886,17.052,113.826,12.333,136,12.333C143.895,12.333,150.299,18.734,150.299,26.634z M334.773,99.186
              c7.896,0,14.305-6.407-14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301c-22.165,0-42.108,4.72-59.249,14.023
              c-17.035,9.248-31.563,22.523-43.173,39.44c-11.277,16.461-19.824,36.328-25.393,59.054c-5.426,22.166-8.18,47.266-8.18,74.605
              v122.992c0,7.896,6.406,14.298,14.304,14.298h121.69c7.896,0,14.299-6.407,14.299-14.298V199.455
              c0-7.896-6.402-14.304-14.299-14.304h-44.992C291.873,128.095,306.981,99.186,334.773,99.186z"
            />
          </g>
        </svg>
      </div>

      <blockquote
        className={`relative z-10 ${isEmphasized ? "text-xl md:text-2xl" : "text-lg"} font-medium text-gray-600 pl-2`}
        style={{ letterSpacing: "normal" }}
      >
        {children}
      </blockquote>

      {attribution && (
        <footer className="mt-4">
          <cite
            className={`not-italic ${isEmphasized ? "text-base font-medium" : "text-sm"} opacity-75`}
            style={{ color: isEmphasized ? accentColor : "inherit", letterSpacing: "normal" }}
          >
            — {attribution}
          </cite>
        </footer>
      )}
    </div>
  )
}
