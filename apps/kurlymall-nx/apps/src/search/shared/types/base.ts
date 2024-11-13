import type { FilterTemplate } from '../../../product/list/types';
import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import { SECTION_TEMPLATE_CODE } from '../constants';

export interface ProductTag {
  name: string;
  type: string;
}

export type SectionCode = keyof typeof SECTION_TEMPLATE_CODE;

export interface View<T extends SectionCode> {
  sectionCode: T;
  version: string;
}

export interface SectionData<SectionDataItem, SectionInfo = void> {
  items: SectionDataItem[];
  title: string | null;
  sectionInfo: SectionInfo;
}

export interface BannerBase {
  id: string;
  title: string;
  contents: string;
  eventBannerPc: string;
  eventBannerPcUrl: string;
  link: string;
  eventBannerMobile: string;
  eventBannerMobileUrl: string;
  mobileLink: string;
}

export type BannerData = BannerBase;
export type BannerNoResultData = BannerBase;

export interface ProductAvailableSort {
  type: string;
  name: string;
}

export interface PurchasedRecentData {
  productNo: number;
  productName: string;
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  purchasedCount: number;
  productVerticalSmallUrl: string;
}

export interface BaseThemeSectionData {
  productNo: number;
  productName: string;
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number;
  isBuyNow: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
  productVerticalMediumUrl: string;
}

export interface BaseThemeSectionInfo {
  title: string;
  subtitle: string;
  backgroundColor: string;
  fontColor: string;
  hasMore: boolean;
  collectionCode: string;
  isAds: boolean;
}

// filter
export interface FilterGroup {
  key: string;
  name: string;
  template: FilterTemplate;
  isQuick: boolean;
  values: FilterValue[];
}

export interface SpellingCorrection {
  header: DisplayMessageContent;
  footer: DisplayMessageContent;
  type: 'SPELLING_CORRECTION';
}

export interface DisplayMessageContent {
  keyword: string;
  description: string;
}

export type NullKeywordMessage = Omit<DisplayMessageContent, 'keyword'> & { keyword: null };

export interface AlternativeSuggestion {
  header: DisplayMessageContent;
  footer: Omit<DisplayMessageContent, 'keyword'> & { keyword: null };
  type: 'ALTERNATIVE_SUGGESTION';
}

export type ReplacedType = (SpellingCorrection | AlternativeSuggestion)['type'];

export type DisplayMessage = SpellingCorrection | AlternativeSuggestion | null;

export type NoResultInfo = {
  header: NullKeywordMessage;
  footer: NullKeywordMessage;
};

export interface SearchParam {
  siteMain: MainSite;
  keyword: string;
  currentPage?: number;
  selectedSortType?: string;
  filters?: string;
  qvt?: string;
}

interface ProductListPage {
  currentPage: number;
  perPage: number;
  totalPages: number;
  count: number;
  total: number;
}

export interface NormalizedFilterGroup extends FilterGroup {
  groupByKey: { [key: string]: FilterValue };
  groupByInitialCharacter: Map<string, string[]>;
  keyList: string[];
  sortedKeyList: string[];
}

export interface FilterValue {
  key: string;
  name: string;
  value: string;
  productCounts: number;
  iconUrl: string | null;
}

export interface SearchMeta {
  pagination: ProductListPage;
  queryId: string;
  actualSite: Lowercase<MainSite>;
  targetSite: Lowercase<MainSite>;
}

export interface CountSearchProductParam {
  siteMain: MainSite;
  keyword: string;
  filters?: string;
  qvt?: string;
}

export interface FilteredSearchProductsCount {
  count: number;
  data: {
    count: number;
  };
}

export interface RecommendProduct {
  no: number;
  name: string;
}

export interface AutoCompletedKeyword {
  keyword: string;
}

export interface SearchAvailableSort {
  type: string;
  name: string;
  link?: string;
}

export type DirectSearchType = 'new' | 'ranking';
