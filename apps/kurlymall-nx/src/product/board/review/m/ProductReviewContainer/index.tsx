import { head, isEqual } from 'lodash';
import { useState } from 'react';

import { useReviewCount } from '../../hooks/useReviewCount';

import NoticeList from '../ReviewNotice/NoticeList';
import ReviewList from '../ReviewList';
import ReviewGallery from '../ReviewGallery';
import { Main, Section } from './styled-components';
import { useScreenName } from '../../../../../shared/hooks';
import { ScreenName } from '../../../../../shared/amplitude';
import { everyTrue } from '../../../../../shared/utils/lodash-extends';
import { useBlockContextMenu } from '../../hooks/useBlockContextMenu';
import { ReviewSearchOptionProvider } from '../../context/ReviewSearchOptionContext';
import { ReviewListTop } from '../ReviewListTop';
import { ReviewQuickFilter } from '../ReviewQuickFilter';
import { ReviewFilterBottomSheet } from '../ReviewFilterBottomSheet';

import useToggle from '../../../../../order/checkout/shared/hooks/useToggle';
import type { ReviewFilterType } from '../../types';
import { REVIEW_FILTER_TYPE } from '../../constants';
import { useReviewFilters } from '../../hooks/useReviewFilters';
import ReviewBenefitNotice from '../ReviewNotice/ReviewBenefitNotice';

interface Props {
  contentsProductNo: number;
}

export default function ProductReviewContainer({ contentsProductNo }: Props) {
  useScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
  useBlockContextMenu();

  const [selectedFilterType, setSelectedFilterType] = useState<ReviewFilterType>(REVIEW_FILTER_TYPE.DEAL_PRODUCT);
  const { isOpen, open, close } = useToggle();
  const {
    filterTypeList,
    isFilterTypeListEmpty,
    isError: isFilterTypeListError,
  } = useReviewFilters({ contentsProductNo });
  const { reviewCount, isLoading } = useReviewCount({ contentsProductNo, dealProduct: [], memberGroup: [] });
  const isWriteBenefitNoticeVisible = everyTrue([!isLoading, isEqual(reviewCount, 0)]);

  const handleClickFilterType = (filterType: ReviewFilterType) => {
    setSelectedFilterType(filterType);
    open();
  };
  const handleChangeFilterType = (filterType: ReviewFilterType) => {
    if (isEqual(selectedFilterType, filterType)) {
      return;
    }
    setSelectedFilterType(filterType);
  };
  const handleClickFilter = () => {
    if (isFilterTypeListEmpty || isFilterTypeListError) {
      return;
    }
    const firstFilterType = head(filterTypeList);
    if (!firstFilterType) {
      return;
    }
    setSelectedFilterType(firstFilterType.value);
    open();
  };

  return (
    <Section>
      <NoticeList />
      {isWriteBenefitNoticeVisible ? <ReviewBenefitNotice /> : null}
      <ReviewGallery contentsProductNo={contentsProductNo} />
      <Main>
        <ReviewSearchOptionProvider>
          <ReviewListTop contentsProductNo={contentsProductNo} onClickFilter={handleClickFilter} />
          <ReviewQuickFilter contentsProductNo={contentsProductNo} onClickFilterType={handleClickFilterType} />
          <ReviewList contentsProductNo={contentsProductNo} />
          <ReviewFilterBottomSheet
            open={isOpen}
            onClose={close}
            contentsProductNo={contentsProductNo}
            filterType={selectedFilterType}
            onChangeFilterType={handleChangeFilterType}
          />
        </ReviewSearchOptionProvider>
      </Main>
    </Section>
  );
}
