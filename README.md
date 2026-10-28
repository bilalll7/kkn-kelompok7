# KKN Berdampak — Sadang Serang

## Interaksi dan motion

Hero menggunakan lima foto klien unik: RW13 (`06.webp`), RW12 (`05.webp`), kelompok (`04.webp`), komposter (`12.webp`), pemetaan (`heic-7.webp`). `src/data/hero-slides.ts` mengatur urutannya. Carousel crossfade 900ms, interval 5 detik, tombol pause, keyboard dan swipe; berhenti saat hover, fokus, tab tersembunyi, dan reduced motion. Hanya foto awal berprioritas tinggi; slide berikut dimuat saat dipilih.

`src/components/motion` menyediakan HeroCarousel, AnimatedCounter, Reveal, dan ScrollReveals. Durasi/easing terpusat di `src/lib/motion.ts`. Intersection Observer dan Web Animations API digunakan tanpa dependency motion tambahan. Counter menampilkan nilai final untuk screen reader/no-JS dan memakai format Indonesia. Transisi routing keluar sengaja tidak ditambahkan: reveal mengikuti pergantian pathname tanpa mengganggu scroll restoration atau history.

## Pembaruan aset dan presentasi

Logo asli serta 23 foto klien kini diproses lokal (18 HEIC/HEIF dan 5 JPG). Referensi gambar aktif telah diganti; tidak lagi menggunakan foto stok. Logo mempertahankan warna asli #0F5FD8 / #F9C907. Latar utama putih. Lihat `ASSET_MAPPING.md` dan `DATA_SOURCES.md` untuk provenance dan keterbatasan. Catatan terdahulu di bawah tentang foto yang belum tersedia sudah digantikan oleh pembaruan ini.

Identitas Kelompok 7 telah dikonfirmasi klien dan sesuai PDF. Tabel program dan dampak ditampilkan sebagai hasil yang dilaporkan dalam presentasi. Bangunan rumah tidak disamakan dengan KK, dan jiwa memilah tidak disamakan dengan penduduk total. Konfirmasi izin publikasi sebelum peluncuran resmi.

Website profil RW 12 & RW 13 dan dokumentasi **KKN Berdampak Kelompok 7 Universitas Komputer Indonesia (UNIKOM)**. Refaktor ini melanjutkan aplikasi Next.js yang sudah ada; tidak menginisialisasi ulang proyek.

## Menjalankan

Node.js 20.9+ dan npm. Gunakan Node LTS yang masih didukung.

```powershell
cd C:\Users\ASUS\Documents\AllProject\kkn
npm ci
npm run dev
```

Buka http://localhost:3000. Jika dependensi sudah terpasang, cukup `npm run dev`.

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Font Google diambil saat build melalui `next/font`. Lima foto ilustrasi lama sudah disimpan sebagai WebP lokal di `public/images/illustrations/`, sehingga tidak memerlukan koneksi CDN saat runtime. Next.js melakukan prerender halaman konten dan mengoptimalkan foto melalui runtime; ini bukan `output: export`.

## Navigasi dan kompatibilitas URL

| Menu            | URL kanonis      | Isi                                                                                                    |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| Beranda         | `/`              | Hero editorial, pengantar tim, dua RW, program, sorotan kegiatan, kolaborasi, linimasa, galeri, lokasi |
| Tentang Kami    | `/tentang`       | Identitas Kelompok 7, pendekatan, data tim yang tersedia/belum dikonfirmasi                            |
| Profil Wilayah  | `/profil`        | Profil RW 12 dan RW 13 yang terpisah, pengurus, demografi belum terverifikasi                          |
| Program Kerja   | `/potensi`       | Bidang kesehatan, pemetaan, dan kolaborasi lingkungan                                                  |
| Kegiatan        | `/berita`        | Sorotan dokumentasi dan filter kategori                                                                |
| Detail Kegiatan | `/berita/[slug]` | Detail statis, status verifikasi, tanggal nullable, lokasi, kegiatan terkait                           |
| Galeri          | `/galeri`        | Foto ilustrasi berlabel, filter, lightbox keyboard, daftar dokumentasi yang menunggu                   |
| Kontak          | `/kontak`        | Kontak tim, form pratinjau/email, lokasi tanpa koordinat rekaan                                        |

