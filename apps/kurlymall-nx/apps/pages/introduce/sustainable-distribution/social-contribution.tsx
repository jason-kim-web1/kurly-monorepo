import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import { INTRODUCE_PATH } from '../../../src/shared/constant';
import SocialContributionContainer from '../../../src/introduce/containers/pc/SocialContributionContainer';

export default function SocialContributionPage() {
  return (
    <>
      <Header />
      <IntroduceLayout
        menu={INTRODUCE_PATH.sustainableDistribution.name}
        subMenu={INTRODUCE_PATH.socialContribution.name}
      >
        <SocialContributionContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
