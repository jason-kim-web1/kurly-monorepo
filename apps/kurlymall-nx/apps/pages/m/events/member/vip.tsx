import { useWebview } from '../../../../src/shared/hooks';

import Footer from '../../../../src/footer/components/m/Footer';
import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import { VIP_META_INFO } from '../../../../src/events/member-benefit/constants';
import { MEMBER_BENEFIT_PATH } from '../../../../src/shared/constant';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import MemberBenefitNav from '../../../../src/events/member-benefit/components/m/MemberBenefitNav';
import VipContainer from '../../../../src/events/member-benefit/containers/shared/VipContainer';

import useVipBadgeRead from '../../../../src/events/member-benefit/hooks/useVipBadgeRead';
import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../src/server/webview';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';

const headerTitle = 'VIP 제도';

export default function MemberBenefitVipPage({ accessToken }: WebviewServerSideProps) {
  useVipBadgeRead();

  const webview = useWebview();

  const { appToken } = useAppToken({ accessToken });

  return (
    <>
      <PageMetaData
        title={VIP_META_INFO.title}
        description={VIP_META_INFO.description}
        url={MEMBER_BENEFIT_PATH.vip.uri}
        keyword={VIP_META_INFO.title}
      />

      <MobileNavigationBar title={headerTitle} leftButtonType="back" rightButtonTypes={['cart']} />

      <AuthContainer appToken={appToken}>
        <MemberBenefitNav />
        <VipContainer />
      </AuthContainer>

      {!webview && <Footer />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
