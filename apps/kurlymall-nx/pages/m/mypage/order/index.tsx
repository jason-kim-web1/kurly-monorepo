import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../src/server/webview';
import OrderList from '../../../../src/order/order-list/components/OrderList';
import TopBar, { BUTTON_TYPE } from '../../../../src/shared/components/KPDS/TopBar';
import { isWebview } from '../../../../util/window/getDevice';

export default function MypageOrderPage({ accessToken }: WebviewServerSideProps) {
  useScreenName(ScreenName.ORDER_HISTORY);
  const leftButton = !isWebview() ? BUTTON_TYPE.back : undefined;

  return (
    <>
      <TopBar type={leftButton} IconTypes={['cart']}>
        주문 내역
      </TopBar>
      <AuthContainer appToken={accessToken} loginRequired>
        <OrderList />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
