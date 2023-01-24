import Head from "next/head";

type HeadSeoProps = {
  title: string;
};

const HeadSeo = ({ title }: HeadSeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadSeo;
