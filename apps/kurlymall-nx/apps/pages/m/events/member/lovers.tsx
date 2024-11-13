import { GetStaticProps } from 'next';

import { useWebview } from '../../../../src/shared/hooks';

import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import Footer from '../../../../src/footer/components/m/Footer';
import LoversContainer from '../../../../src/events/member-benefit/containers/m/LoversContainer';
import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import { LOVERS_META_INFO } from '../../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../../src/shared/constant';
import { DEFAULT_KEYWORDS } from '../../../../src/shared/constant/page-meta';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../src/shared/services';

const headerTitle = '회원혜택';

export default function MemberBenefitLoversPage() {
  const webview = useWebview();

  return (
    <>
      <PageMetaData
        title={LOVERS_META_INFO.title}
        description={LOVERS_META_INFO.description}
        image={LOVERS_META_INFO.image}
        url={MEMBER_BENEFIT_PATH.lovers.uri}
        keyword={DEFAULT_KEYWORDS}
      />

      <MobileNavigationBar title={headerTitle} leftButtonType={BUTTON_TYPE.back} rightButtonTypes={['cart']} />

      <LoversContainer />

      {!webview && (
        <>
          <Footer />
          <UserMenu />
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
