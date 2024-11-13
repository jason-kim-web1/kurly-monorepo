import Header from '../../../../src/header/components/Header';
import Footer from '../../../../src/footer/components/Footer';
import MainSiteProvider from '../../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../../src/shared/components/Scroll/ScrollEventTopButton';
import LayoutContainer from '../../../../src/events/member-benefit/containers/pc/LayoutContainer';

import PaymentBenefitsContainer from '../../../../src/events/member-benefit/containers/shared/PaymentBenefitsContainer';

export default function MemberPaymentBenefitsPage() {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <LayoutContainer>
          <PaymentBenefitsContainer />
        </LayoutContainer>
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
