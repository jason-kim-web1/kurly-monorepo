import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import UnsubscribeMembership from '../../../src/mypage/membership/containers/Unsubscribe';
import Footer from '../../../src/footer/components/Footer';
import { ScreenName } from '../../../src/shared/amplitude';
import { useScreenName } from '../../../src/shared/hooks';
import MypageLayout from '../../../src/mypage/common/Layout';

export default function UnsubscribeMembershipPage() {
  useScreenName(ScreenName.MEMBERSHIP_UNSUBSCRIBE);

  const router = useRouter();

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <MypageLayout title="컬리멤버스 해지하기" hasPadding={false}>
            <UnsubscribeMembership />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
