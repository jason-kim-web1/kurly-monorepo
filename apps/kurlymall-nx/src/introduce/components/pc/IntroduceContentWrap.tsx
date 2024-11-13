import styled from '@emotion/styled';

import { ReactNode } from 'react';

const Container = styled.div<{ paddingTop: number; paddingBottom: number }>`
  width: 1050px;
  margin: 0 auto;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;

interface Props {
  paddingTop?: number;
  paddingBottom?: number;
  children: ReactNode;
}

export default function IntroduceContentWrap({ paddingTop = 55, paddingBottom = 110, children }: Props) {
  return (
    <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
      {children}
    </Container>
  );
}
