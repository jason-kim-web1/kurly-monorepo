import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import AreaProducerContainer from '../../../src/introduce/containers/pc/AreaProducerContainer';

export default function AreaProducerPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.areaProducer.name}>
        <AreaProducerContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
