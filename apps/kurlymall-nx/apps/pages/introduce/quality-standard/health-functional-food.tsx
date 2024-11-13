import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import HealthFunctionalFoodContainer from '../../../src/introduce/containers/pc/HealthFunctionalFoodContainer';

export default function HealthFunctionalFoodPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.healthFunctionalFood.name}>
        <HealthFunctionalFoodContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
