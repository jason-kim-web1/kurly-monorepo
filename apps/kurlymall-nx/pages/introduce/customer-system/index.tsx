import { INTRODUCE_PATH } from '../../../src/shared/constant';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import IntroduceLayout from '../../../src/introduce/containers/pc/IntroduceLayout';
import CustomerSystemContainer from '../../../src/introduce/containers/pc/CustomerSystemContainer';

export default function CustomerSystemPage() {
  return (
    <>
      <Header />
      <IntroduceLayout menu={INTRODUCE_PATH.customerSystem.name}>
        <CustomerSystemContainer />
      </IntroduceLayout>
      <Footer />
    </>
  );
}
