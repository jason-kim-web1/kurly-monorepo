import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import SafetyHygieneContainer from '../../../src/introduce/containers/pc/SafetyHygieneContainer';

export default function SafetyHygienePage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.safetyHygiene.name}>
        <SafetyHygieneContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
