import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import PlccEventContainer from '../../../src/events/plcc/pc/containers/PlccEventContainer';

export default function EventPLCCPage() {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <PlccEventContainer />
      <Footer />
    </>
  );
}
