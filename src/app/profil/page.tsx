import { Report } from "@/components/report";
import { Photo } from "@/components/ui";
import { images } from "@/data/images";
import {
  PageHeader,
  SectionLabel,
  TextLink,
} from "@/components/ui";
import { rwProfiles } from "@/data/profiles";
import { officials } from "@/data/officials";
import { pageContent } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Profil Wilayah",
  pageContent.profile.description,
  "/profil",
);
export default function ProfilePage() {
  return (
    <>
      <PageHeader {...pageContent.profile} />
      <Report profiles />
      <div className="wrap">
        <nav className="anchor-nav" aria-label="Profil RW">
          {rwProfiles.map((rw) => (
            <a href={`#${rw.id}`} key={rw.id}>
              {rw.title}
            </a>
          ))}
          <a href="#pengurus">Pengurus wilayah</a>
        </nav>
        {rwProfiles.map((rw) => (
          <section id={rw.id} key={rw.id} className="rw-detail">
            <div className="rw-detail-heading">
              <span className="rw-number" aria-hidden="true">
                {rw.number}
              </span>
              <SectionLabel>Profil wilayah</SectionLabel>
              <h2>
                {rw.title}
                <br />
                <em>Sadang Serang.</em>
              </h2>
              <p>{rw.description}</p>
              <Photo
                image={rw.id === "rw-12" ? images.village : images.community}
              />
            </div>
            <div>
              <dl className="detail-list">
                {[
                  ["Ketua RW", rw.leader],
                  [
                    "Jumlah penduduk",
                    rw.population === null ? null : `${rw.population.toLocaleString("id-ID")} jiwa`,
                  ],
                  [
                    "Kepala keluarga",
                    rw.households === null ? null : `${rw.households} KK`,
                  ],
                  ["Jumlah RT", rw.rtCount],
                  ["Luas wilayah", rw.area],
                  ["Batas wilayah", rw.boundaries],
                ].filter(([, value]) => value != null).map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value ?? "Belum dikonfirmasi"}</dd>
                  </div>
                ))}
              </dl>
              
              <h3 className="rw-focus-title">Ruang dokumentasi</h3>
              <p className="muted">{rw.focus}</p>
              {rw.activitySlugs.map((slug) => (
                <TextLink href={`/berita/${slug}`} key={slug}>
                  Lihat dokumentasi {rw.title}
                </TextLink>
              ))}
              {rw.history && <p>{rw.history}</p>}
            </div>
          </section>
        ))}
        <section className="section profile-officials" id="pengurus">
          <SectionLabel>Pengurus wilayah</SectionLabel>
          <h2>
            Mengenal mitra
            <br />
            <em>di lingkungan warga.</em>
          </h2>
          <div className="officials-summary">
            {officials.map((official) => (
              <article key={official.role}>
                <h3>{official.role}</h3>
                <p>{official.name || "Nama belum dikonfirmasi"}</p>
                <p className="fine-print">{official.responsibilities}</p>
              </article>
            ))}
          </div>
          <TextLink href="/kontak">Informasi kontak tim</TextLink>
        </section>
      </div>
    </>
  );
}
