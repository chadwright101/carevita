"use server";

import { gql } from "@apollo/client";
import blogClient from "@/_lib/utils/blog-client";

interface BlogPostsQueryResponse {
  posts: {
    nodes: Array<{
      blog: {
        paragraph1: string;
        title: string;
        facility?: string;
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
      modified?: string;
      author: {
        node: {
          name: string;
        };
      };
    }>;
  };
}

const BLOG_POSTS_QUERY = gql`
  query BlogPosts {
    posts {
      nodes {
        blog {
          paragraph1
          title
          facility
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
        modified
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getBlogPosts() {
  const { data } = await blogClient.query<BlogPostsQueryResponse>({
    query: BLOG_POSTS_QUERY,
  });

  return (
    data?.posts.nodes.map((node) => ({
      ...node,
      slug: slugify(node.blog.title),
      modified: node.modified || node.date,
      blog: {
        ...node.blog,
        galleryList: [
          node.blog.galleryImage1?.mediaItemUrl,
          node.blog.galleryImage2?.mediaItemUrl,
          node.blog.galleryImage3?.mediaItemUrl,
          node.blog.galleryImage4?.mediaItemUrl,
          node.blog.galleryImage5?.mediaItemUrl,
        ].filter((item) => item !== undefined),
      },
    })) || []
  );
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
