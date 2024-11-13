import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

const Container = styled.div<{ color: 'black' | 'white' }>`
  width: 100%;
  height: 100%;
  padding-left: unset;
  padding-right: unset;
  padding-inline: 49px;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translateZ(0px);
  text-align: center;
  color: ${({ color }) => (color === 'black' ? COLOR.kurlyGray800 : COLOR.kurlyWhite)};
`;

const Title = styled.h1<{ isNarrowSize: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  pointer-events: auto;
  margin: auto;

  ${({ isNarrowSize }) =>
    isNarrowSize ? 'padding: 0 44px' : `padding: 0 25px;@media (max-width: 375px) {padding: 0 32px;}`};
`;

interface Props {
  children: ReactNode;
  color?: 'black' | 'white';
  hasLocationIcon?: boolean;
}

export default function HeaderTitle({ children, hasLocationIcon = false, color = 'black' }: Props) {
  return (
    <Container color={color}>
      <Title isNarrowSize={hasLocationIcon}>{children}</Title>
    </Container>
  );
}
