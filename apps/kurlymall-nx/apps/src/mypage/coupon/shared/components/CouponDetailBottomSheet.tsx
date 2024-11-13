import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { isPC } from '../../../../../util/window/getDevice';
import { makeCouponDaysLeft } from '../utils/conditionText';
import useCouponDetailQuery from '../queries/useCouponDetailQuery';

const BOTTOM_SHEET_HEIGHT = 37;

const BottomSheetWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 8px 0;
  justify-content: center;
  gap: ${vars.spacing.$4};
  border-top: 1px solid ${vars.color.line.$line1};
  background-color: ${vars.color.$white};

  .expire {
    color: ${vars.color.text.$tertiary};
  }

  .d-day {
    color: ${vars.color.point.$point1};
  }

  @supports (height: constant(safe-area-inset-bottom)) {
    height: calc(${BOTTOM_SHEET_HEIGHT}px + constant(safe-area-inset-bottom));
  }
  @supports (height: env(safe-area-inset-bottom)) {
    height: calc(${BOTTOM_SHEET_HEIGHT}px + env(safe-area-inset-bottom));
  }
`;

const Gutter = styled.div`
  height: ${BOTTOM_SHEET_HEIGHT}px;

  @supports (height: constant(safe-area-inset-bottom)) {
    height: calc(${BOTTOM_SHEET_HEIGHT}px + constant(safe-area-inset-bottom));
  }
  @supports (height: env(safe-area-inset-bottom)) {
    height: calc(${BOTTOM_SHEET_HEIGHT}px + env(safe-area-inset-bottom));
  }
`;

export default function CouponDetailBottomSheet() {
  const { data } = useCouponDetailQuery();

  if (!data) {
    return null;
  }

  const {
    effectivePeriod: { endAt },
  } = data;

  const couponDaysLeft = makeCouponDaysLeft({ endAt });

  if (isPC || !couponDaysLeft) {
    return null;
  }

  return (
    <>
      <BottomSheetWrapper>
        <Typography variant="$largeSemibold" className="expire">
          쿠폰 사용 가능 기한
        </Typography>
        <Typography variant="$largeSemibold" className="d-day">
          {couponDaysLeft}
        </Typography>
      </BottomSheetWrapper>
      <Gutter />
    </>
  );
}
