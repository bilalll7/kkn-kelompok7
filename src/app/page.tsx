import { Report } from "@/components/report";
import { HeroCarousel } from "@/components/motion/HeroCarousel";
import { heroSlides } from "@/data/hero-slides";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Photo, SectionLabel, TextLink } from "@/components/ui";
import { ArticleCard, Location, Statistics } from "@/components/sections";
import { site } from "@/data/site";
import { home } from "@/data/content";
import { team } from "@/data/team";
import { rwProfiles } from "@/data/profiles";
import { programs } from "@/data/programs";
import { activities, latestVerifiedActivities } from "@/data/activities";
import { gallery } from "@/data/gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Beranda", site.description, "/");
export default function Home() {
  const featured = activities.find((item) => item.featured) || activities[0];
  const latest = latestVerifiedActivities();
  return (
    <>
      <section className="kkn-hero wrap">
        <div className="kkn-hero-copy">
          <SectionLabel>{home.hero.eyebrow}</SectionLabel>
          <h1>
            {home.hero.title}
            <br />
            <em>{home.hero.accent}</em>
          </h1>
          <p className="lead">{home.hero.description}</p>
          <div className="hero-actions">
            <Link className="button" href="/berita">
              {home.hero.primary}
              <ArrowUpRight size={18} />
            </Link>
            <TextLink href="/profil">{home.hero.secondary}</TextLink>
          </div>
          <div className="hero-location">
            <span>{site.location}</span>
            <a href="#tentang" aria-label="Mengenal Kelompok 7">
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
        <HeroCarousel slides={heroSlides} />
      </section>
      <div className="demo-strip">
        <span className="demo-dot" />
        {site.contentNotice}
      </div>
      <section className="intro wrap section" id="tentang">
        <div>
          <SectionLabel number="01">{home.introduction.label}</SectionLabel>
          <h2>
            {home.introduction.title}
            <br />
            <em>{home.introduction.accent}</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="lead">{team.introduction}</p>
          <p>{team.description}</p>
          <TextLink href="/tentang">Mengenal tim kami</TextLink>
        </div>
      </section>
      <section className="rw-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <SectionLabel number="02">{home.profiles.label}</SectionLabel>
              <h2>
                {home.profiles.title}
                <br />
                <em>{home.profiles.accent}</em>
              </h2>
            </div>
            <p className="section-description">{home.profiles.description}</p>
          </div>
          <div className="rw-preview">
            {rwProfiles.map((rw) => (
              <article key={rw.id}>
                <span className="rw-number" aria-hidden="true">
                  {rw.number}
                </span>
                <div>
                  <SectionLabel>{site.region.split(" · ")[0]}</SectionLabel>
                  <h3>{rw.title}</h3>
                  <p>{rw.description}</p>
                  <TextLink href={`/profil#${rw.id}`}>
                    Mengenal {rw.title}
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <SectionLabel number="03">{home.programs.label}</SectionLabel>
            <h2>
              {home.programs.title}
              <br />
              <em>{home.programs.accent}</em>
            </h2>
          </div>
          <TextLink href="/potensi">Lihat program kerja</TextLink>
        </div>
        <div className="program-index">
          {programs.map((program, i) => (
            <Link key={program.slug} href={`/potensi#${program.slug}`}>
              <span className="program-index-number">0{i + 1}</span>
              <div>
                <h3>{program.subtitle}</h3>
                <p>{program.scope}</p>
              </div>
              <span className="program-index-status">{program.status}</span>
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-home wrap">
        <div className="section-heading">
          <div>
            <SectionLabel number="04">{home.featured.label}</SectionLabel>
            <h2>
              {home.featured.title}
              <br />
              <em>{home.featured.accent}</em>
            </h2>
          </div>
          <span className="fine-print">
            Sorotan kategori · bukan klaim capaian
          </span>
        </div>
        <ArticleCard article={featured} featured />
      </section>
      <section className="community">
        <div className="community-photo">
          <Photo image={home.collaboration.image} />
        </div>
        <div className="community-copy">
          <SectionLabel number="05">{home.collaboration.label}</SectionLabel>
          <h2>
            {home.collaboration.title}
            <br />
            <em>{home.collaboration.accent}</em>
          </h2>
          <p>{home.collaboration.description}</p>
          <p>{home.collaboration.note}</p>
          <TextLink href="/berita/perjumpaan-bersama-warga" light>
            Ruang cerita masyarakat
          </TextLink>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <SectionLabel number="06">{home.latest.label}</SectionLabel>
            <h2>
              {home.latest.title}
              <br />
              <em>{home.latest.accent}</em>
            </h2>
          </div>
          <TextLink href="/berita">Semua kegiatan</TextLink>
        </div>
        {latest.length > 0 ? (
          <div className="news-grid">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="timeline-pending">
            <div>
              <h3>{home.latest.emptyTitle}</h3>
              <p>{home.latest.emptyDescription}</p>
            </div>
            <ul>
              {activities
                .filter((item) => item.slug !== featured.slug)
                .slice(0, 3)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/berita/${item.slug}`}>
                      <span>{item.title}</span>
                      <ArrowUpRight size={18} />
                    </Link>
                    <small>{item.status}</small>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </section>
      <section className="gallery-preview section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <SectionLabel number="07">{home.gallery.label}</SectionLabel>
              <h2>
                {home.gallery.title}
                <br />
                <em>{home.gallery.accent}</em>
              </h2>
            </div>
            <TextLink href="/galeri">Buka galeri</TextLink>
          </div>
          <div className="preview-grid">
            {[gallery[3], gallery[1], gallery[2]].map((item) => (
              <Link
                key={item.id}
                href="/galeri"
                className="preview-photo"
                aria-label={`Lihat galeri: ${item.title}`}
              >
                <Photo image={item.image} />
                <span>
                  {item.title}
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
          <p className="fine-print">{site.contentNotice}</p>
        </div>
      </section>
      <Statistics />
      <Report />
      <div className="wrap section">
        <Location compact />
      </div>
    </>
  );
}
