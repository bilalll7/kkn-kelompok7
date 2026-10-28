# Informasi yang perlu dikonfirmasi

## Pembaruan sumber lokal — prioritas

Foto klien kini tersedia: 23 foto diproses WebP, logo asli dipakai. Catatan lama tentang ketiadaan foto di bawah sudah digantikan oleh `ASSET_MAPPING.md`.

- [x] Identitas telah dikonfirmasi klien: Kelompok 7, sesuai PDF halaman 1, 5, dan 6.
- [ ] Konfirmasi domain: PDF menyebut **berseka.id**, brief menyebut berserka.id.
- [ ] Konfirmasi jumlah KK/penduduk total: PDF hanya memberi bangunan rumah dan jiwa memilah.
- [ ] Konfirmasi tanggal masing-masing foto serta izin publikasi warga/anak dan konteks layanan kesehatan.
- [ ] Logo asli dipakai tanpa recolor; konfirmasi kewenangan penggunaan untuk situs Kelompok 7.

Identitas yang diberikan klien: **KKN Berdampak Kelompok 7 Universitas Komputer Indonesia (UNIKOM), Sadang Serang, RW 12 & RW 13**. Identitas ini sudah digunakan. Daftar berikut bukan klaim pelaksanaan program atau capaian.

## Tim — `src/data/team.ts`

- [ ] Periode KKN dan tanggal mulai/selesai.
- [ ] Daftar anggota, program studi, peran, dan izin publikasi.
- [ ] Nama koordinator dan dosen pembimbing lapangan.
- [ ] Logo resmi kampus/program/kelompok beserta izin penggunaannya. Simbol saat ini adalah ikon generik, bukan logo UNIKOM.
- [ ] Persetujuan narasi pengantar serta prinsip kolaborasi.

## Profil RW — `src/data/profiles.ts`, `officials.ts`

- [ ] Nama Ketua RW 12 dan Ketua RW 13, masa tugas, dan izin publikasi.
- [ ] Jumlah penduduk, KK, RT, luas, sumber data, dan tahun rujukan **untuk masing-masing RW**.
- [ ] Batas wilayah, fasilitas umum, dan cakupan administrasi rinci.
- [ ] Sejarah wilayah dari sumber yang disepakati; belum ada sejarah yang dipublikasikan.
- [ ] Alamat/titik lokasi yang boleh dipublikasikan. Jangan menyamakan lokasi RW dengan posko tim.

## Program dan kegiatan — `src/data/programs.ts`, `activities.ts`

- [ ] Nama resmi program, tujuan, ruang lingkup, mitra, dan peran mahasiswa.
- [ ] Status kegiatan (rencana/berlangsung/selesai), tanggal aktual, lokasi rinci, dan sumber konfirmasi.
- [ ] Konfirmasi ejaan **“Poswindu RW 12”**: apakah memang Poswindu atau Posbindu? Istilah klien dipertahankan sampai ada jawaban.
- [ ] Posyandu RW 13: bentuk kegiatan, peran tim, tanggal, tempat, dan izin publikasi.
- [ ] Pemetaan masyarakat: metode, sumber, cakupan RW, hasil yang disetujui.
- [ ] Kolaborasi lingkungan: bentuk kegiatan, pelaksana, tindak lanjut, dan lokasi.
- [ ] Kegiatan kelompok dan keterlibatan masyarakat: identitas pihak terkait, keterangan foto, dan kronologi.
- [ ] Hasil/capaian hanya ditulis dengan bukti. Jangan mengisi jumlah peserta atau manfaat yang belum dikonfirmasi.
- [ ] Set `status: "Terverifikasi"` serta `date: "YYYY-MM-DD"` hanya setelah pemeriksaan. Bagian terbaru otomatis mengurutkan kegiatan terverifikasi yang memiliki tanggal; tanggal kosong tetap `null`.

## Kontak dan SEO — `src/data/site.ts`, `.env.local`

- [ ] Email, nomor telepon, jam koordinasi, dan penanggung jawab yang menyetujui publikasi.
- [ ] Akun media sosial resmi. Tidak ada akun rekaan atau tautan dummy.
- [ ] Alamat rinci, Google Maps URL, dan embed yang benar.
- [ ] Domain final untuk `NEXT_PUBLIC_SITE_URL` (tanpa trailing slash).
- [ ] Persetujuan konten final sebelum disebut situs resmi/informasi terverifikasi.

## Foto

Belum ada foto klien lokal dan folder Drive belum dapat diakses melalui alat pengerjaan. **Integrasi foto asli belum selesai.** Lihat [ASSET_CHECKLIST.md](ASSET_CHECKLIST.md) untuk audit, konversi HEIC/HEIF, pemetaan kategori, dan verifikasi izin.

Jangan memublikasikan data kesehatan, identitas anak, NIK, atau dokumen pelayanan yang terbaca. Foto ambigu tidak boleh diberi label RW/tanggal/kegiatan berdasarkan dugaan.
