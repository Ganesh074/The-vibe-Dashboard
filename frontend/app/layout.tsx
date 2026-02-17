import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Vibe Dashboard',
  description: 'A modern dashboard for browsing items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
