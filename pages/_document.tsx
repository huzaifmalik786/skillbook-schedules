import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
