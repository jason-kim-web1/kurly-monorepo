import Footer from '../../../../../src/footer/components/m/Footer';
import MobileNavigationBar from '../../../../../src/header/containers/m/MobileNavigationBar';
import MemberBenefitNav from '../../../../../src/events/member-benefit/components/m/MemberBenefitNav';

import { getWebviewServerSideProps, WebviewServerSideProps } from '../../../../../src/server/webview';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import { useWebview } from '../../../../../src/shared/hooks';
import PaymentBenefitsContainer from '../../../../../src/events/member-benefit/containers/shared/PaymentBenefitsContainer';
import { MEMBER_BENEFIT_PATH } from '../../../../../src/shared/constant';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';

export default function MemberPaymentBenefitsPage({ accessToken }: WebviewServerSideProps) {
  const webview = useWebview();

  const { appToken } = useAppToken({ accessToken });

  return (
    <>
      <MobileNavigationBar title={MEMBER_BENEFIT_PATH.payment.name} leftButtonType="back" rightButtonTypes={['cart']} />

      <AuthContainer appToken={appToken}>
        <MemberBenefitNav />
        <PaymentBenefitsContainer />
      </AuthContainer>

      {!webview && <Footer />}
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
