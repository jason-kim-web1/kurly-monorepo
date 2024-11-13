import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import JointGrowthContainer from '../../../src/introduce/containers/pc/JointGrowthContainer';

export default function JointGrowthPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.sustainableDistribution.name} subMenu={INTRODUCE_PATH.jointGrowth.name}>
        <JointGrowthContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
