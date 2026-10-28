import { PageHeader, SampleNote, SectionLabel } from "@/components/ui";
import { Gallery } from "@/components/gallery";
import { gallery, galleryPending } from "@/data/gallery";
import { pageMetadata } from "@/lib/metadata";
import { pageContent } from "@/data/content";
export const metadata = pageMetadata(
  "Galeri",
  pageContent.gallery.description,
  "/galeri",
);
export default function GalleryPage() {
  return (
    <>
      <PageHeader {...pageContent.gallery} />
      <section className="wrap gallery-page">
        <SampleNote>
          Foto asli dari klien. Tanggal dan izin publikasi masih perlu
          dikonfirmasi. Klik foto untuk melihat keterangan dan sumbernya.
        </SampleNote>
        <Gallery items={gallery} />
        <div className="gallery-pending">
          <SectionLabel>Ruang untuk dokumentasi warga</SectionLabel>
          <h2>
            Cerita berikutnya
            <br />
            <em>datang dari Anda.</em>
          </h2>
          <p>
            Arsip berikut akan diisi foto asli, dengan izin pemilik dan orang
            yang ditampilkan.
          </p>
          <ul className="simple-list">
            {galleryPending.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
