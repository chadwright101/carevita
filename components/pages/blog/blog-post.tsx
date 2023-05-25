import Image from "next/image";
import Heading, { headingVariant } from "@/components/heading";
import { blogData } from "@/pages/blog";
import BlogPostSlider from "./blog-post-slider";

import parse from "html-react-parser";

interface Props {
  cssClasses?: string;
  data?: Array<{
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

const BlogPost = ({ cssClasses, data }: Props) => {
  return (
    <article className={`${cssClasses}`}>
      {data?.map(
        (
          {
            blog: { title, paragraph1, image1, galleryList, videoUrl },

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
              {/* Desktop view */}
              <div
                className={`w-full desktop:h-[550px] hidden desktop:block ${
                  index % 2 && "desktop:order-2"
                }`}
              >
                {videoUrl && (
                  <video src={videoUrl} className="w-auto h-full" controls />
                )}
                {image1 && (
                  <Image
                    src={image1?.mediaItemUrl}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="object-cover h-full w-full"
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={50}
                    sizes="(max-width: 425px) 300px, (max-width: 650px) 350px, (max-width: 900px) 450px,(max-width: 1100px) 500px,(max-width: 1400px) 650px, 550px"
                  />
                )}
                {galleryList && !image1 && (
                  <BlogPostSlider galleryList={galleryList} alt={title} />
                )}
              </div>
              <div>
                <div className="flex flex-col gap-2 items-center tablet:items-start">
                  <Heading
                    variant={headingVariant.subheading}
                    cssClasses="mb-0 tablet:mb-0 desktop:mb-0"
                  >
                    {title}
                  </Heading>
                  <p>
                    Posted on {date.substring(8, 10)}/{date.substring(5, 7)}/
                    {date.substring(0, 4)}
                  </p>
                  <p>
                    by <span className="italic font-light">{postedBy}</span>
                  </p>
                </div>
                <div className="flex-col gap-4 mt-10 hidden desktop:flex">
                  <p>{parse(`${paragraph1}`)}</p>
                </div>
                <div
                  className={`w-full mt-10 h-[300px] phone:h-[350px] tablet:h-[450px] tabletLarge:h-[500px] desktopSmall:h-[600px] desktop:h-[550px] desktop:hidden ${
                    index % 2 && "desktop:order-2"
                  }`}
                >
                  {/* Mobile view */}
                  {videoUrl && (
                    <video
                      src={videoUrl}
                      className="w-auto h-full mx-auto tablet:mx-0"
                      controls
                    />
                  )}
                  {image1 && (
                    <Image
                      src={image1?.mediaItemUrl}
                      alt={title}
                      width={1000}
                      height={1000}
                      className="object-cover h-full w-full"
                      loading={index < 1 ? "eager" : "lazy"}
                      quality={50}
                      sizes="(max-width: 425px) 300px, (max-width: 650px) 350px, (max-width: 900px) 450px,(max-width: 1100px) 500px,(max-width: 1400px) 650px, 550px"
                    />
                  )}
                  {galleryList && !image1 && (
                    <BlogPostSlider galleryList={galleryList} alt={title} />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 desktop:hidden">
                <p>{parse(`${paragraph1}`)}</p>
              </div>
            </div>
          );
        }
      )}
    </article>
  );
};

export default BlogPost;
