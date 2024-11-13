import styled from '@emotion/styled';

import KeyVisual from '../components/KeyVisual';
import OneStop from '../components/OneStop';
import Privacy from '../components/Privacy';
import Card from '../components/Card';
import SignUp from '../components/SignUp';
import Faq from '../components/Faq';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10.6667vw;
`;

const FirstWrapper = styled(Wrapper)`
  margin-top: 0;
`;

export default function KurlypayContainer() {
  return (
    <Container>
      <FirstWrapper>
        <KeyVisual />
      </FirstWrapper>
      <Wrapper>
        <OneStop />
      </Wrapper>
      <Wrapper>
        <Privacy />
      </Wrapper>
      <Wrapper>
        <Card />
      </Wrapper>
      <Wrapper>
        <Faq />
      </Wrapper>
      <Wrapper>
        <SignUp />
      </Wrapper>
    </Container>
  );
}
