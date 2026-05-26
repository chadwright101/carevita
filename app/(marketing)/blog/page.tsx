import type { Metadata } from "next";

import Heading, { headingVariant } from "@/_components/ui/heading";
import BlogPost from "@/_components/pages/blog-page/blog-post";
import PageWrapper from "@/_lib/page-wrapper";
import { getBlogPosts } from "@/_actions/blog-actions";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog - CareVita",
  description:
    "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
  keywords:
    "blog, CareVita, Retirement, retirement home, frail care, elderly care, caregiving, nursing, nursing services, supporting services, catering services, retirement estate",
  openGraph: {
    title: "Blog - CareVita",
    description:
      "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
    type: "website",
    siteName: "Blog - CareVita",
    images: [{ url: "/assets/media/parsonage-street/9U7A3836.jpg" }],
  },
};

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <PageWrapper>
      <Heading variant={headingVariant.pageHeading} cssClasses="mb-14">
        Blog
      </Heading>
      <hr className="my-14" />
      <BlogPost data={blogPosts} />
    </PageWrapper>
  );
}
