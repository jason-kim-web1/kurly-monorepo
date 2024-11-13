import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { MYPAGE_PATH } from '../../../../src/shared/constant';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import { getWebviewServerSidePropsWithRefreshToken, WebviewServerSideProps } from '../../../../src/server/webview';
import { useWebview } from '../../../../src/shared/hooks';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function AffiliateBenefitPage({ accessToken }: WebviewServerSideProps) {
  const dispatch = useDispatch();

  const webview = useWebview();

  useAppToken({ accessToken });

  useEffect(() => {
    if (webview) {
      window.location.replace(MYPAGE_PATH.affiliateBenefit.uri);
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.affiliateBenefit.uri, replace: true }));
  }, [dispatch, webview]);

  return null;
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
