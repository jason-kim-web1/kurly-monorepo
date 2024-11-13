import { GetStaticProps } from 'next';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../src/shared/components/Scroll/ScrollEventTopButton';
import FriendContainer from '../../../src/events/member-benefit/containers/pc/FriendContainer';
import { LOVERS_META_INFO } from '../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../src/shared/constant';
import { DEFAULT_KEYWORDS } from '../../../src/shared/constant/page-meta';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';

export default function MemberBenefitInviteFriendPage() {
  return (
    <>
      <PageMetaData
        title={LOVERS_META_INFO.title}
        description={LOVERS_META_INFO.description}
        image={LOVERS_META_INFO.image}
        url={MEMBER_BENEFIT_PATH.friend.uri}
        keyword={DEFAULT_KEYWORDS}
      />
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <FriendContainer />
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
