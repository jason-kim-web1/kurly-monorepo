import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { setAccessToken } from '../reducers/auth';

import { UnauthenticatedError } from '../errors';
import { API_URL, NEXT_PUBLIC_MOCK_ENABLED } from './config';
import { refreshToken } from '../api/auth/token';
import { isWebview } from '../../../util/window/getDevice';
import appService from '../services/app.service';
import { doLogout } from '../../member/logout/shared';
import deepLinkUrl from '../constant/deepLink';
import { COMMON_PATH } from '../constant';
import { LockedUserErrorCode } from '../errors/LockedUserError';
import { ExpiredTokenError, ExpiredTokenErrorCode } from '../errors/ExpiredTokenError';

let isTokenRefreshing = false;
const refreshSubscribers: ((accessToken: string) => void)[] = [];

let blockedUserErrorCount = 0;

const onTokenRefreshed = (accessToken: string) => {
  while (refreshSubscribers.length) {
    const retryApi = refreshSubscribers.pop();
    if (retryApi) {
      retryApi(accessToken);
    }
  }
};

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

let store: any;

const httpClient = axios.create({
  baseURL: API_URL,
});

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  kurlyApiRefresh?: boolean;
};

const handleRequest = async (config: CustomAxiosRequestConfig) => {
  if (!store) {
    const value = await import('../store');
    store = value.default;
  }

  const { headers, kurlyApiRefresh = true, ...restConfig } = config;

  const {
    auth: { accessToken },
  } = store.getState();

  const newAuthorization = `Bearer ${accessToken}`;

  return {
    ...restConfig,
    headers: {
      ...headers,
      ...(headers.Authorization || newAuthorization
        ? { Authorization: headers.Authorization || newAuthorization }
        : {}),
    },
    kurlyApiRefresh,
  };
};

const removeTokenAndGoToLogin = ({ errorMessage }: { errorMessage: string }) => {
  if (isWebview()) {
    // 신버전에서 아래 인터페이스를 호출할 경우 웹뷰 새로고침과 함께 alert 반복노출이 발생하기 때문에 인터페이스 삭제
    // https://kurly0521.atlassian.net/wiki/spaces/WWWV3/pages/3781756796
    // appService.removeToken({ logoutCause: 'Etc', logoutReason: 'Api401TokenRemove' });

    alert(errorMessage);

    window.location.assign(deepLinkUrl.LOGIN);
  } else {
    alert(errorMessage);

    doLogout({ externalUrl: COMMON_PATH.login.uri });
  }
};

const createNewRequest = (request: AxiosRequestConfig, accessToken: string) => {
  request.headers.Authorization = `Bearer ${accessToken}`;
  return axios(request);
};

const handleResponseError = async (error: AxiosError) => {
  const status = error.response?.status ?? 500;

  if (status !== 401) {
    return Promise.reject(error);
  }

  const responseCode = +error.response?.data?.code ?? 0;
  if (responseCode === LockedUserErrorCode) {
    blockedUserErrorCount += 1;

    if (blockedUserErrorCount <= 1) {
      /**
       * NOTE.
       * logout.php를 거치면서 페이지가 리로드되기 때문에 showBlockedUserError 변수 갱신됨
       * 추후 www-v2가 아닌, NX를 통해 로그아웃되도록 개선될 경우,
       * redirectTo({ isExternal: true })로 이동하도록 하면 이 역시 페이지가 새로고침 되기 때문에 showBlockedUserError 변수 갱신됨
       * 또는, showBlockedUserError를 false로 갱신하는 코드 추가 필요
       */
      removeTokenAndGoToLogin({
        errorMessage: '로그아웃되었습니다.',
      });
    }

    // * www-v2를 거쳐서 로그아웃되는 동안 401 에러에 대한 응답을 지연시켜서 불필요한 에러 메세지가 나오지 않도록 하기 위함
    const response = await new Promise((_, reject) => {
      setTimeout(() => {
        reject(new UnauthenticatedError(error));
      }, 5000);
    });

    return response;
  }

  const originalRequestConfig = error.config as CustomAxiosRequestConfig;

  if (isTokenRefreshing) {
    return new Promise((resolve) => {
      addRefreshSubscriber((accessToken) => {
        resolve(createNewRequest(originalRequestConfig, accessToken));
      });
    });
  }

  if (!store) {
    const value = await import('../store');
    store = value.default;
  }

  const { auth } = store.getState();
  const accessToken = originalRequestConfig.headers.Authorization?.replace(/^Bearer /, '');

  const kurlyApiRefresh = originalRequestConfig.kurlyApiRefresh;

  if (!kurlyApiRefresh && responseCode === ExpiredTokenErrorCode) {
    return Promise.reject(new ExpiredTokenError(error));
  }

  if (!accessToken) {
    isTokenRefreshing = false;
    return Promise.reject(new UnauthenticatedError(error));
  }

  isTokenRefreshing = true;

  let authData;
  try {
    authData = await refreshToken(accessToken);
  } catch {
    isTokenRefreshing = false;

    refreshSubscribers.splice(0, refreshSubscribers.length);
    return Promise.reject(new UnauthenticatedError(error));
  }

  // 갱신 이후 로그 아웃된 상태가 된 경우
  if (authData.isGuest) {
    // 웹뷰인 경우 갱신 요청 postMessage 발송
    if (isWebview()) {
      appService.postAppMessage({ code: 'WV1000' });
      return;
    }

    // 웹 상으로 로그인된 상태인 경우 페이지 리로드 필요
    if (!auth.isGuest) {
      location.reload();
      return;
    }
  }

  store.dispatch(setAccessToken(authData));
  isTokenRefreshing = false;

  onTokenRefreshed(authData.accessToken);

  return createNewRequest(originalRequestConfig, authData.accessToken);
};

httpClient.interceptors.request.use(handleRequest);

httpClient.interceptors.response.use((response) => response, handleResponseError);

if (NEXT_PUBLIC_MOCK_ENABLED) {
  httpClient.interceptors.response.use(
    (response) => {
      console.groupCollapsed(response.config.url);
      console.log(response.config.url?.split('/').join('__'));
      console.log(JSON.stringify(response.data));
      console.groupEnd();
      return response;
    },
    (error) => Promise.reject(error),
  );
}

export const withCredentialsOption: Pick<AxiosRequestConfig, 'withCredentials'> = {
  withCredentials: true,
} as const;

export default httpClient;
