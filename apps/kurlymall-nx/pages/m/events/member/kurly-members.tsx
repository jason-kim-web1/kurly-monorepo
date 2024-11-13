import { GetStaticProps } from 'next';

import { useWebview } from '../../../../src/shared/hooks';

import Footer from '../../../../src/footer/components/m/Footer';
import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import { MEMBERS_META_INFO } from '../../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../../src/shared/constant';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import MembersContainer from '../../../../src/events/member-benefit/containers/shared/MembersContainer';
import MemberBenefitNav from '../../../../src/events/member-benefit/components/m/MemberBenefitNav';

const headerTitle = '컬리멤버스';

export default function MemberBenefitMembersPage() {
  const webview = useWebview();

  return (
    <>
      <PageMetaData
        title={MEMBERS_META_INFO.title}
        description={MEMBERS_META_INFO.description}
        url={MEMBER_BENEFIT_PATH.members.uri}
        keyword={MEMBERS_META_INFO.title}
      />

      <MobileNavigationBar title={headerTitle} leftButtonType="back" rightButtonTypes={['cart']} />

      <MemberBenefitNav />
      <MembersContainer />

      {!webview && <Footer />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
