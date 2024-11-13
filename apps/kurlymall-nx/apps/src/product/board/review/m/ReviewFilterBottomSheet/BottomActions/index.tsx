import styled from '@emotion/styled';
import { eq } from 'lodash';
import { motion } from 'framer-motion';

import COLOR from '../../../../../../shared/constant/colorset';
import { Reset } from '../../../../../../shared/icons';
import { addComma } from '../../../../../../shared/services';
import { LoadingSpinner } from '../../../../../../shared/components/LoadingSpinner';
import { ellipsisText } from '../../../utils';

const ActionsWrap = styled.div`
  flex-shrink: 0;
  padding: 8px 12px;
  display: flex;
  align-items: stretch;
  gap: 12px;
`;

const ResetButton = styled.button`
  display: flex;
  flex-basis: 24.5%;
  justify-content: center;
  align-items: center;
  gap: 7.6px;
  font-weight: 600;
  font-size: 16px;
  color: ${COLOR.kurlyGray600};
  line-height: 20px;
  &:disabled {
    color: ${COLOR.lightGray};
  }
`;

const ResetIcon = styled(Reset)`
  /* NOTE: global.css 전역 스타일 (hidden) overwrite */
  overflow: unset !important;
`;

const ApplyFilterButton = styled(motion.button)`
  position: relative;
  flex-basis: 73.2%;
  padding: 16px;
  border-radius: 6px;
  height: 52px;
  color: ${COLOR.kurlyWhite};
  background: ${COLOR.kurlyPurple};
  transition: background-color, color 300ms ease-out;
  overflow: hidden;
  &:disabled {
    color: ${COLOR.kurlyWhite};
    background-color: ${COLOR.lightGray};
  }
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

const ApplyButtonLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

interface Props {
  isReviewCountLoading: boolean;
  reviewCount: number;
  disableReset: boolean;
  onClickReset(): void;
  onClickApply(): void;
}

const renderApplyButtonContent = ({
  reviewCount,
  isReviewCountLoading,
}: Pick<Props, 'reviewCount' | 'isReviewCountLoading'>) => {
  if (isReviewCountLoading) {
    return (
      <LoadingSpinnerWrap>
        <LoadingSpinner width={25} height={25} />
      </LoadingSpinnerWrap>
    );
  }
  const isNotMatchedReview = eq(reviewCount, 0);
  if (isNotMatchedReview) {
    return <ApplyButtonLabel>조건에 맞는 후기가 없어요</ApplyButtonLabel>;
  }
  return <ApplyButtonLabel>{`${ellipsisText(15, addComma(reviewCount))}개 후기 보기`}</ApplyButtonLabel>;
};

export const BottomActions = ({
  isReviewCountLoading,
  reviewCount,
  disableReset,
  onClickReset,
  onClickApply,
}: Props) => {
  const isNoMatchedReview = eq(reviewCount, 0) && !isReviewCountLoading;
  return (
    <ActionsWrap>
      <ResetButton type="button" onClick={onClickReset} disabled={disableReset}>
        <ResetIcon width={12.8} height={12.8} stroke={disableReset ? COLOR.lightGray : COLOR.kurlyGray600} />
        <span>초기화</span>
      </ResetButton>
      <ApplyFilterButton type="button" disabled={isNoMatchedReview} onClick={onClickApply}>
        {renderApplyButtonContent({ reviewCount, isReviewCountLoading })}
      </ApplyFilterButton>
    </ActionsWrap>
  );
};
