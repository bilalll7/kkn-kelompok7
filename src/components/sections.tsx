import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Photo, SectionLabel, TextLink } from "./ui";
import { statistics, statisticsNote } from "@/data/statistics";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export function Statistics() {
  return (
    <section className="statistics wrap" aria-label="Statistik wilayah">
      <div className="stats-top">
        <SectionLabel>Wilayah dalam angka</SectionLabel>
        <span className="status-label">RW 12 & RW 13</span>
      </div>
      <dl className="stats-grid">
        {statistics.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>
              {stat.value}
              <small>{stat.unit}</small>
            </dd>
          </div>
        ))}
      </dl>
      <p className="fine-print">{statisticsNote}</p>
    </section>
  );
}
export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article className={`article-card ${featured ? "article-featured" : ""}`}>
      <Link
        href={`/berita/${article.slug}`}
        className="article-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo
          image={article.image}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </Link>
      <div className="article-info">
        <div className="article-meta">
          <span>{article.category}</span>
          {article.date ? (
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          ) : (
            <span className="date-pending">Tanggal belum dikonfirmasi</span>
          )}
        </div>
        <h3>
          <Link href={`/berita/${article.slug}`}>
            {article.title}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </h3>
        <p>{article.excerpt}</p>
        <span className="sample-tag">{article.status}</span>
      </div>
    </article>
  );
}
export function Location({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`location ${compact ? "location-home" : ""}`}
      aria-labelledby="location-title"
    >
      <div className="location-copy">
        <SectionLabel number={compact ? "08" : undefined}>
          Temukan kami
        </SectionLabel>
        <h2 id="location-title">
          Sebuah tempat.
          <br />
          <em>Banyak cerita.</em>
        </h2>
        <p>
          {site.address ||
            `${site.location}, Bandung.`}
        </p>
        <p className="muted">
          {site.region ||
            "Kecamatan, kabupaten / kota, dan provinsi belum dikonfigurasi."}
        </p>
        {site.mapsUrl ? (
          <a
            className="text-link"
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka Google Maps <ArrowUpRight size={18} />
          </a>
        ) : compact ? (
          <TextLink href="/kontak">Kontak & lokasi</TextLink>
        ) : (
          <p className="fine-print">
            Tautan petunjuk arah tersedia setelah lokasi resmi dikonfirmasi.
          </p>
        )}
      </div>
      <div className="map-panel">
        {site.mapsEmbedUrl ? (
          <iframe
            src={site.mapsEmbedUrl}
            title="Peta Wilayah KKN Sadang Serang RW 12 dan RW 13"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="map-empty">
            <MapPin size={36} strokeWidth={1.2} />
            <strong>{site.location}</strong>
            <span>Lokasi menunggu verifikasi</span>
            <small>Peta resmi akan ditampilkan di sini.</small>
          </div>
        )}
      </div>
    </section>
  );
}
