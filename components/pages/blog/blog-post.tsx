import Heading, { headingVariant } from "@/components/heading";
import Image from "next/image";
import BlogPostSlider from "./blog-post-slider";

interface Props {
  cssClasses?: string;
  data: Array<{
    heading: string;
    date: string;
    postedBy: string;
    image1: {
      url: string;
      alt: string;
    };
    image2: {
      url: string;
      alt: string;
    };
    gallerySlider?: boolean;
    galleryList?: Array<{ url: string; alt: string }>;
    paragraph1: string;
    paragraph2?: string;
    paragraph3?: string;
  }>;
}

const BlogPost = ({ cssClasses, data }: Props) => {
  return (
    <article className={`${cssClasses}`}>
      {data.map(
        (
          {
            heading,
            date,
            postedBy,
            image1,
            image2,
            paragraph1,
            paragraph2,
            paragraph3,
            galleryList,
            gallerySlider,
          },
          index
        ) => (
          <div
            key={index}
            className={`grid gap-10 ${
              image2!
                ? "phone:grid-rows-[300px_1fr_300px] tablet:grid-rows-[400px_1fr_400px] tabletLarge:grid-rows-[450px_1fr_450px] desktop:grid-rows-1"
                : "phone:grid-rows-[300px_1fr] tablet:grid-rows-[400px_1fr] tabletLarge:grid-rows-[450px_1fr] desktop:grid-rows-1"
            } desktop:grid-cols-2 border-b border-black pb-14 ${
              index < data.length - 1 && "mb-14"
            }`}
          >
            <div
              className={`w-full desktop:h-[550px] ${
                image2 && !gallerySlider && "desktop:grid grid-rows-2 gap-10"
              } ${index % 2 && "desktop:order-2"}`}
            >
              {!gallerySlider && (
                <Image
                  src={image1.url}
                  alt={image1.alt}
                  width={1000}
                  height={1000}
                  className="object-cover h-full w-full"
                />
              )}
              {image2 && !gallerySlider && (
                <Image
                  src={image2!.url!}
                  alt={image2!.alt!}
                  width={1000}
                  height={1000}
                  className="object-cover h-full w-full hidden desktop:block"
                />
              )}
              {gallerySlider && <BlogPostSlider galleryList={galleryList} />}
            </div>
            <div>
              <div className="flex flex-col gap-2 items-center tablet:items-start">
                <Heading
                  variant={headingVariant.subheading}
                  cssClasses="mb-0 tablet:mb-0 desktop:mb-0"
                >
                  {heading}
                </Heading>
                <p>Posted on {date}</p>
                <p>
                  By{" "}
                  <span className="text-link italic font-light">
                    {postedBy}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-10">
                <p>{paragraph1}</p>
                <p>{paragraph2}</p>
                <p>{paragraph3}</p>
              </div>
            </div>
            {image2 && !gallerySlider && (
              <div className="w-full h-full desktop:hidden">
                <Image
                  src={image2!.url!}
                  alt={image2!.alt!}
                  width={1000}
                  height={1000}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
          </div>
        )
      )}
    </article>
  );
};

export default BlogPost;
