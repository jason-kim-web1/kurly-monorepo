import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';

import { prefixMinus, prefixPlus } from '../../../../shared/services';

import { Panel } from '../../../../shared/components/Panel';
import {
  PriceField,
  SubPriceField,
  FreeDeliveryMessage,
  pointTextStyle,
  FinalPrice,
  Content,
  ExpectedPoint,
  KurlycardAccruedPoint,
} from '../../../shared/m/components/PriceSummary';
import { Divider } from '../../../../shared/components/Divider/Divider';

import { MEMBERS_BANNER } from '../../shared/constants/kurly-members-banner';
import useBenefit from '../../shared/hooks/useBenefit';
import { KurlyMembersBanner } from '../../shared/components/KurlyMembersBanner';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';

const Container = styled.div`
  margin-top: 30px;
`;

const BannerWrapper = styled.div`
  margin-top: 12px;
  text-align: right;
`;

const pointStyle = css`
  max-width: 230px;
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
    totalPrice,
    discountPrice,
    couponDiscountPrice,
    paymentPrice,
    deliveryPrice,
    deliveryPriceDiscountReason,
    expectedPoint,
    usedPlccPoint,
  } = useAppSelector(({ checkout }) => checkout.price);
  const {
    usedPoint,
    isGiftCardOrder,
    price: { kurlycardAccruedPoint, usedFreePoint, usedPaidPoint },
  } = useAppSelector(({ checkout }) => ({
    usedPoint: checkout.usedPoint,
    isGiftCardOrder: checkout.isGiftCardOrder,
    price: checkout.price,
  }));

  const { percent, isExpectedPoint } = useBenefit();
  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.MO_TOTAL_PRICE });

  return (
    <>
      <Panel title="결제금액">
        <Container>
          <PriceField title="주문금액">
            <Content amount={totalPrice - discountPrice} />
          </PriceField>

          <SubPriceField title="상품금액">
            <Content amount={totalPrice} />
          </SubPriceField>

          <SubPriceField title="상품할인금액">
            <Content amount={discountPrice} prefix={prefixMinus} />
          </SubPriceField>

          <PriceField title="배송비">
            {deliveryPriceDiscountReason === 'KURLY_PASS_ACTIVATED' ? (
              <FreeDeliveryMessage>무료 (컬리패스)</FreeDeliveryMessage>
            ) : (
              <Content amount={deliveryPrice} prefix={prefixPlus} />
            )}
          </PriceField>
          <PriceField title="쿠폰할인">
            <Content
              css={couponDiscountPrice > 0 && pointTextStyle}
              amount={couponDiscountPrice}
              prefix={prefixMinus}
            />
          </PriceField>

          {!isGiftCardOrder && (
            <PriceField title="카드즉시할인">
              <Content css={pointStyle} amount={usedPlccPoint} prefix={prefixMinus} />
            </PriceField>
          )}

          <PriceField title="적립금 · 컬리캐시">
            <Content css={pointStyle} amount={usedPoint} prefix={prefixMinus} />
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
          {membersBanner && (
            <BannerWrapper>
              <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} maxWidth={600} />
            </BannerWrapper>
          )}
        </Container>
      </Panel>
      <Divider />
    </>
  );
}
