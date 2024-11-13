import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSidePropsWithRefreshToken, WebviewServerSideProps } from '../../../../src/server/webview';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import MyAffiliateBenefit from '../../../../src/mypage/membership/components/MyAffiliateBenefit';

const headerTitle = '컬리멤버스 제휴 혜택';

export default function AffiliateBenefitPage({ accessToken }: WebviewServerSideProps) {
  const { appToken, isReady } = useAppToken({ accessToken });

  return (
    isReady && (
      <>
        <MobileNavigationBar title={headerTitle} leftButtonType="back" />
        <AuthContainer loginRequired appToken={appToken}>
          <MyAffiliateBenefit />
        </AuthContainer>
      </>
    )
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
