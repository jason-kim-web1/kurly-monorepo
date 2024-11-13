import { RESOURCE_URL } from '../configs/config';

export const SNS_TYPE_NAME = {
  kakao: '카카오톡',
  line: '라인',
  facebook: '페이스북',
  twitter: '트위터',
} as const;

export const SHARABLE_SNS_LIST = [
  {
    name: '카카오톡',
    value: 'kakao',
    image: `${RESOURCE_URL}/mobile/service/goodsview/1804/ico_kakao.png`,
    getRedirectUrl: () => '',
  },
  {
    name: '라인',
    value: 'line',
    image: `${RESOURCE_URL}/mobile/service/goodsview/1804/ico_line.png`,
    getRedirectUrl: (title: string, productUrl: string) =>
      `https://social-plugins.line.me/lineit/share?url=${productUrl}&text=${title}`,
  },
  {
    name: '페이스북',
    value: 'facebook',
    image: `${RESOURCE_URL}/mobile/service/goodsview/1804/ico_facebook.png`,
    getRedirectUrl: (_: string, productUrl: string) => `http://www.facebook.com/sharer.php?u=${productUrl}`,
  },
  {
    name: '트위터',
    value: 'twitter',
    image: `${RESOURCE_URL}/mobile/service/goodsview/1804/ico_twitter.png`,
    getRedirectUrl: (title: string, productUrl: string) =>
      `https://twitter.com/intent/tweet?url=${productUrl}&text=${title}`,
  },
] as const;
