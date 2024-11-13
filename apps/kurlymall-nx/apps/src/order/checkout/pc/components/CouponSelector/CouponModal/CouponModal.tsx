import styled from '@emotion/styled';

import { CouponItem } from './CouponItem';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';
import { zIndex } from '../../../../../../shared/styles';

import COLOR from '../../../../../../shared/constant/colorset';

import { KurlyMembersBanner } from '../../../../shared/components/KurlyMembersBanner';
import { SortCouponType } from '../../../../../../shared/utils/getDuplicateCoupons';
import { UnselectedCouponOption } from './UnselectedCouponOption';

const Wrapper = styled.div`
  position: absolute;
  max-height: 227px;
  overflow-y: scroll;
  top: 42px;
  left: 0;
  width: 100%;
  z-index: ${zIndex.couponList};
  border: 1px solid ${COLOR.lightGray};
  background: ${COLOR.kurlyWhite};
`;

const Banner = styled.div`
  border-bottom: 1px solid ${COLOR.bg};
`;

interface Props {
  couponList?: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  onClick(coupon?: CheckoutCoupon): void;
  onMouseLeave(): void;
  membersBanner: { bannerTitle?: string; bannerUrl?: string };
  goToMembership: () => void;
}

export default function CouponModal({
  couponList,
  selectedCoupon,
  onClick,
  onMouseLeave,
  membersBanner,
  goToMembership,
}: Props) {
  return (
    <Wrapper role="listbox" onMouseLeave={onMouseLeave}>
      {membersBanner && (
        <Banner>
          <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
        </Banner>
      )}
      <UnselectedCouponOption
        selectedCouponCode={selectedCoupon?.couponCode ?? null}
        couponList={couponList}
        handleClickUnselectedCouponOption={onClick}
      />
      {couponList?.map((coupon) => {
        return (
          <CouponItem
            key={coupon.couponCode}
            coupon={coupon as SortCouponType<CheckoutCoupon>}
            selectedCouponCode={selectedCoupon?.couponCode ?? null}
            onClickCoupon={onClick}
          />
        );
      })}
    </Wrapper>
  );
}
