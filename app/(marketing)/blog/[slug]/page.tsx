import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SingleBlogPost from "@/_components/pages/blog-page/single-blog-post";
import PageWrapper from "@/_lib/page-wrapper";
import { getBlogPosts, getBlogPostBySlug } from "@/_actions/blog-actions";
import {
  getExcerpt,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
} from "@/_lib/utils/blog-schema";
import { SITE_NAME } from "@/_lib/utils/site-config";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const description = getExcerpt(post.blog.paragraph1);
  const title = `${post.blog.title} - ${SITE_NAME}`;
  const images = post.blog.image1
    ? [{ url: post.blog.image1.mediaItemUrl }]
    : undefined;
  const tags = [post.blog.facility].filter(
    (item): item is string => !!item && item !== "None"
  );

  return {
    title,
    description,
    keywords: [
      ...tags,
      "CareVita",
      "retirement",
      "elderly care",
      "frail care",
    ].join(", "),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      siteName: SITE_NAME,
      locale: "en_ZA",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [post.author.node.name],
      tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogPostingSchema = buildBlogPostingSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.blog.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <PageWrapper cssClasses="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        href="/blog"
        className="inline-block mb-10 text-link desktop:hover:cursor-pointer desktop:hover:opacity-80 ease-in-out duration-300"
      >
        ← Back to blog
      </Link>
      <SingleBlogPost data={post} />
    </PageWrapper>
  );
}
