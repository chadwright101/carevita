import Heading, { headingVariant } from "@/components/heading";
import Image from "next/image";

interface Props {
  cssClasses?: string;
  data: Array<{
    heading: string;
    date: string;
    postedBy: string;
    image: {
      url: string;
      alt: string;
    };
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
            image: { url, alt },
            paragraph1,
            paragraph2,
            paragraph3,
          },
          index
        ) => (
          <div
            key={index}
            className={`grid gap-10 desktopSmall:grid-cols-2 border-b border-black pb-14 ${
              index < data.length - 1 && "mb-14"
            }`}
          >
            <div className={`${index * 2 && "desktopSmall:order-2"}`}>
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
            <div className="w-full h-full">
              <Image
                src={url}
                alt={alt}
                width={1000}
                height={1000}
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        )
      )}
    </article>
  );
};

export default BlogPost;
