import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { get } from 'lodash';

import type { ShowcaseDataResponse, ShowcaseMetaResponse, ShowcasePageProps } from '../types/reponse';
import { ENVIRONMENT, KURLY_URL, SHOWCASE_RESOURCE_BASE_URL } from '../../../shared/configs/config';
import { getFile } from '../../../shared/api';
import { getServerSideSessionData } from '../../../shared/services/session.service';
import { getWebViewInjectedAccessToken } from '../../../server/webview';

const transformShowcaseMeta = (showcaseId: string, type: string, meta: ShowcaseMetaResponse) => {
  const { name, code, imageUrl, shareUrl } = meta;
  return {
    id: showcaseId,
    title: `${name} 쇼케이스`,
    description: `컬리가 선정한 ${name} 쇼케이스 상품들을 만나보세요.`,
    image: imageUrl,
    url: `${KURLY_URL}/events/showcase/${code}`,
    type,
    shareUrl,
  };
};

const getServerSideProps: GetServerSideProps<ShowcasePageProps> = async (context: GetServerSidePropsContext) => {
  const { req, res, query } = context;
  const appToken = getWebViewInjectedAccessToken(context);
  const showcaseId = get(query, 'id', '0') as string;
  const brand = get(query, 'brand', '') as string;
  const type = !!brand ? 'brand' : 'market';

  try {
    const requestUrl = brand
      ? `${SHOWCASE_RESOURCE_BASE_URL[ENVIRONMENT]}/brand/${showcaseId}.json`
      : `${SHOWCASE_RESOURCE_BASE_URL[ENVIRONMENT]}/${showcaseId}.json`;
    const { data, meta } = await getFile<ShowcaseDataResponse>(requestUrl);
    const transformedMeta = transformShowcaseMeta(showcaseId, type, meta);

    if (!!appToken) {
      return {
        props: {
          accessToken: appToken,
          data,
          meta: transformedMeta,
        },
      };
    }

    const { accessToken } = await getServerSideSessionData(req, res);
    return {
      props: {
        accessToken,
        data,
        meta: transformedMeta,
      },
    };
  } catch (error) {
    return {
      props: {
        accessToken: '',
        data: null,
        meta: {
          id: showcaseId,
          title: '쇼케이스',
          description: '컬리가 선정한 쇼케이스 상품들을 만나보세요.',
          image: '',
          url: `${KURLY_URL}/events/showcase`,
          shareUrl: '',
          type: 'market',
        },
      },
    };
  }
};

export { getServerSideProps };
