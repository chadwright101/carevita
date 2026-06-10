import type { MetadataRoute } from "next";
import { SITE_URL } from "@/_lib/utils/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/login",
        "/forgot-password",
        "/password-reset",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
