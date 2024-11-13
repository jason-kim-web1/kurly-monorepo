import styled from '@emotion/styled';

import { addComma } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import InputBox from '../../../../shared/components/Input/InputBox';
import { NUMBER_DENY_REGEX } from '../../../../shared/constant';
import { POINT_INPUT_BORDER_RADIUS, POINT_INPUT_HEIGHT } from '../../shared/constants/skeletonUI';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';

const styles = {
  input: (point: number) => ({
    flexGrow: 1,
    paddingBottom: 0,
    borderRadius: `${POINT_INPUT_BORDER_RADIUS}px`,
    input: {
      height: `${POINT_INPUT_HEIGHT}px`,
      color: point === 0 ? COLOR.kurlyGray350 : COLOR.kurlyGray800,
    },
    'input:disabled': {
      color: COLOR.placeholder,
    },
  }),
};

const SkeletonWrapper = styled.div`
  width: calc(100% - 96px);
`;

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
    return (
      <SkeletonWrapper>
        <SkeletonLoading height={POINT_INPUT_HEIGHT} radius={POINT_INPUT_BORDER_RADIUS} />
      </SkeletonWrapper>
    );
  }

  return (
    <InputBox
      css={styles.input(usedPoint)}
      name="point-usage"
      type="tel"
      pattern="[0-9]*"
      inputMode="decimal"
      placeholder="0"
      value={usedPoint <= 0 ? 0 : addComma(usedPoint)}
      disabled={isDisabled}
      denyPattern={NUMBER_DENY_REGEX}
      hasDeleteButton={usedPoint > 0}
      onChange={handlePoint}
    />
  );
}
