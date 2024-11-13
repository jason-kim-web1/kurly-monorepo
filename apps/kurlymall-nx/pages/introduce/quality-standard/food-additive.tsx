import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import FoodAdditiveContainer from '../../../src/introduce/containers/pc/FoodAdditiveContainer';

export default function FoodAdditivePage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.foodAdditive.name}>
        <FoodAdditiveContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
