import { useState } from "react";
import Heading, { headingVariant } from "@/components/heading";
import { BlogData } from "@/pages/blog";
import Image from "next/image";
import BlogPostSlider from "./blog-post-slider";
import useScrollPosition from "../../utils/scroll-position";

interface Props {
  cssClasses?: string;
  data?: Array<{
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

const BlogPost = ({ cssClasses, data }: Props) => {
  const scrollPosition = useScrollPosition();

  return (
    <article className={`${cssClasses}`}>
      {data?.map(
        (
          {
            blog: {
              title,
              paragraph1,
              paragraph2,
              paragraph3,
              image1,
              galleryList,
            },

            id,
            date,
            author: {
              node: { name: postedBy },
            },
          },
          index
        ) => {
          return (
            <div
              key={id}
              className={`grid gap-10 desktop:grid-cols-2 border-b border-black pb-14 ${
                index < data.length - 1 && "mb-14"
              }`}
            >
              <div
                className={`w-full desktop:h-[550px] hidden desktop:block ${
                  index % 2 && "desktop:order-2"
                }`}
              >
                {!galleryList && image1 && (
                  <Image
                    src={image1?.mediaItemUrl}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="object-cover h-full w-full"
                    loading={`${scrollPosition < 1000 ? "eager" : "lazy"}`}
                  />
                )}
                {galleryList && <BlogPostSlider galleryList={galleryList} />}
              </div>
              <div>
                <div className="flex flex-col gap-2 items-center tablet:items-start">
                  <Heading
                    variant={headingVariant.subheading}
                    cssClasses="mb-0 tablet:mb-0 desktop:mb-0"
                  >
                    {title}
                  </Heading>
                  <p>Posted on {date}</p>
                  <p>
                    By{" "}
                    <span className="text-link italic font-light">
                      {postedBy}
                    </span>
                  </p>
                </div>
                <div className="flex-col gap-4 mt-10 hidden desktop:flex">
                  <p>{paragraph1}</p>
                  {paragraph2 && <p>{paragraph2}</p>}
                  {paragraph3 && <p>{paragraph3}</p>}
                </div>
                <div
                  className={`w-full mt-10 h-[300px] phone:h-[350px] tablet:h-[450px] tabletLarge:h-[500px] desktopSmall:h-[600px] desktop:h-[550px] desktop:hidden ${
                    index % 2 && "desktop:order-2"
                  }`}
                >
                  {!galleryList && image1 && (
                    <Image
                      src={image1?.mediaItemUrl}
                      alt={title}
                      width={1000}
                      height={1000}
                      className="object-cover h-full w-full"
                      loading={`${scrollPosition < 1000 ? "eager" : "lazy"}`}
                    />
                  )}
                  {galleryList && <BlogPostSlider galleryList={galleryList} />}
                </div>
              </div>
              <div className="flex flex-col gap-4 desktop:hidden">
                <p>{paragraph1}</p>
                {paragraph2 && <p>{paragraph2}</p>}
                {paragraph3 && <p>{paragraph3}</p>}
              </div>
            </div>
          );
        }
      )}
    </article>
  );
};

export default BlogPost;
