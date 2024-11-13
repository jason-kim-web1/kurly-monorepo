import styled from '@emotion/styled';

import COLOR from '../../src/shared/constant/colorset';

import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import UserGuideContainer from '../../src/user-guide/components/pc/UserGuideContainer';
import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';

const Content = styled.div`
  width: 100%;
  padding: 50px 0 60px 0;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

const Container = styled.div`
  margin: 55px auto 0;
  background-color: ${COLOR.bgLightGray};
`;

export default function UserGuidePage() {
  useScreenName(ScreenName.SERVICE_GUIDE);

  return (
    <MainSiteProvider>
      <Header />
      <Content>
        <Title>이용안내</Title>
        <Container>
          <UserGuideContainer />
        </Container>
      </Content>
      <Footer />
    </MainSiteProvider>
  );
}
