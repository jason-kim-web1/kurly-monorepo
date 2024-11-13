import { GetStaticProps } from 'next';

import KurlypayContainer from '../../../src/events/kurlypay/pc/containers';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import Header from '../../../src/header/components/Header';

import Footer from '../../../src/footer/components/Footer';

export default function KurlyPayEventPage() {
  return (
    <>
      <MainSiteProvider site="MARKET">
        <Header />
      </MainSiteProvider>
      <KurlypayContainer />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
