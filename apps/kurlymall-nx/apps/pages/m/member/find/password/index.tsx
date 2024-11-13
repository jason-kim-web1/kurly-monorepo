import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import TabsContainer from '../../../../../src/member/find/containers/TabsContainer';
import FindPasswordByPhoneFormContainer from '../../../../../src/member/find/password/containers/FindPasswordByPhoneFormContainer';
import FindPasswordByEmailFormContainer from '../../../../../src/member/find/password/containers/FindPasswordByEmailFormContainer';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { AppState } from '../../../../../src/shared/store';
import { clear, clearStatus } from '../../../../../src/member/find/reducers/find.slice';
import { notifyAndFocus, redirectTo } from '../../../../../src/shared/reducers/page';

import appService from '../../../../../src/shared/services/app.service';
import { isWebview } from '../../../../../util/window/getDevice';

import { FIND_METHOD_EMAIL, FIND_METHOD_PHONE } from '../../../../../src/member/find/constants';

import { ScreenName } from '../../../../../src/shared/amplitude';

export default function FindPasswordPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const webview = useWebview();
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
          url: '/m/member/find/password/reset',
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
          url: '/m/member/find/password/success',
        }),
      );
    }
  }, [router.isReady, passwordByPhone.token, passwordByEmail.status, dispatch]);

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
    if (isWebview()) {
      appService.changeTitle('비밀번호 찾기');
    }
  }, []);

  useEffect(() => {
    if (selectedTab === FIND_METHOD_PHONE) {
      dispatch(clear());
    }
  }, [selectedTab, dispatch]);

  return (
    <>
      {!webview && (
        <MobileHeader hideBottomLine>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>비밀번호 찾기</HeaderTitle>
        </MobileHeader>
      )}

      <TabsContainer hasHeader={!webview} />

      {selectedTab === FIND_METHOD_PHONE && <FindPasswordByPhoneFormContainer />}
      {selectedTab === FIND_METHOD_EMAIL && <FindPasswordByEmailFormContainer />}
    </>
  );
}
