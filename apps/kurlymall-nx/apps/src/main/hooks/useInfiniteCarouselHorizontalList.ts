import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { get, isEmpty, isUndefined, chain } from 'lodash';

import { MainSite } from '../interfaces/MainSection.interface';
import { useAppSelector } from '../../shared/store';
import { getCarouselHorizontalPayload } from '../service/main-sub.service';
import { CarouselHorizontal, MainSubBanners } from '../interfaces/MainSub.interface';
import { checkValidSectionId } from '../util/checkValidSectionId';
import { queryKeys } from '../constants';

const getBannerList = (data?: InfiniteData<CarouselHorizontal>): MainSubBanners => {
  if (isUndefined(data)) {
    return [];
  }
  const pages = get(data, 'pages', []);
  if (isEmpty(pages)) {
    return [];
  }
  return chain(pages)
    .map((page) => get(page, 'banners'))
    .flatten()
    .value();
};

interface Props {
  site: MainSite;
  sectionId: number;
}

export const useInfiniteCarouselHorizontalList = ({ site, sectionId }: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useInfiniteQuery(
    queryKeys.carouselBannerList(site, sectionId),
    ({ pageParam = 1 }) => getCarouselHorizontalPayload(site, sectionId, pageParam),
    {
      enabled: hasSession && checkValidSectionId(sectionId),
      getPreviousPageParam: (firstPage) => {
        const { currentPage } = firstPage.pagination;
        return currentPage > 0 ? currentPage : undefined;
      },
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.pagination;
        return currentPage + 1 <= totalPages ? currentPage + 1 : undefined;
      },
    },
  );
  const { data } = queryResult;
  const bannerList = getBannerList(data);
  const isBannerListEmpty = isEmpty(bannerList);
  return {
    ...queryResult,
    bannerList,
    isBannerListEmpty,
  };
};
