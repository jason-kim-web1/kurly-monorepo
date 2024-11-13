import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import Footer from '../../../src/footer/components/Footer';
import MyAffiliateBenefit from '../../../src/mypage/membership/components/MyAffiliateBenefit';
import MypageLayout from '../../../src/mypage/common/Layout';

export default function AffiliateBenefitPage() {
  const router = useRouter();

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <MypageLayout title="컬리멤버스 제휴 혜택" hasPadding={false}>
            <MyAffiliateBenefit />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
