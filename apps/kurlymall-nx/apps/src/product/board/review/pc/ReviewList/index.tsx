import { get, isNull } from 'lodash';

import { ScreenName } from '../../../../../shared/amplitude';
import { useScreenName } from '../../../../../shared/hooks';

import ReviewRow from '../ReviewRow';
import ReviewNoticeList from '../ReviewNotice/ReviewNoticeList';
import { useInfiniteProductReviewList } from '../../hooks/useInfiniteProductReviewList';
import { useFilters, useSortType } from '../../context/ReviewSearchOptionContext';
import ReviewListPagination from '../ReviewListPagination';
import EmptyReviewList from './EmptyReviewList';
import ReviewListLoading from './ReviewListLoading';
import { ne } from '../../../../../shared/utils/lodash-extends';
import { EmptyListWithFilter } from './EmptyReviewListWithFilter';

const renderEmptyList = (isFilterApplied: boolean) => {
  if (isFilterApplied) {
    return <EmptyListWithFilter />;
  }
  return <EmptyReviewList />;
};

interface Props {
  contentsProductNo: number;
  currentPage: number;
  onChangeCurrentPage(pageNum: number): void;
}

export default function ReviewList({ contentsProductNo, currentPage, onChangeCurrentPage }: Props) {
  useScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  const [sortType] = useSortType();
  const [{ DEAL_PRODUCT, MEMBER_GROUP }, { getActiveFilterCount }] = useFilters();
  const totalActiveFilterCount = getActiveFilterCount();
  const { isLoading, isSuccess, fetchNextPage, isFetchingNextPage, getProductReviewListByPage, queryKey } =
    useInfiniteProductReviewList({
      contentsProductNo,
      sortType,
      dealProduct: DEAL_PRODUCT,
      memberGroup: MEMBER_GROUP,
      onlyImage: false,
      size: 10,
    });
  const { pageProductReviewList, isPageProductReviewListEmpty, pageProductReviewPagination } =
    getProductReviewListByPage(currentPage);
  const disabledPrevious = currentPage === 1;
  const disabledNext = isFetchingNextPage || isNull(get(pageProductReviewPagination, 'nextPageParam'));
  const isFilterApplied = ne(totalActiveFilterCount, 0);

  const handleClickPrevious = () => {
    if (disabledPrevious) {
      return;
    }
    onChangeCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleClickNext = () => {
    if (disabledNext) {
      return;
    }
    fetchNextPage().then(() => onChangeCurrentPage(currentPage + 1));
  };

  return (
    <>
      <ReviewNoticeList />
      {isLoading ? <ReviewListLoading /> : null}
      {isSuccess && isPageProductReviewListEmpty ? (
        renderEmptyList(isFilterApplied)
      ) : (
        <>
          {pageProductReviewList.map((review, index) => (
            <ReviewRow key={`${review.id}-${index}`} queryKey={queryKey} sortType={sortType} {...review} />
          ))}
          <ReviewListPagination
            disabledPrevious={disabledPrevious}
            disabledNext={disabledNext}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
          />
        </>
      )}
    </>
  );
}
