import type { Team, TeamMember } from "@/types";
import { site } from "./site";
export const members: TeamMember[] = [
  {
    "id": "ala",
    "slug": "zahra-orva-lannisa",
    "name": "Zahra Orva Lannisa",
    "nim": "10524121",
    "studyProgram": "S1 Sistem Informasi",
    "division": "Inti",
    "position": "Sekretaris 1",
    "image": "/images/team/ala.webp",
    "imageAlt": "Potret Zahra Orva Lannisa"
  },
  {
    "id": "angga",
    "slug": "angga-nugraha",
    "name": "Angga Nugraha",
    "nim": "13124021",
    "studyProgram": "S1 Teknik Elektro",
    "division": "Humas",
    "position": "Teknis",
    "image": "/images/team/angga.webp",
    "imageAlt": "Potret Angga Nugraha"
  },
  {
    "id": "aris",
    "slug": "aristyan-akhsan",
    "name": "Aristyan Akhsan",
    "nim": "51923197",
    "studyProgram": "S1 DKV",
    "division": "Pubdok",
    "position": "Koordinator",
    "image": "/images/team/aris.webp",
    "imageAlt": "Potret Aristyan Akhsan"
  },
  {
    "id": "arya",
    "slug": "arya-bisma-hartono",
    "name": "Arya Bisma Hartono",
    "nim": "10124452",
    "studyProgram": "S1 Teknik Informatika",
    "division": "Humas",
    "position": "Koordinator",
    "image": "/images/team/arya.webp",
    "imageAlt": "Potret Arya Bisma Hartono"
  },
  {
    "id": "farid",
    "slug": "farid-maulana-yusuf",
    "name": "Farid Maulana Yusuf",
    "nim": "10124288",
    "studyProgram": "S1 Teknik Informatika",
    "division": "Inti",
    "position": "Koordinator Lapangan",
    "image": "/images/team/farid.webp",
    "imageAlt": "Potret Farid Maulana Yusuf"
  },
  {
    "id": "nara",
    "slug": "denara-anindita",
    "name": "Denara Anindita",
    "nim": "41824169",
    "studyProgram": "S1 Ilmu Komunikasi",
    "division": "Humas",
    "position": "Non-Teknis",
    "image": "/images/team/nara.webp",
    "imageAlt": "Potret Denara Anindita"
  },
  {
    "id": "niko",
    "slug": "niko-adrian-farizi",
    "name": "Niko Adrian Farizi",
    "nim": "13025028",
    "studyProgram": "S1 Teknik Sipil",
    "division": "Humas",
    "position": "Non-Teknis",
    "image": "/images/team/niko.webp",
    "imageAlt": "Potret Niko Adrian Farizi"
  },
  {
    "id": "pai",
    "slug": "mohammad-agung-arrifai",
    "name": "Mohammad Agung Arrifai",
    "nim": "21324004",
    "studyProgram": "D3 Akuntansi",
    "division": "Inti",
    "position": "Ketua Kelompok",
    "image": "/images/team/pai-ketua-kelompok.webp",
    "imageAlt": "Potret Mohammad Agung Arrifai"
  },
  {
    "id": "raida",
    "slug": "raida-layla-safa",
    "name": "Raida Layla Safa",
    "nim": "10124349",
    "studyProgram": "S1 Teknik Informatika",
    "division": "Humas",
    "position": "Teknis",
    "image": "/images/team/raida.webp",
    "imageAlt": "Potret Raida Layla Safa"
  },
  {
    "id": "rania",
    "slug": "rania",
    "name": "Rania",
    "nim": "10124196",
    "studyProgram": "S1 Teknik Informatika",
    "division": "Pubdok",
    "position": "Anggota",
    "image": "/images/team/rania.webp",
    "imageAlt": "Potret Rania"
  },
  {
    "id": "rindu",
    "slug": "rindu-syurga",
    "name": "Rindu Syurga",
    "nim": "10524157",
    "studyProgram": "S1 Sistem Informasi",
    "division": "Operasional",
    "position": "Koordinator",
    "image": "/images/team/rindu.webp",
    "imageAlt": "Potret Rindu Syurga"
  },
  {
    "id": "serena",
    "slug": "serena-indriani",
    "name": "Serena Indriani",
    "nim": "63824036",
    "studyProgram": "S1 Sastra Jepang",
    "division": "Operasional",
    "position": "Anggota",
    "image": "/images/team/serena.webp",
    "imageAlt": "Potret Serena Indriani"
  },
  {
    "id": "kei",
    "slug": "keisha-andhara-patricia-l",
    "name": "Keisha Andhara Patricia L",
    "nim": "52023012",
    "studyProgram": "S1 Desain Interior",
    "division": "Inti",
    "position": "Sekretaris 2",
    "image": "/images/team/avatar-empty.svg",
    "imageAlt": "Avatar netral Keisha Andhara Patricia L"
  }
];
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
  members,
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
