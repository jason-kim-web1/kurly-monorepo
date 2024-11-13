import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { isUndefined } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

import { useAppSelector } from '../../../../src/shared/store';
import {
  initCheckout,
  isShowCashReceiptSelector,
  saveDeviceId,
} from '../../../../src/order/checkout/shared/reducers/checkout.slice';

import ProductsContainer from '../../../../src/order/checkout/m/containers/ProductsContainer';
import OrdererContainer from '../../../../src/order/checkout/m/containers/OrdererContainer';
import PackagingMethodContainer from '../../../../src/order/checkout/m/containers/PackagingMethodContainer';
import PaymentMethodsContainer from '../../../../src/order/shared/m/containers/PaymentMethodsContainer';
import CouponsContainer from '../../../../src/order/checkout/m/containers/CouponsContainer';
import PointContainer from '../../../../src/order/checkout/m/containers/PointContainer';
import BannerContainer from '../../../../src/order/checkout/shared/containers/BannerContainer';
import CheckoutContainer from '../../../../src/order/checkout/m/containers/CheckoutContainer';
import DeliveryNoticeContainer from '../../../../src/order/checkout/m/containers/DeliveryNoticeContainer';
import TermsContainer from '../../../../src/order/checkout/m/containers/TermsContainer';
import PriceContainer from '../../../../src/order/checkout/m/containers/PriceContainer';
import PickupContainer from '../../../../src/order/checkout/m/containers/PickupContainer';
import KurlyCardContainer from '../../../../src/order/checkout/m/containers/KurlyCardContainer';

import PaymentsLoading from '../../../../src/order/checkout/shared/components/PaymentsLoading';

import ShippingContainer from '../../../../src/order/checkout/m/containers/ShippingContainer';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import GiftContainer from '../../../../src/order/gift/m/containers/GiftContainer';
import DeliveryRequestContainer from '../../../../src/order/checkout/m/containers/DeliveryRequestContainer';

import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../../src/shared/amplitude';
import { OrderCreationSuccess } from '../../../../src/shared/amplitude/events';

import {
  WebviewServerSidePropsWithDeviceId,
  getWebviewServerSidePropsWithRefreshToken,
} from '../../../../src/server/webview';
import CashReceiptContainer from '../../../../src/order/checkout/m/containers/CashReceiptContainer';
import usePlccCallback from '../../../../src/order/checkout/shared/hooks/usePlccCallbackEvent';
import useOrderRefreshCallback from '../../../../src/order/shared/shared/hooks/useOrderRefreshCallback';
import { availablePLCCPointSelector } from '../../../../src/order/checkout/shared/reducers/checkout-payment.slice';
import { useCheckoutProductQuery } from '../../../../src/order/checkout/shared/hooks/queries';
import useMembershipRefreshCallback from '../../../../src/order/shared/shared/hooks/useMembershipRefreshCallback';
import { BUTTON_TYPE } from '../../../../src/shared/services';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';
import { useAppToken } from '../../../../src/shared/hooks/useAppToken';
import useOrderType from '../../../../src/order/shared/shared/hooks/useOrderType';
import PersonalCustomsCodeContainer from '../../../../src/order/checkout/m/containers/PersonalCustomsCodeContainer';

declare global {
  interface Window {
    ORDER_REFRESH_CALLBACK?: (status: string) => void;
    MEMBERSHIP_REFRESH_CALLBACK?: () => void;
  }
}

export default function OrderPage({ accessToken, deviceId }: WebviewServerSidePropsWithDeviceId) {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const { appToken, isReady } = useAppToken({ accessToken });

  useScreenName(ScreenName.ORDER_SHEET);
  usePlccCallback();
  useOrderRefreshCallback();

  const { isMembershipLoading } = useMembershipRefreshCallback();
  const { isGiftOrder } = useOrderType();

  useCheckoutProductQuery();

  const webview = useWebview();
  const availablePLCCPoint = useAppSelector(availablePLCCPointSelector);
  const isShowCashReceipt = useAppSelector(isShowCashReceiptSelector);

  const {
    isGiftCardOrder,
    isPickupOrder,
    hasNonDeliveryProduct,
    viewPackage,
    isDirectCheckout,
    hasInternationalDirectProduct,
  } = useAppSelector(({ checkout }) => ({
    isGiftCardOrder: checkout.isGiftCardOrder,
    isPickupOrder: checkout.isPickupOrder,
    hasNonDeliveryProduct: checkout.hasNonDeliveryProduct,
    viewPackage: checkout.reusablePackage.viewPackage,
    isDirectCheckout: checkout.isDirectCheckout,
    hasInternationalDirectProduct: checkout.hasInternationalDirectProduct,
  }));

  const isPaymentsLoading = useAppSelector(({ payments }) => payments.isPaymentsLoading);

  useEffect(() => {
    return () => {
      dispatch(initCheckout());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isUndefined(isDirectCheckout)) {
      return;
    }

    // 웹뷰일 경우 referrer_event를 쿼리스트링으로 넘겨줌(바로구매일 경우에만)
    if (webview && isDirectCheckout) {
      const { referrer_event: referrerEvent } = query as ParsedUrlQuery & { referrer_event: string };
      amplitudeService.setWebviewReferrerEvent(referrerEvent);
    }

    amplitudeService.logEvent(
      new OrderCreationSuccess({
        isGiftPurchase: false,
        isDirectCheckout,
        ...(webview &&
          isDirectCheckout &&
          amplitudeService.getWebviewReferrerEvent() && { referrerEvent: amplitudeService.getWebviewReferrerEvent() }),
      }),
    );
  }, [webview, query, isDirectCheckout]);

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
      <MobileNavigationBar title="주문서" leftButtonType={BUTTON_TYPE.back} />
      <AuthContainer loginRequired appToken={appToken}>
        {(isPaymentsLoading || isMembershipLoading) && <PaymentsLoading />}
        <ProductsContainer isGiftOrder={isGiftOrder} />
        <OrdererContainer isGiftOrder={isGiftOrder} />
        {!isGiftOrder && (
          <>
            <ShippingContainer />
            <DeliveryRequestContainer />
          </>
        )}
        {hasInternationalDirectProduct && <PersonalCustomsCodeContainer />}
        {isPickupOrder && <PickupContainer />}
        {isGiftOrder && <GiftContainer />}
        {viewPackage && !isGiftOrder && !isGiftCardOrder && (
          <>
            <PackagingMethodContainer />
            <BannerContainer device="mobile" />
          </>
        )}
        <CouponsContainer />
        {availablePLCCPoint && !isGiftCardOrder && <KurlyCardContainer />}
        <PointContainer />
        <PaymentMethodsContainer />
        {isShowCashReceipt && <CashReceiptContainer />}
        <PriceContainer />
        {!hasNonDeliveryProduct && <DeliveryNoticeContainer />}
        <TermsContainer />
        <CheckoutContainer />
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
