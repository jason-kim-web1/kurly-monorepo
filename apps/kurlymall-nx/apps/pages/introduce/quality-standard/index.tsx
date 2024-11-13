import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import QualityStandardContainer from '../../../src/introduce/containers/pc/QualityStandardContainer';

export default function qualityStandardPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name}>
        <QualityStandardContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
