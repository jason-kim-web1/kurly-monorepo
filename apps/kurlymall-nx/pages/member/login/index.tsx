import styled from '@emotion/styled';

import Header from '../../../src/header/components/Header';
import COLOR from '../../../src/shared/constant/colorset';

import Footer from '../../../src/footer/components/Footer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import LoginForm from '../../../src/member/login/pc/components/LoginForm';
import { useInitLogin } from '../../../src/member/login/shared/hooks/useInitLogin';

const Content = styled.div`
  min-width: 1050px;
  margin-top: 90px;
  margin-bottom: 60px;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
`;

const Container = styled.div`
  width: 340px;
  margin: 0 auto;
  letter-spacing: -0.6px;
`;

export default function LoginPage() {
  useScreenName(ScreenName.LOGIN);
  useInitLogin();

  return (
    <>
      <Header />
      <Content>
        <Title>로그인</Title>
        <Container>
          <LoginForm />
        </Container>
      </Content>
      <Footer />
    </>
  );
}
