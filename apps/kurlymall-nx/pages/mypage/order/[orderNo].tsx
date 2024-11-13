import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import Header from '../../../src/header/components/Header';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import MypageLayout from '../../../src/mypage/common/Layout';
import Footer from '../../../src/footer/components/Footer';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import BlankFallback from '../../../src/shared/components/Fallback/BlankFallback';
import OrderDetail from '../../../src/order/order-detail/components/OrderDetail';

export default function MypageOrderDetailPage() {
  useScreenName(ScreenName.ORDER_SHEET_DETAIL);

  const router = useRouter();

  const { orderNo } = router.query as ParsedUrlQuery & { orderNo: string };

  return (
    <>
      <Header />
      <AuthContainer loginRequired fallback={<BlankFallback />}>
        <MypageLayout hasPadding={false} hasBackgroundColor={false}>
          <OrderDetail groupOrderNo={Number(orderNo)} />
        </MypageLayout>
      </AuthContainer>
      <Footer />
    </>
  );
}