URL lama `/potensi`, `/berita`, dan `/berita/merawat-lingkungan-bersama` dipertahankan. `/pemerintahan` mengalihkan permanen ke `/profil#pengurus`. Alias `/tentang-kami`, `/program-kerja`, `/kegiatan`, serta `/kegiatan/:slug` mengarah ke URL kanonis.

Dua artikel contoh lama tentang UMKM dan pertanian tidak memiliki padanan kegiatan terverifikasi. URL-nya diarahkan permanen ke indeks `/berita`, bukan diubah menjadi laporan kegiatan palsu. Redirect ada di `next.config.ts`; sitemap hanya memuat URL kanonis.

## Struktur dan pengeditan konten

```text
src/
  app/                   # Halaman lama yang diperbarui + tentang/
  components/
    layout/              # Header/footer yang sama, identitas diperbarui
    article-filter.tsx   # Filter kategori dipertahankan
    gallery.tsx          # Lightbox dialog native dipertahankan
    contact-form.tsx     # Form/email dipertahankan
    sections.tsx         # Artikel, lokasi, utilitas statistik
    ui.tsx               # Foto, label, tautan, header halaman
  data/
    site.ts              # Identitas, kontak, lokasi, universitas
    navigation.ts        # Tujuh menu utama
    content.ts           # Copy beranda/header halaman dan status aset
    team.ts              # Kelompok, anggota, pembimbing, periode
    profiles.ts          # Data masing-masing RW
    officials.ts         # Pengurus RW, nama belum tersedia
    programs.ts          # Bidang program dan kaitan kegiatan
    activities.ts        # Kegiatan, status, tanggal, lokasi, narasi
    articles.ts          # Re-export kompatibilitas data kegiatan
    potentials.ts        # Re-export kompatibilitas data program
    gallery.ts           # Foto, kategori, deskripsi
    images.ts            # Path, alt, kredit, status ilustrasi, crop
    statistics.ts        # Utilitas statistik lama; bukan sumber profil RW
  types/                 # Kontrak typed data
  lib/                   # Metadata dan format tanggal
tests/site.spec.ts       # Tes lama dipertahankan dan diperbarui
public/images/           # Sumber foto ilustrasi; tempat aset publik berizin
```

Next.js App Router, TypeScript, Tailwind CSS 4, Lucide React, dan optimasi Next Image/Font tetap digunakan. Server Components tetap menjadi default. CSS editorial memperluas sistem warna, font, spacing, dan reduced-motion yang sudah ada. CMS dapat ditambahkan dengan memetakan hasil server ke tipe yang sama tanpa menulis ulang komponen interaksi.

## Akurasi konten

Identitas tim, universitas, lokasi RW, dan kategori awal bersumber dari brief klien. Tidak ada anggota, pembimbing, pemimpin RW, tanggal, angka penduduk, hasil, atau alamat rinci yang dibuat-buat.

- Nilai yang belum diketahui memakai `null` dan ditampilkan sebagai **Belum dikonfirmasi**.
- Kegiatan awal berstatus **Menunggu verifikasi**, bukan laporan pelaksanaan.
- Istilah **Poswindu RW 12** dipertahankan sesuai brief, dengan catatan untuk memastikan apakah yang dimaksud Posbindu.
- `latestVerifiedActivities()` hanya mengambil status `Terverifikasi` dengan tanggal ISO yang tersedia. Tanpa data itu, beranda menampilkan keadaan kosong yang jujur.
- Jangan mengubah status tanpa bukti. Lengkapi sumber, izin, dan hasil aktual terlebih dahulu.
- Tanggal harus berupa `YYYY-MM-DD`; kosong tetap `null`, bukan tanggal hari ini.

Daftar kebutuhan klien: [CONTENT_TODO.md](CONTENT_TODO.md).

## Foto dan integrasi aset

