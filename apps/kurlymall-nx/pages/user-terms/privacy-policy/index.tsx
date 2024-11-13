import styled from '@emotion/styled';

import COLOR from '../../../src/shared/constant/colorset';

import Footer from '../../../src/footer/components/Footer';
import Header from '../../../src/header/components/Header';

import UserTermsView from '../../../src/user-terms/components/UserTermsView';
import SelectBox from '../../../src/shared/components/Input/SelectBox';

import useUserTerms from '../../../src/user-terms/hooks/useUserTerms';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  min-width: 1050px;
  background-color: ${COLOR.bgLightGray};
`;

const PolicyLayout = styled.div`
  padding-top: 10px;
  color: ${COLOR.kurlyGray800};
  line-height: 1.5;
  letter-spacing: 0;
`;

const SelectBoxLayout = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 30px 0;
`;

export default function PrivacyPolicyPage() {
  const { details, value, options, handleChange } = useUserTerms('privacyPolicy');

  return (
    <MainSiteProvider>
      <Header />
      <Content>
        <Title>컬리 개인정보 처리방침</Title>
      </Content>
      <Container>
        <PolicyLayout>
          <UserTermsView html={details ?? ''} />
        </PolicyLayout>
        <SelectBoxLayout>
          <SelectBox name={'privacyPolicy'} value={value ?? ''} options={options} onChange={handleChange} />
        </SelectBoxLayout>
      </Container>
      <Footer />
    </MainSiteProvider>
  );
}
