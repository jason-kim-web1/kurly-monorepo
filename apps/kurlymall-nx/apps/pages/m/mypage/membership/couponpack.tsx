import { ScreenName } from '../../../../src/shared/amplitude';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../../src/shared/hooks';
import { getWebviewServerSidePropsWithRefreshToken, WebviewServerSideProps } from '../../../../src/server/webview';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import CouponPackContainer from '../../../../src/mypage/membership/containers/CouponPack';

const headerTitle = '컬리멤버스 쿠폰팩 변경';

export default function CouponPackPage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.MEMBERSHIP_COUPONPACK_OPTION);

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} />
      <AuthContainer loginRequired appToken={accessToken}>
        <CouponPackContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
