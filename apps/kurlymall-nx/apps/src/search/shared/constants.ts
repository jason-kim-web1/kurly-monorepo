type Empty = 'noneActiveFilter' | 'errorSearchResult' | 'search' | 'default';
export const emptyResultText: Record<Empty, string> = {
  noneActiveFilter: '선택하신 필터와 일치하는 상품이 없습니다.',
  errorSearchResult: '일시적인 오류로\n검색결과를 불러오지 못했습니다.',
  search: '검색된 상품이 없습니다.',
  default: '등록된 상품이 없습니다.',
};

export const DEFAULT_SEARCH_DESCRIPTION = '에 대한 검색결과';

// 4는 추천순
export const DEFAULT_SORT_TYPE = '4';

type SearchSelectionTypeKey =
  | 'KEYWORD'
  | 'SUGGESTION_PRODUCT'
  | 'RISING'
  | 'RECENT'
  | 'RECOMMENDATION'
  | 'OUT_LINK'
  | 'AUTOCOMPLETE';

type SelectSearchSelectionTypeKey = Exclude<SearchSelectionTypeKey, 'OUT_LINK'>;
export type SelectSearchSelectionTypeValue = Lowercase<SelectSearchSelectionTypeKey>;

export const SELECT_SEARCH_SELECTION_TYPE: Record<SelectSearchSelectionTypeKey, SelectSearchSelectionTypeValue> = {
  KEYWORD: 'keyword',
  SUGGESTION_PRODUCT: 'suggestion_product',
  RISING: 'rising',
  RECENT: 'recent',
  RECOMMENDATION: 'recommendation',
  AUTOCOMPLETE: 'autocomplete',
};

type SearchResultSelectionTypeKey = Exclude<SearchSelectionTypeKey, 'SUGGESTION_PRODUCT'>;
export type SearchResultSelectionTypeValue = Lowercase<SearchResultSelectionTypeKey>;

export const SEARCH_RESULT_SELECTION_TYPE: Record<SearchResultSelectionTypeKey, SearchResultSelectionTypeValue> = {
  KEYWORD: 'keyword',
  RISING: 'rising',
  RECENT: 'recent',
  RECOMMENDATION: 'recommendation',
  OUT_LINK: 'out_link',
  AUTOCOMPLETE: 'autocomplete',
};

export const RECOMMEND_MESSAGE_SEARCH =
  '검색어 적합성과 가격 혜택, 소비자 인기도(판매량, 판매금액, 조회수 등)를 종합적으로 고려한 순서입니다.';

export const SCROLL_RESTORATION_QUANTITY = 7;

export const SECTION_TEMPLATE_CODE = {
  BANNER: 'BANNER', // 이벤트 배너
  MARKET_BEST: 'MARKET_BEST', // 베스트 섹션
  PURCHASED_RECENT: 'PURCHASED_RECENT', // 이전 구매 섹션
  SPECIAL_PRICE: 'SPECIAL_PRICE', // 특가 섹션
  KEYWORD_CONVERT_INFO: 'KEYWORD_CONVERT_INFO', // 치환 문구 섹션
  NO_RESULT_INFO: 'NO_RESULT_INFO', // 검색 결과 0개 문구 섹션
  BANNER_NO_RESULT: 'BANNER_NO_RESULT', // 검색 결과 0개 배너
  PRODUCT_LIST: 'PRODUCT_LIST', // 검색 결과 상품 목록 섹션
  THEME_RELATED: 'THEME_RELATED', // 검색 결과 연관 테마 추천
  THEME_PROMOTION: 'THEME_PROMOTION', // 검색 결과 프로모션 테마 추천
  FILTER: 'FILTER', // 필터 섹션
  SORT: 'SORT', // 정렬 섹션
} as const;

export const SECTION_TYPE = {
  FILTER: 'filter',
  SORT: 'sort',
  TOP: 'top',
  LIST: 'list',
} as const;

export const INDEX_OFFSET = 1;

export const KEYWORD_CONVERT_INFO_TYPE = ['SPELLING_CORRECTION', 'ALTERNATIVE_SUGGESTION'];

export const SEARCH_PAGE_STATUS = {
  keywords: 'keywords',
  suggestion: 'suggestion',
  listContainer: 'listContainer',
} as const;
