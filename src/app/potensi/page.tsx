import { Report } from "@/components/report";
import { Photo } from "@/components/ui";
import { images } from "@/data/images";
import {
  PageHeader,
  SectionLabel,
  SampleNote,
  TextLink,
} from "@/components/ui";
import { programs } from "@/data/programs";
import { activities } from "@/data/activities";
import { pageContent } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Program Kerja",
  pageContent.programs.description,
  "/potensi",
);
export default function ProgramsPage() {
  return (
    <>
      <PageHeader {...pageContent.programs} />
      <Report />
      <div className="wrap">
        <Photo image={images.craft} />
        <SampleNote>
          Bidang berikut disusun dari kategori dokumentasi awal. Belum merupakan
          daftar program resmi atau laporan capaian.
        </SampleNote>
        <nav className="anchor-nav" aria-label="Bidang program">
          {programs.map((program) => (
            <a href={`#${program.slug}`} key={program.slug}>
              {program.subtitle}
            </a>
          ))}
        </nav>
        {programs.map((program, i) => (
          <section
            id={program.slug}
            key={program.slug}
            className="program-detail"
          >
            <div>
              <SectionLabel number={`0${i + 1}`}>
                {program.subtitle}
              </SectionLabel>
              <h2>{program.title}</h2>
              <p className="program-scope">{program.scope}</p>
              <span className="sample-tag">{program.status}</span>
            </div>
            <div>
              <p className="lead">{program.description}</p>
              <h3 className="eyebrow">Informasi yang akan dilengkapi</h3>
              <ul className="simple-list">
                {program.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="program-related">
                {program.activitySlugs.map((slug) => (
                  <TextLink href={`/berita/${slug}`} key={slug}>
                    {activities.find((item) => item.slug === slug)?.title ||
                      "Dokumentasi terkait"}
                  </TextLink>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
