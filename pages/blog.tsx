import Head from "next/head";

import Heading, { headingVariant } from "@/components/heading";
import BlogPost from "@/components/pages/blog/blog-post";
import Layout from "@/components/layout";
import blogClient from "@/components/utils/blog-client";

import { gql } from "@apollo/client";

import generalData from "@/data/general-data.json";

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

const Blog = ({ blogPosts }: Props) => {
  const {
    blog: {
      meta: { title, description, keywords, images },
    },
  } = generalData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {images.map((image, index) => (
          <meta property="og:image" content={image} key={index} />
        ))}
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={`https://www.catevita.co.za`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={`Home - ${title}`} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </Head>
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

  const finalContent = {
    blogPosts: data?.posts.nodes.map((node) => ({
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
    })) || [],
  };

  return {
    props: finalContent,
    revalidate: 15,
  };
}
