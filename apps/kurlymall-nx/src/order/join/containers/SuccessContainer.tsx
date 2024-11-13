import styled from '@emotion/styled';

import { useEffect } from 'react';

import COLOR from '../../../shared/constant/colorset';
import ResultNotice from '../components/ResultNotice';
import SuccessResult from '../components/SuccessResult';
import ResultButton from '../components/ResultButton';
import PaymentResult from '../../checkout/shared/components/PaymentResult';
import LinkCopyButton from '../components/LinkCopyButton';
import { useAppSelector } from '../../../shared/store';
import useCheckoutResult from '../../shared/shared/hooks/useCheckoutResult';
import JoinOrderIconLottie from '../components/JoinOrderIconLottie';
import { JOIN_ORDER_STATUS } from '../../../shared/interfaces';
import appService from '../../../shared/services/app.service';
import { isWebview } from '../../../../util/window/getDevice';
import useEventLogPurchaseSuccess from '../../checkout/shared/hooks/useEventLogPurchaseSuccess';

const Wrapper = styled.div`
  padding: 30px 20px 0;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  text-align: center;
`;

export default function SuccessContainer() {
  useEventLogPurchaseSuccess();

  const { address, addressDetail, totalPrice, isOpened, isDeliveryOrder } = useAppSelector(({ payments }) => ({
    address: payments.paymentsResult.address,
    addressDetail: payments.paymentsResult.addressDetail,
    totalPrice: payments.paymentsResult.totalPrice,
    isOpened: payments.paymentsResult.joinOrderMeta?.status === JOIN_ORDER_STATUS.OPENED,
    isDeliveryOrder: payments.paymentsResult.isDeliveryOrder,
  }));

  const { orderNo } = useCheckoutResult();

  useEffect(() => {
    if (isWebview() && orderNo) {
      appService.postOrderSuccess({
        orderNumber: orderNo,
        amount: totalPrice,
      });
    }
  }, [orderNo, totalPrice]);

  return (
    <Wrapper>
      <JoinOrderIconLottie />
      <SuccessResult />
      {isOpened && <LinkCopyButton />}
      <PaymentResult
        orderNo={orderNo}
        address={address}
        addressDetail={addressDetail}
        price={totalPrice}
        expectedPoint={0}
        description={''}
        showReservesPrice={false}
        isDeliveryOrder={isDeliveryOrder}
      />
      <ResultNotice />
      <ResultButton />
    </Wrapper>
  );
}
