import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  height: 100%;
  padding-left: unset;
  padding-right: unset;
  padding-inline: 2px;
  left: 50px;
  right: 90px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translateZ(0px);
  text-align: center;
  color: ${COLOR.kurlyGray800};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  pointer-events: auto;
  padding: 0 2px;
`;

interface Props {
  children: ReactNode;
}

export default function ProductDetailHeaderTitle({ children }: Props) {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
}
