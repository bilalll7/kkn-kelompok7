import { PageHeader, SectionLabel } from "@/components/ui";
import { Location } from "@/components/sections";
import { Instagram } from "@/components/instagram";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { pageContent } from "@/data/content";
export const metadata = pageMetadata(
  "Kontak & Lokasi",
  pageContent.contact.description,
  "/kontak",
);
export default function ContactPage() {
  return (
    <>
      <PageHeader {...pageContent.contact} />
      <div className="wrap">
        <section className="contact-grid">
          <div>
            <SectionLabel>Informasi kontak</SectionLabel>
            <h2>
              Mari <em>terhubung.</em>
            </h2>
            <dl className="contact-details"><div><dt>Instagram</dt><dd><a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagram.username} (tab baru)`}><Instagram size={20} aria-hidden="true" />{site.instagram.username}</a></dd></div></dl>
            <p>Ikuti kegiatan kami melalui Instagram.</p>
          </div>
          <div>
            <h2 className="form-title">
              Tinggalkan <em>sapaan.</em>
            </h2>
            <p>Untuk informasi dan kolaborasi, hubungi kami melalui pesan langsung di Instagram.</p>
          </div>
        </section>
        <div className="section">
          <Location />
        </div>
      </div>
    </>
  );
}
