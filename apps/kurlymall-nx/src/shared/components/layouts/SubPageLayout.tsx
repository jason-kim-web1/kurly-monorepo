import { ReactNode } from 'react';

import styled from '@emotion/styled';

import Footer from '../../../footer/components/Footer';
import Header from '../../../header/components/Header';

const Body = styled.div();

const Title = styled.h2`
  padding-bottom: 48px;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
`;

const Container = styled.div`
  width: 1050px;
  padding: 60px 0;
  margin: 0 auto;
`;

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function SubPageLayout({ title, children, className }: Props) {
  return (
    <>
      <Header />
      <Body className={className}>
        <Container>
          {title && <Title>{title}</Title>}
          {children}
        </Container>
      </Body>
      <Footer />
    </>
  );
}
