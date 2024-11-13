import Head from 'next/head';

import {
  DEFAULT_BEAUTY_IMAGE_PATH,
  DEFAULT_BEAUTY_SUB_DESCRIPTION,
  DEFAULT_BEAUTY_SUB_TITLE,
  DEFAULT_IMAGE_PATH,
  DEFAULT_SUB_DESCRIPTION,
  DEFAULT_SUB_TITLE,
} from '../../constant/page-meta';
import { KURLY_URL } from '../../configs/config';
import { getResourceUrl } from './GlobalPageMetaData';
import { useAppSelector } from '../../store';

const parseURL = (urlOrPath: string) => {
  if (urlOrPath.startsWith('/')) {
    return `${KURLY_URL}${urlOrPath}`;
  }
  return urlOrPath;
};

interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  keyword: string;
}

export default function PageMetaData({
  title,
  description,
  image = getResourceUrl(DEFAULT_IMAGE_PATH),
  url,
  keyword,
}: Props) {
  const prevSite = useAppSelector(({ main }) => main.site);
  const isMarket = prevSite === 'MARKET';
  const defaultSubTitle = isMarket ? DEFAULT_SUB_TITLE : DEFAULT_BEAUTY_SUB_TITLE;
  const defaultSubDescription = isMarket ? DEFAULT_SUB_DESCRIPTION : DEFAULT_BEAUTY_SUB_DESCRIPTION;
  const defaultImage = isMarket ? DEFAULT_BEAUTY_IMAGE_PATH : DEFAULT_BEAUTY_IMAGE_PATH;
  const metaTitle = `${title}${defaultSubTitle}`;
  const metaDescription = `${description}${defaultSubDescription}`;
  const metaImage = getResourceUrl(image || defaultImage);
  const parsedURL = parseURL(url);

  return (
    <Head>
      <title>{metaTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keyword} />

      {/* facebook, kakao 등 SNS */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="컬리 - 마켓컬리/뷰티컬리" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={parsedURL} />

      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:url" content={parsedURL} />

      <link rel="canonical" href={parsedURL} />
    </Head>
  );
}
