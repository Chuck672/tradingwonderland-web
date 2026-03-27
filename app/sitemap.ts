import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tradingwonderland.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/subscribe`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/priceaction_course.html`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/volumeprofile_course.html`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/priceaction_manual.html`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
