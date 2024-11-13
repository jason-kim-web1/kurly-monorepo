import styled from '@emotion/styled';

import { useCounter } from '../../../src/order/cart/hooks/useCounter';

import TopBar, { BUTTON_TYPE } from '../../../src/shared/components/KPDS/TopBar';
import Progress from '../../../src/shared/icons/kpds/progress';
import useDeliveryNotice from '../../../src/order/cart/hooks/useDeliveryNotice';
import NoticeBottomSheet from '../../../src/order/cart/components/m/NoticeBottomSheet';

const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function CounterPage() {
  const { isDeliveryNoticeOpen, closeCounterDeliveryNotice, openDeliveryBottomSheet, noticeContents } =
    useDeliveryNotice();
  useCounter(openDeliveryBottomSheet);

  return (
    <>
      <TopBar type={BUTTON_TYPE.close}>장바구니</TopBar>
      <Loading>
        <Progress />
      </Loading>
      <NoticeBottomSheet
        isOpen={isDeliveryNoticeOpen}
        noticeContents={noticeContents}
        onClose={closeCounterDeliveryNotice}
        onClickCheckoutButton={closeCounterDeliveryNotice}
      />
    </>
  );
}
