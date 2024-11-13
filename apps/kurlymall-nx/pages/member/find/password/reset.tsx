import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { NextPageContext } from 'next';

import PasswordResetFormContainer from '../../../../src/member/find/password/containers/PasswordResetFormContainer';

import Footer from '../../../../src/footer/components/Footer';
import Header from '../../../../src/header/components/Header';

import { clearTokenStatus, updateToken } from '../../../../src/member/find/reducers/find.slice';
import { AppState } from '../../../../src/shared/store';

import Alert from '../../../../src/shared/components/Alert/Alert';
import { verifyToken } from '../../../../src/member/find/services';

import { useScreenName } from '../../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { SetNewPasswordSuccess } from '../../../../src/shared/amplitude/events';
import { redirectTo } from '../../../../src/shared/reducers/page';
import { COMMON_PATH, getPageUrl } from '../../../../src/shared/constant';

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
export default function PasswordResetPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const dispatch = useDispatch();
  const { passwordResetForm, tokenStatus } = useSelector((state: AppState) => state.find);

  const router = useRouter();

  const { token = '', by = '' } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    dispatch(updateToken(token));
  }, [router.isReady, dispatch, token]);

  useEffect(() => {
    if (tokenStatus === 'EXPIRED') {
      Alert({
        text: `유효 시간이 만료되었습니다.
비밀번호 찾기를 다시 시도해 주세요.`,
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.findPassword) }));
        }

        dispatch(clearTokenStatus());
      });
    }
  }, [tokenStatus, dispatch]);

  useEffect(() => {
    if (passwordResetForm.status === 'SUCCESS') {
      amplitudeService.logEvent(
        new SetNewPasswordSuccess({
          authenticationMethod: by === 'mobile' ? 'mobile' : 'email',
        }),
      );
      Alert({
        text: '비밀번호 변경이 완료되었습니다.',
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          dispatch(redirectTo({ url: getPageUrl(COMMON_PATH.login) }));
        }

        dispatch(clearTokenStatus());
      });
    }
  }, [passwordResetForm.status, dispatch]);

  return (
    <>
      <Header />
      <Content>
        <Title>비밀번호 재설정</Title>

        <ContentArea>
          <PasswordResetFormContainer />
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const redirect = {
    redirect: {
      destination: '/member/find/password/fail',
      permanent: false,
    },
  };

  const { token } = context.query;
  if (!token) {
    return redirect;
  }

  try {
    const valid = await verifyToken(token as string);
    if (!valid) {
      return redirect;
    }
  } catch {
    return redirect;
  }

  return {
    props: {},
  };
}
