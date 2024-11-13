import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import FindIdByEmailFormContainer from '../../../../../src/member/find/id/containers/FindIdByEmailFormContainer';
import FindByPhoneFormContainer from '../../../../../src/member/find/id/containers/FindIdByPhoneFormContainer';

import TabsContainer from '../../../../../src/member/find/containers/TabsContainer';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';

import { useWebview, useScreenName } from '../../../../../src/shared/hooks';

import { AppState } from '../../../../../src/shared/store';
import { clear, clearStatus } from '../../../../../src/member/find/reducers/find.slice';
import { notifyAndFocus, redirectTo } from '../../../../../src/shared/reducers/page';

import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';

import { FIND_METHOD_EMAIL, FIND_METHOD_PHONE } from '../../../../../src/member/find/constants';

import { ScreenName } from '../../../../../src/shared/amplitude';

export default function FindIdPage() {
  useScreenName(ScreenName.FIND_ID);

  const webview = useWebview();
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
  }, [router.isReady, idByEmail.status, idByPhone.status, dispatch]);

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
    if (isWebview()) {
      appService.changeTitle('아이디 찾기');
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
          <HeaderTitle>아이디 찾기</HeaderTitle>
        </MobileHeader>
      )}

      <TabsContainer hasHeader={!webview} />

      {selectedTab === FIND_METHOD_PHONE && <FindByPhoneFormContainer />}
      {selectedTab === FIND_METHOD_EMAIL && <FindIdByEmailFormContainer />}
    </>
  );
}
