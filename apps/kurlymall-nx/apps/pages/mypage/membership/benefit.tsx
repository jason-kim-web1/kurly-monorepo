import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import BenefitLegoView from '../../../src/mypage/membership/containers/BenefitLegoView';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

export default function MembershipBenefitPage() {
  const { isReady } = useRouter();

  return (
    isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <BenefitLegoView />
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
