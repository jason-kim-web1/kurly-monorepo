import { InferGetServerSidePropsType } from 'next';

import MainSiteProvider from '../../../../src/main/components/shared/MainSiteProvider';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import NotiCenterContainer from '../../../../src/mypage/noti-center/components/NotiCenterContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSideProps } from '../../../../src/server/webview';

export default function NotiCenter({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useScreenName(ScreenName.NOTIFICATION_CENTER);

  return (
    <MainSiteProvider>
      <AuthContainer loginRequired appToken={accessToken}>
        <NotiCenterContainer />
      </AuthContainer>
    </MainSiteProvider>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
