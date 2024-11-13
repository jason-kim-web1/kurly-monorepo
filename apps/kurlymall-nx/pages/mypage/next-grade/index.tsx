import styled from '@emotion/styled';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';

import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import NextGradeContainer from '../../../src/mypage/next-grade/containers/NextGradeContainer';

const Fallback = styled.div`
  width: 100%;
  height: 1050px;
`;

export default function NextGradePage() {
  useScreenName(ScreenName.MEMBERSHIP_BENEFIT);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<Fallback />}>
        <NextGradeContainer />
      </AuthContainer>
      <Footer />
    </>
  );
}
