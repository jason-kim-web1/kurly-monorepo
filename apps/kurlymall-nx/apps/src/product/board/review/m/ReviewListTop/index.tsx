import styled from '@emotion/styled';
import { eq, gt } from 'lodash';

import { useFilters, useSortType } from '../../context/ReviewSearchOptionContext';
import { useReviewCount } from '../../hooks/useReviewCount';
import { addComma } from '../../../../../shared/services';
import COLOR from '../../../../../shared/constant/colorset';
import { useReviewFilters } from '../../hooks/useReviewFilters';
import SortListbox from '../SortListbox';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import FilterIcon from '../../../../../shared/icons/Filter';
import { isNotEqual } from '../../../../../shared/utils/lodash-extends';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  padding-bottom: 16px;
`;

const TotalCount = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: ${COLOR.kurlyGray800};
`;

const SortAndFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterButtonLabel = styled.p`
  display: flex;
  align-items: center;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  gap: 2px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  &.active {
    ${FilterButtonLabel} {
      color: ${COLOR.loversLavender};
      font-weight: 600;
    }
  }
`;

interface Props {
  contentsProductNo: number;
  onClickFilter(): void;
}

export const ReviewListTop = ({ contentsProductNo, onClickFilter }: Props) => {
  const [filters, { getActiveFilterCount }] = useFilters();
  const [sortType, setSortType] = useSortType();
  const { reviewCount, isLoading, isSuccess } = useReviewCount({
    contentsProductNo,
    dealProduct: filters.DEAL_PRODUCT,
    memberGroup: filters.MEMBER_GROUP,
  });
  const { isLoading: isReviewFilterLoading, isError, isAllFilterEmpty } = useReviewFilters({ contentsProductNo });
  const activeFilterCount = getActiveFilterCount();
  const isFilterApplied = gt(activeFilterCount, 0);
  const isEmptyReview = eq(reviewCount, 0);
  const shouldQuickFilterHide = isEmptyReview && !isFilterApplied;
  const hasSelectedFilter = isNotEqual(activeFilterCount, 0);
  const shouldHide = isSuccess && shouldQuickFilterHide;

  const renderQuickFilter = () => {
    if (isError || shouldQuickFilterHide || isAllFilterEmpty) {
      return null;
    }
    return (
      <FilterButton type="button" className={hasSelectedFilter ? 'active' : ''} onClick={onClickFilter}>
        <FilterButtonLabel>
          <span>필터</span>
          {hasSelectedFilter ? <span>{addComma(activeFilterCount)}</span> : null}
        </FilterButtonLabel>
        {!hasSelectedFilter ? <FilterIcon /> : null}
      </FilterButton>
    );
  };

  if (shouldHide) {
    return null;
  }

  return (
    <Wrap>
      {isLoading ? (
        <SkeletonLoading width={38} height={20} />
      ) : (
        <TotalCount>{`총 ${addComma(reviewCount)}개`}</TotalCount>
      )}
      <SortAndFilterWrap>
        {isReviewFilterLoading ? (
          <>
            <SkeletonLoading width={55} height={18} />
            <SkeletonLoading width={45} height={18} />
          </>
        ) : (
          <>
            <SortListbox sortType={sortType} setSortType={setSortType} />
            {renderQuickFilter()}
          </>
        )}
      </SortAndFilterWrap>
    </Wrap>
  );
};
