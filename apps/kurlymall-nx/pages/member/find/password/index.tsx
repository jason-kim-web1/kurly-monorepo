import { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import PcTabsContainer from '../../../../src/member/find/containers/PcTabsContainer';
import FindPasswordByPhoneFormContainer from '../../../../src/member/find/password/containers/FindPasswordByPhoneFormContainer';
import FindPasswordByEmailFormContainer from '../../../../src/member/find/password/containers/FindPasswordByEmailFormContainer';

import Footer from '../../../../src/footer/components/Footer';
import Header from '../../../../src/header/components/Header';

import { AppState } from '../../../../src/shared/store';
import { clear, clearStatus } from '../../../../src/member/find/reducers/find.slice';
import { notifyAndFocus, redirectTo } from '../../../../src/shared/reducers/page';

import { FIND_METHOD_EMAIL, FIND_METHOD_PHONE } from '../../../../src/member/find/constants';

import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: white;
`;

const ContentArea = styled.div`
  max-width: 400px;
  padding: 0 10px 6px 10px;
  margin: auto;
  position: relative;
  background-color: white;
`;

const Title = styled.div`
  padding-bottom: 30px;
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

export default function FindPasswordPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const dispatch = useDispatch();
  const { selectedTab, passwordByPhone, passwordByEmail } = useSelector(({ find }: AppState) => find);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (passwordByPhone.token) {
      dispatch(
        redirectTo({
          url: '/member/find/password/reset',
          query: {
            token: passwordByPhone.token,
            by: 'mobile',
          },
        }),
      );
    }

    if (passwordByEmail.status === 'SUCCESS') {
      dispatch(
        redirectTo({
          url: '/member/find/password/success',
        }),
      );
    }
  }, [router.isReady, dispatch, passwordByPhone.token, passwordByEmail.status]);

  useEffect(() => {
    if (passwordByPhone.status === 'SENT' && passwordByPhone.endTime) {
      dispatch(
        notifyAndFocus({
          message: `인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.

카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다.`,
          documentId: 'verification-number',
        }),
      );
    }
  }, [passwordByPhone.status, passwordByPhone.endTime, dispatch]);

  useEffect(() => {
    dispatch(clear());

    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedTab === FIND_METHOD_PHONE) {
      dispatch(clear());
    }
  }, [selectedTab, dispatch]);

  return (
    <>
      <Header />
      <Content>
        <Title>비밀번호 찾기</Title>

        <ContentArea>
          <PcTabsContainer />
          {selectedTab === FIND_METHOD_PHONE && <FindPasswordByPhoneFormContainer />}
          {selectedTab === FIND_METHOD_EMAIL && <FindPasswordByEmailFormContainer />}
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
