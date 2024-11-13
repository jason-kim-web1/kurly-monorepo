import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';
import { disabledCoupon, selectCoupon } from '../../shared/reducers/checkout-coupon.slice';

import { CheckoutCoupon } from '../../../../shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';

import InformationRow from '../../../../shared/components/layouts/InformationRow';
import KakaoLink from '../../../shared/m/components/KakaoLink/KakaoLink';
import CouponSelector from '../components/CouponSelector/CouponSelector';

import { MEMBERS_BANNER } from '../../shared/constants/kurly-members-banner';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';
import { KurlyMembersBanner } from '../../shared/components/KurlyMembersBanner';
import getDuplicateCoupons from '../../../../shared/utils/getDuplicateCoupons';

const styles = {
  kakao: {
    fontSize: '12px',
  },
};

const Description = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.kurlyGray600};
`;

const BannerWrapper = styled.div`
  border-top: 1px solid ${COLOR.bg};
  margin-top: 20px;
`;

export default function CouponsContainer() {
  const dispatch = useDispatch();

  const isDisabled = useAppSelector(disabledCoupon);
  const { coupons, selectedCoupon } = useAppSelector(({ checkoutCoupon }) => checkoutCoupon);

  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.PC_COUPON });
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
    <InformationRow title="쿠폰 적용">
      <CouponSelector
        couponList={duplicateCoupons}
        selectedCoupon={selectedCoupon}
        disabled={isDisabled}
        onConfirm={handleConfirm}
      />
      {isDisabled && <Description>쿠폰 적용 불가 상품입니다</Description>}
      <KakaoLink theme="purple" css={styles.kakao} />
      {membersBanner && (
        <BannerWrapper>
          <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
        </BannerWrapper>
      )}
    </InformationRow>
  );
}
