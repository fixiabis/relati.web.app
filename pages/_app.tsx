import Head from 'next/head';
import '../styles/globals.css';

const AppRoot = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>relati</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default AppRoot;
