import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import useCouponListQuery from '../queries/useCouponListQuery';
import CouponItem from './CouponItem';
import EmptyCoupon from './EmptyCoupon';
import { EMPTY_TEXT } from '../constants';

const CouponListWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

export default function CouponList() {
  const { data } = useCouponListQuery();

  if (isEmpty(data)) {
    return <EmptyCoupon text={EMPTY_TEXT} />;
  }

  return (
    <CouponListWrapper>
      {data.map((coupon) => (
        <CouponItem key={coupon.ids[0]} coupon={coupon} />
      ))}
    </CouponListWrapper>
  );
}
