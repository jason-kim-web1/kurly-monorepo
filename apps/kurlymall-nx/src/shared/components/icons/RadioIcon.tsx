import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../constant/colorset';

const circleSizes = {
  small: css`
    min-width: 16px;
    min-height: 16px;
  `,
  normal: css`
    min-width: 24px;
    min-height: 24px;
  `,
};

const innerCircleSizes = {
  small: css`
    width: 6px;
    height: 6px;
  `,
  normal: css`
    width: 10px;
    height: 10px;
  `,
};

const Circle = styled.span<{
  checked: boolean;
  disabled?: boolean;
  iconSize?: 'small' | 'normal';
}>`
  ${({ iconSize = 'normal' }) => circleSizes[iconSize]}
  display: inline-block;
  position: relative;
  border-radius: 50%;
  ${(props) => ({
    backgroundColor: 'white',
    ...(props.checked && { backgroundColor: COLOR.kurlyPurple }),
    ...(props.disabled && { backgroundColor: COLOR.btnGray }),
  })}
  ${(props) => !props.checked && { border: `1px solid ${COLOR.lightGray}` }}
`;

const InnerCircle = styled.div<{
  iconSize?: 'small' | 'normal';
  checked: boolean;
  disabled?: boolean;
}>`
  ${({ iconSize = 'normal' }) => innerCircleSizes[iconSize]}
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  ${(props) => props.checked && 'background-color: white'};
`;

interface Props {
  checked: boolean;
  disabled?: boolean;
  iconSize?: 'small' | 'normal';
}

export default function RadioIcon({ checked, disabled, iconSize }: Props) {
  return (
    <Circle checked={checked} disabled={disabled} iconSize={iconSize}>
      <InnerCircle iconSize={iconSize} checked={checked} disabled={disabled} />
    </Circle>
  );
}
