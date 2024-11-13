import axios, { CancelToken } from 'axios';

import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';
import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import type { AutoCompletedKeyword, RecommendProduct } from '../../../search/shared/types';

interface SearchProductResponseData {
  autoCompleteKeywords: AutoCompletedKeyword[];
  newProducts: RecommendProduct[];
  products: RecommendProduct[];
}

type QueryEntry = [string, string];

const queryParamsToString = (queryEntries: [string, string][]) => {
  return queryEntries
    .map((entry) => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('&');
};

export const fetchDirectSearchOfKeyword = async (
  keyword: string,
  site: MainSite,
  cancelToken?: CancelToken,
): Promise<SearchProductResponseData> => {
  const pathname = `/search/v4/sites/${site.toLowerCase()}/direct-search`;
  // NOTE: 해당 함수로는 이미 Escaping 된 문자열이 전달되므로 추가로 Escaping 처리하지 않는다.
  const queryEntries: QueryEntry[] = [['keyword', keyword]];

  try {
    const { data } = await httpClient.get<BaseResponse<SearchProductResponseData>>(
      `${pathname}?${queryParamsToString(queryEntries)}`,
      { cancelToken },
    );
    return data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
};
