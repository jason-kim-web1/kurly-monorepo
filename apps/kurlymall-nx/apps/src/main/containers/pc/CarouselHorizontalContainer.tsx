import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import type { MainSite } from '../../interfaces/MainSection.interface';
import type { CarouselHorizontalAmplitudeData, MainSubBanner } from '../../interfaces/MainSub.interface';
import MainSubPageTitle from '../../components/shared/MainSubPageTitle';
import BannerCarouselHorizontalListPC from '../../components/pc/carousel-banner-horizontal/BannerCarouselHorizontalList';
import BannerCarouselHorizontalListSkeletonPC from '../../components/pc/carousel-banner-horizontal/BannerCarouselHorizontalListSkeleton';
import { usePaginationCarouselHorizontalList } from '../../hooks/usePaginationCarouselHorizontalList';
import COLOR from '../../../shared/constant/colorset';
import { ExclamationMark } from '../../../shared/icons';
import { queryStringSiteConverter } from '../../../shared/utils/queryStringSiteConverter';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectCarouselListBanner } from '../../../shared/amplitude/events/main/SelectCarouselListBanner';
import { useCarouselHorizontalBanner } from '../../hooks/sections/useCarouselHorizontalBanner';
import { redirectTo } from '../../../shared/reducers/page';

const EmptyProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1050px;
  height: 610px;
  align-items: center;
  margin: 0 auto;
  padding-top: 246px;
`;

const EmptyProduct = styled.span`
  padding-top: 18px;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
`;

interface Props {
  site: MainSite;
  sectionId: number;
}

export default function CarouselHorizontalContainer({ site, sectionId }: Props) {
  const { isReady, query, pathname } = useRouter();
  const dispatch = useDispatch();

  const {
    title: sectionTitle,
    isLoading: isBannerDataLoading,
    isError: isBannerDataError,
  } = useCarouselHorizontalBanner({ site, sectionId });
  const {
    bannerList,
    pagination,
    isBannerListEmpty,
    isLoading: isBannerListLoading,
    isError,
  } = usePaginationCarouselHorizontalList({
    site,
    sectionId,
  });
  const { currentPage, perPage, totalPages } = pagination;
  const bannerItems = bannerList.map((banner: MainSubBanner) => {
    const { link } = banner;
    const parsedLink = queryStringSiteConverter({ link, site });
    return { ...banner, link: parsedLink };
  });

  const handleClickPage = (page: number) => {
    if (page === currentPage) {
      return;
    }

    dispatch(
      redirectTo({
        url: pathname,
        query: { ...query, page },
      }),
    );
  };

  const handleAmplitudeEvent = useCallback(
    ({ title, link, index }: CarouselHorizontalAmplitudeData) => {
      amplitudeService.logEvent(
        new SelectCarouselListBanner({
          title,
          link,
          index,
          currentPage,
          perPage,
          sectionType: 'horizontal',
        }),
      );
    },
    [currentPage, perPage],
  );

  const renderBannerList = () => {
    if (!isReady || isBannerListLoading) {
      return <BannerCarouselHorizontalListSkeletonPC />;
    }
    if (isError || isBannerListEmpty) {
      return (
        <EmptyProductWrapper>
          <ExclamationMark width={48} height={48} />
          <EmptyProduct>등록된 배너가 없습니다.</EmptyProduct>
        </EmptyProductWrapper>
      );
    }
    return (
      <BannerCarouselHorizontalListPC
        banners={bannerItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onClickPage={handleClickPage}
        onAmplitudeEvent={handleAmplitudeEvent}
      />
    );
  };

  return (
    <>
      <MainSubPageTitle
        isLoading={isBannerDataLoading}
        isError={isBannerDataError}
        title={sectionTitle}
        width={516}
        height={35}
        isPC={true}
      />
      {renderBannerList()}
    </>
  );
}
