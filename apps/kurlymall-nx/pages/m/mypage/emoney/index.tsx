import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import COLOR from '../../../../src/shared/constant/colorset';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

import Alert from '../../../../src/shared/components/Alert/Alert';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../src/shared/constant';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${COLOR.bg};
`;

const MyPageEMoneyPage = ({ page: { title } }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useDispatch();

  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      Alert({ text: '잘못된 접근입니다.' }).then(() => {
        dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
      });
    }
  }, [dispatch, isReady]);

  return (
    <Container>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton />
        </HeaderButtons>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderButtons position="right">
          <CartButtonContainer />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer loginRequired>
        {/*<PagingContextProvider>*/}
        {/*  <PageContainer />*/}
        {/*</PagingContextProvider>*/}
      </AuthContainer>
      <UserMenu />
    </Container>
  );
};

export default MyPageEMoneyPage;

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: '적립금 내역',
      },
    },
  };
}
