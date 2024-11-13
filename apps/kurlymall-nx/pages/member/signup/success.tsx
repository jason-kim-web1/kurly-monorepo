import styled from '@emotion/styled';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import SuccessContainer from '../../../src/member/signup/pc/containers/SuccessContainer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

const Content = styled.div`
  min-width: 1050px;
  margin-top: 180px;
  margin-bottom: 100px;
`;

export default function SignupSuccessPage() {
  return (
    <>
      <Header />
      <Content>
        <AuthContainer loginRequired>
          <SuccessContainer />
        </AuthContainer>
      </Content>
      <Footer />
    </>
  );
}
