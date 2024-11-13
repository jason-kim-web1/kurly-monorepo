import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import Footer from '../../../src/footer/components/Footer';
import MypageLayout from '../../../src/mypage/common/Layout';
import CouponPackContainer from '../../../src/mypage/membership/containers/CouponPack';
import { useScreenName } from '../../../src/shared/hooks/useScreenName';
import { ScreenName } from '../../../src/shared/amplitude/ScreenName.enum';

export default function CouponPackPage() {
  useScreenName(ScreenName.MEMBERSHIP_COUPONPACK_OPTION);

  return (
    <>
      <Header />
      <AuthContainer loginRequired>
        <MypageLayout title="컬리멤버스 쿠폰팩 변경" hasPadding={false}>
          <CouponPackContainer />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
