import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../constant/colorset';
import ArrowDown from '../../icons/ArrowDown';

interface ArrowProps {
  isOpen?: boolean;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const Wrapper = styled.span<{ isOpen?: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      rotate: -180deg;
    `}
`;

export default function Arrow({
  isOpen,
  width = 20,
  height = 20,
  stroke = COLOR.kurlyGray450,
  strokeWidth = 0.6,
}: ArrowProps) {
  return (
    <Wrapper isOpen={isOpen}>
      <ArrowDown width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} viewBox="2 2 13 13" />
    </Wrapper>
  );
}
