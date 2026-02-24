import { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { translations } from "@/data/translations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rodtuaromdee.com";

  // Base routes for each language
  const routes = i18n.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Article routes for each language
  const articleRoutes = i18n.locales.flatMap((locale) => {
    // Assuming the article IDs are universal across all languages
    return translations[locale].articles.items.map((article) => ({
      url: `${baseUrl}/${locale}/articles/${article.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...routes,
    ...articleRoutes,
  ];
}
