import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

const AppRoot = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>relati</title>
    </Head>
    <Component {...pageProps} />
  </Fragment>
);

export default AppRoot;
