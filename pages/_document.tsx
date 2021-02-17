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
            href="/favicon-16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            href="/favicon-48.png"
            rel="icon"
            type="image/png"
            sizes="48x48"
          />

          <link
            href="/apple-icon-60x60.png"
            rel="apple-touch-icon"
          />
          <link
            href="/apple-icon-76x76.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="/apple-icon-120x120.png"
            rel="apple-touch-icon"
            sizes="120x120"
          />
          <link
            href="/apple-icon-152x152.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />

          <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          <link
            href="/apple-icon-precomposed.png"
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
          />
          <link
            href="/apple-icon-72x72.png"
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
