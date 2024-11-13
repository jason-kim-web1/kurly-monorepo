import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';
import OrderList from '../../../src/order/order-list/components/OrderList';

export default function MypageOrderPage() {
  useScreenName(ScreenName.ORDER_HISTORY);

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout title="주문 내역" hasPadding={false}>
          <OrderList />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
