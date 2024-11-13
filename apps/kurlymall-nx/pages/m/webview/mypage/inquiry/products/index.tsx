import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';

import COLOR from '../../../../../../src/shared/constant/colorset';

import { getWebviewServerSideProps } from '../../../../../../src/server/webview';

import AuthContainer from '../../../../../../src/shared/components/Auth/AuthContainer';
import ListContainer from '../../../../../../src/mypage/inquiry/products/containers/shared/ListContainer';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.bg};
`;

const WebViewMyPageInquiryProductsPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { accessToken } = props;
  return (
    <Container>
      <AuthContainer loginRequired appToken={accessToken}>
        <ListContainer />
      </AuthContainer>
    </Container>
  );
};

export default WebViewMyPageInquiryProductsPage;

export const getServerSideProps = getWebviewServerSideProps();
