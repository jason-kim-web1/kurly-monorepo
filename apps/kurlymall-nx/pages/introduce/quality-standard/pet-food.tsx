import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import PetFoodContainer from '../../../src/introduce/containers/pc/PetFoodContainer';

export default function PetFoodPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.petFood.name}>
        <PetFoodContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
