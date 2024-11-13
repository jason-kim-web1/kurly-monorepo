import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import { INTRODUCE_PATH } from '../../../src/shared/constant';
import SustainableDistributionContainer from '../../../src/introduce/containers/pc/SustainableDistributionContainer';

export default function SustainableDistributionPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.sustainableDistribution.name}>
        <SustainableDistributionContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
