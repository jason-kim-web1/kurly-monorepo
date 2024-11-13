import { GetStaticProps } from 'next';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../src/shared/components/Scroll/ScrollEventTopButton';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';
import { MEMBER_BENEFIT_PATH } from '../../../src/shared/constant';
import LayoutContainer from '../../../src/events/member-benefit/containers/pc/LayoutContainer';
import { VIP_META_INFO } from '../../../src/events/member-benefit/constants';
import VipContainer from '../../../src/events/member-benefit/containers/shared/VipContainer';

import useVipBadgeRead from '../../../src/events/member-benefit/hooks/useVipBadgeRead';

export default function MemberBenefitVipPage() {
  useVipBadgeRead();

  return (
    <>
      <PageMetaData
        title={VIP_META_INFO.title}
        description={VIP_META_INFO.description}
        url={MEMBER_BENEFIT_PATH.vip.uri}
        keyword={VIP_META_INFO.title}
      />
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <LayoutContainer>
          <VipContainer />
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
