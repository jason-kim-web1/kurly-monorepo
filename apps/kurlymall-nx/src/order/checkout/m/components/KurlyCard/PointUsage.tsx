import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import PointUsageCheckbox from './PointUsageCheckbox';

const CardPointUsageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
`;

const PointText = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  &.disabled {
    color: ${COLOR.lightGray};
  }

  > span {
    font-size: 16px;
  }
`;

interface Props {
  disabled?: boolean;
}

export default function PointUsage({ disabled = false }: Props) {
  return (
    <CardPointUsageWrapper>
      <PointUsageCheckbox disabled={disabled} />
      <PointText className={disabled ? 'disabled' : ''}>
        <span>-30,000원</span>
      </PointText>
    </CardPointUsageWrapper>
  );
}
