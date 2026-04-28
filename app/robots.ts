import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/*",
        "/dashboard*",
        "/login*",
        "/register*",
        "/forgot-password*",
        "/subscribe/success*",
        "/subscribe/cancel*",
        "/bbs*",
      ],
    },
    sitemap: "https://quantlogiclab.com/sitemap.xml",
    host: "https://quantlogiclab.com",
  };
}
