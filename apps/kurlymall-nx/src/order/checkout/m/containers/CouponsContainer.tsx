import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';
import { disabledCoupon, selectCoupon } from '../../shared/reducers/checkout-coupon.slice';

import { CheckoutCoupon } from '../../../../shared/interfaces';

import CouponSelector from '../components/CouponSelector/CouponSelector';
import { Panel } from '../../../../shared/components/Panel';
import KakaoLink from '../../../shared/m/components/KakaoLink/KakaoLink';
import { Divider } from '../../../../shared/components/Divider/Divider';
import { MEMBERS_BANNER } from '../../shared/constants/kurly-members-banner';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';
import { KurlyMembersBanner } from '../../shared/components/KurlyMembersBanner';
import getDuplicateCoupons from '../../../../shared/utils/getDuplicateCoupons';

const BannerWrapper = styled.div`
  overflow: hidden;
  padding-top: 10px;

  > button {
    width: 844px;
  }
`;

export default function CouponsContainer() {
  const dispatch = useDispatch();

  const isDisabled = useAppSelector(disabledCoupon);
  const { coupons, selectedCoupon } = useAppSelector(({ checkoutCoupon }) => checkoutCoupon);

  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.MO_COUPON });
  const duplicateCoupons = useMemo(
    () =>
      getDuplicateCoupons<CheckoutCoupon>({
        coupons,
        keyProperty: ['name', 'type', 'endAt', 'usable'],
        typeProperty: 'type',
      }),
    [coupons],
  );

  const handleConfirm = (coupon?: CheckoutCoupon) => {
    dispatch(selectCoupon(coupon));
  };

  return (
    <>
      <Panel title="쿠폰" headerContent={<KakaoLink />}>
        <CouponSelector
          couponList={duplicateCoupons}
          selectedCoupon={selectedCoupon}
          disable={isDisabled}
          onConfirm={handleConfirm}
        />
        {membersBanner && (
          <BannerWrapper>
            <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
          </BannerWrapper>
        )}
      </Panel>
      <Divider />
    </>
  );
}
