import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import FloatingNavigator from '../../navigator/components/FloatingNavigator';
import MypageHeader from './Header';
import UserInfoContainer from '../info-section/containers/UserInfoContainer';
import COLOR from '../../shared/constant/colorset';

const Layout = styled.div`
  position: relative;
  min-width: 1050px;
  background-color: ${COLOR.mykurlyBg};

  .loading-spinner-inner {
    transform: translate(100%, -50%);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
  padding: 50px 0 80px 0;
  margin: 0 auto;
`;

const LNBWrapper = styled.div`
  overflow: hidden;
  width: 375px;
  border-radius: 16px;
`;

const Container = styled.div<{ hasBackgroundColor: boolean }>`
  overflow: hidden;
  width: 650px;
  background-color: ${({ hasBackgroundColor }) => (hasBackgroundColor ? COLOR.kurlyWhite : 'transparent')};
  border-radius: 16px;
`;

const Content = styled.div<{ hasPadding?: boolean }>`
  ${({ hasPadding }) =>
    hasPadding &&
    css`
      padding: 0 20px;
    `}
`;

interface Props {
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  children?: ReactNode;
  hasBorder?: boolean;
  hasPadding?: boolean;
  hasBackgroundColor?: boolean;
}

export default function MypageLayout({
  title,
  description,
  headerAction,
  children,
  hasBorder = true,
  hasPadding = true,
  hasBackgroundColor = true,
}: Props) {
  return (
    <Layout>
      <Wrapper>
        <LNBWrapper>
          <UserInfoContainer />
        </LNBWrapper>
        <Container hasBackgroundColor={hasBackgroundColor}>
          {title && (
            <MypageHeader title={title} description={description} hasBorder={hasBorder}>
              {headerAction}
            </MypageHeader>
          )}
          <Content hasPadding={hasPadding}>{children}</Content>
        </Container>
      </Wrapper>
      <FloatingNavigator />
    </Layout>
  );
}
