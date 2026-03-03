import type { Metadata } from "next";

import Heading, { headingVariant } from "@/_components/ui/heading";
import BlogPost from "@/_components/pages/blog-page/blog-post";
import PageWrapper from "@/_lib/page-wrapper";
import blogClient from "@/_lib/utils/blog-client";

import { gql } from "@apollo/client";

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

interface BlogPostsQueryResponse {
  posts: {
    nodes: Array<{
      blog: {
        paragraph1: string;
        title: string;
        image1?: {
          mediaItemUrl: string;
        };
        galleryImage1?: {
          mediaItemUrl: string;
        };
        galleryImage2?: {
          mediaItemUrl: string;
        };
        galleryImage3?: {
          mediaItemUrl: string;
        };
        galleryImage4?: {
          mediaItemUrl: string;
        };
        galleryImage5?: {
          mediaItemUrl: string;
        };
        videoUrl: string;
      };
      id: string;
      date: string;
      author: {
        node: {
          name: string;
        };
      };
    }>;
  };
}

export default async function Blog() {
  const { data } = await blogClient.query<BlogPostsQueryResponse>({
    query: gql`
      query BlogPosts {
        posts {
          nodes {
            blog {
              paragraph1
              title
              image1 {
                mediaItemUrl
              }
              galleryImage1 {
                mediaItemUrl
              }
              galleryImage2 {
                mediaItemUrl
              }
              galleryImage3 {
                mediaItemUrl
              }
              galleryImage4 {
                mediaItemUrl
              }
              galleryImage5 {
                mediaItemUrl
              }
              videoUrl
            }
            id
            date
            author {
              node {
                name
              }
            }
          }
        }
      }
    `,
  });

  const blogPosts =
    data?.posts.nodes.map((node) => ({
      ...node,
      blog: {
        ...node.blog,
        galleryList: [
          node.blog.galleryImage1?.mediaItemUrl,
          node.blog.galleryImage2?.mediaItemUrl,
          node.blog.galleryImage3?.mediaItemUrl,
          node.blog.galleryImage4?.mediaItemUrl,
        ].filter((item) => item !== undefined),
      },
    })) || [];

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
