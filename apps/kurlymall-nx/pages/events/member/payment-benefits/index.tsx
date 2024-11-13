import Header from '../../../../src/header/components/Header';
import Footer from '../../../../src/footer/components/Footer';
import MainSiteProvider from '../../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../../src/shared/components/Scroll/ScrollEventTopButton';
import LayoutContainer from '../../../../src/events/member-benefit/containers/pc/LayoutContainer';

import PaymentDefaultContainer from '../../../../src/events/member-benefit/containers/shared/PaymentDefaultContainer';

export default function MemberPaymentDefaultPage() {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <LayoutContainer>
          <PaymentDefaultContainer />
        </LayoutContainer>
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
