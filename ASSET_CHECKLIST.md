# Checklist integrasi foto klien

## Status terbaru

Foto sudah tersedia di `public/images/client-assets`, sudah diaudit visual dan dikonversi ke `public/images/documentation`. Logo telah dipasang dan referensi stok aktif diganti. Status audit awal di bawah merupakan riwayat, bukan status saat ini. Gunakan `ASSET_MAPPING.md` sebagai inventaris terbaru. Persetujuan publikasi, dan tanggal foto tetap memerlukan konfirmasi.

Folder sumber: https://drive.google.com/drive/folders/1kd7btvEmhPeZCeB8N8rXK6VUYazYZR9B

## Status audit

- Tidak ditemukan JPG/JPEG/PNG/WebP/HEIC/HEIF klien pada repositori saat refaktor.
- Saat audit awal, `public/images/` hanya berisi catatan sumber. Dalam refaktor, lima ilustrasi Unsplash lama disimpan sebagai WebP lokal di `public/images/illustrations/` untuk menghilangkan ketergantungan CDN saat runtime. File tersebut bukan dokumentasi klien.
- Pembukaan tautan Drive melalui alat web gagal; isi folder, jumlah foto, metadata, dan izin berbagi belum bisa diperiksa.
- Tidak ada HEIC/HEIF atau foto klien yang dikonversi, tidak ada foto klien yang diintegrasikan, dan tidak ada crop foto klien yang dinyatakan lolos pemeriksaan. Konversi WebP hanya dilakukan pada lima ilustrasi lama.
- Seluruh foto sementara memiliki `placeholder: true`, label terlihat, alt, dan kredit. Jangan mengganti flag menjadi `false` sebelum foto benar-benar diganti dan diverifikasi.

## Alur integrasi

1. [ ] Dapatkan file asli dari klien atau akses folder yang dapat dibaca. Jangan memasukkan kredensial Drive ke source code.
2. [ ] Inventarisasikan nama file asli, format, dimensi, orientasi, ukuran, hak penggunaan, dan kategori yang **dikonfirmasi**. Nama file/EXIF bukan bukti tunggal tanggal pelaksanaan.
3. [ ] Simpan arsip asli di lokasi privat; jangan menaruh foto medis, formulir layanan, atau foto tanpa izin di `public/`.
4. [ ] Konversi HEIC/HEIF memakai decoder yang mendukung HEIF (contoh ImageMagick dengan libheif). Terapkan auto-orient, konversi warna ke sRGB, kemudian hapus EXIF/GPS pada hasil publik.
5. [ ] Ekspor WebP berkualitas sekitar 85; lebar 1600–2200 px untuk hero, 1000–1600 px untuk galeri. Jangan memperbesar foto kecil. Periksa detail wajah dan tulisan setelah kompresi.
6. [ ] Gunakan nama publik netral dan deskriptif, tanpa NIK, nama pasien, atau koordinat sensitif.
7. [ ] Tambahkan metadata foto pada `src/data/images.ts`: path `/images/kkn/...`, `alt`, `credit`, `source`, `placeholder: false`, `position`, serta `fit` bila diperlukan.
8. [ ] Foto kelompok sebaiknya `fit: "contain"` jika crop memotong orang. Komponen `Photo` mendukung pilihan ini; lightbox sudah memakai contain.
9. [ ] Ganti referensi pada `content.ts` (hero/kolaborasi), `activities.ts`, dan `gallery.ts`. Perbarui caption hero, catatan galeri, serta `site.contentNotice`; jangan menghapus catatan verifikasi yang masih relevan.
10. [ ] Periksa 360, 390, 768, 1024, 1440, 1920 px. Pastikan tidak ada wajah penting terpotong, foto terbalik, atau teks sulit dibaca.
11. [ ] Jalankan lint, typecheck, build, dan tes browser. Tinjau sumber/kredit di lightbox.

## Rencana kategori (bukan hasil audit foto)

| Kategori dari klien     | Usulan folder publik                | Konfirmasi sebelum diberi label                                              |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| RW 12                   | `public/images/kkn/rw-12/`          | Titik lokasi dan persetujuan pengurus                                        |
| RW 13                   | `public/images/kkn/rw-13/`          | Titik lokasi dan persetujuan pengurus                                        |
| Posyandu RW 13          | `public/images/kkn/posyandu-rw-13/` | Tanggal, jenis layanan, izin orang tua/warga, tidak ada rekam medis terlihat |
| Poswindu RW 12          | `public/images/kkn/poswindu-rw-12/` | Ejaan Poswindu/Posbindu, lokasi, tanggal, privasi                            |
| Pemetaan masyarakat     | `public/images/kkn/pemetaan/`       | Cakupan RW, metode, materi yang boleh dipublikasikan                         |
| Kolaborasi lingkungan   | `public/images/kkn/lingkungan/`     | Lokasi, jenis kegiatan, pihak terkait                                        |
| Kegiatan kelompok KKN   | `public/images/kkn/kelompok/`       | Nama/peran anggota, tanggal, izin                                            |
| Keterlibatan masyarakat | `public/images/kkn/masyarakat/`     | Konteks perjumpaan dan persetujuan warga                                     |

Foto yang belum bisa dibedakan antara RW 12/RW 13, jenis layanan kesehatan, atau tanggalnya masuk daftar **“perlu verifikasi”** di arsip privat; jangan dipaksakan ke kategori publik.
