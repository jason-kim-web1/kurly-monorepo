import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MyMembershipContainer from '../../../src/mypage/membership/containers/MyMembership';
import Footer from '../../../src/footer/components/Footer';
import { ScreenName } from '../../../src/shared/amplitude';
import { useScreenName } from '../../../src/shared/hooks';
import MypageLayout from '../../../src/mypage/common/Layout';

const SpacingArea = styled.div`
  display: flex;
  padding-bottom: 16px;
  background-color: #f2f5f8;

  &::after {
    width: 100%;
    height: 20px;
    border-radius: 0 0 16px 16px;
    background-color: ${vars.color.$white};
    content: '';
  }
`;

export default function MyMembershipPage() {
  useScreenName(ScreenName.MEMBERSHIP_INFO);

  const router = useRouter();

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <MypageLayout title="나의 컬리멤버스 정보" hasPadding={false}>
            <SpacingArea />
            <MyMembershipContainer />
          </MypageLayout>
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
