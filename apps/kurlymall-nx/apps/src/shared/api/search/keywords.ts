import axios, { CancelToken } from 'axios';

import { UnknownError } from '../../errors';
import { API_URL } from '../../configs/config';
import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';
import { MainSite } from '../../../main/interfaces/MainSection.interface';

export interface KeywordsResponseData {
  recommendations: string[]; // 인기 검색어
  popularities: string[]; // 검색어 추천 (App)
}

export const fetchKeywords = async (site: MainSite, cancelToken?: CancelToken): Promise<KeywordsResponseData> => {
  const siteName = site.toLowerCase();
  const requestUrl = API_URL + `/search/v3/sites/${siteName}/keywords`;

  try {
    const { data } = await httpClient.get<BaseResponse<KeywordsResponseData>>(requestUrl, { cancelToken });
    return data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
};
