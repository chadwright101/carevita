import type { MetadataRoute } from "next";
import { SITE_URL } from "@/_lib/utils/site-config";
import { getBlogPosts } from "@/_actions/blog-actions";
import { getFacilityNavigation } from "@/_actions/facilities-actions";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/our-homes",
    "/blog",
    "/business-portfolio",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const [posts, facilities] = await Promise.all([
    getBlogPosts().catch(() => []),
    getFacilityNavigation().catch(() => []),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const facilityRoutes: MetadataRoute.Sitemap = facilities.map((facility) => ({
    url: `${SITE_URL}/our-homes/${facility.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...facilityRoutes, ...blogRoutes];
}
