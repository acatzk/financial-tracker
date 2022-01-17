// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <Html className="overflow-y-scroll">
        <Head>
          <link rel="icon" href="/assets/images/logo.png" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
