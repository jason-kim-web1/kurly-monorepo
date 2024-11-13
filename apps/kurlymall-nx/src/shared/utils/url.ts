import { isUndefined, chain, isEmpty, isArray, head } from 'lodash';

import { isNotEmpty, isNotObject, ne } from './lodash-extends';
import { USER_MENU_PATH } from '../constant';

export const createQueryString = (query?: unknown) =>
  chain(query)
    .entries()
    .map((args) => {
      const [keyName, value] = args;
      return `${keyName}=${value}`;
    })
    .join('&')
    .value();

export const removeMobilePrefix = (path: string) => (path.startsWith('/m/') ? path.replace(/^\/m/, '') : path);

export const removeQueryString = (pathQuery: string) => pathQuery.split(/[?#]/)[0];

export const createUrlPath = (pathname: string, query?: unknown) => {
  if (isUndefined(query) || isNotObject(query)) {
    return pathname;
  }
  return `${pathname}?${createQueryString(query)}`;
};

export const optionListToQueryString = (keyName: string, options: string[]) => {
  if (isEmpty(options)) {
    return '';
  }
  return `${keyName}:${options.join(',')}`;
};

type MergeOptionListToQueryStringParams = {
  keyName: string;
  value: string[];
}[];

export const mergeOptionListToQueryString = (data: MergeOptionListToQueryStringParams) =>
  chain(data)
    .map((item) => {
      const { keyName, value } = item;
      return optionListToQueryString(keyName, value);
    })
    .filter(isNotEmpty)
    .join('|')
    .value();

export const tryParseUrl = (input?: string) => {
  if (input) {
    try {
      return new URL(input);
    } catch (e) {}
  }
};

/**
 * 유효한 url인지 검사하는 함수
 * @param url 검사할 url
 */
export const checkValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 전체 url 중 host를 제외한 경로로 정제하는 함수
 * @param link 정제할 링크 url
 */
export const createInternalUrlPath = (link: string) => {
  try {
    const url = new URL(link);
    const pathName = url.pathname;
    const queryString = url.search;
    return `${pathName}${queryString}`;
  } catch (error) {
    return USER_MENU_PATH.home.uri;
  }
};

export const checkPhpPathname = (pathname: string) => ne(pathname.lastIndexOf('.php'), -1);

/**
 * 전달된 링크가 외부링크인지 검사하는 함수
 * php 링크이거나 host가 현재 환경과 맞는지 확인
 * @param {string} link 검사 대상 url
 * @param {string} internalHost 기준이 되는 호스트 정보 (ex> www.kurly.com)
 */
export const checkIsExternalLink = (link: string, internalHost: string) => {
  try {
    const url = new URL(link);
    const { host, pathname } = url;
    const isPHP = checkPhpPathname(pathname);
    return isPHP || ne(host, internalHost);
  } catch (error) {
    return true;
  }
};

/**
 * ParsedUrlQuery 의 값을 인자로 받아, 단일 쿼리 값(문자열)을 리턴하는 함수
 * @param query
 */
export const getSingleQueryValue = (query?: string | string[]): string => {
  if (isArray(query)) {
    return head(query) || '';
  }
  if (!query) {
    return '';
  }
  return query;
};
