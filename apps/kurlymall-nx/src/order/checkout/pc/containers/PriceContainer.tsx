import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';

import { prefixMinus, prefixPlus } from '../../../../shared/services';

import {
  PriceField,
  SubPriceField,
  FreeDeliveryMessage,
  pointTextStyle,
  FinalPrice,
  ExpectedPoint,
  Content,
  KurlycardAccruedPoint,
} from '../components/PriceSummary';
import { Title } from '../components/Title';

import { MEMBERS_BANNER } from '../../shared/constants/kurly-members-banner';
import useBenefit from '../../shared/hooks/useBenefit';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';
import { KurlyMembersBanner } from '../../shared/components/KurlyMembersBanner';

const PriceWrapper = styled.div`
  width: 100%;
  padding: 17px 16px 18px 18px;
  background: #fafafa;
  border: 1px solid #f2f2f2;
`;

const styles = {
  price: {
    paddingBottom: '4px',
  },
};

const pointStyles = css`
  > span {
    display: inline-block;
    overflow: hidden;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    vertical-align: top;
  }
`;

export default function PriceContainer() {
  const {
    price: {
      totalPrice,
      discountPrice,
      couponDiscountPrice,
      paymentPrice,
      deliveryPrice,
      deliveryPriceDiscountReason,
      expectedPoint,
      usedPlccPoint,
      kurlycardAccruedPoint,
      usedFreePoint,
      usedPaidPoint,
    },
    usedPoint,
    isGiftCardOrder,
  } = useAppSelector(({ checkout }) => ({
    price: checkout.price,
    usedPoint: checkout.usedPoint,
    isGiftCardOrder: checkout.isGiftCardOrder,
  }));

  const { percent, isExpectedPoint } = useBenefit();
  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.PC_TOTAL_PRICE });

  return (
    <>
      <Title title="결제 금액" noBorder noMargin />
      <PriceWrapper>
        <PriceField title="주문금액" css={styles.price}>
          <Content amount={totalPrice - discountPrice} />
        </PriceField>

        <SubPriceField title="상품금액">
          <Content amount={totalPrice} />
        </SubPriceField>

        <SubPriceField title="상품할인금액">
          <Content amount={discountPrice} prefix={prefixMinus} />
        </SubPriceField>

        <PriceField title="배송비">
          {deliveryPriceDiscountReason === 'KURLY_PASS_ACTIVATED' && (
            <FreeDeliveryMessage>무료 (컬리패스)</FreeDeliveryMessage>
          )}
          {deliveryPriceDiscountReason !== 'KURLY_PASS_ACTIVATED' && (
            <Content amount={deliveryPrice} prefix={prefixPlus} />
          )}
        </PriceField>
        <PriceField title="쿠폰할인">
          <Content css={couponDiscountPrice > 0 && pointTextStyle} amount={couponDiscountPrice} prefix={prefixMinus} />
        </PriceField>
        {!isGiftCardOrder && (
          <PriceField title="카드즉시할인">
            <Content css={pointStyles} amount={usedPlccPoint} prefix={prefixMinus} />
          </PriceField>
        )}
        <PriceField title="적립금 · 컬리캐시" css={styles.price}>
          <Content amount={usedPoint} prefix={prefixMinus} />
        </PriceField>
        <SubPriceField title="적립금">
          <Content amount={usedFreePoint} prefix={prefixMinus} />
        </SubPriceField>
        <SubPriceField title="컬리캐시">
          <Content amount={usedPaidPoint} prefix={prefixMinus} />
        </SubPriceField>
        <FinalPrice amount={paymentPrice} />
        {isExpectedPoint && <ExpectedPoint expectedPoint={expectedPoint} ratio={percent} />}
        {!isGiftCardOrder && <KurlycardAccruedPoint accruedPoint={kurlycardAccruedPoint} />}
      </PriceWrapper>
      <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
    </>
  );
}
