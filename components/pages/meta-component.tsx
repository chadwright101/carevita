import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  general: {
    title: string;
    extendedTitle: string;
    location: string;
    extendedLocation?: string | undefined;
    email: string;
    phone: string;
    homeUrl: string;
    description?: string | undefined;
    meta: {
      keywords: string;
      images: string[];
    };
  };
}

const MetaComponent = ({
  general: {
    title,
    description,
    extendedLocation,
    meta: { keywords, images },
  },
}: Props) => {
  const { pathname } = useRouter();
  return (
    <Head>
      <title>{`${title} - CareVita`}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`${title}, ${extendedLocation}, ${keywords}`}
      />
      {images.map((image, index) => (
        <meta property="og:image" content={image} key={index} />
      ))}
      <meta property="og:title" content={`${title}`} />
      <meta
        property="og:url"
        content={`https://www.catevita.co.za${pathname}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={`${title} - CareVita`} />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
    </Head>
  );
};

export default MetaComponent;
