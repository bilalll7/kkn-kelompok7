import { Photo } from "@/components/ui";
import { images } from "@/data/images";
import { PageHeader, SectionLabel, TextLink } from "@/components/ui";
import { pageContent } from "@/data/content";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Tentang Kami",
  pageContent.about.description,
  "/tentang",
);
export default function AboutPage() {
  return (
    <>
      <PageHeader {...pageContent.about} />
      <div className="wrap">
        <Photo image={images.nature} />
        <section className="team-introduction">
          <div className="team-mark" aria-hidden="true">
            07<span>KKN BERDAMPAK / UNIKOM</span>
          </div>
          <div>
            <SectionLabel>{site.location}</SectionLabel>
            <p className="lead">{team.introduction}</p>
            <p className="muted">{team.description}</p>
            <TextLink href="/profil">Kenali wilayah kolaborasi</TextLink>
          </div>
        </section>
        <section className="section">
          <SectionLabel>Cara kami bercerita</SectionLabel>
          <h2>
            Belajar, berkolaborasi,
            <br />
            <em>mendokumentasikan.</em>
          </h2>
          <ol className="team-principles">
            {team.principles.map((item, i) => (
              <li key={item.title}>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="editorial-split team-details">
          <div>
            <SectionLabel>Tim KKN</SectionLabel>
            <h2>
              Orang-orang
              <br />
              <em>di balik perjalanan.</em>
            </h2>
            <p className="muted">
              Identitas anggota dipublikasikan setelah dikonfirmasi dan mendapat
              persetujuan.
            </p>
          </div>
          <div>
            <dl className="detail-list">
              {[
                ["Kelompok", team.name],
                ["Perguruan tinggi", team.university],
                ["Periode KKN", team.period],
                ["Dosen pembimbing", team.supervisor],
                ["Koordinator", team.coordinator],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value || "Belum dikonfirmasi"}</dd>
                </div>
              ))}
            </dl>
            {team.members.length ? (
              <ul className="simple-list">
                {team.members.map((member) => (
                  <li key={member.name}>
                    {member.name} · {member.role}
                    {member.studyProgram && ` · ${member.studyProgram}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sample-note">
                Daftar anggota dan program studi belum tersedia untuk
                dipublikasikan.
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