**Foto klien belum terintegrasi.** Tidak ditemukan file klien lokal, termasuk HEIC/HEIF. Tautan Drive belum dapat diakses melalui alat pengerjaan. Foto Unsplash lama tetap berfungsi sebagai ilustrasi dari luar Sadang Serang, dengan label terlihat pada setiap foto dan kredit di lightbox.

Sumber: [public/images/SOURCES.md](public/images/SOURCES.md). Lisensi: https://unsplash.com/license.

Prosedur lengkap: [ASSET_CHECKLIST.md](ASSET_CHECKLIST.md), termasuk kategori RW 12/RW 13, Posyandu, Poswindu, pemetaan, lingkungan, kelompok, dan masyarakat.

Untuk foto asli yang sudah disetujui:

1. Simpan hasil WebP di `public/images/kkn/<kategori>/`.
2. Perbarui `src/data/images.ts`: `src`, `alt`, `credit`, `source`, `placeholder: false`.
3. Atur `position` dan `fit`. Gunakan `fit: "contain"` jika crop memotong anggota kelompok.
4. Perbarui referensi foto, caption, dan catatan di `content.ts`, `activities.ts`, `gallery.ts`, dan `site.ts`. Jangan menandai semua aset selesai jika baru sebagian diganti.
5. Periksa crop responsif dan izin wajah/anak. Hapus EXIF/GPS; jangan memublikasikan data medis atau dokumen pribadi.

Foto ambigu perlu diverifikasi sebelum diberi kategori. Belum ada konversi atau pemeriksaan crop foto klien yang dilakukan.

## Kontak dan peta

Isi `site.email`, `phone`, `officeHours`, `address`, `mapsUrl`, dan `mapsEmbedUrl` hanya setelah ada konfirmasi. Tidak ada akun media sosial dummy.

Tanpa email, form hanya menampilkan bahwa **pesan belum dikirim**. Setelah email diisi, form membuka aplikasi email memakai `mailto:`; pengunjung harus mengirim sendiri. Tidak ada penyimpanan/POST atau backend yang seolah-olah berhasil. Embed peta hanya dirender setelah URL resmi dikonfigurasi.

## Pengujian

```bash
npm run build
npm run test:e2e
```

Playwright menggunakan Microsoft Edge dan menjalankan server produksi khusus pada port **3017** melalui `scripts/serve-production.mjs`; server dev port 3000 tidak digunakan ulang. Jika Edge belum tersedia, `npx playwright install msedge`, atau sesuaikan `channel` dalam `playwright.config.ts`. Tes mencakup lebar 360–1920 px, rute, overflow, menu, filter, lightbox, fokus, form, metadata, redirect, dan pemuatan lima foto lokal. Tes lama tidak dihapus; ekspektasi mengikuti konten baru.

Validasi refaktor: TypeScript, ESLint, dan build produksi lulus. Sembilan tes browser lulus pada server produksi khusus. Server QA menggunakan entry server Next.js langsung untuk mengatasi kegagalan resolusi path CLI pada sandbox Windows; cara menjalankan situs sehari-hari tetap `npm run dev` atau `npm run start`. Tidak ada skor Lighthouse yang diklaim.

Untuk screenshot manual, jalankan `node scripts/serve-production.mjs` setelah build, lalu `node scripts/inspect-preview.mjs` di terminal lain. Hasil tersimpan di `test-results/` (diabaikan Git). Hentikan server setelah selesai. Skrip `cache-placeholder-images.mjs` hanya digunakan untuk menyimpan ilustrasi lama; tidak diperlukan untuk menjalankan situs dan tidak mengambil foto klien.

## Deploy Vercel

1. Commit source dan lockfile ke repositori.
2. Import proyek di Vercel, preset Next.js, root proyek ini, build `npm run build`.
3. Atur `NEXT_PUBLIC_SITE_URL` ke domain HTTPS final tanpa slash penutup; contoh tersedia di `.env.example`. Untuk lokal, gunakan `.env.local`.
4. Deploy lalu cek metadata, `/sitemap.xml`, `/robots.txt`, redirect, foto, serta kontak.

Lengkapi data dan foto klien sebelum mengumumkan dokumentasi sebagai terverifikasi.
