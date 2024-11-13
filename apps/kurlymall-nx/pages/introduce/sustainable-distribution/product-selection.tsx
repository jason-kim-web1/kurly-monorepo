import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import { INTRODUCE_PATH } from '../../../src/shared/constant';
import ProductSelectionContainer from '../../../src/introduce/containers/pc/ProductSelectionContainer';

export default function ProductSelectionPage() {
  return (
    <>
      <Header />
      <IntroduceLayout
        menu={INTRODUCE_PATH.sustainableDistribution.name}
        subMenu={INTRODUCE_PATH.productSelection.name}
      >
        <ProductSelectionContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
