import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import PcTabsContainer from '../../../../src/member/find/containers/PcTabsContainer';
import FindIdByEmailFormContainer from '../../../../src/member/find/id/containers/FindIdByEmailFormContainer';
import FindByPhoneFormContainer from '../../../../src/member/find/id/containers/FindIdByPhoneFormContainer';

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

export default function FindIdPage() {
  useScreenName(ScreenName.FIND_ID);

  const router = useRouter();

  const dispatch = useDispatch();
  const { idByEmail, idByPhone, selectedTab } = useSelector(({ find }: AppState) => find);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const url = '/member/find/id/success';

    if (idByEmail.status === 'SUCCESS') {
      dispatch(
        redirectTo({
          url,
          query: {
            by: 'email',
          },
        }),
      );
    }

    if (idByPhone.status === 'SUCCESS') {
      dispatch(
        redirectTo({
          url,
          query: {
            by: 'mobile',
          },
        }),
      );
    }
  }, [router.isReady, dispatch, idByEmail.status, idByPhone.status]);

  useEffect(() => {
    if (idByPhone.status === 'SENT' && idByPhone.endTime) {
      dispatch(
        notifyAndFocus({
          message: `인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.

카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다.`,
          documentId: 'verification-number',
        }),
      );
    }
  }, [idByPhone.status, idByPhone.endTime, dispatch]);

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
        <Title>아이디 찾기</Title>

        <ContentArea>
          <PcTabsContainer />
          {selectedTab === FIND_METHOD_PHONE && <FindByPhoneFormContainer />}
          {selectedTab === FIND_METHOD_EMAIL && <FindIdByEmailFormContainer />}
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
