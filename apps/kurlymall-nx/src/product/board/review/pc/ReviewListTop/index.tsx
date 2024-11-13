import { isEqual } from 'lodash';

import styled from '@emotion/styled';

import { useEffect } from 'react';

import { addComma } from '../../../../../shared/services';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import { REVIEW_SORT_TYPE_OPTION_LIST } from '../../constants';
import { useFilters, useSortType } from '../../context/ReviewSearchOptionContext';
import { useReviewCount } from '../../hooks/useReviewCount';
import type { ProductReviewSortType } from '../../types';
import { ignoreError } from '../../../../../shared/utils/general';
import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { SelectSortType } from '../../../../../shared/amplitude/events/review';
import COLOR from '../../../../../shared/constant/colorset';
import Repeat from '../../../../../shared/components/Repeat';

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

const TotalCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;

const SortButtonWrapper = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
  justify-content: flex-end;
`;

const SortButton = styled.button<{ isSelected: boolean }>`
  position: relative;
  font-weight: ${(props) => (props.isSelected ? 500 : 400)};
  font-size: 12px;
  color: ${(props) => (props.isSelected ? COLOR.kurlyGray800 : COLOR.kurlyGray450)};

  ::after {
    content: '';
    position: absolute;
    top: 4px;
    height: 62.5%;
    border-left: 1px solid ${COLOR.kurlyGray450};
    margin-left: 8px;
    margin-right: 8px;
  }

  :last-of-type::after {
    display: none;
  }
`;

interface Props {
  contentsProductNo: number;
  onChangeCurrentPage(pageNum: number): void;
  onChangeReviewCount(count: number): void;
}
export default function ReviewListTop({ contentsProductNo, onChangeCurrentPage, onChangeReviewCount }: Props) {
  const [{ DEAL_PRODUCT, MEMBER_GROUP }] = useFilters();
  const [sortType, setSortType] = useSortType();
  const { reviewCount, isLoading } = useReviewCount({
    contentsProductNo,
    dealProduct: DEAL_PRODUCT,
    memberGroup: MEMBER_GROUP,
  });
  const isPageReviewListEmpty = reviewCount <= 0;

  const logSortEvent = (currentSortType: ProductReviewSortType) =>
    ignoreError(() => {
      const { browseEventName } = amplitudeService.bucketInstance();
      const payload = {
        browseEventName,
        sortType: currentSortType,
      };
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
      amplitudeService.logEvent(new SelectSortType(payload));
    });

  const checkActiveSortType = (targetSortType: ProductReviewSortType) => isEqual(sortType, targetSortType);

  // NOTE: 현재 동일 버튼 클릭시에도 이벤트 집계이슈 공유
  const handleClickSortType = (targetSortType: ProductReviewSortType) => () => {
    if (checkActiveSortType(targetSortType)) {
      return;
    }
    logSortEvent(targetSortType);
    setSortType(targetSortType);
  };

  useEffect(() => {
    onChangeCurrentPage(1);
  }, [sortType]);

  useEffect(() => {
    onChangeReviewCount(reviewCount);
  }, [onChangeReviewCount, reviewCount]);

  return (
    <ListHeader>
      {isLoading ? (
        <SkeletonLoading width={65} height={16} />
      ) : (
        <TotalCount>{`총 ${addComma(reviewCount)}개`}</TotalCount>
      )}
      {!isLoading && !isPageReviewListEmpty ? (
        <SortButtonWrapper>
          {REVIEW_SORT_TYPE_OPTION_LIST.map(({ label, value }) => (
            <SortButton key={value} isSelected={checkActiveSortType(value)} onClick={handleClickSortType(value)}>
              {label}
            </SortButton>
          ))}
        </SortButtonWrapper>
      ) : (
        <SortButtonWrapper>
          <Repeat count={REVIEW_SORT_TYPE_OPTION_LIST.length}>
            <SkeletonLoading width={34} height={13.8} />
          </Repeat>
        </SortButtonWrapper>
      )}
    </ListHeader>
  );
}
