import { PageHeader, TextLink } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="not-found">
      <PageHeader
        label="404 / Halaman tidak ditemukan"
        title="Sepertinya kita"
        accent="berbeda jalan."
        description="Halaman yang Anda cari tidak tersedia. Mari kembali ke beranda untuk menemukan cerita lainnya."
      />
      <div className="wrap">
        <TextLink href="/">Kembali ke beranda</TextLink>
      </div>
    </div>
  );
}
