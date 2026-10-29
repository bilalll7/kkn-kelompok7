import type { Photograph } from "@/types";
const photo = (file: string, alt: string): Photograph => ({
  src: "/images/documentation/" + file,
  alt,
  credit: "Dokumentasi klien · Kelompok 7 UNIKOM",
  source: "/galeri",
  placeholder: false,
  fit: "contain",
});
export const images = {
  teamGathering: photo("heic-14.webp", "Dokumentasi kelompok KKN Berdampak Kelompok 7"),
  community: photo(
    "06.webp",
    "Pertemuan mahasiswa bersama warga; berkas mapping RW 13",
  ),
  village: photo(
    "05.webp",
    "Percakapan mahasiswa dan warga; berkas mapping RW 12",
  ),
  fields: photo(
    "heic-7.webp",
    "Penelusuran gang bersama mahasiswa; dokumentasi pemetaan",
  ),
  craft: photo(
    "12.webp",
    "Foto bersama di dekat tong komposter; identitas peserta perlu konfirmasi",
  ),
  nature: photo("04.webp", "Dokumentasi kelompok di ruang terbuka"),
  posyandu: photo(
    "heic-11.webp",
    "Dokumentasi bersama di ruang PAUD Mawar; berkas Posyandu RW 13",
  ),
  poswindu: photo(
    "heic-9.webp",
    "Pendampingan warga di meja kegiatan; berkas Poswindu RW 12",
  ),
};
