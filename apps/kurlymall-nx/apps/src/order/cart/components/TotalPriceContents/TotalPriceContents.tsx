import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import TotalPriceDetail from './TotalPriceDetail';
import PaymentPrice from './PaymentPrice';

import { useAppSelector } from '../../../../shared/store';
import { totalPriceSelector } from '../../store/cart';

const PaymentNotice = styled(Typography)`
  text-align: right;
`;

export default function TotalPriceContents() {
  const { paymentPrice } = useAppSelector(totalPriceSelector);

  return (
    <>
      <TotalPriceDetail />
      <PaymentPrice paymentPrice={paymentPrice} />
      <PaymentNotice variant={`$smallRegular`}>쿠폰/적립금은 주문서에서 사용 가능합니다</PaymentNotice>
    </>
  );
}
