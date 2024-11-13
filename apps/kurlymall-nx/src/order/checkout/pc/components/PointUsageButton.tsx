import Button from '../../../../shared/components/Button/Button';
import { POINT_BUTTON_BORDER_RADIUS, POINT_BUTTON_WIDTH, POINT_INPUT_HEIGHT } from '../../shared/constants/skeletonUI';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';

const styles = {
  button: {
    '> span': {
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: '3px',
    },
  },
};

interface Props {
  isDisabled?: boolean;
  onClickTotalPoint: () => void;
}

export default function PointUsageButton({ isDisabled, onClickTotalPoint }: Props) {
  const { isLoading } = usePreviousVendorQuery();

  if (isLoading) {
    return (
      <SkeletonLoading width={POINT_BUTTON_WIDTH} height={POINT_INPUT_HEIGHT} radius={POINT_BUTTON_BORDER_RADIUS} />
    );
  }

  return (
    <Button
      width={POINT_BUTTON_WIDTH}
      height={POINT_INPUT_HEIGHT}
      text="모두사용"
      theme="tertiary"
      disabled={isDisabled}
      radius={POINT_BUTTON_BORDER_RADIUS}
      css={styles.button}
      onClick={onClickTotalPoint}
    />
  );
}
