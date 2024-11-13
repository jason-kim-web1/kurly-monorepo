import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { ScreenName } from '../../../../src/shared/amplitude';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../../src/shared/hooks';
import UnsubscribeMembership from '../../../../src/mypage/membership/containers/Unsubscribe';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../src/server/webview';
import { redirectTo } from '../../../../src/shared/reducers/page';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

const headerTitle = '컬리멤버스 해지하기';

export default function UnsubscribeMembershipPage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.MEMBERSHIP_UNSUBSCRIBE);

  const dispatch = useDispatch();
  const { query, back } = useRouter();

  const { return_url: returnUrl } = query as { return_url: string };

  const goToBack = useCallback(() => {
    if (returnUrl) {
      dispatch(redirectTo({ url: returnUrl }));
    } else {
      back();
    }
  }, [returnUrl, dispatch, back]);

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType="back" onClickLeftButton={goToBack} />
      <AuthContainer loginRequired appToken={accessToken}>
        <UnsubscribeMembership />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
