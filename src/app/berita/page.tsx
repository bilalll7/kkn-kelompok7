import { PageHeader, SampleNote, SectionLabel } from "@/components/ui";
import { ArticleCard } from "@/components/sections";
import { ArticleFilter } from "@/components/article-filter";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/metadata";
import { pageContent } from "@/data/content";
import { activityNotice } from "@/data/activities";
export const metadata = pageMetadata(
  "Kegiatan",
  pageContent.activities.description,
  "/berita",
);
export default function NewsPage() {
  return (
    <>
      <PageHeader {...pageContent.activities} />
      <div className="wrap">
        <SampleNote>{activityNotice}</SampleNote>
        <div className="featured-news">
          <ArticleCard article={articles[0]} featured />
        </div>
        <section className="section news-list">
          <SectionLabel>Jelajahi cerita</SectionLabel>
          <h2>
            Jelajahi <em>dokumentasi.</em>
          </h2>
          <ArticleFilter articles={articles} />
        </section>
      </div>
    </>
  );
}
