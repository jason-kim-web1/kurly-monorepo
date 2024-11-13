import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';
import CouponDetailContainer from '../../../src/mypage/coupon/shared/containers/CouponDetailContainer';

export default function MypageCouponDetailPage() {
  const { isReady } = useRouter();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="쿠폰 상세" hasPadding={false}>
          <CouponDetailContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
