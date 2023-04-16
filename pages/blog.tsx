import Footer from "@/components/footer";
import Header from "@/components/header";
import Heading, { headingVariant } from "@/components/heading";
import BlogPost from "@/components/pages/blog/blog-post";
import Layout from "@/components/layout";

import client from "@/components/utils/client";

import { gql } from "@apollo/client";

export interface BlogData {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  title: string;
  image1?: {
    mediaItemUrl: string;
  };
  galleryList: Array<string>;
}

interface Props {
  BlogPosts?: Array<{
    blog: BlogData;
    id: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
  }>;
}

const Blog = ({ BlogPosts }: Props) => {
  return (
    <>
      <Header />
      <Layout>
        <Heading variant={headingVariant.pageHeading} cssClasses="mb-14">
          Blog
        </Heading>
        <BlogPost data={BlogPosts} />
      </Layout>
      <Footer />
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query BlogPosts {
        posts {
          nodes {
            blog {
              paragraph1
              paragraph2
              paragraph3
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
    BlogPosts: data.posts.nodes.map((node: any) => ({
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
