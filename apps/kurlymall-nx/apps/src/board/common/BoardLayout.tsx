import { ReactNode } from 'react';

import styled from '@emotion/styled';

import BoardSideNavBar from './BoardSideNavBar';
import FloatingNavigator from '../../navigator/components/FloatingNavigator';
import BoardHeader from './BoardHeader';

const Layout = styled.div`
  position: relative;
  min-width: 1050px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1050px;
  padding: 50px 0 80px 0;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 820px;
`;

interface Props {
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  children?: ReactNode;
}

export default function BoardLayout({ title, description, headerAction, children }: Props) {
  return (
    <Layout>
      <Wrapper>
        <BoardSideNavBar />
        <Container>
          {title && (
            <BoardHeader title={title} description={description}>
              {headerAction}
            </BoardHeader>
          )}
          {children}
        </Container>
      </Wrapper>
      <FloatingNavigator />
    </Layout>
  );
}
