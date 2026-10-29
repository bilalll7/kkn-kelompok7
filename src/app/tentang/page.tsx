import Image from "next/image";
import Link from "next/link";
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
        <section className="team-introduction">
          <div className="team-visual">
            <Photo
              image={{ ...images.community, fit: "cover", position: "center" }}
              className="team-photo"
              sizes="(max-width: 767px) 100vw, 40vw"
            />
            <div className="team-mark" aria-hidden="true">
              <strong>{site.group.replace("Kelompok ", "").padStart(2, "0")}</strong>
              <span>KKN BERDAMPAK / UNIKOM</span>
            </div>
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
              Kenali mahasiswa KKN Berdampak Kelompok 7 UNIKOM yang berkolaborasi bersama masyarakat RW 12 dan RW 13, Sadang Serang.
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
            </dl></div></section><section id="anggota" className="section portrait-grid" aria-label="Anggota kelompok">{team.members.map((member) => <article key={member.id}><Link className="member-card" href={`/tentang/anggota/${member.slug}`}><div className="portrait-frame"><Image src={member.image} alt={member.imageAlt} fill sizes="(max-width: 768px) 50vw, 25vw" /></div><h3>{member.name}</h3><p>{member.division} · {member.position}</p></Link></article>)}</section></div>
    </>
  );
}


