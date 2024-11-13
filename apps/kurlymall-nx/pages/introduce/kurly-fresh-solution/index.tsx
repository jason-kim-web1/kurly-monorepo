import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import KurlyFreshSolutionContainer from '../../../src/introduce/containers/pc/KurlyFreshSolutionContainer';

export default function KurlyFreshSolutionPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.kurlyFreshSolution.name}>
        <KurlyFreshSolutionContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
