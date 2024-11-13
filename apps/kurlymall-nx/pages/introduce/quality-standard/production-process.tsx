import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import ProductionProcessContainer from '../../../src/introduce/containers/pc/ProductionProcessContainer';

export default function ProductionProcessPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.productionProcess.name}>
        <ProductionProcessContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
