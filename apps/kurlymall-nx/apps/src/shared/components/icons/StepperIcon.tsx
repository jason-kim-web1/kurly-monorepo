import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import {
  StepperMinusActiveImg,
  StepperMinusInActiveImg,
  StepperPlusActiveImg,
  StepperPlusInActiveImg,
  StepperMinusActiveMobileImg,
  StepperMinusInActiveMobileImg,
  StepperPlusActiveMobileImg,
  StepperPlusInActiveMobileImg,
} from '../../images';

const Button = styled.button<{ bg: string; isPC: boolean }>`
  display: inline-flex;
  ${({ isPC }) =>
    isPC
      ? `
    width: 28px;
    height: 28px;
  `
      : `
    width: 34px;
    height: 34px;
  `};
  border: none;
  font-size: 1px;
  color: transparent;
  background-size: cover;
  background-color: transparent;
  ${({ bg }) => `background-image: url("${bg}");`}
  vertical-align: top;
`;

const ICON: Record<'plus' | 'minus', { disabled: string; active: string }> = {
  plus: {
    disabled: StepperPlusInActiveImg,
    active: StepperPlusActiveImg,
  },
  minus: {
    disabled: StepperMinusInActiveImg,
    active: StepperMinusActiveImg,
  },
};

const MOBILE_ICON: Record<'plus' | 'minus', { disabled: string; active: string }> = {
  plus: {
    disabled: StepperPlusInActiveMobileImg,
    active: StepperPlusActiveMobileImg,
  },
  minus: {
    disabled: StepperMinusInActiveMobileImg,
    active: StepperMinusActiveMobileImg,
  },
};

interface Props {
  type: 'minus' | 'plus';
  isPC: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function StepperIcon({ type, isPC = true, disabled = false, onClick }: Props) {
  const IMAGE = isPC ? ICON : MOBILE_ICON;

  return (
    <Button
      type="button"
      aria-label={type === 'minus' ? '수량내리기' : '수량올리기'}
      disabled={disabled}
      isPC={isPC}
      bg={IMAGE[type][disabled ? 'disabled' : 'active']}
      onClick={onClick}
    />
  );
}
