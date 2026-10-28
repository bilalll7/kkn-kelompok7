import type { Article } from "@/types";
import { images } from "./images";
const verification = {
  heading: "Informasi yang masih dilengkapi",
  text: "Tanggal, lokasi rinci, peran tim, narasumber, dan hasil kegiatan belum dikonfirmasi. Halaman ini adalah ruang pengelompokan dokumentasi, bukan laporan pelaksanaan atau klaim capaian. Foto berasal dari klien; identitas kelompok telah dikonfirmasi sebagai Kelompok 7.",
};
export const activityNotice =
  "Kategori mengikuti informasi awal dari klien. Tanggal, rincian pelaksanaan, dan hasil belum terverifikasi; tanggal foto masih perlu dikonfirmasi.";
export const activities: Article[] = [
  {
    slug: "posyandu-rw-13",
    title: "Posyandu RW 13",
    category: "Kesehatan",
    date: null,
    location: "RW 13, Sadang Serang · titik kegiatan belum dikonfirmasi",
    status: "Menunggu verifikasi",
    featured: true,
    excerpt:
      "Ruang dokumentasi Posyandu RW 13. Rincian kegiatan dan peran Kelompok 7 masih menunggu konfirmasi.",
    image: images.posyandu,
    body: [
      {
        heading: "Ruang dokumentasi kesehatan masyarakat",
        text: "Posyandu RW 13 merupakan salah satu kategori dokumentasi yang diberikan untuk situs ini. Foto asli, catatan kegiatan, dan keterangan pendamping akan ditinjau sebelum dimuat sebagai laporan.",
      },
      verification,
      {
        heading: "Menjaga privasi warga",
        text: "Publikasi foto memerlukan izin. Identitas anak, catatan kesehatan, dan dokumen pelayanan tidak ditampilkan tanpa dasar persetujuan yang sesuai.",
      },
    ],
  },
  {
    slug: "poswindu-rw-12",
    title: "Poswindu RW 12",
    category: "Kesehatan",
    date: null,
    location: "RW 12, Sadang Serang · titik kegiatan belum dikonfirmasi",
    status: "Menunggu verifikasi",
    excerpt:
      "Arsip untuk kategori Poswindu RW 12, dengan nama kegiatan dan detail pelaksanaan yang perlu diverifikasi.",
    image: images.poswindu,
    body: [
      {
        heading: "Mencocokkan nama dan dokumentasi",
        text: "Nama Poswindu mengikuti istilah yang diberikan klien. Ejaan resminya perlu dikonfirmasi, termasuk apakah yang dimaksud adalah Posbindu. Situs belum menyimpulkan jenis layanan, peserta, ataupun hasil kegiatan.",
      },
      verification,
    ],
  },
  {
    slug: "pemetaan-masyarakat",
    title: "Mengenal wilayah melalui pemetaan",
    category: "Pemetaan",
    date: null,
    location: null,
    status: "Menunggu verifikasi",
    excerpt:
      "Kategori pemetaan masyarakat untuk menata catatan pengenalan lingkungan dan sumber informasi wilayah.",
    image: images.village,
    body: [
      {
        heading: "Mengenali ruang dan sumber cerita",
        text: "Pemetaan masyarakat disebutkan dalam daftar kategori dokumentasi. Cakupan RW, metode, batas wilayah, dan hasil pemetaan masih perlu diperiksa bersama tim dan pihak setempat.",
      },
      verification,
    ],
  },
  {
    slug: "merawat-lingkungan-bersama",
    title: "Kolaborasi untuk lingkungan bersama",
    category: "Lingkungan",
    date: null,
    location: null,
    status: "Menunggu verifikasi",
    excerpt:
      "Catatan kolaborasi lingkungan yang akan dilengkapi dengan lokasi, bentuk kegiatan, dan dokumentasi asli.",
    image: images.fields,
    body: [
      {
        heading: "Merawat ruang bersama",
        text: "Kolaborasi lingkungan adalah kategori dokumentasi yang diberikan klien. Belum ada informasi terverifikasi mengenai jenis pekerjaan, jumlah peserta, waktu, atau hasilnya, sehingga halaman ini tidak mengklaim pelaksanaan tertentu.",
      },
      verification,
    ],
  },
  {
    slug: "kegiatan-kelompok-7",
    title: "Catatan perjalanan Kelompok 7",
    category: "KKN",
    date: null,
    location: null,
    status: "Menunggu verifikasi",
    excerpt:
      "Ruang untuk dokumentasi tim KKN Berdampak Kelompok 7 UNIKOM, dari koordinasi hingga catatan proses.",
    image: images.community,
    body: [
      {
        heading: "Mendokumentasikan proses tim",
        text: "Kategori kegiatan kelompok disiapkan untuk menampung dokumentasi Kelompok 7. Nama anggota, dosen pembimbing, periode KKN, dan kronologi belum tersedia untuk dipublikasikan.",
      },
      verification,
    ],
  },
  {
    slug: "perjumpaan-bersama-warga",
    title: "Perjumpaan bersama masyarakat",
    category: "Masyarakat",
    date: null,
    location: null,
    status: "Menunggu verifikasi",
    excerpt:
      "Ruang cerita keterlibatan masyarakat yang menunggu foto asli, keterangan, dan persetujuan publikasi.",
    image: images.community,
    body: [
      {
        heading: "Cerita dari percakapan",
        text: "Keterlibatan masyarakat termasuk kategori dokumentasi awal. Identitas warga, lokasi pertemuan, dan kutipan tidak akan ditambahkan sebelum mendapat konfirmasi serta izin yang diperlukan.",
      },
      verification,
    ],
  },
];

// Undated records never pretend to be the newest completed activities.
export function latestVerifiedActivities(limit = 3): Article[] {
  return activities
    .filter(
      (item): item is Article & { date: string } =>
        item.status === "Terverifikasi" && item.date !== null,
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
