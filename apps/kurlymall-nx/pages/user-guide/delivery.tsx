import Header from '../../src/header/components/Header';
import Footer from '../../src/footer/components/Footer';
import DeliveryGuide from '../../src/user-guide/delivery/components/pc/DeliveryGuide';
import ScrollEventTopButton from '../../src/shared/components/Scroll/ScrollEventTopButton';

export default function Delivery() {
  return (
    <>
      <Header />
      <ScrollEventTopButton>
        <DeliveryGuide />
      </ScrollEventTopButton>
      <Footer />
    </>
  );
}
