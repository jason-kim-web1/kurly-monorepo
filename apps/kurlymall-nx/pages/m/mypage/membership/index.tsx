import { ScreenName } from '../../../../src/shared/amplitude';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../../src/shared/hooks';
import MyMembershipContainer from '../../../../src/mypage/membership/containers/MyMembership';
import { getWebviewServerSidePropsWithRefreshToken, WebviewServerSideProps } from '../../../../src/server/webview';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

const headerTitle = '나의 컬리멤버스 정보';

export default function MyMembershipPage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.MEMBERSHIP_INFO);
  const { appToken, isReady } = useAppToken({ accessToken });

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType="back" />
      <AuthContainer loginRequired appToken={appToken}>
        <MyMembershipContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
