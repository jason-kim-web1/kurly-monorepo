import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import { INTRODUCE_PATH } from '../../../src/shared/constant';
import EcoOrganicContainer from '../../../src/introduce/containers/pc/EcoOrganicContainer';

export default function EcoOrganicPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.ecoOrganic.name}>
        <EcoOrganicContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
