import { ReactNode } from 'react';

import styled from '@emotion/styled';

type Position = 'left' | 'right';

const Container = styled.div<{ position: Position }>`
  height: 100%;
  top: 0;
  ${(props) => props.position === 'left' && { left: '5px' }}
  ${(props) => props.position === 'right' && { right: '6px' }}
  position: absolute;
  z-index: 99;
  display: flex;
  align-items: center;

  button {
    :not(:first-of-type) {
      margin-left: 4px;
    }
  }
`;

interface Props {
  position?: Position;
  className?: string;
  children: ReactNode;
}

export default function HeaderButtons({ children, position = 'left', className }: Props) {
  return (
    <Container className={className} position={position}>
      {children}
    </Container>
  );
}
