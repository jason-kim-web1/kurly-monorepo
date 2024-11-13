import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import MobileNavigationBar from '../../../../../src/header/containers/m/MobileNavigationBar';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';

import JoinOrderInformation from '../../../../../src/order/join/components/JoinOrderInformation';
import ProductsContainer from '../../../../../src/order/checkout/m/containers/ProductsContainer';
import OrdererContainer from '../../../../../src/order/checkout/m/containers/OrdererContainer';
import ShippingContainer from '../../../../../src/order/checkout/m/containers/ShippingContainer';
import DeliveryRequestContainer from '../../../../../src/order/checkout/m/containers/DeliveryRequestContainer';
import PackagingMethodContainer from '../../../../../src/order/checkout/m/containers/PackagingMethodContainer';
import BannerContainer from '../../../../../src/order/checkout/shared/containers/BannerContainer';
import CouponsContainer from '../../../../../src/order/checkout/m/containers/CouponsContainer';
import PointContainer from '../../../../../src/order/checkout/m/containers/PointContainer';
import PriceContainer from '../../../../../src/order/checkout/m/containers/PriceContainer';
import PaymentMethodsContainer from '../../../../../src/order/shared/m/containers/PaymentMethodsContainer';
import CashReceiptContainer from '../../../../../src/order/checkout/m/containers/CashReceiptContainer';
import TermsContainer from '../../../../../src/order/checkout/m/containers/TermsContainer';
import CheckoutContainer from '../../../../../src/order/checkout/m/containers/CheckoutContainer';
import PaymentsLoading from '../../../../../src/order/checkout/shared/components/PaymentsLoading';

import { useAppSelector } from '../../../../../src/shared/store';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import { useCheckoutProductQuery } from '../../../../../src/order/checkout/shared/hooks/queries';

import {
  initCheckout,
  isShowCashReceiptSelector,
  saveDeviceId,
} from '../../../../../src/order/checkout/shared/reducers/checkout.slice';

import {
  getWebviewServerSidePropsWithRefreshToken,
  WebviewServerSidePropsWithDeviceId,
} from '../../../../../src/server/webview';

import usePlccCallback from '../../../../../src/order/checkout/shared/hooks/usePlccCallbackEvent';
import useOrderRefreshCallback from '../../../../../src/order/shared/shared/hooks/useOrderRefreshCallback';

import { BUTTON_TYPE } from '../../../../../src/shared/services';
import useMembershipRefreshCallback from '../../../../../src/order/shared/shared/hooks/useMembershipRefreshCallback';
import useOrderType from '../../../../../src/order/shared/shared/hooks/useOrderType';

declare global {
  interface Window {
    ORDER_REFRESH_CALLBACK?: (status: string) => void;
  }
}

export default function JoinOrderPage({ accessToken, deviceId }: WebviewServerSidePropsWithDeviceId) {
  const { appToken, isReady } = useAppToken({ accessToken });

  const dispatch = useDispatch();

  usePlccCallback();
  useOrderRefreshCallback();
  useMembershipRefreshCallback();
  useOrderType();

  useCheckoutProductQuery();

  const { isPaymentsLoading, viewPackage } = useAppSelector(({ checkout, payments }) => ({
    isPaymentsLoading: payments.isPaymentsLoading,
    viewPackage: checkout.reusablePackage.viewPackage,
  }));

  const isShowCashReceipt = useAppSelector(isShowCashReceiptSelector);

  useEffect(() => {
    return () => {
      dispatch(initCheckout());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deviceId) {
      dispatch(saveDeviceId(deviceId));
    }
  }, [dispatch, deviceId]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar title="함께구매 주문서" leftButtonType={BUTTON_TYPE.back} />
      <AuthContainer loginRequired appToken={appToken}>
        {isPaymentsLoading && <PaymentsLoading />}
        {/* 함께구매 모집 안내문구 */}
        <JoinOrderInformation />
        {/* 주문 상품 */}
        <ProductsContainer />
        {/* 주문자 정보 */}
        <OrdererContainer />
        {/* 배송지 */}
        <ShippingContainer />
        {/* 배송 요청사항 */}
        <DeliveryRequestContainer />
        {/* 포장 방법 */}
        {viewPackage && (
          <>
            <PackagingMethodContainer />
            <BannerContainer device="mobile" />
          </>
        )}
        {/* 쿠폰 */}
        <CouponsContainer />
        {/* 적립금 */}
        <PointContainer />
        {/* 결제수단 */}
        <PaymentMethodsContainer />
        {/* 현금영수증 */}
        {isShowCashReceipt && <CashReceiptContainer />}
        {/* 결제금액 */}
        <PriceContainer />
        {/* 이용약관 */}
        <TermsContainer />
        {/* 결제하기 버튼 */}
        <CheckoutContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
