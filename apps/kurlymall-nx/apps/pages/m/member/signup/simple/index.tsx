import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import SimpleSignupFormContainer from '../../../../../src/member/signup/simple/containers/SimpeSignupFormContainer';

import { useWebview, useScreenName, useLoadEvent } from '../../../../../src/shared/hooks';

import { useAppSelector } from '../../../../../src/shared/store';
import {
  requestKakaoAccountInfomation,
  setValue,
  changeSignupForm,
} from '../../../../../src/member/signup/reducers/slice';
import { syncSession } from '../../../../../src/shared/reducers/auth';

import appService from '../../../../../src/shared/services/app.service';
import { isWebview } from '../../../../../util/window/getDevice';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import { ActionProps } from '../../../../../src/shared/services/serviceCode';
import { branchService } from '../../../../../src/shared/branch';
import { CompleteRegistration } from '../../../../../src/shared/branch/events';

import { SignUpSuccess, ViewSignUp } from '../../../../../src/shared/amplitude/events';
import { amplitudeService, ScreenName } from '../../../../../src/shared/amplitude';

import { Crypto } from '../../../../../util/security/crypto';
import { redirectTo } from '../../../../../src/shared/reducers/page';
import {
  loadSocialLoginTokenFromSessionStorage,
  saveSocialLoginTokenInSessionStorage,
} from '../../../../../src/member/login/services/login.services';

const Container = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.div`
  overflow: auto;
`;

type Props = {
  socialLoginToken: string;
  appToken: string;
  recommenderId: string;
};

export default function SimpleSignUpPage({ socialLoginToken, appToken, recommenderId }: Props) {
  useScreenName(ScreenName.SIGN_UP);
  useLoadEvent(new ViewSignUp({ joinPath: 'kakao' }));

  const dispatch = useDispatch();

  const { isReady, query } = useRouter();

  const { signup } = useAppSelector(({ social }) => ({ signup: social.signup }));
  const { accessToken } = useAppSelector(({ auth }) => ({ accessToken: auth.accessToken }));

  const webview = useWebview();

  useEffect(() => {
    if (!isReady || !accessToken) {
      return;
    }

    if (signup.status === 'INITIAL' && recommenderId) {
      dispatch(
        changeSignupForm({
          name: 'recommender',
          value: recommenderId,
        }),
      );
      return;
    }

    if (signup.status === 'SUCCESS') {
      Alert({
        text: `회원가입을 축하드립니다!
        당신의 일상에 컬리를 더해 보세요.`,
      }).then(async () => {
        amplitudeService.setScreenName(ScreenName.SIGN_UP_SUCCESS);
        amplitudeService.logEvent(new SignUpSuccess({ joinPath: 'kakao' }));
        if (isWebview()) {
          const sendData: ActionProps = {
            code: 'WV3000',
            message: '',
            data: accessToken,
          };
          appService.postMessage(sendData);
          return;
        }

        branchService.setAccessToken(accessToken);
        await branchService.logEvent(
          new CompleteRegistration({
            description: 'KAKAOSYNC',
          }),
        );

        const { return_url: returnUrl } = query as { return_url: string };
        let queryValue = undefined;
        if (returnUrl) {
          queryValue = {
            internalUrl: returnUrl,
          };
        }

        dispatch(
          redirectTo({
            url: '/m/member/signup/simple/success',
            query: queryValue,
          }),
        );
      });
    }
  }, [accessToken, dispatch, isReady, recommenderId, signup.status]);

  const checkout = () => {
    dispatch(
      setValue({
        socialLoginToken: loadSocialLoginTokenFromSessionStorage(),
      }),
    );
    dispatch(requestKakaoAccountInfomation({ provider: 'kakao' }));
  };

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('간편 회원가입');
    }
  }, []);

  useEffect(() => {
    if (socialLoginToken) {
      saveSocialLoginTokenInSessionStorage(socialLoginToken);
    }
    checkout();
  }, []);

  useEffect(() => {
    if (appToken) {
      dispatch(syncSession(appToken));
    }
  }, [appToken, dispatch]);

  return (
    <Container>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>간편 회원가입</HeaderTitle>
        </MobileHeader>
      )}

      <MainContent>
        <SimpleSignupFormContainer />
      </MainContent>
    </Container>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query } = context;
  const { authorization } = req.headers;

  const crypto = new Crypto();

  const props = {
    socialLoginToken: req.headers['social-login-token'] ?? '',
    appToken: authorization?.replace('Bearer ', '') ?? '',
    recommenderId: query.recommid ? crypto.decrypt(query.recommid, 'utf8') : '',
  };

  return {
    props,
  };
}
