import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import GmoFoodContainer from '../../../src/introduce/containers/pc/GmoFoodContainer';

export default function GmoFoodPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.gmoFood.name}>
        <GmoFoodContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
