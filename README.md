# rafly-portofolio# Rafly — Personal Portfolio

Portfolio pribadi **Muhammad Rafly Yahya Ramadhan** — mahasiswa Informatika ITERA, web developer & UI/UX.

**Live:** [rafly.vercel.app](https://rafly.vercel.app) *(update setelah deploy)*

---

## Stack

| Layer        | Tech                                    |
|--------------|-----------------------------------------|
| Framework    | Next.js 14 (App Router)                 |
| Language     | TypeScript (strict)                     |
| Styling      | Tailwind CSS v3                         |
| Icons        | Lucide React                            |
| Fonts        | Space Grotesk + Inter (next/font)       |
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
│   ├── RevealInit.tsx      # Client — IntersectionObserver scroll reveal
│   ├── Navbar.tsx          # Client — sticky nav, mobile menu
│   ├── HeroSection.tsx     # Server — headline, CTA, stats, marquee
│   ├── AboutSection.tsx    # Server — bio, highlights
│   ├── ServicesSection.tsx # Server — 4 paket jasa + pricing
│   ├── ProjectCard.tsx     # Client — expandable case study card
│   ├── FeaturedProjects.tsx# Server — grid wrapper untuk ProjectCard
│   ├── TechStackSection.tsx# Server — skill grid per kategori
│   ├── CybersecuritySection.tsx # Server — roadmap + write-ups
│   ├── TestimonialsSection.tsx  # Server — placeholder testimoni
│   ├── ContactSection.tsx  # Server — WhatsApp CTA + kontak
│   └── Footer.tsx          # Server — nav, sosial, copyright
│
├── data/
│   ├── projects.ts         # Typed project data (Project[])
│   ├── services.ts         # Typed service packages (Service[])
│   ├── techStack.ts        # Typed tech categories + marquee items
│   └── socialLinks.ts      # Typed social links + URL constants
│
├── lib/
│   └── utils.ts            # cn() — merge class names
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces
│
├── public/
│   └── favicon.svg
│
├── .gitignore
├── .eslintrc.json
├── next.config.ts
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

### Cara A — GUI (Direkomendasikan)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import repo dari GitHub
4. Framework Preset: **Next.js** (auto-detect)
5. Klik **Deploy**

Vercel rebuild otomatis setiap `git push` ke branch `main`.

### Cara B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Cara C — GitHub Actions (opsional, advanced)

Buat `.github/workflows/deploy.yml` dengan action `vercel/actions`.

---

## Kustomisasi Konten

Semua konten portfolio ada di folder `data/` — tidak perlu menyentuh komponen.

### Update proyek

Edit `data/projects.ts`:

```typescript
// Ganti '#' dengan URL nyata setelah project live
demoUrl: 'https://nama-project.vercel.app',
githubUrl: 'https://github.com/USERNAME/nama-project',
```

### Update harga jasa

Edit `data/services.ts` — ubah field `price` dan `deliverables`.

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

### Update tech stack

Edit `data/techStack.ts` — tambah/hapus item, ubah `level` antara `'solid'` atau `'learning'`.

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
Mobile  (320–480px)  → hero stack vertikal, navbar hamburger
Tablet  (481–768px)  → grid 2 kolom services & projects
Desktop (769px+)     → grid 4 kolom services, 2 kolom projects
```

Test di Chrome: DevTools → Toggle Device Toolbar → pilih Pixel 7, iPhone 14, iPad.

---

## Design System

### Warna

| Token     | Hex       | Penggunaan             |
|-----------|-----------|------------------------|
| `base`    | `#060B14` | Background utama       |
| `surface` | `#0D1528` | Background section alt |
| `card`    | `#111827` | Background card        |
| `gold`    | `#C9A227` | Aksen primer           |
| `teal`    | `#14B8A6` | Aksen sekunder         |
| `tx-1`    | `#F0F4FF` | Teks utama             |
| `tx-2`    | `#8B9CC8` | Teks sekunder          |
| `tx-3`    | `#4B5A7A` | Teks muted             |

### Font

- **Heading/display:** `Space Grotesk` — class `font-display`
- **Body:** `Inter` — class `font-body`
- Keduanya dimuat via `next/font/google` (zero layout shift, cached di edge)

### Komponen Utility

| Class            | Fungsi                                      |
|------------------|---------------------------------------------|
| `.card`          | Card dengan hover lift + border gold subtle |
| `.card-static`   | Card tanpa hover effect                     |
| `.btn-primary`   | Tombol gold gradient                        |
| `.btn-secondary` | Tombol outline gold                         |
| `.badge-gold`    | Badge aksen gold                            |
| `.badge-teal`    | Badge aksen teal                            |
| `.badge-muted`   | Badge abu-abu                               |
| `.section-label` | Label kecil uppercase sebelum heading       |
| `.icon-btn`      | Tombol icon bulat dengan border subtle      |
| `.reveal`        | Elemen yang fade-up saat masuk viewport     |

---

## Arsitektur Komponen

### Server Components (default, zero client JS)

`HeroSection`, `AboutSection`, `ServicesSection`, `FeaturedProjects`,
`TechStackSection`, `CybersecuritySection`, `TestimonialsSection`,
`ContactSection`, `Footer`

### Client Components (`'use client'`)

| Komponen      | Alasan butuh client                          |
|---------------|----------------------------------------------|
| `RevealInit`  | `useEffect` untuk IntersectionObserver       |
| `Navbar`      | `useState` untuk scroll state & mobile menu  |
| `ProjectCard` | `useState` untuk toggle case study expand    |

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
  colorAccent: 'gold',         // 'gold' atau 'teal'
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

MIT — bebas digunakan, dimodifikasi, dan didistribusikan.

---

*Dibuat dari Rp0. Deploy gratis. Skill nyata.*
