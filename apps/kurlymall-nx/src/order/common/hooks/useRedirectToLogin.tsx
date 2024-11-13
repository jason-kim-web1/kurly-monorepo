import { useRouter } from 'next/router';

import { Alert } from '@thefarmersfront/kpds-react';

import { COMMON_PATH } from '../../../shared/constant';

const LOGIN_REQUIRED_MESSAGE = '로그인하셔야 본 서비스를 이용하실 수 있습니다.';
export default function useRedirectToLogin() {
  const { push, asPath } = useRouter();

  const redirectToLogin = () => {
    push(`${COMMON_PATH.login.uri}?internalUrl=${encodeURIComponent(asPath)}`);
  };

  const showAlertAndRedirectLogin = async () => {
    await Alert({ contents: LOGIN_REQUIRED_MESSAGE });
    redirectToLogin();
  };

  return { redirectToLogin, showAlertAndRedirectLogin };
}
