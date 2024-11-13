import { GetStaticProps } from 'next';

import styled from '@emotion/styled';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../src/shared/components/Scroll/ScrollEventTopButton';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';
import { MEMBER_BENEFIT_PATH } from '../../../src/shared/constant';
import MembersContainer from '../../../src/events/member-benefit/containers/shared/MembersContainer';
import LayoutContainer from '../../../src/events/member-benefit/containers/pc/LayoutContainer';
import { MEMBERS_META_INFO } from '../../../src/events/member-benefit/constants';

const InnerWrapper = styled.div`
  padding-bottom: 40px;
`;

export default function MemberBenefitMembersPage() {
  return (
    <>
      <PageMetaData
        title={MEMBERS_META_INFO.title}
        description={MEMBERS_META_INFO.description}
        url={MEMBER_BENEFIT_PATH.members.uri}
        keyword={MEMBERS_META_INFO.title}
      />
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <LayoutContainer>
          <InnerWrapper>
            <MembersContainer />
          </InnerWrapper>
        </LayoutContainer>
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
