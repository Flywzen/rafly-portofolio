import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'birthday-dad',
    title: 'Website Ulang Tahun Ayah',
    subtitle: 'Personal storytelling untuk perayaan bermakna',
    category: 'Personal Project',
    tags: ['Storytelling', 'Personal'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    problem:
      'Pesan WhatsApp terlalu singkat untuk momen ulang tahun ayah yang ke-50. Keluarga tersebar di berbagai kota dan tidak bisa berkumpul.',
    goal:
      'Website personal yang bisa diakses kapan saja, berisi gallery keluarga, surat terbuka, dan penghitung usia real-time.',
    role: 'Solo developer: konsep, desain, development, deployment.',
    features: [
      'Real-time age counter (hari, jam, menit, detik)',
      'Gallery foto keluarga dengan lightbox',
      'Surat terbuka dengan typography nyaman dibaca',
      'Bisa dibagikan via link pendek',
      'Mobile-first, loading cepat',
    ],
    challenges:
      'Membuat age counter akurat berdasarkan tanggal dan waktu lahir tanpa library eksternal, sambil menjaga bundle tetap kecil.',
    result:
      'Live di hari H. Keluarga dari tiga kota mengakses dan meninggalkan pesan di momen yang sama.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/birthday-dad',
    // imageUrl: '/images/birthday-dad.png',  ← uncomment + tambah file setelah screenshot
  },
  {
    id: 'desa-kkn',
    title: 'Website Desa KKN',
    subtitle: 'Portal informasi publik untuk desa/kelurahan',
    category: 'Civic / KKN',
    tags: ['Publik', 'Informasi'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    problem:
      'Desa lokasi KKN tidak punya media digital yang bisa diakses warga dan pihak luar untuk mengenal profil desa, berita, dan layanan.',
    goal:
      'Website informasi desa yang mudah dikelola, cepat di koneksi lemah, dan bisa jadi bukti kontribusi KKN.',
    role: 'Solo developer, dari wireframe sampai deployment.',
    features: [
      'Profil desa: sejarah, visi-misi, struktur pemerintahan',
      'Berita dan pengumuman',
      'Data demografis dasar',
      'Peta lokasi via Google Maps embed',
      'Galeri kegiatan desa',
      'Kontak dan layanan warga',
    ],
    challenges:
      'Merancang agar perangkat desa non-teknis dapat memahami konten tanpa update manual. Solusi: konten dikelola via TypeScript/JSON file sederhana.',
    result:
      'Website live, digunakan sebagai referensi laporan KKN, dan diserahkan ke kepala desa.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/desa-kkn',
    // imageUrl: '/images/desa-kkn.png',
  },
  {
    id: 'kiroku',
    title: 'Kiroku',
    subtitle: 'Aplikasi pencatatan hidup: jurnal, keuangan, rutinitas',
    category: 'Web App',
    tags: ['Produktivitas', 'Personal'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
    problem:
      'Catatan hidup tersebar di Notes, WhatsApp ke diri sendiri, buku fisik, dan spreadsheet yang tidak pernah terhubung.',
    goal:
      'Satu aplikasi minimal untuk jurnal harian, melacak keuangan, membangun rutinitas, dan merekam milestone hidup.',
    role: 'Solo developer dan product designer.',
    features: [
      'Jurnal harian dengan markdown ringan',
      'Catatan keuangan: pemasukan, pengeluaran, saldo',
      'Tracker rutinitas dengan streak counter',
      'Milestone board untuk tujuan besar',
      'Data tersimpan lokal, tanpa akun, tanpa server',
      'Dark mode secara default',
    ],
    challenges:
      'Merancang state management tanpa Redux yang tetap reliable, dan memastikan data lokal tidak hilang saat browser di-clear (IndexedDB fallback).',
    result:
      'MVP live dan digunakan sendiri 30+ hari. Menjadi demo kemampuan full frontend development.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/kiroku',
    // imageUrl: '/images/kiroku.png',
  },
  {
    id: 'umkm-landing',
    title: 'Landing Page UMKM',
    subtitle: 'Demo jasa: landing page untuk bisnis lokal',
    category: 'Freelance Demo',
    tags: ['UMKM', 'Demo', 'Freelance'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    problem:
      'UMKM lokal mengandalkan Instagram untuk berjualan tapi tidak punya halaman yang bisa menampilkan produk, testimoni, dan CTA secara terstruktur.',
    goal:
      'Landing page satu halaman yang membantu konversi dari pengunjung menjadi pembeli, cepat, mobile-first, mudah di-update.',
    role: 'Web developer + konsultan konten dasar.',
    features: [
      'Hero section dengan foto produk dan CTA WhatsApp',
      'Section produk unggulan dengan harga',
      'Testimoni pelanggan',
      'FAQ singkat',
      'Footer kontak dan lokasi',
    ],
    challenges:
      'Meyakinkan klien bahwa konversi bergantung pada kecepatan dan kejelasan pesan, bukan banyaknya fitur.',
    result:
      'Demo live digunakan sebagai referensi saat menawarkan jasa ke UMKM lain. Respons positif dari 3 calon klien.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/umkm-landing',
    // imageUrl: '/images/umkm-landing.png',
  },
]
