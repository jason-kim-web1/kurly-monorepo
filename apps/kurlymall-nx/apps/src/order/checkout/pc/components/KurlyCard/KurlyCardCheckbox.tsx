import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Checkbox from '../../../../../shared/components/Input/Checkbox';
import COLOR from '../../../../../shared/constant/colorset';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import { KURLY_CEHCK_BOX_HEIGHT } from '../../../shared/constants/skeletonUI';
import { usePreviousVendorQuery } from '../../../shared/hooks/queries';

const CheckboxLabelText = styled.span`
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
  font-weight: 400;
`;

const styles = {
  checkbox: css`
    padding: 0;
    > div {
      margin-right: 8px;
    }
  `,
};

interface Props {
  isSelectedPoint: boolean;
  onClickPoint: () => void;
  disabled?: boolean;
}

export default function KurlyCardCheckbox({ isSelectedPoint, onClickPoint, disabled }: Props) {
  const { isLoading } = usePreviousVendorQuery();

  const CheckboxLabel = <CheckboxLabelText>-30,000원 즉시할인 적용</CheckboxLabelText>;

  if (isLoading) {
    return <SkeletonLoading height={KURLY_CEHCK_BOX_HEIGHT} />;
  }

  return (
    <>
      <div className={'checkbox'}>
        <Checkbox
          label={CheckboxLabel}
          css={styles.checkbox}
          checked={isSelectedPoint}
          onChange={onClickPoint}
          disabled={disabled}
        />
      </div>
    </>
  );
}
