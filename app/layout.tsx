import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rafly. Web Developer & UI/UX',
  description:
    'Saya Rafly, web developer dan mahasiswa Informatika ITERA. Saya membangun website UMKM, company profile, dan portfolio personal yang cepat, rapi, dan siap dipakai bisnis.',
  keywords: [
    'web developer indonesia',
    'freelance web developer lampung',
    'jasa website UMKM',
    'portfolio rafly',
    'informatika itera',
    'next.js developer',
    'react developer indonesia',
  ],
  authors: [{ name: 'Muhammad Rafly Yahya Ramadhan' }],
  creator: 'Muhammad Rafly Yahya Ramadhan',
  openGraph: {
    title: 'Rafly. Web Developer & UI/UX',
    description: 'Website yang tidak hanya terlihat bagus, tapi bekerja untuk bisnis Anda.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafly. Web Developer & UI/UX',
    description: 'Website yang tidak hanya terlihat bagus, tapi bekerja untuk bisnis Anda.',
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
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-zinc-950 text-zinc-50 font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
