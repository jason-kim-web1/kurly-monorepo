import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import { addComma, prefixMinus, prefixPlus } from '../../../../../shared/services';

import { Panel } from '../../../../../shared/components/Panel';
import SubPriceIcon from '../../../../../shared/components/icons/order/checkout/SubPriceIcon';
import { OrderToCancelDetail } from '../../../../../order/cancel-order/interface/OrderToCancelDetail';

const Wrapper = styled.div`
  > div {
    padding: 18px 30px 20px;
  }
  > div > div:first-of-type {
    font-weight: 500;
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 16px;
  line-height: 20px;

  &:nth-of-type(2) {
    margin-top: 25px;
  }
`;

const Title = styled.div`
  font-weight: 400;
`;

const Price = styled.span`
  font-size: 18px;
`;

const SubPriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};

  > div {
    display: flex;
  }

  ${Price} {
    font-size: 14px;
  }
`;

const Currency = styled.span`
  margin-left: 4px;
  vertical-align: top;
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  padding: 16px 0 0;
  font-size: 16px;
  line-height: 20px;
  border-top: 1px solid ${COLOR.bg};
  ${Price} {
    font-size: 20px;
    font-weight: bold;
  }
  + div {
    margin-top: 12px;
  }
`;

const PriceField = ({ title, price }: { title: string; price: string }) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <div>
        <Price>{price}</Price>
        <Currency>원</Currency>
      </div>
    </Wrap>
  );
};

const SubPriceField = ({ title, price }: { title: string; price: string }) => {
  return (
    <SubPriceWrap>
      <div>
        <SubPriceIcon />
        <Title>{title}</Title>
      </div>
      <div>
        <Price>{price}</Price>
        <Currency>원</Currency>
      </div>
    </SubPriceWrap>
  );
};

export default function PriceSummary({ price }: { price: Omit<OrderToCancelDetail, 'dealProducts'> }) {
  const {
    // 총 상품 금액
    totalDisplayProductsPrice,
    // 총 상품 할인금액
    totalDisplayProductsDiscountPrice,
    // 사용 무상 적립금
    totalUsedFreePoint,
    // 사용 유상 적립금(캐시)
    totalUsedPaidPoint,
    // 총 쿠폰 할인 금액
    totalCouponDiscountPrice,
    // 결제금액
    totalPaymentPrice,
    // 즉시할인 금액
    totalCardInstantDiscountPrice,
    // 배송비
    deliveryPrice,
  } = price;

  const totalUsedPoint = totalUsedFreePoint + totalUsedPaidPoint;

  return (
    <Wrapper>
      <Panel title="환불정보">
        <>
          <PriceField title="주문금액" price={addComma(totalDisplayProductsPrice)} />
          <SubPriceField title="상품금액" price={addComma(totalDisplayProductsPrice)} />
          <SubPriceField
            title="상품할인금액"
            price={`${prefixMinus(totalDisplayProductsDiscountPrice)}${addComma(totalDisplayProductsDiscountPrice)}`}
          />
          <PriceField title="배송비" price={`${prefixPlus(deliveryPrice)}${addComma(deliveryPrice)}`} />
          <PriceField
            title="쿠폰할인"
            price={`${prefixMinus(totalCouponDiscountPrice)}${addComma(totalCouponDiscountPrice)}`}
          />
          <PriceField
            title="카드즉시할인"
            price={`${prefixMinus(totalCardInstantDiscountPrice)}${addComma(totalCardInstantDiscountPrice)}`}
          />
          <PriceField title="적립금 · 컬리캐시" price={`${prefixMinus(totalUsedPoint)}${addComma(totalUsedPoint)}`} />
          <SubPriceField title="적립금" price={`${prefixMinus(totalUsedFreePoint)}${addComma(totalUsedFreePoint)}`} />
          <SubPriceField title="컬리캐시" price={`${prefixMinus(totalUsedPaidPoint)}${addComma(totalUsedPaidPoint)}`} />
          <TotalPriceWrap>
            <Title>환불 예정 금액</Title>
            <div>
              <Price>{addComma(totalPaymentPrice)}</Price>
              <Currency>원</Currency>
            </div>
          </TotalPriceWrap>
          <SubPriceField title="반환 예정 적립금 · 컬리캐시" price={`${addComma(totalUsedPoint)}`} />
        </>
      </Panel>
    </Wrapper>
  );
}
