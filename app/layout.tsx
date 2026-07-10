import type { Metadata, Viewport } from 'next'
import '@fontsource/press-start-2p'
import '@fontsource/vt323'
import { GeistMono } from 'geist/font/mono'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rafly. Web Developer & UI/UX',
  description:
    "I'm Rafly, a web developer and Computer Science student at ITERA. I build small business websites, company profiles, and personal portfolios that are fast, clean, and ready for real use.",
  keywords: [
    'web developer indonesia',
    'freelance web developer lampung',
    'small business website services',
    'portfolio rafly',
    'computer science itera',
    'next.js developer',
    'react developer indonesia',
  ],
  authors: [{ name: 'Muhammad Rafly Yahya Ramadhan' }],
  creator: 'Muhammad Rafly Yahya Ramadhan',
  openGraph: {
    title: 'Rafly. Web Developer & UI/UX',
    description: "A website that doesn't just look good. It works for your business.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafly. Web Developer & UI/UX',
    description: "A website that doesn't just look good. It works for your business.",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="bg-zinc-950 text-zinc-50 font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
