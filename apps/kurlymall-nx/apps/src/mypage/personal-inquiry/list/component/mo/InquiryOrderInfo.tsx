import styled from '@emotion/styled';
import moment from 'moment';

import KurlyNowTag from '../../../../../shared/components/KurlyNowTag';
import COLOR from '../../../../../shared/constant/colorset';
import { isKurlyNowOrder } from '../../../../../shared/utils/order';
import { OrderType } from '../../../../../shared/constant/order';

const WrappedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OrderDate = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.3px;
`;

const OrderNumber = styled.span`
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  letter-spacing: -0.26px;
`;

interface Props {
  date?: string;
  orderNumber: number;
  orderType?: OrderType;
}

export default function InquiryOrderInfo({ date, orderNumber, orderType }: Props) {
  return (
    <WrappedInfo>
      {date && <OrderDate>{moment(date).format('YYYY.MM.DD')}</OrderDate>}{' '}
      <OrderNumber>주문번호 {orderNumber}</OrderNumber>
      {isKurlyNowOrder(orderType) && <KurlyNowTag />}
    </WrappedInfo>
  );
}
