import { css } from '@emotion/react';
import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import SelectArrowIcon from '../../../../../../shared/components/icons/order/checkout/SelectArrowIcon';
import { COUPON_SELECT_BOX_BORDER_RADIUS, COUPON_SELECT_BOX_HEIGHT } from '../../../../shared/constants/skeletonUI';
import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';
import { usePreviousVendorQuery } from '../../../../shared/hooks/queries';

const dimmedStyle = css`
  background-color: ${COLOR.kurlyGray100};
  color: ${COLOR.disabled};
`;

const icon = css`
  position: absolute;
  right: 12px;
  margin-top: -3px;
`;

const SelectBox = styled.button`
  position: relative;
  width: 100%;
  height: ${COUPON_SELECT_BOX_HEIGHT}px;
  padding: 11px 16px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: ${COUPON_SELECT_BOX_BORDER_RADIUS}px;
  font-size: 16px;
  font-weight: normal;
  text-align: left;
`;

interface Props {
  placeholder: string;
  disable?: boolean;
  dimmed?: boolean;
  onClick(): void;
}

export default function CouponSelectPlaceholder({ placeholder, disable = false, dimmed = false, onClick }: Props) {
  const { isLoading } = usePreviousVendorQuery();

  const handleClickSelector = () => {
    if (disable) {
      return;
    }

    onClick();
  };

  if (isLoading) {
    return (
      <SkeletonLoading
        testId="coupon-select-skeleton"
        height={COUPON_SELECT_BOX_HEIGHT}
        radius={COUPON_SELECT_BOX_BORDER_RADIUS}
      />
    );
  }

  return (
    <SelectBox onClick={handleClickSelector} css={(dimmed || disable) && dimmedStyle}>
      {placeholder}
      <SelectArrowIcon css={icon} rotate={360} dimmed={dimmed || disable} />
    </SelectBox>
  );
}
