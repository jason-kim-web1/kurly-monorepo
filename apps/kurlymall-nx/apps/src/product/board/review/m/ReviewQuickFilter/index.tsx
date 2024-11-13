import { eq, gt, size } from 'lodash';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import type { ReviewFilterType } from '../../types';
import COLOR from '../../../../../shared/constant/colorset';
import { useFilters, getActiveFilterCountByFilterType } from '../../context/ReviewSearchOptionContext';
import { FilterTypeButton } from './FilterTypeButton';
import { useReviewFilters } from '../../hooks/useReviewFilters';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import Repeat from '../../../../../shared/components/Repeat';
import { PRODUCT_REVIEW_COMMON_TRANSITION, REVIEW_FILTER_TYPE_LIST } from '../../constants';
import { useReviewCount } from '../../hooks/useReviewCount';

const Wrap = styled.ul`
  display: flex;
  align-items: center;
  background-color: ${COLOR.kurlyWhite};
  gap: 8px;
`;

interface Props {
  contentsProductNo: number;
  onClickFilterType(filterType: ReviewFilterType): void;
}

export const ReviewQuickFilter = ({ contentsProductNo, onClickFilterType }: Props) => {
  const { filterTypeList, isFilterTypeListEmpty, isLoading, isError } = useReviewFilters({ contentsProductNo });
  const [filters, { getActiveFilterCount }] = useFilters();
  const { reviewCount } = useReviewCount({
    contentsProductNo,
    dealProduct: [],
    memberGroup: [],
  });
  const activeFilterCount = getActiveFilterCount();
  const isFilterApplied = gt(activeFilterCount, 0);
  const shouldQuickFilterHide = !isLoading && eq(reviewCount, 0) && !isFilterApplied;

  const handleClickFilterType = (filterType: ReviewFilterType) => () => onClickFilterType(filterType);

  if ((!isLoading && isFilterTypeListEmpty) || shouldQuickFilterHide || isError) {
    return null;
  }

  return (
    <Wrap>
      {isLoading ? (
        <Repeat count={size(REVIEW_FILTER_TYPE_LIST)}>
          <motion.li {...PRODUCT_REVIEW_COMMON_TRANSITION}>
            <SkeletonLoading width={100} height={36} radius={18} />
          </motion.li>
        </Repeat>
      ) : (
        filterTypeList.map(({ label, value }) => (
          <FilterTypeButton
            key={value}
            onClick={handleClickFilterType(value)}
            label={label}
            count={getActiveFilterCountByFilterType(value, filters)}
          />
        ))
      )}
    </Wrap>
  );
};
