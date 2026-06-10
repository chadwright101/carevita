import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import Heading, { headingVariant } from "@/_components/ui/heading";
import { BlogPostNode } from "@/_types/blog-types";
import { getExcerpt } from "@/_lib/utils/blog-schema";

interface Props {
  cssClasses?: string;
  data?: Array<BlogPostNode>;
}

const BlogPost = ({ cssClasses, data }: Props) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-10 tablet:grid-cols-2 desktop:grid-cols-3",
        cssClasses,
      )}
    >
      {data?.map(
        ({
          blog: { title, paragraph1, image1, galleryList },
          slug,
          id,
          date,
          author,
        }) => {
          const imageUrl = image1?.mediaItemUrl || galleryList?.[0];

          return (
            <Link
              key={id}
              href={`/blog/${slug}`}
              className="flex flex-col gap-4 desktop:hover:cursor-pointer"
            >
              <div
                className={classNames(
                  "w-full aspect-[5/3] bg-white overflow-hidden flex items-center justify-center",
                  !imageUrl
                    ? "border border-black/25 desktop:hover:border-black desktop:hover:bg-green/5 delay-75 ease-in-out duration-500"
                    : "",
                )}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full ease-in-out delay-75 duration-500 desktop:hover:scale-[102%]"
                    sizes="(max-width: 900px) 90vw, 33vw"
                  />
                ) : (
                  <Image
                    src="/assets/media/carevita-logo.png"
                    alt="CareVita"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Heading
                  variant={headingVariant.subheading}
                  cssClasses="line-clamp-2"
                >
                  {title}
                </Heading>
                <p className="flex flex-col text-[16px]">
                  Posted on {date.substring(8, 10)}/{date.substring(5, 7)}/
                  {date.substring(0, 4)}
                  <span className="italic font-light">
                    by {author.node.name}
                  </span>
                </p>
                <p className="line-clamp-4">{getExcerpt(paragraph1)}</p>
              </div>
            </Link>
          );
        },
      )}
    </div>
  );
};

export default BlogPost;
