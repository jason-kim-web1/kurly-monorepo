import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../../shared/store';
import Button from '../../../shared/components/Button/Button';
import { COMMON_PATH, PARTNERS_PATH, getPageUrl } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import Alert from '../../../shared/components/Alert/Alert';
import { AlertContent, BridgeContent, Container } from '../shared/styled';
import { storeSessionStorage } from '../../../shared/services/session.storage.service';
import { SERVICE_MANAGEMENT_NUM, SESSION_PARTNER_ENTRY, SUBS_PRODUCT_ID } from '../shared/constants';
import { isPC } from '../../../../util/window/getDevice';
import LogoAndNotice from '../components/LogoAndNotice';
import SubscribeUsingSKT from '../components/SubscribeUsingSKT';

function BridgeContainer() {
  const { isGuest, hasSession } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
  }));

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    pathname,
    query: { [SERVICE_MANAGEMENT_NUM]: serviceManagementNum, [SUBS_PRODUCT_ID]: subsProductId },
  } = router;

  useEffect(() => {
    if (pathname) {
      const currentPage = Object.entries(PARTNERS_PATH).find(
        ([, value]) => pathname === value[isPC ? 'uri' : 'mobileUri'],
      );

      if (currentPage) {
        storeSessionStorage(SESSION_PARTNER_ENTRY, currentPage[0]);

        if (serviceManagementNum) {
          storeSessionStorage(SERVICE_MANAGEMENT_NUM, serviceManagementNum);
        }

        if (subsProductId) {
          storeSessionStorage(SUBS_PRODUCT_ID, subsProductId);
        }
      }
    }
  }, [pathname, serviceManagementNum, subsProductId]);

  const goToLogin = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(COMMON_PATH.login),
        query: {
          internalUrl: getPageUrl(PARTNERS_PATH.skt),
        },
      }),
    );
  }, [dispatch]);

  const goToSignUp = useCallback(() => {
    dispatch(
      redirectTo({
        url: getPageUrl(COMMON_PATH.signup),
        query: {
          internalUrl: getPageUrl(PARTNERS_PATH.skt),
        },
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (hasSession && isGuest) {
      Alert({
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        contents: (
          <AlertContent>
            <h3>컬리멤버스 가입인증</h3>
            <p>우주패스 가입 고객님은 컬리멤버스 혜택을 이용하기 위해서는 로그인 혹은 회원가입이 필요합니다.</p>
            <div className="buttons">
              <Button theme="tertiary" text="로그인" radius={6} onClick={goToLogin} />
              <Button theme="primary" text="회원가입" radius={6} onClick={goToSignUp} />
            </div>
          </AlertContent>
        ),
      });
    }
  }, [hasSession, isGuest, goToLogin, goToSignUp]);

  return (
    <Container>
      <BridgeContent>
        <LogoAndNotice />
        <SubscribeUsingSKT />
      </BridgeContent>
    </Container>
  );
}

export default BridgeContainer;
