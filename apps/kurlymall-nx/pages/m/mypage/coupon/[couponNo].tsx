import { useRouter } from 'next/router';

import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import CouponDetailContainer from '../../../../src/mypage/coupon/shared/containers/CouponDetailContainer';
import TopBar, { BUTTON_TYPE } from '../../../../src/shared/components/KPDS/TopBar';

const headerTitle = '쿠폰 상세';

export default function MypageCouponDetailPage({ accessToken }: WebviewServerSideProps) {
  const { isReady } = useRouter();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <TopBar type={BUTTON_TYPE.back}>{headerTitle}</TopBar>
      <AuthContainer loginRequired appToken={accessToken}>
        <CouponDetailContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
