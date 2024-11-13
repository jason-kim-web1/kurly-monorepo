import { MainSectionDesignType, MainSite } from '../interfaces/MainSection.interface';

export const INVALID_SECTION_ID = -1;

export const queryKeys = {
  carouselBanner: (site: MainSite, sectionId: number) => [
    'main',
    site,
    'sections',
    'carousel-horizontal-banner',
    sectionId,
  ],
  carouselBannerList: (site: MainSite, sectionId: number) => [
    'main',
    site,
    'sections',
    'carousel-banner',
    sectionId,
    'list',
  ],
  carouselBannerListPerPage: (site: MainSite, sectionId: number, page: number) => [
    ...queryKeys.carouselBannerList(site, sectionId),
    'pages',
    page,
  ],
  groupCollectionNumberProductList: (site: MainSite, sectionId: number, collectionCode: string) => [
    'main',
    site,
    'sections',
    'collection-number-product',
    sectionId,
    collectionCode,
    'list',
  ],
};

export const MAIN_SITE: Record<MainSite, MainSite> = {
  MARKET: 'MARKET',
  BEAUTY: 'BEAUTY',
} as const;

export const DESIGN_TYPE: Record<MainSectionDesignType, Lowercase<MainSectionDesignType>> = {
  NUMBER: 'number',
};
