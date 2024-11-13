import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../../src/shared/constant/colorset';
import { getWebviewServerSideProps } from '../../../../../src/server/webview';

import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import deepLinkUrl from '../../../../../src/shared/constant/deepLink';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.bg};
`;

const MyPageEMoneyWebviewPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { accessToken } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    Alert({ text: '최신 버전으로 앱 업데이트를 해주세요.' }).then(() => {
      dispatch(
        redirectTo({
          url: deepLinkUrl.MYKURLY,
        }),
      );
    });
  }, [dispatch]);

  return (
    <Container>
      <AuthContainer loginRequired appToken={accessToken}>
        {/*<PagingContextProvider>*/}
        {/*  <PageContainer />*/}
        {/*</PagingContextProvider>*/}
      </AuthContainer>
    </Container>
  );
};

export default MyPageEMoneyWebviewPage;

export const getServerSideProps = getWebviewServerSideProps();
