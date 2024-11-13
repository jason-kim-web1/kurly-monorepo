import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import SpecialProductContainer from '../../../src/introduce/containers/pc/SpecialProductContainer';

export default function SpecialProductPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.specialProduct.name}>
        <SpecialProductContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
