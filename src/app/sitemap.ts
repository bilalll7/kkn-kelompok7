import type { MetadataRoute } from "next";
import { navigation } from "@/data/navigation";
import { articles } from "@/data/articles";
import { siteUrl } from "@/lib/utils";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map((item) => ({
      url: `${siteUrl}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/berita/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
