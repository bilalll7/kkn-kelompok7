import type { GalleryItem } from "@/types";
import { images } from "./images";
export const gallery: GalleryItem[] = [
  {
    id: "rw12",
    title: "Percakapan bersama warga RW 12",
    category: "RW 12",
    image: images.village,
    description:
      "Lokasi mengikuti keterangan berkas klien. Tanggal dan tanggal foto belum dikonfirmasi.",
  },
  {
    id: "rw13",
    title: "Pertemuan bersama warga RW 13",
    category: "RW 13",
    image: images.community,
    description:
      "Lokasi mengikuti keterangan berkas klien. Dokumentasi Kelompok 7; tanggal belum dikonfirmasi.",
  },
  {
    id: "komposter",
    title: "Dokumentasi tong komposter",
    category: "Program",
    image: images.craft,
    description:
      "Foto klien; identitas peserta dan atribusi program perlu konfirmasi.",
  },
  {
    id: "kelompok",
    title: "Dokumentasi kelompok",
    category: "Kelompok",
    image: images.nature,
    description:
      "Dokumentasi Kelompok 7. Nama peserta dan tanggal foto belum dikonfirmasi.",
  },
  {
    id: "pemetaan",
    title: "Menelusuri lingkungan",
    category: "RW 12",
    image: images.fields,
    description: "Berkas mappingrw12.heif; rincian pemetaan perlu konfirmasi.",
  },
  {
    id: "posyandu",
    title: "Dokumentasi Posyandu RW 13",
    category: "Kesehatan",
    image: images.posyandu,
    description:
      "Kategori mengikuti berkas klien; tanggal dan izin publikasi peserta perlu konfirmasi.",
  },
  {
    id: "poswindu",
    title: "Dokumentasi Poswindu RW 12",
    category: "Kesehatan",
    image: images.poswindu,
    description:
      "Ejaan Poswindu/Posbindu dan rincian kegiatan menunggu konfirmasi.",
  },
];
export const galleryPending = [
  "Tanggal dokumentasi",
  "Identitas peserta dalam foto",
  "Persetujuan publikasi peserta",
];
