import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../store';
import { redirectToLogin } from '../../reducers/page';
import { setAccessToken } from '../../reducers/auth';
import { isWebview } from '../../../../util/window/getDevice';
import { extractAuthentication } from '../../utils/token';

interface Props {
  loginRequired?: boolean;
  children: ReactNode;
  appToken?: string;
  fallback?: ReactNode;
  // 브릿지 페이지 등에서 바로 페이지 이동 시
  // 필요없는 회원정보등을 조회하는 중간에 페이지가 이동하면서 오류얼럿이 보이는 이슈 발생
  // 필요없는 회원정보 조회 막을 수 있도록 처리
  preventFetchingMemberData?: boolean;
}

export default function AuthContainer({
  loginRequired = false,
  children,
  appToken,
  fallback,
  preventFetchingMemberData,
}: Props) {
  const dispatch = useDispatch();
  const { isReady } = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    isGuest: auth.isGuest,
    hasSession: auth.hasSession,
  }));

  useEffect(() => {
    if (!isWebview()) {
      return;
    }

    if (appToken) {
      sessionStorage.setItem('appToken', appToken);
    }
    const token = appToken || sessionStorage.getItem('appToken');
    if (token) {
      dispatch(
        setAccessToken({
          ...extractAuthentication(token),
          preventFetchingMemberData,
        }),
      );
    }
  }, [appToken, dispatch, preventFetchingMemberData]);

  useEffect(() => {
    if (!hasSession || !isReady) {
      return;
    }
    if (loginRequired && isGuest) {
      dispatch(redirectToLogin());
      return;
    }
    setAuthorized(true);
  }, [hasSession, isGuest, isReady, loginRequired, dispatch]);

  return <>{authorized ? children : fallback}</>;
}
