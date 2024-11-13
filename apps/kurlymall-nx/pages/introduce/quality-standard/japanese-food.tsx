import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import JapaneseFoodContainer from '../../../src/introduce/containers/pc/JapaneseFoodContainer';

export default function JapaneseFoodPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.qualityStandard.name} subMenu={INTRODUCE_PATH.japaneseFood.name}>
        <JapaneseFoodContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
