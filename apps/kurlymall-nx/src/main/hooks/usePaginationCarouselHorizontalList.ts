import { useQuery } from '@tanstack/react-query';
import { get, isEmpty, isUndefined } from 'lodash';
import { useRouter } from 'next/router';

import type { MainSite } from '../interfaces/MainSection.interface';
import { useAppSelector } from '../../shared/store';
import { getCarouselHorizontalPayload } from '../service/main-sub.service';
import type { MainSubBanners, MainSubPagination } from '../interfaces/MainSub.interface';
import { parseQueryString } from '../../shared/utils/parseQueryString';
import type { CarouselHorizontal } from '../interfaces/MainSub.interface';
import { checkValidSectionId } from '../util/checkValidSectionId';
import { queryKeys } from '../constants';

const DEFAULT_PAGINATION = {
  total: 0,
  count: 0,
  perPage: 0,
  currentPage: 0,
  totalPages: 0,
};

const getPagination = (data?: CarouselHorizontal): MainSubPagination => {
  if (isUndefined(data)) {
    return DEFAULT_PAGINATION;
  }
  return get(data, 'pagination', DEFAULT_PAGINATION);
};

const getBannerList = (data?: CarouselHorizontal): MainSubBanners => {
  if (isUndefined(data)) {
    return [];
  }
  const banners = get(data, 'banners', []);
  return isEmpty(banners) ? [] : banners;
};

const getParsedPage = (pageStr?: string) => {
  if (isUndefined(pageStr)) {
    return 1;
  }
  const parsedPage = parseInt(pageStr);
  if (isNaN(parsedPage)) {
    return 1;
  }
  return parsedPage;
};

interface Props {
  site: MainSite;
  sectionId: number;
}

export const usePaginationCarouselHorizontalList = ({ site, sectionId }: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { query } = useRouter();
  const { page = '1' } = parseQueryString(query);
  const parsedPage = getParsedPage(page);
  const queryResult = useQuery(
    queryKeys.carouselBannerListPerPage(site, sectionId, parsedPage),
    () => getCarouselHorizontalPayload(site, sectionId, parsedPage),
    {
      enabled: hasSession && checkValidSectionId(sectionId),
    },
  );
  const { data } = queryResult;
  const bannerList = getBannerList(data);
  const pagination = getPagination(data);
  const isBannerListEmpty = isEmpty(bannerList);
  return {
    ...queryResult,
    bannerList,
    isBannerListEmpty,
    pagination,
  };
};
