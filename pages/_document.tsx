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
      <Html lang="zh-Hant-TW">
        <Head>
          <meta
            name="description"
            content="relati是一款基於連線的棋盤遊戲，玩家將需要活用特定的連線路徑去下棋，在沒辦法下棋時，便會輸掉遊戲。"
          />
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
