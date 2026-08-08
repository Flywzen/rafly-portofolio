import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import { GeistMono } from 'geist/font/mono'
import BackgroundSystem from '@/components/BackgroundSystem'
import CustomCursor from '@/components/CustomCursor'
import IntroCrawl from '@/components/IntroCrawl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Rafly, Software Engineer',
    template: '%s, Rafly',
  },
  description:
    "I'm Rafly, a Computer Science student at ITERA. I build software and study how it breaks, from the browser down to the request layer.",
  keywords: [
    'software engineer indonesia',
    'web developer lampung',
    'frontend engineer portfolio',
    'portfolio rafly',
    'computer science itera',
    'next.js developer',
    'react developer indonesia',
  ],
  authors: [{ name: 'Muhammad Rafly Yahya Ramadhan' }],
  creator: 'Muhammad Rafly Yahya Ramadhan',
  openGraph: {
    title: 'Rafly, Software Engineer',
    description: 'I build software and study how it breaks.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafly, Software Engineer',
    description: 'I build software and study how it breaks.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0C',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="bg-ink text-paper font-sans antialiased">
        <IntroCrawl />
        <CustomCursor />
        <BackgroundSystem />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
