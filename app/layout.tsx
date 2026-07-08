import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rafly — Web Developer & UI/UX',
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
    title: 'Rafly — Web Developer & UI/UX',
    description: 'Website yang tidak hanya terlihat bagus, tapi bekerja untuk bisnis Anda.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafly — Web Developer & UI/UX',
    description: 'Website yang tidak hanya terlihat bagus, tapi bekerja untuk bisnis Anda.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060B14',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        {/* Google Fonts — preconnect for speed, loaded by browser (not at build time) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-base text-tx-1 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
