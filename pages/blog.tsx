import Footer from "@/components/footer";
import Header from "@/components/header";
import Heading, { headingVariant } from "@/components/heading";
import BlogPost from "@/components/pages/blog/blog-post";
import Layout from "@/components/layout";

import dummyData from "../data/blog-dummy-data.json";

const Blog = () => {
  return (
    <>
      <Header />
      <Layout>
        <Heading variant={headingVariant.pageHeading} cssClasses="mb-14">
          Blog
        </Heading>
        <BlogPost data={dummyData} />
      </Layout>
      <Footer />
    </>
  );
};

export default Blog;
