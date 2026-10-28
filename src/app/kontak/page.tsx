import { PageHeader, SectionLabel } from "@/components/ui";
import { Location } from "@/components/sections";
import { ContactForm } from "@/components/contact-form";
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
            <dl className="contact-details">
              <div>
                <dt>Email</dt>
                <dd>
                  {site.email ? (
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  ) : (
                    "Belum dikonfigurasi"
                  )}
                </dd>
              </div>
              <div>
                <dt>Telepon</dt>
                <dd>
                  {site.phone ? (
                    <a href={`tel:${site.phone}`}>{site.phone}</a>
                  ) : (
                    "Belum dikonfigurasi"
                  )}
                </dd>
              </div>
              <div>
                <dt>Waktu koordinasi tim</dt>
                <dd>{site.officeHours || "Menunggu konfirmasi"}</dd>
              </div>
            </dl>
            <p className="fine-print">
              Kontak yang telah diverifikasi akan dipublikasikan di halaman ini.
              Situs ini belum menyediakan layanan pengaduan resmi.
            </p>
          </div>
          <div>
            <h2 className="form-title">
              Tinggalkan <em>sapaan.</em>
            </h2>
            <ContactForm email={site.email} />
          </div>
        </section>
        <div className="section">
          <Location />
        </div>
      </div>
    </>
  );
}
