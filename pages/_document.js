import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="https://use.typekit.net/vyk7kso.css"
            as="style"
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link rel="stylesheet" href="https://use.typekit.net/vyk7kso.css" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async defer src="https://a7s.kabirgoel.com/latest.js" />
          <noscript>
            <img
              src="https://a7s.kabirgoel.com/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
