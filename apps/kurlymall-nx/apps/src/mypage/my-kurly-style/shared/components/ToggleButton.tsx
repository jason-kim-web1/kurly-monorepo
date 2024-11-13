import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin-right: 14px;
  font-weight: 500;
`;
const Toggle = styled.button<{ active: boolean }>`
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 30px;
  background-color: ${({ active }) => (active ? COLOR.kurlyPurple : COLOR.kurlyGray200)};

  ${!isPC &&
  css`
    margin: -25px 0 0 16px;
  `}

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ active }) => (active ? '18px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLOR.kurlyWhite};
    transition: left 0.2s ease-in-out;
  }
`;

export interface Props {
  text?: string;
  active?: boolean;
  onToggle?: (toggleState: boolean) => void;
}

export default function ToggleButton({ text, active, onToggle }: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active) {
      setIsActive(active);
    }
  }, [active]);

  const toggle = useCallback(() => {
    const activeState = !isActive;
    setIsActive(activeState);
    if (onToggle) {
      onToggle(activeState);
    }
  }, [isActive, onToggle]);

  return (
    <Wrapper>
      {text && <Text>{text}</Text>}
      <Toggle active={isActive} onClick={toggle} />
    </Wrapper>
  );
}
