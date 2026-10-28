import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Photo, SampleNote, SectionLabel } from "@/components/ui";
import { ArticleCard } from "@/components/sections";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { site } from "@/data/site";
import { activityNotice } from "@/data/activities";
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article
    ? pageMetadata(article.title, article.excerpt, `/berita/${slug}`)
    : { title: "Artikel tidak ditemukan" };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <>
      <article className="wrap article-page">
        <Link href="/berita" className="back-link">
          <ArrowLeft size={18} />
          Kembali ke kegiatan
        </Link>
        <header className="article-heading">
          <SectionLabel>{article.category}</SectionLabel>
          <h1>{article.title}</h1>
          <p className="lead">{article.excerpt}</p>
          <div className="article-meta">
            <span>{site.group} · UNIKOM</span>
            {article.date ? (
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            ) : (
              <span>Tanggal belum dikonfirmasi</span>
            )}
            <span>{article.status}</span>
          </div>
        </header>
        <Photo
          image={article.image}
          className="wide-photo"
          priority
          sizes="100vw"
        />
        <p className="image-credit">
          {article.image.placeholder ? "Foto ilustrasi" : "Foto dokumentasi"} ·{" "}
          <a
            href={article.image.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.image.credit}
          </a>
        </p>
        <div className="article-body">
          {article.status === "Menunggu verifikasi" && (
            <SampleNote>{activityNotice}</SampleNote>
          )}
          <p className="fine-print">
            Lokasi: {article.location || "Belum dikonfirmasi"}
          </p>
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </article>
      <section className="wrap section related">
        <SectionLabel>Baca juga</SectionLabel>
        <h2>
          Cerita <em>lainnya.</em>
        </h2>
        <div className="news-grid">
          {articles
            .filter((item) => item.slug !== slug)
            .slice(0, 2)
            .map((item) => (
              <ArticleCard article={item} key={item.slug} />
            ))}
        </div>
      </section>
    </>
  );
}
