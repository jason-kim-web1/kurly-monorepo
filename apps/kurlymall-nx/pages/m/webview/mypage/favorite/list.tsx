import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';

import { useEffect } from 'react';

import { getWebviewServerSideProps } from '../../../../../src/server/webview';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';

import appService from '../../../../../src/shared/services/app.service';
import { useScreenName } from '../../../../../src/shared/hooks';
import { ScreenName } from '../../../../../src/shared/amplitude';
import FavoriteContainer from '../../../../../src/mypage/favorite/shared/containers/FavoriteContainer';

const Container = styled.main`
  min-height: 100vh;
`;

const FavoriteListWebviewPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { accessToken } = props;
  useScreenName(ScreenName.FREQUENTLY_PURCHASE_PRODUCT_HISTORY);
  useEffect(() => {
    appService.changeTitle('자주 사는 상품');
  }, []);
  return (
    <Container>
      <AuthContainer loginRequired appToken={accessToken}>
        <FavoriteContainer />
      </AuthContainer>
    </Container>
  );
};

export default FavoriteListWebviewPage;

export const getServerSideProps = getWebviewServerSideProps();
