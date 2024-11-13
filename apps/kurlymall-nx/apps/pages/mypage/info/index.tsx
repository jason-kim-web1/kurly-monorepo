import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import PasswordConfirmContainer from '../../../src/mypage/myinfo/shared/containers/PasswordConfirmContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

const Fallback = styled.div`
  width: 100%;
  height: 1050px;
`;

export default function MyInfoPasswordPage() {
  useScreenName(ScreenName.ACCOUNT_EDIT);

  const router = useRouter();

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired fallback={<Fallback />}>
          <MypageLayout title="개인 정보 수정" hasBorder={false}>
            <PasswordConfirmContainer />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
