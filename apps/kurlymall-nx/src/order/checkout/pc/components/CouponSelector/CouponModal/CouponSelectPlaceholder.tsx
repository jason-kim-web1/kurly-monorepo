import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import SelectArrowIcon from '../../../../../../shared/components/icons/order/checkout/SelectArrowIcon';
import { COUPON_SELECT_BOX_BORDER_RADIUS, COUPON_SELECT_BOX_HEIGHT } from '../../../../shared/constants/skeletonUI';
import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';
import { usePreviousVendorQuery } from '../../../../shared/hooks/queries';

const styles = {
  dimmed: {
    background: COLOR.kurlyGray100,
    color: COLOR.disabled,
  },
};

const SelectBox = styled.button`
  position: relative;
  width: 100%;
  height: ${COUPON_SELECT_BOX_HEIGHT}px;
  padding: 0 54px 0 16px;
  border: 1px solid ${COLOR.lightGray};
  font-size: 14px;
  line-height: 20px;
  text-align: left;
`;

const Arrow = styled.span`
  position: absolute;
  top: 10px;
  right: 16px;
`;

interface Props {
  opened: boolean;
  placeholder: string;
  disable?: boolean;
  dimmed?: boolean;
  onClick(): void;
}

export default function CouponSelectPlaceholder({
  opened = false,
  placeholder,
  disable = false,
  dimmed = false,
  onClick,
}: Props) {
  const { isLoading } = usePreviousVendorQuery();

  const handleClickSelector = () => {
    if (disable) return;

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
    <SelectBox onClick={handleClickSelector} css={(dimmed || disable) && styles.dimmed}>
      {placeholder}
      <Arrow>
        <SelectArrowIcon rotate={opened ? -180 : 0} dimmed={dimmed || disable} />
      </Arrow>
    </SelectBox>
  );
}
