import { INTRODUCE_PATH } from '../../src/shared/constant';

import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import IntroduceLayout from '../../src/introduce/containers/pc/IntroduceLayout';
import AboutKurlyContainer from '../../src/introduce/containers/pc/AboutKurlyContainer';

export default function IntroducePage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.introduce.name}>
        <AboutKurlyContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
