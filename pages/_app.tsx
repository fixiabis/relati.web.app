import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

const AppRoot: React.FC<AppProps> = ({ Component, pageProps, router }) => (
  <Fragment>
    <Head>
      <title>relati</title>
    </Head>
    <Component {...pageProps} router={router} />
  </Fragment>
);

export default AppRoot;
