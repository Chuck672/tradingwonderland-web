import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://quantlogiclab.com";
  const now = new Date();

  const toolIds = [
    "SVP5_pro",
    "inRangeVP",
    "scalpTradingPanel",
    "strengthBubble_pro",
    "Trend_Panel9_pro",
    "microOrderFlow",
    "awesomeChart",
    "awesomeTradingAgent",
  ];

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/resources/lesson-1`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/psychology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/psychology/from-loser-to-winner`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/resources/psychology/why-95-percent-fail`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...toolIds.map((id) => ({
      url: `${base}/tools/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/subscribe`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/resources/priceaction-course`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/volumeprofile-course`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/priceaction-manual`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/tradingsystem`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/trading-journal`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/pretrade-checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
