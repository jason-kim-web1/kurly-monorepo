import styled from '@emotion/styled';
import { eq } from 'lodash';

import { useEffect, useRef, ReactNode } from 'react';

import COLOR from '../../../../../shared/constant/colorset';
import { zIndex } from '../../../../../shared/styles';
import { Reset as ResetIcon } from '../../../../../shared/icons';
import type { FilterDictionary } from '../../m/ReviewFilterBottomSheet';
import { useReviewFilter } from '../../hooks/useReviewFilter';
import type { ReviewFilterType } from '../../types';
import FilterList from './FilterList';
import { REVIEW_FILTER_TYPE_OPTION_LIST } from '../../constants';
import { LoadingSpinner } from '../../../../../shared/components/LoadingSpinner';
import { addComma } from '../../../../../shared/services';
import { ellipsisText } from '../../utils';

const Modal = styled.div<{ left: number }>`
  position: absolute;
  top: 48px;
  left: ${({ left }) => left}px;
  width: 440px;
  max-height: 580px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 2px 2px 10px ${COLOR.dropShadow};
  border-radius: 6px;
  z-index: ${zIndex.pcReviewFilter};
  overflow: hidden;
`;

const ModalHeader = styled.header`
  display: flex;
  padding-left: 30px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: ${COLOR.kurlyWhite};
`;

const ModalTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const ModalDivider = styled.div`
  padding: 0 30px;
  width: 100%;
  height: 1px;
  > hr {
    width: inherit;
    height: inherit;
    border: none;
    background-color: ${COLOR.bg};
  }
`;

const ResetButton = styled.button`
  padding: 20px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
  &:disabled {
    color: ${COLOR.kurlyGray400};
  }
`;

const ModalFooter = styled.footer`
  width: 100%;
  height: 96px;
  padding: 10px 30px 30px;
  background-color: ${COLOR.kurlyWhite};
`;

const ApplyFilterButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: ${COLOR.kurlyPurple};
  border-radius: 3px;
  &:disabled {
    background-color: ${COLOR.lightGray};
  }
`;

const ApplyButtonLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: ${COLOR.kurlyWhite};
`;

const LoadingSpinnerWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const renderApplyButtonContent = ({
  reviewCount,
  isReviewCountLoading,
}: Pick<Props, 'reviewCount' | 'isReviewCountLoading'>) => {
  if (isReviewCountLoading) {
    return (
      <LoadingSpinnerWrap>
        <LoadingSpinner width={20} height={20} />
      </LoadingSpinnerWrap>
    );
  }
  const isNotMatchedReview = eq(reviewCount, 0);
  if (isNotMatchedReview) {
    return <ApplyButtonLabel>조건에 맞는 후기가 없어요</ApplyButtonLabel>;
  }
  return <ApplyButtonLabel>{`${ellipsisText(17, addComma(reviewCount))}개 후기 보기`}</ApplyButtonLabel>;
};

type ClickCord = { x: number; y: number };

const ModalContent = ({ children, onClick }: { children: ReactNode; onClick: (cord: ClickCord) => void }) => {
  const ignoreEventRef = useRef(true);
  const handleClickAnyWhere = (event: MouseEvent) => {
    if (ignoreEventRef.current) {
      ignoreEventRef.current = false;
      return;
    }
    const { clientX, clientY } = event;
    onClick({ x: clientX, y: clientY });
  };
  useEffect(() => {
    window.addEventListener('click', handleClickAnyWhere);
    return () => {
      ignoreEventRef.current = true;
      window.removeEventListener('click', handleClickAnyWhere);
    };
  }, []);
  return <>{children}</>;
};

interface Props {
  open: boolean;
  modalLeft: number;
  contentsProductNo: number;
  filterType: ReviewFilterType;
  filterDictionary: FilterDictionary;
  disableReset: boolean;
  reviewCount: number;
  isReviewCountLoading: boolean;
  onClickClose(): void;
  onClickFilterItem(targetFilterType: ReviewFilterType, code: string): () => void;
  onClickFiltersReset(): void;
  onClickApplyFilter(): void;
}

const checkPointerCordRange = (start: number, end: number, target: number) => {
  return start <= target && end >= target;
};

export default function ReviewFilterModal({
  open,
  modalLeft,
  contentsProductNo,
  filterType,
  filterDictionary,
  disableReset,
  onClickClose,
  onClickFilterItem,
  onClickFiltersReset,
  onClickApplyFilter,
  reviewCount,
  isReviewCountLoading,
}: Props) {
  const { reviewFilterList } = useReviewFilter({
    contentsProductNo,
    filterType,
  });
  const modalElementRef = useRef<HTMLDivElement>(null);
  const selectedFilter = REVIEW_FILTER_TYPE_OPTION_LIST.find(({ value }) => eq(value, filterType));
  const isNoMatchedReview = eq(reviewCount, 0) && !isReviewCountLoading;

  const handleClick = (cord: ClickCord) => {
    if (!open || !modalElementRef.current) {
      return;
    }
    const { x, y, width, height } = modalElementRef.current.getBoundingClientRect();
    if (!checkPointerCordRange(x, x + width, cord.x) || !checkPointerCordRange(y, y + height, cord.y)) {
      onClickClose();
      return;
    }
  };

  if (!open) {
    return null;
  }

  return (
    <Modal ref={modalElementRef} left={modalLeft}>
      <ModalContent onClick={handleClick}>
        <ModalHeader>
          <ModalTitle>{selectedFilter?.label}</ModalTitle>
          <ResetButton type="button" disabled={disableReset} onClick={onClickFiltersReset}>
            <ResetIcon
              width={12.8}
              height={12.8}
              stroke={disableReset ? COLOR.kurlyGray400 : COLOR.kurlyGray600}
              strokeWidth={1.8}
            />
            <span>초기화</span>
          </ResetButton>
        </ModalHeader>
        <ModalDivider>
          <hr />
        </ModalDivider>
        <FilterList
          filterType={filterType}
          list={reviewFilterList}
          filterDictionary={filterDictionary}
          onClickFilterItem={onClickFilterItem}
        />
        <ModalFooter>
          <ApplyFilterButton type="button" disabled={isNoMatchedReview} onClick={onClickApplyFilter}>
            {renderApplyButtonContent({ reviewCount, isReviewCountLoading })}
          </ApplyFilterButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
