import { GetStaticProps } from 'next';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../src/shared/components/Scroll/ScrollEventTopButton';
import LoversContainer from '../../../src/events/member-benefit/containers/pc/LoversContainer';
import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';
import { DEFAULT_KEYWORDS } from '../../../src/shared/constant/page-meta';
import { LOVERS_META_INFO } from '../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../src/shared/constant';

export default function MemberBenefitLoversPage() {
  return (
    <>
      <PageMetaData
        title={LOVERS_META_INFO.title}
        description={LOVERS_META_INFO.description}
        image={LOVERS_META_INFO.image}
        url={MEMBER_BENEFIT_PATH.lovers.uri}
        keyword={DEFAULT_KEYWORDS}
      />
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <LoversContainer />
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
