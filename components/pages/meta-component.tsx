import Head from "next/head";

interface Props {
  pageName?: string;
}

const MetaComponent = ({ pageName }: Props) => {
  return (
    <Head>
      <title>{`${pageName} - CareVita`}</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta property="og:image" content="" />
      <meta property="og:title" content="" />
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="" />
      <meta property="og:site_name" content="" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
    </Head>
  );
};

export default MetaComponent;
