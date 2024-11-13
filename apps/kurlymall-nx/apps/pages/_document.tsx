import 'dd-trace';

import { Head, Html, Main, NextScript } from 'next/document';

import { DetailedHTMLProps, LinkHTMLAttributes } from 'react';

import { LINK_TAG_ATTR_LIST } from '../src/shared/constant/document';

const createLinkTag = (attrs: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>) => (
  <link {...attrs} />
);

const Document = () => (
  <Html lang="ko">
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="application-name" content="컬리" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="format-detection" content="telephone=no" />

      {LINK_TAG_ATTR_LIST.map((attribute) => createLinkTag(attribute))}

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="컬리" />

      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-tap-highlight" content="no" />

      <link rel="manifest" href="/manifest.json" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
