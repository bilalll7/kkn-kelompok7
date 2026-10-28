"use client";
import { useState } from "react";
import type { Article } from "@/types";
import { ArticleCard } from "./sections";
export function ArticleFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState("Semua");
  const categories = [
    "Semua",
    ...new Set(articles.map((article) => article.category)),
  ];
  const filtered = articles.filter(
    (article) => active === "Semua" || article.category === active,
  );
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter kategori kegiatan"
      >
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={category === active}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} artikel ditampilkan
      </p>
      <div className="news-grid">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
