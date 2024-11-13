import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import PackagingMaterialsContainer from '../../../src/introduce/containers/pc/PackagingMaterialsContainer';

export default function PackagingMaterialsPage() {
  return (
    <>
      <Header />
      <IntroduceLayout
        menu={INTRODUCE_PATH.sustainableDistribution.name}
        subMenu={INTRODUCE_PATH.packagingMaterials.name}
      >
        <PackagingMaterialsContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
