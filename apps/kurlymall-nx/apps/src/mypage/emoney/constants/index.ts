import { getSecond } from '../../../shared/utils/time';

export const nop = () => {};

export const MAX_PAGE_LIMIT = 10;

export const PER_PAGE_LIST_COUNT = 10;

export const calculateMaxPage = (totalCount: number) => Math.ceil(totalCount / MAX_PAGE_LIMIT);

export const STALE_TIME = getSecond(60);

export const QUERY_KEY_PREFIX = 'emoney';
