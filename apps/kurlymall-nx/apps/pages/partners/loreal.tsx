import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';

import PageContentContainer from '../../src/partners/loreal/containers/PageContentContainer';

import { getPartnersLorealStaticProps } from '../../src/partners/loreal/pageProps';

const PartnersLorealPage = () => {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <PageContentContainer />
      <Footer />
    </>
  );
};

export const getStaticProps = getPartnersLorealStaticProps;

export default PartnersLorealPage;
