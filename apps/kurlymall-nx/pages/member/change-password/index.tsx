import styled from '@emotion/styled';

import COLOR from '../../../src/shared/constant/colorset';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import ChangePasswordContainer from '../../../src/member/change-password/shared/containers/ChangePassword';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

const Content = styled.div`
  width: 540px;
  margin: 50px auto 60px auto;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.div`
  margin-bottom: 50px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -1px;
  color: ${COLOR.kurlyGray800};
`;

export default function ChangePassword() {
  return (
    <>
      <Header />
      <Content>
        <Title>비밀번호 변경</Title>
        <AuthContainer loginRequired>
          <ChangePasswordContainer />
        </AuthContainer>
      </Content>
      <Footer />
    </>
  );
}
