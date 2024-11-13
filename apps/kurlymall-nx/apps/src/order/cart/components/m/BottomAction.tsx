import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { zIndex } from '../../../../shared/styles';

import { useAppSelector } from '../../../../shared/store';

import ProceedToCheckoutButton from './ProceedToCheckoutButton';
import TotalDiscountPrice from './TotalDiscountPrice';
import RecommendBottomSheet from './RecommendBottomSheet';
import NoticeBottomSheet from './NoticeBottomSheet';

import useRecommendProduct from '../../hooks/useRecommendProduct';
import useDeliveryNotice from '../../hooks/useDeliveryNotice';
import useBottomSheetCheckoutButton from '../../hooks/useBottomSheetCheckoutButton';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${vars.spacing.$8} ${vars.spacing.$12} calc(${vars.spacing.$8} + env(safe-area-inset-bottom));
  background-color: ${vars.color.background.$background1};
  z-index: ${zIndex.cartBottomButton};
`;

export default function BottomAction() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { isRecommendBottomSheetOpen, closeRecommendBottomSheet, openRecommendBottomSheet } = useRecommendProduct();
  const { goToCheckoutOrder } = useBottomSheetCheckoutButton();
  const { isDeliveryNoticeOpen, closeDeliveryBottomSheet, openDeliveryBottomSheet, noticeContents } =
    useDeliveryNotice();

  if (!hasSession) {
    return null;
  }

  return (
    <Wrapper>
      <TotalDiscountPrice />
      <ProceedToCheckoutButton
        openRecommendBottomSheet={openRecommendBottomSheet}
        openDeliveryBottomSheet={openDeliveryBottomSheet}
      />
      <NoticeBottomSheet
        isOpen={isDeliveryNoticeOpen}
        onClose={closeDeliveryBottomSheet}
        noticeContents={noticeContents}
        onClickCheckoutButton={goToCheckoutOrder}
      />
      <RecommendBottomSheet isOpen={isRecommendBottomSheetOpen} onClose={closeRecommendBottomSheet} />
    </Wrapper>
  );
}
