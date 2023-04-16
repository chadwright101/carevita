import Footer from "@/components/footer";
import Header from "@/components/header";
import Heading, { headingVariant } from "@/components/heading";
import BlogPost from "@/components/pages/blog/blog-post";
import Layout from "@/components/layout";

import client from "@/components/utils/client";

import { gql } from "@apollo/client";

interface Props {
  BlogPosts?: Array<{
    blog: {
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
      title: string;
      image1: {
        mediaItemUrl: string;
      };
      galleryImage1: {
        mediaItemUrl: string;
      };
      galleryImage2: {
        mediaItemUrl: string;
      };
      galleryImage3: {
        mediaItemUrl: string;
      };
      galleryImage4: {
        mediaItemUrl: string;
      };
      galleryImage5: {
        mediaItemUrl: string;
      };
    };
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

  return {
    props: { BlogPosts: data.posts.nodes },
    revalidate: 15,
  };
}
