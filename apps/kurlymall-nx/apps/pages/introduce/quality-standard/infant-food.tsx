import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import InfantFoodContainer from '../../../src/introduce/containers/pc/InfantFoodContainer';

export default function InfantFoodPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.infantFood.name}>
        <InfantFoodContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
