import { css } from '@emotion/react';

import Checkbox from '../../../../../shared/components/Input/Checkbox';
import usePlccPoint from '../../../shared/hooks/usePlccPoint';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import { KURLY_CEHCK_BOX_HEIGHT } from '../../../shared/constants/skeletonUI';
import { usePreviousVendorQuery } from '../../../shared/hooks/queries';

const styles = {
  checkbox: css`
    padding: 0;
  `,
};

interface Props {
  disabled?: boolean;
}

export default function PointUsageCheckbox({ disabled }: Props) {
  const { selectedPlccPoint, handlePointCheckbox } = usePlccPoint();
  const { isLoading } = usePreviousVendorQuery();

  if (isLoading) {
    return <SkeletonLoading testId="point-usage-checkbox-skeleton" height={KURLY_CEHCK_BOX_HEIGHT} />;
  }

  return (
    <Checkbox
      label="즉시 할인"
      css={styles.checkbox}
      checked={selectedPlccPoint}
      disabled={disabled}
      onChange={() => handlePointCheckbox()}
    />
  );
}
