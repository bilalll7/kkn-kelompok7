import type { Team } from "@/types";
import { site } from "./site";
export const team: Team = {
  name: site.group,
  university: site.university,
  introduction:
    "Kami adalah Kelompok 7 KKN Berdampak Universitas Komputer Indonesia. Ruang ini mempertemukan profil RW 12 dan RW 13 dengan dokumentasi kolaborasi kami bersama masyarakat Sadang Serang.",
  description:
    "Kami ingin menghadirkan cerita yang dekat dengan warga: mengenal lingkungan, mendengar kebutuhan, dan mendokumentasikan proses bersama. Informasi program serta kegiatan disajikan dengan membedakan hal yang sudah diketahui dan yang masih perlu dikonfirmasi.",
  period: "Juli – Oktober 2026",
  supervisor: "Assoc. Prof. Dr. Sri Dewi Anggadini, S.E., M.Si., Ak., CA",
  coordinator: "Ayu Kusuma",
  members: [],
  principles: [
    {
      title: "Mendengar lebih dulu",
      description:
        "Menempatkan pengalaman dan kebutuhan masyarakat sebagai titik awal percakapan.",
    },
    {
      title: "Bekerja bersama",
      description:
        "Membuka ruang kolaborasi antara mahasiswa, warga, dan pengurus wilayah.",
    },
    {
      title: "Mencatat dengan jujur",
      description:
        "Membedakan dokumentasi terverifikasi, informasi yang belum lengkap, dan foto ilustrasi.",
    },
  ],
};
