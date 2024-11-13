import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import ScrollEventTopButton from '../../../src/shared/components/Scroll/ScrollEventTopButton';
import KurlyFreshTestReportContainer from '../../../src/events/kf365/containers/pc/KurlyFreshTestReportContainer';

export default function KurlyFreshPage() {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <ScrollEventTopButton>
        <KurlyFreshTestReportContainer />
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
