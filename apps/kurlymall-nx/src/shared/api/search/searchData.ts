import axios from 'axios';
import { isNull, eq } from 'lodash';

import { amplitudeService } from '../../amplitude/index';
import { sentryCaptureError } from '../../services';
import type { SearchParam, CountSearchProductParam, FilteredSearchProductsCount } from '../../../search/shared/types';
import { isPC } from '../../../../util/window/getDevice';
import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import type { BaseResponse } from '../../interfaces';
import { FetchNormalSearchResponse } from '../../../search/types';

const getAmplitudeSessionId = () => {
  // NOTE: 2023-05-11 : sessionId 가 비 정상적일 경우 빈 문자열로 전송하기로 협의
  const sessionId = amplitudeService.getSessionId();
  const defaultSessionId = '';
  if (isNull(sessionId)) {
    sentryCaptureError('[EdgeCase] - Amplitude SessionId 가 Null 입니다.');
    return defaultSessionId;
  }
  if (eq(sessionId, -1)) {
    sentryCaptureError('[EdgeCase] - Amplitude SessionId 가 -1 입니다.');
    return defaultSessionId;
  }
  return sessionId;
};

export const fetchNormalSearch = async (param: SearchParam): Promise<FetchNormalSearchResponse> => {
  const { keyword, selectedSortType, currentPage, siteMain, filters, qvt } = param;
  const site = siteMain === 'BEAUTY' ? 'beauty' : 'market';
  const amplitudeSessionId = getAmplitudeSessionId();
  // TOFIX: URL QueryParam 코드 정리
  const searchParams = new URLSearchParams({
    keyword,
    ...(selectedSortType && { sortType: selectedSortType }),
    ...(currentPage && { page: currentPage.toString() }),
    ...(filters && { filters }),
    ...(!isPC && { enableMarketFallback: 'true' }),
    ...(qvt && { allowReplace: qvt === '0' ? 'false' : 'true' }),
  });
  const path = `/search/v4/sites/${site}/normal-search?${searchParams.toString()}`;
  const headers = {
    'X-Kurly-Session-Id': 1,
    'X-KURLY-AD-DEVICE-ID': amplitudeService.getDeviceId(),
    'X-KURLY-AD-PAGE-ID': amplitudeService.getScreenName(),
    'amplitude-session-id': amplitudeSessionId,
  };

  try {
    const config = { headers };
    const { data } = await httpClient.get<FetchNormalSearchResponse>(path, config);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
};

export const fetchFilteredSearchProductsCount = async (
  param: CountSearchProductParam,
): Promise<FilteredSearchProductsCount> => {
  const { siteMain, filters, keyword, qvt } = param;
  const site = siteMain.toLowerCase();
  const allowReplace = qvt === '0' ? 'false' : 'true';

  const requestUrl = `/search/v3/sites/${site}/normal-search/count?keyword=${keyword}&filters=${filters}&allow_replace=${allowReplace}`;

  try {
    const { data } = await httpClient.get<BaseResponse<FilteredSearchProductsCount>>(requestUrl);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new UnknownError(error as Error);
  }
};
