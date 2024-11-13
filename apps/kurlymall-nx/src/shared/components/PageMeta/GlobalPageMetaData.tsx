import Head from 'next/head';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { KURLY_URL, RESOURCE_URL } from '../../configs/config';
import Paths from '../../constant/paths';
import PageMeta, { DEFAULT_IMAGE_PATH, DEFAULT_PAGE_META, PageMetaType } from '../../constant/page-meta';
import RichResults from '../../constant/rich-results';
import { checkMetaInjectByPage } from './checkMetaInjectByPage';

export const getResourceUrl = (path: string) => {
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }

  return `${RESOURCE_URL}${path}`;
};

const GlobalPageMetaData = () => {
  const { pathname, asPath } = useRouter();

  const removedQueryAsPath = asPath.split('?')[0];
  const pathKey = Paths[removedQueryAsPath] || Paths[pathname];
  const metaData = useMemo<PageMetaType>(() => {
    const targetMeta = PageMeta[pathKey];
    if (!pathKey || !targetMeta) {
      return DEFAULT_PAGE_META;
    }

    return targetMeta;
  }, [pathKey]);

  const { title, description, keywords, imageUrl, ldKeyList } = metaData;
  const image = getResourceUrl(imageUrl || DEFAULT_IMAGE_PATH);
  const url = `${KURLY_URL}${asPath}`;
  const isMetaInjectByPage = checkMetaInjectByPage(pathKey);

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
      />
      {!isMetaInjectByPage && (
        <>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="컬리 - 마켓컬리/뷰티컬리" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:url" content={url} />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={image} />
          <meta property="twitter:url" content={url} />

          <link rel="canonical" href={`${KURLY_URL}${removedQueryAsPath}`} />
        </>
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet" />
      {ldKeyList?.map((ldKey, index) => (
        <script
          key={`${ldKey}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(RichResults[ldKey]),
          }}
        />
      ))}
    </Head>
  );
};

export default GlobalPageMetaData;
