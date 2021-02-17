import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class DocumentRoot extends Document {
  static getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="zh-Hant-TW" dir="ltr">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="relati - 一款基於連線的棋盤遊戲，玩家將需要活用特定的連線路徑去下棋，在沒辦法下棋時，便會輸掉遊戲。"
          />

          <meta name="theme-color" content="#888" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="relati" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          <meta name="application-name" content="relati" />
          <meta name="msapplication-navbutton-color" content="#f2f2f2" />
          <meta name="msapplication-TileColor" content="#f2f2f2" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          <meta name="msapplication-tooltip" content="relati" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          <meta name="nightmode" content="disable" />
          <meta name="layoutmode" content="fitscreen" />
          <meta name="imagemode" content="force" />

          <link
            href="/images/icons/favicon-16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/images/icons/favicon-32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            href="/images/icons/favicon-48.png"
            rel="icon"
            type="image/png"
            sizes="48x48"
          />

          <link
            href="/images/icons/touch-icon-iphone.png"
            rel="apple-touch-icon"
          />
          <link
            href="/images/icons/touch-icon-ipad.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="/images/icons/touch-icon-iphone-retina.png"
            rel="apple-touch-icon"
            sizes="120x120"
          />
          <link
            href="/images/icons/touch-icon-ipad-retina.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />

          <link
            href="/images/icons/touch-icon-start-up-320x480.png"
            rel="apple-touch-startup-image"
          />

          <link
            href="/images/icons/icon-192x192.png"
            rel="icon"
            sizes="192x192"
          />
          <link
            href="/images/icons/icon-128x128.png"
            rel="icon"
            sizes="128x128"
          />

          <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          <link
            href="/images/icons/icon-52x52.png"
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
          />
          <link
            href="/images/icons/icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
          />

          <link href="/manifest.json" rel="manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentRoot;
