import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';

import Alert from '../../../src/shared/components/Alert/Alert';
import { redirectTo } from '../../../src/shared/reducers/page';
import { getPageUrl, MYPAGE_PATH } from '../../../src/shared/constant';

const Fallback = styled.div`
  width: 100%;
  height: 1050px;
`;

const MyPageEMoneyPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    page: { title, description },
  } = props;

  const dispatch = useDispatch();

  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      Alert({ text: '잘못된 접근입니다.' }).then(() => {
        dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.orderList) }));
      });
    }
  }, [dispatch, isReady]);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<Fallback />}>
        <MypageLayout title={title} description={description}>
          {/*<PagingProvider>*/}
          {/*  <PageContainer />*/}
          {/*</PagingProvider>*/}
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
};

export default MyPageEMoneyPage;

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: '적립금',
        description: '보유하고 계신 적립금의 내역을 한 눈에 확인 하실 수 있습니다.',
      },
    },
  };
}
