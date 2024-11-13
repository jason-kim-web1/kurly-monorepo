import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { gt } from 'lodash';

import ReviewItem from '../ReviewItem';
import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { useFilters, useSortType } from '../../context/ReviewSearchOptionContext';
import { LoadingList } from './LoadingList';
import { EmptyList } from './EmptyList';
import { EmptyListWithFilter } from './EmptyListWithFilter';

interface Props {
  contentsProductNo: number;
}

export default function ReviewList({ contentsProductNo }: Props) {
  const [sortType] = useSortType();
  const { ref, inView } = useInView();
  const [filters, { getActiveFilterCount }] = useFilters();
  const { DEAL_PRODUCT, MEMBER_GROUP } = filters;
  const {
    isLoading,
    isError,
    isFetchingNextPage,
    productReviewList,
    isProductReviewListEmpty,
    hasNextPage,
    fetchNextPage,
    queryKey,
  } = useInfiniteProductReviewList({
    contentsProductNo,
    sortType,
    onlyImage: false,
    dealProduct: DEAL_PRODUCT,
    memberGroup: MEMBER_GROUP,
    size: 10,
  });
  const activeFilterCount = getActiveFilterCount();
  const isFilterApplied = gt(activeFilterCount, 0);

  useEffect(() => {
    amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) {
    return <LoadingList />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (isProductReviewListEmpty && isFilterApplied) {
    return <EmptyListWithFilter />;
  }

  if (isProductReviewListEmpty) {
    return <EmptyList />;
  }

  return (
    <div>
      {productReviewList.map((review) => (
        <ReviewItem key={review.id} queryKey={queryKey} sortType={sortType} {...review} />
      ))}
      {isFetchingNextPage ? <LoadingList /> : null}
      {hasNextPage ? <div ref={ref} /> : null}
    </div>
  );
}
