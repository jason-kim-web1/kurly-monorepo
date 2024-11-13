import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { head, isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import COLOR from '../../../../shared/constant/colorset';

import {
  makeBadgeText,
  makeBenefitText,
  makeExpirationDate,
  makePaymentConditionText,
  makePriceConditionText,
} from '../utils/conditionText';

import { Coupon } from '../interfaces/Coupon.interfaces';
import { isPC, isWebview } from '../../../../../util/window/getDevice';
import { BenefitType, CouponBadge, TitleText } from '../styled/common';
import ArrowRight8x16 from '../../../../shared/icons/ArrowRight8x16';
import appService from '../../../../shared/services/app.service';
import { MYPAGE_PATH } from '../../../../shared/constant';

const CouponItemWrapper = styled.div<{ used: boolean }>`
  border: 1px solid ${vars.color.line.$line2};
  border-radius: ${vars.radius.$16};
  background-color: ${COLOR.kurlyWhite};

  .coupon-name {
    padding: 6px 0 4px;
  }

  ${({ used }) =>
    used
      ? css`
          .inner-wrapper {
            background-color: ${vars.color.background.$background2};
          }
          p,
          .coupon-badge {
            color: ${vars.color.text.$disabled};
          }
        `
      : css``};

  &.pc {
    margin-top: 20px;

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  &.mobile {
    margin: 12px 16px 0;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 16px 8px 8px 20px;
  border-radius: ${vars.radius.$16};
`;

const Punching = styled.div`
  position: absolute;
  right: -8px;
  top: calc(50% - 8px);
  width: 16px;
  height: 16px;
  background-color: ${vars.color.$white};
  border: 1px solid ${vars.color.line.$line2};
  border-radius: ${vars.radius.$16};

  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: -1px;
    width: 10px;
    height: 20px;
    background-color: ${vars.color.$white};
  }
`;

const ConditionText = styled(Typography)`
  color: ${vars.color.text.$secondary};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  margin-top: 4px;

  button {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 8px 4px 8px 8px;
    color: ${vars.color.$gray600};

    > svg {
      margin-left: 4px;
    }
  }
`;

const ExpirationDate = styled(Typography)`
  color: ${vars.color.main.$primary};
`;

interface Props {
  coupon: Coupon;
}

export default function CouponItem({ coupon }: Props) {
  const router = useRouter();

  const goToCouponDetail = (couponNo?: number) => {
    if (isWebview()) {
      appService.setNavigationButton({
        buttonType: 'back',
      });
      appService.openWebview({
        url: `${window.location.origin}${MYPAGE_PATH.coupon.uri}/${couponNo}`,
        is_modal: true,
      });
    } else {
      router.push(`${MYPAGE_PATH.coupon.uri}/${couponNo}`);
    }

    router.replace(router.pathname, undefined, { shallow: true });
  };

  const { ids, name, luckyBoxCouponCode, benefitInfo, effectivePeriod, used, target, hurdle, isExpired } = coupon;

  const benefitType = makeBenefitText({
    luckyBoxCouponCode,
    benefitInfo,
  });

  const badgeText = makeBadgeText({ isOnlyApp: hurdle?.isOnlyApp, couponCount: ids.length });

  if (isExpired) {
    return null;
  }

  return (
    <CouponItemWrapper className={isPC ? 'pc' : 'mobile'} used={used}>
      <InnerWrapper className="inner-wrapper">
        <Punching />
        <BenefitType variant="$xxxlargeBold">
          {benefitType}
          {isEmpty(badgeText)
            ? null
            : badgeText.map((text) => (
                <CouponBadge key={text} className="coupon-badge" variant="$xsmallSemibold" as="span">
                  {text}
                </CouponBadge>
              ))}
        </BenefitType>
        <TitleText className="list-name" variant="$largeSemibold">
          {name}
        </TitleText>
        {luckyBoxCouponCode ? null : (
          <ConditionText variant="$mediumRegular">
            {makePriceConditionText({
              hurdle,
              maximumDiscountPrice: benefitInfo.maximumDiscountPrice,
              type: benefitInfo.type,
            })}
          </ConditionText>
        )}
        <ConditionText variant="$mediumRegular">
          {makePaymentConditionText({
            hurdle,
            target,
          })}
        </ConditionText>
        <ButtonWrapper>
          {used ? (
            <ExpirationDate variant="$largeSemibold">사용 완료</ExpirationDate>
          ) : (
            <>
              <ExpirationDate variant="$largeSemibold">
                {makeExpirationDate({ endAt: effectivePeriod.endAt })}
              </ExpirationDate>
              {!luckyBoxCouponCode && (
                <button onClick={() => goToCouponDetail(head(ids))}>
                  <Typography variant="$largeSemibold">쿠폰상세</Typography>
                  <ArrowRight8x16 />
                </button>
              )}
            </>
          )}
        </ButtonWrapper>
      </InnerWrapper>
    </CouponItemWrapper>
  );
}
