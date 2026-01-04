import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ColorProvider } from "@/context/color-context"
import Footer from "@/components/footer"
import ScrollManager from "@/components/scroll-manager"
import PageTransition from "@/components/page-transition"

export const metadata: Metadata = {
  title: "Lawrence Zheng - Product Designer",
  description: "Portfolio of Lawrence Zheng, Product Designer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Add a script to prevent scroll position restoration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.addEventListener('beforeunload', () => {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
      </head>
      <body className="font-sans bg-white text-black antialiased min-h-screen">
        <ColorProvider>
          {/* Add ScrollManager to handle scroll restoration */}
          <ScrollManager />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
            <Footer />
          </PageTransition>
        </ColorProvider>
      </body>
    </html>
  )
}
