import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { isWebview } from '../../../../util/window/getDevice';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH, getPageUrl } from '../../../shared/constant';
import { useAppSelector } from '../../../shared/store';
import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';
import { Benefit } from '../shared/type';
import getDuplicateCoupons from '../../../shared/utils/getDuplicateCoupons';
import CurrentBenefitItem from './CurrentBenefitItem';
import ArrowRight6x10 from '../../../shared/components/icons/svg/ArrowRight6x10';

const CurrentBenefitWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vars.spacing.$16};
  padding: ${vars.spacing.$20};

  .coupon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${vars.spacing.$10} ${vars.spacing.$12};
    gap: 9px;
    font-weight: 600;
    line-height: 20px;
    border-radius: 8px;
    color: ${vars.color.$gray900};
    background-color: ${vars.color.background.$background3};
  }
`;

declare global {
  interface Window {
    MEMBERSHIP_FINISH_AND_REFRESH?: () => void;
  }
}

export default function CurrentBenefits() {
  const dispatch = useDispatch();

  const { benefits } = useAppSelector(({ myMembership }) => ({
    benefits: myMembership.benefits,
  }));

  const benefitList = useMemo(
    () =>
      getDuplicateCoupons<Benefit>({
        coupons: benefits,
        keyProperty: ['condition', 'couponType', 'isUsed'],
        typeProperty: 'couponType',
      }),
    [benefits],
  );

  const goToCoupon = useCallback(() => {
    if (isWebview()) {
      location.href = deepLinkUrl.COUPON;
      return;
    }

    dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.coupon) }));
  }, [dispatch]);

  const couponPackFinishAndRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }

    window.MEMBERSHIP_FINISH_AND_REFRESH = couponPackFinishAndRefresh;
    return () => {
      delete window.MEMBERSHIP_FINISH_AND_REFRESH;
    };
  }, []);

  return (
    <>
      <CurrentBenefitWrap>
        {benefitList.map(({ type, value, isUsed, condition, duplicateCoupons }, index) => (
          <CurrentBenefitItem
            type={type}
            value={value}
            isUsed={isUsed}
            condition={condition}
            key={value + condition + index}
            duplicateCoupons={duplicateCoupons}
          />
        ))}
        <button onClick={goToCoupon} className="coupon-button">
          쿠폰함 바로가기
          <ArrowRight6x10 color={vars.color.$gray900} />
        </button>
      </CurrentBenefitWrap>
    </>
  );
}
