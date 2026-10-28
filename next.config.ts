import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/berita/kegiatan-kelompok-8", destination: "/berita/kegiatan-kelompok-7", permanent: true },
      { source: "/tentang-kami", destination: "/tentang", permanent: true },
      { source: "/program-kerja", destination: "/potensi", permanent: true },
      { source: "/kegiatan", destination: "/berita", permanent: true },
      {
        source: "/kegiatan/:slug",
        destination: "/berita/:slug",
        permanent: true,
      },
      // Retired fictional articles have no equivalent verified activity.
      {
        source: "/berita/ruang-belajar-digital-umkm",
        destination: "/berita",
        permanent: true,
      },
      {
        source: "/berita/mengenal-potensi-pertanian",
        destination: "/berita",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
export default nextConfig;
