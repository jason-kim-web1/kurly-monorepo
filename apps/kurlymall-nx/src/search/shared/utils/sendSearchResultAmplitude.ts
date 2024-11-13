import { eq } from 'lodash';

import type { ReplacedType } from '../types';
import { amplitudeService } from '../../../shared/amplitude';
import { SearchResult } from '../../../shared/amplitude/events/SearchResult';
import { SearchResultSelectionTypeValue } from '../constants';
import { SearchNoResult } from '../../../shared/amplitude/events/SearchNoResult';

export interface SearchResultParams {
  queryId: string;
  keyword: string;
  totalCount: number;
  selectionType: SearchResultSelectionTypeValue;
  fallback: boolean;
  filter: boolean;
  sort: boolean;
  keywordConvertType?: ReplacedType;
  convertedKeyword?: string;
  google_search?: string;
}

export const sendSearchResultAmplitude = ({
  queryId,
  keyword,
  totalCount,
  selectionType,
  fallback = false,
  filter = false,
  sort = false,
  keywordConvertType,
  convertedKeyword,
  google_search,
}: SearchResultParams) => {
  const isNoSearchResult = eq(totalCount, 0);
  if (isNoSearchResult) {
    amplitudeService.logEvent(
      new SearchNoResult({
        fusion_query_id: queryId,
        keyword,
      }),
    );
  }
  amplitudeService.logEvent(
    new SearchResult({
      queryId,
      keyword,
      totalCount,
      selectionType,
      fallback,
      filter,
      sort,
      keywordConvertType,
      convertedKeyword,
      google_search,
    }),
  );
};
