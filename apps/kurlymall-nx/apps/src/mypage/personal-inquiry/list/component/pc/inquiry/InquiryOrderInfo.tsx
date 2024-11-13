import styled from '@emotion/styled';
import moment from 'moment';

import COLOR from '../../../../../../shared/constant/colorset';
import KurlyNowTag from '../../../../../../shared/components/KurlyNowTag';
import { isKurlyNowOrder } from '../../../../../../shared/utils/order';
import { OrderType } from '../../../../../../shared/constant/order';

const Container = styled.div`
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OrderDate = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${COLOR.kurlyGray800};
`;

const OrderNumber = styled.span`
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  date: string;
  orderNumber: number;
  orderType: OrderType;
}

export default function InquiryOrderInfo({ date, orderNumber, orderType }: Props) {
  return (
    <Container>
      <OrderDate>{moment(date).format('YYYY.MM.DD')}</OrderDate>
      <OrderNumber>{`주문번호 ${orderNumber}`}</OrderNumber>
      {isKurlyNowOrder(orderType) && <KurlyNowTag />}
    </Container>
  );
}
