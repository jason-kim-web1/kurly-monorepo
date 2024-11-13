import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isUndefined } from 'lodash';

import { addComma } from '../../../shared/services';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import LoadingRecurringPayment from './Loading/LoadingRecurringPayment';
import { KurlyMembersProduct } from '../interfaces/KurlyMembersProduct.interface';
import useKurlyMembersCheckout from '../hooks/useKurlyMembersCheckout';
import { useAppSelector } from '../../../shared/store';
import FreeTicketContent from './FreeTicketContent';
import { isNotNull } from '../../../shared/utils/lodash-extends';

const Wrapper = styled.div`
  ${isPC
    ? css`
        padding: 18px 30px;
        border-bottom: 1px solid ${COLOR.bg};
      `
    : css`
        padding: 18px 20px;
        border-bottom: 8px solid ${COLOR.bg};
      `}
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 18px;
`;

const Contents = styled.ul`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};

  > div + li {
    padding-top: 16px;
  }
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;

  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

const OriginalPrice = styled.span`
  margin-right: 6px;
  color: ${COLOR.kurlyGray400};
  text-decoration: line-through;
`;

const Price = styled.span`
  color: ${COLOR.kurlyPurple};
`;

const StartDate = styled.span`
  color: ${COLOR.kurlyGray800};
`;

const RenderPrice = ({
  firstSubscription,
  product,
  hasFreeTicket,
}: {
  firstSubscription?: boolean;
  product: KurlyMembersProduct;
  hasFreeTicket: boolean;
}) => {
  const isChangePayment = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.isChangePayment);
  const { originalPrice, paymentPrice } = product;

  if (isChangePayment) {
    return <Price>0원</Price>;
  }

  if (firstSubscription) {
    return (
      <div>
        <OriginalPrice>월 {addComma(originalPrice)}원</OriginalPrice>
        <Price>첫 달 {addComma(paymentPrice)}원</Price>
      </div>
    );
  }

  if (hasFreeTicket) {
    return (
      <div>
        <OriginalPrice>월 {addComma(originalPrice)}원</OriginalPrice>
        <Price>0원</Price>
      </div>
    );
  }

  return <Price>월 {addComma(paymentPrice)}원</Price>;
};

export default function RecurringPayment() {
  const isChangePayment = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.isChangePayment);
  const { order, product, nextFreeTicket } = useKurlyMembersCheckout();

  if (isUndefined(order) || isUndefined(product)) {
    return <LoadingRecurringPayment />;
  }

  const { firstSubscription, startSettlementDate } = order;
  const hasFreeTicket = !isUndefined(nextFreeTicket) && isNotNull(nextFreeTicket);

  return (
    <Wrapper>
      <Title>자동결제</Title>
      <Contents>
        {nextFreeTicket && <FreeTicketContent freeTicket={nextFreeTicket} />}
        <Item>
          결제금액
          <RenderPrice firstSubscription={firstSubscription} product={product} hasFreeTicket={hasFreeTicket} />
        </Item>
        <Item>
          {isChangePayment ? '다음 결제일' : '결제 시작일'}
          <StartDate>{startSettlementDate}</StartDate>
        </Item>
      </Contents>
    </Wrapper>
  );
}
