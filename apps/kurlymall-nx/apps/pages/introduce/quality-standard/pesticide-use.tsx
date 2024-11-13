import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import PesticideUseContainer from '../../../src/introduce/containers/pc/PesticideUseContainer';

export default function PesticideUsePage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.pesticideUse.name}>
        <PesticideUseContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
