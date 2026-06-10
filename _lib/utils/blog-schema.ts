import type { BlogPostNode } from "@/_types/blog-types";
import { SITE_URL, SITE_NAME, SITE_LOGO } from "@/_lib/utils/site-config";

export function getExcerpt(paragraph: string) {
  return paragraph
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export function buildBlogPostingSchema(post: BlogPostNode) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const images = [
    post.blog.image1?.mediaItemUrl,
    ...post.blog.galleryList,
  ].filter(Boolean);
  const keywords = [post.blog.facility].filter(
    (item) => item && item !== "None"
  );

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.blog.title,
    description: getExcerpt(post.blog.paragraph1),
    image: images,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author.node.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.blog.facility && post.blog.facility !== "None"
      ? { articleSection: post.blog.facility }
      : {}),
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
