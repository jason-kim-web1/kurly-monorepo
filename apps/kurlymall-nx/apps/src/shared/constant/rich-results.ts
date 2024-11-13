import { Organization, PropertyValueSpecification, SearchAction, WebSite, WithContext } from 'schema-dts';

export type RichResultKeyType = 'ORGANIZATION' | 'WEB_SITE';
export type RichResultValueType = WithContext<Organization | WebSite>;

type KurlySearchAction = SearchAction & {
  'query-input': PropertyValueSpecification | string;
};

const kurlySearchAction: KurlySearchAction = {
  '@type': 'SearchAction',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: 'https://www.kurly.com/search?sword={search_term_string}&ref=site_search',
  },
  'query-input': 'required name=search_term_string',
};

const ORGANIZATION: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@id': 'https://www.kurly.com',
  '@type': 'Organization',
  name: 'Kurly',
  url: 'https://www.kurly.com',
  logo: 'https://res.kurly.com/images/marketkurly/logo/logo_x3.png',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+82-1644-1107',
      contactType: 'customer support',
      areaServed: 'KR',
      availableLanguage: ['KO'],
    },
  ],
  sameAs: [
    // 컬리 인스타그램
    'https://www.instagram.com/marketkurly',
    // 컬리 유튜브 공식채널
    'https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg',
    // 컬리 페이스북
    'https://ko-kr.facebook.com/marketkurly',
    // 컬리 네이버 블로그
    'https://blog.naver.com/marketkurly',
    // 컬리 트위터
    'https://twitter.com/marketkurly',
    // 컬리 App Store
    'https://apps.apple.com/kr/app/id1080244833',
    // 컬리 Play Store
    'https://play.google.com/store/apps/details?id=com.dbs.kurly.m2',
    // 컬리 유튜브 일일칠 채널
    'https://www.youtube.com/channel/UCWaWvDRyhmSKOQWah7t7wuA',
  ],
};

const WEB_SITE: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.kurly.com/main',
  potentialAction: kurlySearchAction,
};

export const RichResultKey: Record<RichResultKeyType, RichResultKeyType> = {
  ORGANIZATION: 'ORGANIZATION',
  WEB_SITE: 'WEB_SITE',
};

const RichResults: Record<RichResultKeyType, RichResultValueType> = {
  WEB_SITE,
  ORGANIZATION,
};

export default RichResults;
