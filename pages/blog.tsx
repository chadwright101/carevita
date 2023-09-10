import Heading, { headingVariant } from "@/components/heading";
import BlogPost from "@/components/pages/blog/blog-post";
import Layout from "@/components/layout";

import blogClient from "@/components/utils/blog-client";

import { gql } from "@apollo/client";

export interface blogData {
  paragraph1: string;
  title: string;
  image1?: {
    mediaItemUrl: string;
  };
  galleryList: Array<string>;
  videoUrl: string;
}

interface Props {
  blogPosts?: Array<{
    blog: blogData;
    id: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
  }>;
}

const Blog = ({ blogPosts }: Props) => {
  return (
    <>
      <Layout>
        <Heading variant={headingVariant.pageHeading} cssClasses="mb-14">
          Blog
        </Heading>
        <hr className="my-14" />
        <BlogPost data={blogPosts} />
      </Layout>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const { data } = await blogClient.query({
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

  const finalContent = {
    blogPosts: data.posts.nodes.map((node: any) => ({
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
    })),
  };

  return {
    props: finalContent,
    revalidate: 15,
  };
}
