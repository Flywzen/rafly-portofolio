
**Muhammad Rafly Yahya Ramadhan**, web developer & UI/UX.

**Live:** [rafly.vercel.app](https://rafly.vercel.app) *(update setelah deploy)*

---

## Stack

| Layer        | Tech                                    |
|--------------|-----------------------------------------|
| Framework    | Next.js 14 (App Router)                 |
| Language     | TypeScript (strict)                     |
| Styling      | Tailwind CSS v3                         |
| Motion       | framer-motion (scroll-reveal + expand/collapse only) |
| Icons        | Lucide React                            |
| Fonts        | Geist Sans + Geist Mono (next/font)     |
| Deployment   | Vercel                                  |
| Source       | GitHub                                  |

Zero external UI libraries. Zero paid dependencies. Zero backend.

---

## Struktur Folder

```
rafly-portfolio/
├── app/
│   ├── layout.tsx          # Root layout: font, metadata, viewport
│   ├── page.tsx            # One-page: menyusun semua section
│   └── globals.css         # Tailwind + design system utilities
│
├── components/
│   ├── Reveal.tsx             # Client, framer-motion scroll-reveal primitives (Reveal, RevealGroup, RevealItem)
│   ├── Navbar.tsx            # Client, sticky nav, mobile menu
│   ├── HeroSection.tsx       # Server, headline, CTA
│   ├── AboutSection.tsx      # Server, bio prose (single column, no duplication)
│   ├── ServicesSection.tsx   # Server, 4 paket jasa + pricing
│   ├── ProjectCard.tsx       # Client, expandable case study card
│   ├── CaseStudyFields.tsx   # Shared row definitions (used by ProjectCard + CaseStudySection)
│   ├── CaseStudySection.tsx  # Server, standalone full case study view
│   ├── FeaturedProjects.tsx  # Server, grid wrapper untuk ProjectCard
│   ├── CybersecuritySection.tsx # Server, dev/sec bridge + write-ups + roadmap
│   ├── ContactSection.tsx    # Server, WhatsApp CTA + kontak
│   └── Footer.tsx            # Server, nav, sosial, copyright
│
├── data/
│   ├── projects.ts         # Typed project data (Project[])
│   ├── services.ts         # Typed service packages (Service[])
│   └── socialLinks.ts      # Typed social links + URL constants
│
├── lib/
│   └── utils.ts            # cn(), merge class names
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces
│
├── public/
│   └── favicon.svg
│
├── .gitignore
├── .eslintrc.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Setup & Jalankan

### 1. Clone repo

```bash
git clone https://github.com/USERNAME/rafly-portfolio.git
cd rafly-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan dev server

```bash
npm run dev
# Buka http://localhost:3000
```

### 4. Build production

```bash
npm run build
npm run start   # Preview production build lokal
```

---

## Deploy ke Vercel

### Cara A: GUI (Direkomendasikan)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import repo dari GitHub
4. Framework Preset: **Next.js** (auto-detect)
5. Klik **Deploy**

Vercel rebuild otomatis setiap `git push` ke branch `main`.

### Cara B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Cara C: GitHub Actions (opsional, advanced)

Buat `.github/workflows/deploy.yml` dengan action `vercel/actions`.

---

## Kustomisasi Konten

Semua konten portfolio ada di folder `data/`, tidak perlu menyentuh komponen.

### Update proyek

Edit `data/projects.ts`:

```typescript
// Ganti '#' dengan URL nyata setelah project live
demoUrl: 'https://nama-project.vercel.app',
githubUrl: 'https://github.com/USERNAME/nama-project',
```

### Update harga jasa

Edit `data/services.ts`, ubah field `price` dan `deliverables`.

### Update link sosial & nomor WhatsApp

Edit `data/socialLinks.ts`:

```typescript
export const WHATSAPP_URL =
  'https://wa.me/628XXXXXXXXX?text=Halo%20Rafly...'
//                  ^^^^^^^^^^ ganti dengan nomor aktif

export const GITHUB_URL   = 'https://github.com/USERNAME_KAMU'
export const LINKEDIN_URL = 'https://linkedin.com/in/USERNAME_KAMU'
export const EMAIL        = 'email@kamu.com'
```

Perubahan di `socialLinks.ts` otomatis tersebar ke semua komponen
(Navbar, Hero, About, Contact, Footer) karena semua import dari sana.

---

## Checklist Sebelum Deploy

- [ ] Ganti `WHATSAPP_URL` dengan nomor WhatsApp aktif di `data/socialLinks.ts`
- [ ] Ganti `GITHUB_URL` dan `LINKEDIN_URL` dengan akun nyata
- [ ] Ganti `EMAIL` dengan email aktif
- [ ] Update `demoUrl` dan `githubUrl` di `data/projects.ts` ketika project live
- [ ] Update nama dan bio di `components/AboutSection.tsx` jika perlu
- [ ] Ganti URL live di baris pertama README ini setelah deploy
- [ ] Test di Chrome mobile (DevTools > Toggle device toolbar)
- [ ] Test smooth scroll semua link navbar
- [ ] Test expand/collapse ProjectCard di mobile
- [ ] Periksa tab `<html lang="id">` sudah benar di `app/layout.tsx`

---

## Checklist Responsif

```
Mobile  (320-480px)  -> hero stack vertikal, navbar hamburger
Tablet  (481-768px)  -> grid 2 kolom services & projects
Desktop (769px+)     -> grid 4 kolom services, 2 kolom projects
```

Test di Chrome: DevTools → Toggle Device Toolbar → pilih Pixel 7, iPhone 14, iPad.

---

## Design System

Monochrome-first with a single accent. Neutrals come from Tailwind's built-in
`zinc` scale (near-black background, near-white text, never pure `#000`/`#fff`).
Category or status distinctions are communicated through text labels and
position, not through a rainbow of colors.

### Warna

| Token          | Hex       | Penggunaan                              |
|----------------|-----------|------------------------------------------|
| `zinc-950`     | `#09090b` | Background utama                        |
| `zinc-900/40`  | —         | Background surface/card (lihat `.surface`) |
| `zinc-50`      | `#fafafa` | Teks utama                              |
| `zinc-400`     | `#a1a1aa` | Teks sekunder                           |
| `zinc-500/600` | —         | Teks muted / label kecil                |
| `accent`       | `#2F5FE0` | Tombol solid (kontras dengan teks putih)|
| `accent-text`  | `#6B93FF` | Teks/link/ikon aksen di atas background gelap |

`accent` dan `accent-text` sengaja dua shade berbeda dari warna yang sama:
`accent` dipakai untuk fill tombol (kontras terhadap teks putih), `accent-text`
dipakai untuk teks/link di atas background gelap. Keduanya sudah dicek lolos
kontras WCAG AA (≥4.5:1).

### Font

- **Satu keluarga font:** [Geist](https://vercel.com/font) (dibuat oleh Vercel),
  `GeistSans` untuk teks umum dan `GeistMono` untuk kode/angka teknis.
- Hierarki dibentuk lewat ukuran dan berat huruf, bukan lewat font kedua.
- Dimuat via package `geist` + `next/font` (zero layout shift, self-hosted, di-cache di edge).

### Komponen Utility

| Class                 | Fungsi                                              |
|-----------------------|------------------------------------------------------|
| `.surface`             | Container dengan border tipis, dipakai hanya saat elevasi punya arti (pricing, project card) |
| `.surface-interactive` | Tambahan hover state untuk `.surface` yang bisa diklik |
| `.btn-primary`         | Tombol solid accent, radius 8px                    |
| `.btn-secondary`       | Tombol outline, radius 8px                          |
| `.tag`                 | Label kecil persegi (bukan pill), netral, untuk metadata yang genuinely enumerable (kategori, stack, topik) |
| `.section-pad`         | Padding vertikal konsisten antar section            |

### Motion

Scroll-reveal dan animasi expand/collapse pakai `framer-motion`, bukan CSS. Komponennya
ada di `components/Reveal.tsx`:

| Komponen               | Fungsi                                              |
|-------------------------|------------------------------------------------------|
| `<Reveal>`              | Satu elemen: fade + naik 10px sekali saat masuk viewport |
| `<RevealGroup>` + `<RevealItem>` | Grid/list: children stagger otomatis (tidak perlu hitung delay manual per-item) |

Semua menghormati `prefers-reduced-motion` lewat `useReducedMotion()`, animasi otomatis
jadi instan kalau user set itu di sistem. Dipakai sengaja terbatas: reveal saat scroll,
dan height-animation di expand/collapse case study `ProjectCard`. Hover tombol/nav/menu
mobile tetap CSS transition biasa, tidak semua dipindah ke JS.

### Radius (skala tetap, jangan dicampur)

| Ukuran | Token | Dipakai untuk        |
|--------|-------|------------------------|
| 6px    | `xs`  | Tag/label kecil        |
| 8px    | `sm`  | Tombol, input          |
| 12px   | `md`  | Card, container besar  |

---

## Arsitektur Komponen

### Server Components (default, zero client JS)

`HeroSection`, `AboutSection`, `ServicesSection`, `FeaturedProjects`,
`CybersecuritySection`, `ContactSection`, `CaseStudySection`, `Footer`

### Client Components (`'use client'`)

| Komponen      | Alasan butuh client                          |
|---------------|----------------------------------------------|
| `Reveal`      | `framer-motion` hooks (`useReducedMotion`, `whileInView`) |
| `Navbar`      | `useState` untuk scroll state & mobile menu  |
| `ProjectCard` | `useState` + `framer-motion` untuk expand/collapse animasi |

---

## Menambahkan Proyek Baru

1. Buka `data/projects.ts`
2. Tambahkan object baru di array `projects`:

```typescript
{
  id: 'nama-project',          // lowercase, hyphen
  title: 'Nama Proyek',
  subtitle: 'Satu kalimat deskripsi',
  category: 'Freelance',       // bebas
  tags: ['Tag1', 'Tag2'],
  stack: ['Next.js', 'TypeScript', 'Tailwind'],
  problem: 'Masalah yang diselesaikan.',
  goal: 'Tujuan proyek.',
  role: 'Apa yang kamu kerjakan.',
  features: ['Fitur 1', 'Fitur 2'],
  challenges: 'Tantangan teknis yang dihadapi.',
  result: 'Hasil konkret.',
  demoUrl: 'https://demo.vercel.app',
  githubUrl: 'https://github.com/USERNAME/nama-project',
},
```

3. Simpan. Komponen otomatis render tanpa perubahan lain.

---

## Performance

Build output yang dihasilkan:

```
Page      : /
Size      : ~95 kB (JS) + ~22 kB (CSS)
First Load: ~170 kB gzip
```

Target Lighthouse score: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

---

## Lisensi

MIT, bebas digunakan, dimodifikasi, dan didistribusikan.

---

*Dibuat dari Rp0. Deploy gratis. Skill nyata.*
