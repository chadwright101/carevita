import type { Metadata } from "next";

import Heading, { headingVariant } from "@/_components/ui/heading";
import BlogPost from "@/_components/pages/blog-page/blog-post";
import PageWrapper from "@/_lib/page-wrapper";
import { getBlogPosts } from "@/_actions/blog-actions";
import { buildBreadcrumbSchema } from "@/_lib/utils/blog-schema";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/_lib/utils/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog - CareVita",
  description: SITE_DESCRIPTION,
  keywords:
    "blog, CareVita, Retirement, retirement home, frail care, elderly care, caregiving, nursing, nursing services, supporting services, catering services, retirement estate",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog - CareVita",
    description: SITE_DESCRIPTION,
    url: "/blog",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_ZA",
    images: [{ url: "/assets/media/parsonage-street/9U7A3836.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - CareVita",
    description: SITE_DESCRIPTION,
    images: ["/assets/media/parsonage-street/9U7A3836.jpg"],
  },
};

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog - CareVita",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.blog.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.modified || post.date,
      author: {
        "@type": "Person",
        name: post.author.node.name,
      },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <PageWrapper cssClasses="mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Heading variant={headingVariant.pageHeading} cssClasses="mb-10">
        Blog
      </Heading>
      <BlogPost data={blogPosts} />
    </PageWrapper>
  );
}
