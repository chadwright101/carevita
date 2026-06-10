import Image from "next/image";
import classNames from "classnames";
import Heading, { headingVariant } from "@/_components/ui/heading";
import { BlogPostNode } from "@/_types/blog-types";
import GeneralSlider from "@/_components/sliders/general-slider";

import parse from "html-react-parser";

interface Props {
  cssClasses?: string;
  data: BlogPostNode;
}

const SingleBlogPost = ({ cssClasses, data }: Props) => {
  const {
    blog: { title, paragraph1, image1, galleryList, videoUrl, facility },
    date,
  } = data;

  return (
    <article
      className={classNames(
        "flex flex-col gap-5 desktop:grid grid-cols-2 desktop:gap-10",
        cssClasses,
      )}
    >
      <div className="w-full aspect-square hidden desktop:block">
        {videoUrl && (
          <video src={videoUrl} className="w-auto h-full" controls />
        )}
        {image1 && (
          <Image
            src={image1?.mediaItemUrl}
            alt={title}
            width={1000}
            height={1000}
            className="object-contain object-top w-full h-full"
            priority
            sizes="(max-width: 900px) 90vw, 80vw"
          />
        )}
        {galleryList && !image1 && (
          <GeneralSlider blogSize imageList={galleryList} homeName={title} />
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
          {facility !== "None" && (
            <p>
              by <span className="italic font-light">{facility}</span>
            </p>
          )}
        </div>
        <div className="flex-col gap-4 mt-10 hidden desktop:flex">
          <div>{parse(`${paragraph1}`)}</div>
        </div>
        <div className="w-full mt-10 [&_img]:aspect-[5/3] [&_video]:aspect-square desktop:hidden">
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
              priority
              sizes="(max-width: 900px) 90vw, 80vw"
            />
          )}
          {galleryList && !image1 && (
            <GeneralSlider imageList={galleryList} homeName={title} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 desktop:hidden">
        <div>{parse(`${paragraph1}`)}</div>
      </div>
    </article>
  );
};

export default SingleBlogPost;
