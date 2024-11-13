import styled from '@emotion/styled';
import { format } from 'date-fns';

import KurlyNowTag from '../../../../../../shared/components/KurlyNowTag';
import { isKurlyNowOrder } from '../../../../../../shared/utils/order';
import { OrderType } from '../../../../../../shared/constant/order';

const WrappedOrderDateNumber = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderNumberArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const OrderNumber = styled.div({
  flex: 5,
  fontSize: '0.75rem',
  color: '#999999',
  letterSpacing: -0.26,
});

const OrderDate = styled.div({
  flex: 2,
  fontSize: '0.938rem',
  fontWeight: 500,
  color: '#333333',
  marginRight: 6,
});

type OrderDateNumberProps = {
  orderedDatetime: string;
  orderNo: number;
  orderType: OrderType;
};

function OrderDateNumber({ orderedDatetime, orderNo, orderType }: OrderDateNumberProps) {
  return (
    <WrappedOrderDateNumber>
      <OrderDate>{format(new Date(orderedDatetime), 'yyyy.MM.dd')}</OrderDate>
      <OrderNumberArea>
        <OrderNumber>{`주문번호 ${orderNo}`}</OrderNumber>
        {isKurlyNowOrder(orderType) && <KurlyNowTag />}
      </OrderNumberArea>
    </WrappedOrderDateNumber>
  );
}

export default OrderDateNumber;
