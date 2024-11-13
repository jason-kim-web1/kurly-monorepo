import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import PricePolicyContainer from '../../../src/introduce/containers/pc/PricePolicyContainer';

export default function PricePolicyPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.pricePolicy.name}>
        <PricePolicyContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
