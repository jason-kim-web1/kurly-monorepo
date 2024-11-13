import styled from '@emotion/styled';

import { ReactNode } from 'react';

import MemberBenefitNav from '../../components/pc/MemberBenefitNav';

const Container = styled.div`
  min-width: 1050px;
  min-height: 800px;
`;

const Content = styled.div`
  width: 780px;
  margin: 0 auto;
`;

interface Props {
  children?: ReactNode;
}

export default function LayoutContainer({ children }: Props) {
  return (
    <Container>
      <MemberBenefitNav />
      <Content>{children}</Content>
    </Container>
  );
}
