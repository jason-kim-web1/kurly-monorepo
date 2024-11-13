type NormalSearchResultMeta = {
  pagination: { total: number; count: number; perPage: number; currentPage: number; totalPages: number };
  queryId: string;
  actualSite: string;
  targetSite: string;
  actualKeyword: string;
};

type NormalSearchResult = {
  topSections: [];
  listSections: [];
  sortSections: [];
  filterSections: [];
  meta: NormalSearchResultMeta;
};

type FetchNormalSearchResponse = {
  success: boolean;
  message: string | null;
  data: NormalSearchResult;
};

export type { NormalSearchResult, NormalSearchResultMeta, FetchNormalSearchResponse };
