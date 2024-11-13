import { addComma } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import InputBox from '../../../../shared/components/Input/InputBox';
import { NUMBER_DENY_REGEX } from '../../../../shared/constant';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import { POINT_INPUT_HEIGHT, POINT_INPUT_WIDTH } from '../../shared/constants/skeletonUI';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';

const styles = {
  input: (point: number) => ({
    width: `${POINT_INPUT_WIDTH}px`,
    paddingBottom: 0,
    input: {
      borderRadius: '3px',
      fontSize: '14px',
      height: '44px',
      color: point === 0 ? COLOR.kurlyGray350 : COLOR.kurlyGray800,
    },
    'input:disabled': {
      color: COLOR.placeholder,
    },
  }),
};

interface Props {
  usedPoint: number;
  isDisabled?: boolean;
  onChange: (point: number) => void;
}

export default function PointUsageInputBox({ usedPoint, isDisabled, onChange }: Props) {
  const { isLoading } = usePreviousVendorQuery();

  const handlePoint = ({ value }: { value: string }) => {
    onChange(Number(value));
  };

  if (isLoading) {
    return <SkeletonLoading width={POINT_INPUT_WIDTH} height={POINT_INPUT_HEIGHT} />;
  }

  return (
    <InputBox
      height={POINT_INPUT_HEIGHT}
      css={styles.input(usedPoint)}
      name="point-usage"
      placeholder="0"
      value={usedPoint <= 0 ? 0 : addComma(usedPoint)}
      disabled={isDisabled}
      denyPattern={NUMBER_DENY_REGEX}
      hasDeleteButton={usedPoint > 0}
      onChange={handlePoint}
    />
  );
}
