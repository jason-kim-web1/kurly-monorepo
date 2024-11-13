import styled from '@emotion/styled';

import COLOR from '../../../src/shared/constant/colorset';

import Footer from '../../../src/footer/components/Footer';
import Header from '../../../src/header/components/Header';

import UserTermsView from '../../../src/user-terms/components/UserTermsView';
import SelectBox from '../../../src/shared/components/Input/SelectBox';

import useUserTerms from '../../../src/user-terms/hooks/useUserTerms';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import KurlyMembersTermsView from '../../../src/user-terms/components/KurlyMembersTermsView';
import { TermsMap, termsArray, useScrollTerms } from '../../../src/user-terms/hooks/useScrollTerms';

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

const AgreementLayout = styled.div`
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

const ScrollButtons = styled.div`
  padding-top: 40px;
  text-align: center;
  font-size: 14px;

  .bar {
    margin: 0 8px;
    color: ${COLOR.kurlyGray200};
  }

  button {
    color: ${COLOR.kurlyGray450};
    font-weight: 400;
    line-height: 24px;

    &.active {
      color: ${COLOR.kurlyGray800};
    }

    &:first-child {
      &::after {
        content: '|';
        margin: 0 8px;
        color: ${COLOR.kurlyGray200};
      }
    }
  }
`;

const ViewTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.25;
  text-align: left;

  padding: 18px 0 17px 24px;
  width: 1050px;
  margin: 0 auto;

  background-color: ${COLOR.kurlyWhite};
`;

export default function AgreementPage() {
  const { details, value, options, handleChange, kurlyMembersTerms } = useUserTerms('agreement');

  const { activeTerms, scrollToTerms } = useScrollTerms({ headerHeight: 35 });

  return (
    <MainSiteProvider>
      <Header />
      <Content>
        <Title>이용약관</Title>
        <ScrollButtons>
          {termsArray.map(({ title, id }) => (
            <button className={activeTerms === id ? 'active' : ''} onClick={scrollToTerms(id)} key={id}>
              {title}
            </button>
          ))}
        </ScrollButtons>
      </Content>
      <Container>
        {termsArray.map(({ title, id }) => {
          const marginTop = id === TermsMap.User ? '18px' : '10px';
          const child =
            id === TermsMap.User ? (
              <UserTermsView html={details ?? ''} />
            ) : (
              <KurlyMembersTermsView html={kurlyMembersTerms} />
            );

          return (
            <AgreementLayout id={id} key={id}>
              <ViewTitle style={{ marginTop }}>{title}</ViewTitle>
              {child}
            </AgreementLayout>
          );
        })}
        <SelectBoxLayout>
          <SelectBox name="agreement" value={value ?? ''} options={options} onChange={handleChange} />
        </SelectBoxLayout>
      </Container>
      <Footer />
    </MainSiteProvider>
  );
}
