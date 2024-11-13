import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import { addComma, prefixMinus, prefixPlus } from '../../../../../shared/services';
import { CancelPrice } from '../../../shared/services/cancel-order.service';

import { Panel } from '../../../../../shared/components/Panel';

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
  &.first-title {
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
  padding-left: 16px;
  margin-top: 12px;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
  background-image: url('https://res.kurly.com/mobile/service/common/2003/ico_sub_price_dot.png');
  background-repeat: no-repeat;
  background-size: 16px 20px;
  background-position: 0 50%;

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

export default function PriceSummary({ price }: { price: CancelPrice }) {
  const {
    // 총 상품 금액
    totalDealProductPrice,
    // 총 상품 할인금액
    totalDealProductDiscountPrice,
    // 사용 적립금
    totalUsedFreePoint,
    // 사용 유상 적립금(캐시)
    totalUsedPaidPoint,
    // 총 쿠폰 할인 금액
    totalCouponDiscountPrice,
    // 즉시할인 금액
    totalCardInstantDiscountPrice,
    // 결제금액
    totalPaymentPrice,
    // 배송비
    deliveryPrice,
  } = price;

  const totalUsedPoint = totalUsedFreePoint + totalUsedPaidPoint;

  return (
    <Wrapper>
      <Panel title="환불정보">
        <>
          <Wrap className="first-title">
            <Title>주문금액</Title>
            <div>
              <Price>{addComma(totalDealProductPrice)}</Price>
              <Currency>원</Currency>
            </div>
          </Wrap>
          <SubPriceWrap>
            <Title>상품금액</Title>
            <div>
              <Price>{addComma(totalDealProductPrice)}</Price>
              <Currency>원</Currency>
            </div>
          </SubPriceWrap>
          <SubPriceWrap>
            <Title>상품할인금액</Title>
            <div>
              <Price>
                {prefixMinus(totalDealProductDiscountPrice)}
                {addComma(totalDealProductDiscountPrice)}
              </Price>
              <Currency>원</Currency>
            </div>
          </SubPriceWrap>
          <Wrap>
            <Title>배송비</Title>
            <div>
              <Price>
                {prefixPlus(deliveryPrice)}
                {addComma(deliveryPrice)}
              </Price>
              <Currency>원</Currency>
            </div>
          </Wrap>
          <Wrap>
            <Title>쿠폰할인</Title>
            <div>
              <Price>
                {prefixMinus(totalCouponDiscountPrice)}
                {addComma(totalCouponDiscountPrice)}
              </Price>
              <Currency>원</Currency>
            </div>
          </Wrap>
          <Wrap>
            <Title>카드즉시할인</Title>
            <div>
              <Price>
                {prefixMinus(totalCardInstantDiscountPrice)}
                {addComma(totalCardInstantDiscountPrice)}
              </Price>
              <Currency>원</Currency>
            </div>
          </Wrap>
          <Wrap>
            <Title>적립금 · 컬리캐시</Title>
            <div>
              <Price>
                {prefixMinus(totalUsedPoint)}
                {addComma(totalUsedPoint)}
              </Price>
              <Currency>원</Currency>
            </div>
          </Wrap>
          <SubPriceWrap>
            <Title>적립금</Title>
            <div>
              <Price>
                {prefixMinus(totalUsedFreePoint)}
                {addComma(totalUsedFreePoint)}
              </Price>
              <Currency>원</Currency>
            </div>
          </SubPriceWrap>
          <SubPriceWrap>
            <Title>컬리캐시</Title>
            <div>
              <Price>
                {prefixMinus(totalUsedPaidPoint)}
                {addComma(totalUsedPaidPoint)}
              </Price>
              <Currency>원</Currency>
            </div>
          </SubPriceWrap>
          <TotalPriceWrap>
            <Title>환불 예정 금액</Title>
            <div>
              <Price>{addComma(totalPaymentPrice)}</Price>
              <Currency>원</Currency>
            </div>
          </TotalPriceWrap>
          <SubPriceWrap>
            <Title>반환 예정 적립금 · 컬리캐시</Title>
            <div>
              <Price>{addComma(totalUsedPoint)}</Price>
              <Currency>원</Currency>
            </div>
          </SubPriceWrap>
        </>
      </Panel>
    </Wrapper>
  );
}
