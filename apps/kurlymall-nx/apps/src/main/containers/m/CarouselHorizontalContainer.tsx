import { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import type { MainSite } from '../../interfaces/MainSection.interface';
import type { CarouselHorizontalAmplitudeData } from '../../interfaces/MainSub.interface';
import BannerCarouselHorizontalList from '../../components/m/carousel-banner-horizontal/BannerCarouselHorizontalList';
import { useInfiniteCarouselHorizontalList } from '../../hooks/useInfiniteCarouselHorizontalList';
import BannerCarouselHorizontalListSkeleton from '../../components/m/carousel-banner-horizontal/BannerCarouselHorizontalListSkeleton';
import COLOR from '../../../shared/constant/colorset';
import { ExclamationMark } from '../../../shared/icons';
import Loading from '../../../shared/components/Loading/Loading';
import { zIndex } from '../../../shared/styles';
import { checkValidSectionId } from '../../util/checkValidSectionId';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectCarouselListBanner } from '../../../shared/amplitude/events/main/SelectCarouselListBanner';
import PullToRefreshNew from '../../../shared/components/PullToRefresh/m/PullToRefreshNew';

const EmptyProduct = styled.div`
  position: fixed;
  top: 50%;
  width: 100%;
  margin-top: -60px;
  text-align: center;
`;

const EmptyText = styled.div`
  margin-top: 12px;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  line-height: 21px;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLOR.kurlyWhite};
  opacity: 0.4;
  overflow: hidden;
  z-index: ${zIndex.bannerCarouselHorizontalList};
`;

interface Props {
  site: MainSite;
  sectionId: number;
}

export default function CarouselHorizontalContainer({ site, sectionId }: Props) {
  const { bannerList, isBannerListEmpty, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteCarouselHorizontalList({ site, sectionId });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (isFetchingNextPage || !inView || !hasNextPage) {
      return;
    }
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleAmplitudeEvent = useCallback(({ title, link, index }: CarouselHorizontalAmplitudeData) => {
    amplitudeService.logEvent(
      new SelectCarouselListBanner({
        title,
        link,
        index,
        sectionType: 'horizontal',
      }),
    );
  }, []);

  const handleRefresh = useCallback(async () => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <BannerCarouselHorizontalListSkeleton />;
  }

  if (isBannerListEmpty || isError || !checkValidSectionId(sectionId)) {
    return (
      <EmptyProduct>
        <div>
          <ExclamationMark width={48} height={48} />
        </div>
        <EmptyText>등록된 배너가 없습니다.</EmptyText>
      </EmptyProduct>
    );
  }

  return (
    <PullToRefreshNew onRefresh={handleRefresh}>
      <>
        {isFetchingNextPage && (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        )}
        <BannerCarouselHorizontalList banners={bannerList} onAmplitudeEvent={handleAmplitudeEvent} />
        <div ref={ref} />
      </>
    </PullToRefreshNew>
  );
}
