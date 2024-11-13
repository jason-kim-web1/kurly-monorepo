import { BadgeType } from '../shared/interfaces/AppConfig';
import { MainSite } from './interfaces/MainSection.interface';
import { LOUNGE_PATH } from '../shared/constant';
import { VipLevels, VipLevelType } from '../member/shared/constants';

export interface MainTopNavigationOption {
  idx?: number;
  id: string;
  name: string;
  link: string;
  type: string;
  badge?: BadgeType | null;
}

type Site = 'RECOMMEND' | 'NEW' | 'BEST' | 'BENEFIT' | 'BARGAIN';

const market: Record<Partial<Site>, MainTopNavigationOption> = {
  RECOMMEND: {
    idx: 0,
    id: 'recommendation',
    name: '컬리추천',
    link: '/main',
    type: 'recommendation',
  },
  NEW: {
    idx: 1,
    id: 'new_product',
    name: '신상품',
    link: '/collection-groups/market-newproduct',
    type: 'collection',
  },
  BEST: {
    idx: 2,
    id: 'popular_product',
    name: '베스트',
    link: '/collection-groups/market-best',
    type: 'collection',
  },
  BARGAIN: {
    idx: 3,
    id: 'bargain',
    name: '알뜰쇼핑',
    link: '/collection-groups/market-sales-group',
    type: 'collection',
  },
  BENEFIT: {
    idx: 4,
    id: 'event_list',
    name: '특가/혜택',
    link: '/market-benefit',
    type: 'banner',
  },
};

const marketVIPs: Record<VipLevelType, MainTopNavigationOption> = {
  [VipLevels.VIP]: {
    idx: 0,
    id: 'vip',
    name: 'VIP 전용관',
    // VIP 전용관의 경우, isSubTab=true를 query로 넘겨줘서 헤더가 서브탭 헤더로 표시되도록 함
    link: `${LOUNGE_PATH.vip.uri}?isSubTab=true`,
    type: 'webview',
  },
  [VipLevels.VVIP]: {
    idx: 1,
    id: 'vvip',
    name: 'VVIP 전용관',
    link: `${LOUNGE_PATH.vvip.uri}?isSubTab=true`,
    type: 'webview',
  },
};

const beauty: Record<Partial<Site>, MainTopNavigationOption> = {
  RECOMMEND: {
    idx: 0,
    id: 'recommendation',
    name: '컬리추천',
    link: '/main/beauty',
    type: 'recommendation',
  },
  NEW: {
    idx: 1,
    id: 'new_product',
    name: '신상품',
    link: '/collection-groups/beauty-new?site=beauty',
    type: 'collection',
  },
  BEST: {
    idx: 2,
    id: 'popular_product',
    name: '베스트',
    link: '/collection-groups/beauty-best?site=beauty',
    type: 'collection',
  },
  BARGAIN: {
    idx: 3,
    id: 'benefit_list',
    name: '특가/혜택',
    link: '/beauty-benefit',
    type: 'banner',
  },
  BENEFIT: {
    idx: 4,
    id: 'brand_list',
    name: '브랜드관',
    link: '/beauty-event',
    type: 'banner',
  },
};

export const PCMainSiteNavigation: Record<MainSite, MainTopNavigationOption[]> = {
  MARKET: [market.NEW, market.BEST, market.BARGAIN, market.BENEFIT] as MainTopNavigationOption[],
  BEAUTY: [beauty.NEW, beauty.BEST, beauty.BARGAIN, beauty.BENEFIT] as MainTopNavigationOption[],
} as const;

export const MWMainSiteNavigation: Record<MainSite, MainTopNavigationOption[]> = {
  MARKET: [market.RECOMMEND, market.NEW, market.BEST, market.BARGAIN, market.BENEFIT] as MainTopNavigationOption[],
  BEAUTY: [beauty.RECOMMEND, beauty.NEW, beauty.BEST, beauty.BARGAIN, beauty.BENEFIT] as MainTopNavigationOption[],
} as const;

export {
  market as MarketNavigationOptionRecord,
  beauty as BeautyNavigationOptionRecord,
  marketVIPs as MarketVipNavigationOptionRecord,
};
