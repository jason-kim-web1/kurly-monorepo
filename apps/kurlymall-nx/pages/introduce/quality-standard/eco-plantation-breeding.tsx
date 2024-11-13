import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import { INTRODUCE_PATH } from '../../../src/shared/constant';
import EcoPlantationBreedingContainer from '../../../src/introduce/containers/pc/EcoPlantationBreedingContainer';

export default function EcoPlantationBreedingPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.ecoPlantationBreeding.name}>
        <EcoPlantationBreedingContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
