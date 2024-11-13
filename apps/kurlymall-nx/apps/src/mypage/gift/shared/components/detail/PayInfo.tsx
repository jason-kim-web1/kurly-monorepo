import styled from '@emotion/styled';

import { useState } from 'react';

import { useAppSelector } from '../../../../../shared/store';

import COLOR from '../../../../../shared/constant/colorset';
import { addComma, prefixMinus } from '../../../../../shared/services';

import Collapse from '../../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../../shared/components/Divider/Divider';
import { getPayment } from '../../util/getPayment';
import { SubPriceField } from '../../../../order/shared/components/PriceFields';
import { GiftOrderStatus } from '../../enum/GiftOrderStatus.enum';
import ReceiptField from '../../../../order/shared/components/receipt/ReceiptField';

const Wrapper = styled.div`
  position: relative;
  padding: 13px 0 20px;
  list-style-type: none;
  > div > div > span {
    text-align: right;
  }
`;
const Point = styled.span`
  margin-right: 4px;
  color: ${COLOR.kurlyGray450};
`;
const InnerWrapper = styled.div`
  padding: 0 20px;

  li:last-of-type {
    padding-bottom: 0px;
  }
`;
const Item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  padding-bottom: 13px;
`;

const Subject = styled.strong`
  margin-right: 16px;
  font-weight: normal;
  color: #666;
  flex-shrink: 1;
`;

const Contents = styled.div`
  color: #333;
  flex-grow: 1;
  white-space: nowrap;
  text-align: right;
`;

export default function PayInfo() {
  const {
    totalDisplayProductsPrice,
    totalDisplayProductsDiscountPrice,
    deliveryPrice,
    totalCouponDiscountPrice,
    totalUsedPoint,
    totalUsedFreePoint,
    totalUsedPaidPoint,
    totalPaymentPrice,
    totalRefundedPrice,
    totalAccruedPoint = 0,
    paymentGatewayId,
    paymentGatewayIdDisplayName,
    method,
    totalCardInstantDiscountPrice,
    receipt,
  } = useAppSelector(({ mypageGift }) => mypageGift.orderDetails.payment);
  const status = useAppSelector(({ mypageGift }) => mypageGift.orderDetails.status);

  const [toggle, setToggle] = useState(false);

  const { payment } = getPayment({ paymentGatewayId, paymentMethod: method, paymentGatewayIdDisplayName });

  const handleClickCollapse = () => {
    setToggle((value: boolean) => !value);
  };

  if (status === GiftOrderStatus.CANCELED) {
    return (
      <>
        <Collapse title="결제정보" summary="" onClick={handleClickCollapse} opened={toggle}>
          <Wrapper>
            <InnerWrapper>
              <Item>
                <Subject>상품금액</Subject>
                <Contents>{0}원</Contents>
              </Item>
              {totalDisplayProductsDiscountPrice > 0 && (
                <Item>
                  <Subject>상품할인금액</Subject>
                  <Contents>{0}원</Contents>
                </Item>
              )}
              <Item>
                <Subject>배송비</Subject>
                <Contents>{0}원</Contents>
              </Item>
              <Item>
                <Subject>쿠폰할인</Subject>
                <Contents>{0}원</Contents>
              </Item>
              <Item>
                <Subject>카드즉시할인</Subject>
                <Contents>{0}원</Contents>
              </Item>
              <>
                <Item>
                  <Subject>적립금 · 컬리캐시</Subject>
                  <Contents>{0}원</Contents>
                </Item>
                <SubPriceField title="적립금" amount={0} isGiftOrder />
                <SubPriceField title="컬리캐시" amount={0} isGiftOrder />
              </>
              <Item>
                <Subject>결제금액</Subject>
                <Contents>{totalPaymentPrice}원</Contents>
              </Item>
              {totalRefundedPrice > 0 && (
                <Item>
                  <Subject>환불완료금액</Subject>
                  <Contents>{`${addComma(Number(totalRefundedPrice))}원`}</Contents>
                </Item>
              )}
              <Item>
                <Subject>결제방법</Subject>
                <Contents>{payment}</Contents>
              </Item>
            </InnerWrapper>
            {receipt && <ReceiptField receipt={receipt} />}
          </Wrapper>
        </Collapse>
        <Divider />
      </>
    );
  }
  return (
    <>
      <Collapse title="결제정보" summary="" onClick={handleClickCollapse} opened={toggle}>
        <Wrapper>
          <InnerWrapper>
            <Item>
              <Subject>상품금액</Subject>
              <Contents>{totalRefundedPrice > 0 ? '0' : `${addComma(totalDisplayProductsPrice)}`}원</Contents>
            </Item>
            {totalDisplayProductsDiscountPrice > 0 && (
              <Item>
                <Subject>상품할인금액</Subject>
                <Contents>
                  {totalRefundedPrice > 0 ? '0' : `- ${addComma(totalDisplayProductsDiscountPrice)}`}원
                </Contents>
              </Item>
            )}
            <Item>
              <Subject>배송비</Subject>
              <Contents>{totalRefundedPrice > 0 ? '0' : `${addComma(deliveryPrice)}`}원</Contents>
            </Item>
            <Item>
              <Subject>쿠폰할인</Subject>
              <Contents>{totalRefundedPrice > 0 ? '0' : `- ${addComma(totalCouponDiscountPrice)}`}원</Contents>
            </Item>
            <Item>
              <Subject>카드즉시할인</Subject>
              <Contents>
                {totalRefundedPrice > 0
                  ? '0원'
                  : `${prefixMinus(totalCardInstantDiscountPrice)}${addComma(totalCardInstantDiscountPrice)}원`}
              </Contents>
            </Item>
            <>
              <Item>
                <Subject>적립금 · 컬리캐시</Subject>
                <Contents>
                  {totalRefundedPrice > 0 ? '0' : `${prefixMinus(totalUsedPoint)}${addComma(totalUsedPoint)}`}원
                </Contents>
              </Item>
              <SubPriceField title="적립금" amount={totalUsedFreePoint} prefix={prefixMinus} isGiftOrder />
              <SubPriceField title="컬리캐시" amount={totalUsedPaidPoint} prefix={prefixMinus} isGiftOrder />
            </>
            <Item>
              <Subject>결제금액</Subject>
              <Contents>{totalRefundedPrice > 0 ? '0' : `${addComma(totalPaymentPrice)}`}원</Contents>
            </Item>
            {totalAccruedPoint > 0 && totalRefundedPrice === 0 && (
              <Item>
                <Subject>적립금액</Subject>
                <Contents>
                  <Point>배송완료 7일후 적립</Point>
                  {`${addComma(Number(totalAccruedPoint))}원`}
                </Contents>
              </Item>
            )}
            {totalRefundedPrice > 0 && (
              <Item>
                <Subject>환불완료금액</Subject>
                <Contents>{`${addComma(Number(totalRefundedPrice))}원`}</Contents>
              </Item>
            )}
            <Item>
              <Subject>결제방법</Subject>
              <Contents>{payment}</Contents>
            </Item>
          </InnerWrapper>
          {receipt && (
            <li>
              <ReceiptField receipt={receipt} />
            </li>
          )}
        </Wrapper>
      </Collapse>
      <Divider />
    </>
  );
}
