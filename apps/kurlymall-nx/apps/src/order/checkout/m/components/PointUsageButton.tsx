import { css } from '@emotion/react';

import Button from '../../../../shared/components/Button/Button';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import { POINT_BUTTON_BORDER_RADIUS, POINT_BUTTON_HEIGHT, POINT_BUTTON_WIDTH } from '../../shared/constants/skeletonUI';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';

const styles = {
  button: css`
    flex-shrink: 0;
    > span {
      font-weight: 600;
    }
  `,
};

interface Props {
  isDisabled?: boolean;
  onClickTotalPoint: () => void;
}

export default function PointUsageButton({ isDisabled, onClickTotalPoint }: Props) {
  const { isLoading } = usePreviousVendorQuery();

  if (isLoading) {
    return (
      <SkeletonLoading width={POINT_BUTTON_WIDTH} height={POINT_BUTTON_HEIGHT} radius={POINT_BUTTON_BORDER_RADIUS} />
    );
  }

  return (
    <Button
      width={POINT_BUTTON_WIDTH}
      height={POINT_BUTTON_HEIGHT}
      text="모두사용"
      theme="tertiary"
      disabled={isDisabled}
      radius={4}
      onClick={onClickTotalPoint}
      css={styles.button}
    />
  );
}
