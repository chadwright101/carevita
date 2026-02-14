import Image from "next/image";
import classNames from "classnames";
import Heading, { headingVariant } from "@/_components/ui/heading";
import { BlogPostNode } from "@/_types/blog-types";
import GeneralSlider from "@/_components/sliders/general-slider";

import parse from "html-react-parser";

interface Props {
  cssClasses?: string;
  data?: Array<BlogPostNode>;
}

const BlogPost = ({ cssClasses, data }: Props) => {
  return (
    <article className={classNames(cssClasses)}>
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
          index,
        ) => {
          return (
            <div
              key={id}
              className={classNames(
                "flex flex-col gap-5 desktop:grid grid-cols-2 desktop:gap-10",
                {
                  "mb-10": index < data.length - 1,
                  "border-b border-black/25 pb-10": index < data.length - 1,
                },
              )}
            >
              {/* Desktop view */}
              <div
                className={classNames(
                  "w-full aspect-square hidden desktop:block",
                  {
                    "desktop:order-2": index % 2,
                  },
                )}
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
                    className="object-cover w-full h-full"
                    priority={index < 2 ? true : false}
                    sizes="(max-width: 900px) 90vw, 80vw"
                  />
                )}
                {galleryList && !image1 && (
                  <GeneralSlider
                    blogSize
                    imageList={galleryList}
                    homeName={title}
                  />
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
                {/* Mobile view */}
                <div className="w-full mt-10 aspect-[5/3] desktop:hidden">
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
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                      priority={index < 1 ? true : false}
                      sizes="(max-width: 900px) 90vw, 80vw"
                    />
                  )}
                  {galleryList && !image1 && (
                    <GeneralSlider imageList={galleryList} homeName={title} />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 desktop:hidden">
                <p>{parse(`${paragraph1}`)}</p>
              </div>
            </div>
          );
        },
      )}
    </article>
  );
};

export default BlogPost;
