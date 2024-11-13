import styled from '@emotion/styled';
import { css } from '@emotion/react';

import SelectArrow from '../icons/SelectArrow';
import COLOR from '../../constant/colorset';

const Button = styled.button(({ disabled }) => ({
  width: '100%',
  height: '48px',
  padding: '0 44px 0 16px',
  border: `solid 1px ${COLOR.lightGray}`,
  borderRadius: '4px',
  position: 'relative',
  fontSize: '15px',
  textAlign: 'left',
  color: disabled ? COLOR.disabled : COLOR.kurlyGray800,
  backgroundColor: disabled ? COLOR.kurlyGray100 : COLOR.kurlyWhite,
}));

const arrow = (disabled: boolean) => css`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
  ${disabled && {
    opacity: 0.17,
  }}
`;

interface Props {
  id?: string;
  className?: string;
  disabled?: boolean;
  value: string;
  onClick(): void;
}

export default function SelectButton({ id, className, disabled = false, value, onClick }: Props) {
  return (
    <Button id={id} className={className} disabled={disabled} onClick={onClick} type="button">
      {value}
      <SelectArrow css={arrow(disabled)} />
    </Button>
  );
}
