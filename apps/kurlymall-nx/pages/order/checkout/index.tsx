import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../src/shared/store';
import { initCheckout, isShowCashReceiptSelector } from '../../../src/order/checkout/shared/reducers/checkout.slice';

import { useScreenName } from '../../../src/shared/hooks';

import BannerContainer from '../../../src/order/checkout/shared/containers/BannerContainer';
import ProductsContainer from '../../../src/order/checkout/pc/containers/ProductsContainer';
import OrdererContainer from '../../../src/order/checkout/pc/containers/OrdererContainer';
import ShippingContainer from '../../../src/order/checkout/pc/containers/ShippingContainer';
import PickupContainer from '../../../src/order/checkout/pc/containers/PickupContainer';
import PackagingMethodContainer from '../../../src/order/checkout/pc/containers/PackagingMethodContainer';
import CouponsContainer from '../../../src/order/checkout/pc/containers/CouponsContainer';
import PointContainer from '../../../src/order/checkout/pc/containers/PointContainer';

import PaymentMethodsContainer from '../../../src/order/checkout/pc/containers/PaymentMethodsContainer';
import DeliveryNoticeContainer from '../../../src/order/checkout/pc/containers/DeliveryNoticeContainer';
import TermsContainer from '../../../src/order/checkout/pc/containers/TermsContainer';
import CheckoutContainer from '../../../src/order/checkout/pc/containers/CheckoutContainer';
import PriceContainer from '../../../src/order/checkout/pc/containers/PriceContainer';
import CashReceiptContainer from '../../../src/order/checkout/pc/containers/CashReceiptContainer';
import KurlyCardContainer from '../../../src/order/checkout/pc/containers/KurlyCardContainer';

import SubPageLayout from '../../../src/shared/components/layouts/SubPageLayout';
import PaymentsLoading from '../../../src/order/checkout/shared/components/PaymentsLoading';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';

import { Title } from '../../../src/order/checkout/pc/components/Title';

import { ScreenName } from '../../../src/shared/amplitude';
import { availablePLCCPointSelector } from '../../../src/order/checkout/shared/reducers/checkout-payment.slice';
import usePlccCallback from '../../../src/order/checkout/shared/hooks/usePlccCallbackEvent';
import useOrderRefreshCallback from '../../../src/order/shared/shared/hooks/useOrderRefreshCallback';
import { useCheckoutProductQuery } from '../../../src/order/checkout/shared/hooks/queries';
import { useSticky } from '../../../src/order/cart/hooks/useSticky';
import PersonalCustomsCodeContainer from '../../../src/order/checkout/pc/containers/PersonalCustomsCodeContainer';
import useOrderType from '../../../src/order/shared/shared/hooks/useOrderType';

const Wrapper = styled.div`
  letter-spacing: -0.5px;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  width: 742px;
  > div:first-of-type {
    margin-top: 60px;
  }
`;

const ActualPriceContainer = styled.div`
  position: relative;
  width: 284px;
`;

const ScrollWrapper = styled.div<{ sticky: boolean }>`
  position: absolute;
  width: 284px;
  top: 0;
  ${({ sticky }) =>
    sticky &&
    `
    position: sticky;
    top: 60px;
  `};
`;

const styles = {
  layout: {
    '> div': {
      paddingTop: '50px',
    },
    h2: {
      fontWeight: 500,
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.5px',
    },
  },
};

declare global {
  interface Window {
    ORDER_REFRESH_CALLBACK?: (status: string) => void;
  }
}

export default function OrderPage() {
  const dispatch = useDispatch();

  usePlccCallback();
  useOrderRefreshCallback();
  useScreenName(ScreenName.ORDER_SHEET);
  useOrderType();

  useCheckoutProductQuery();

  const availablePLCCPoint = useAppSelector(availablePLCCPointSelector);
  const isShowCashReceipt = useAppSelector(isShowCashReceiptSelector);

  const { isPickupOrder, isGiftCardOrder, hasNonDeliveryProduct, viewPackage, hasInternationalDirectProduct } =
    useAppSelector(({ checkout }) => ({
      isPickupOrder: checkout.isPickupOrder,
      isGiftCardOrder: checkout.isGiftCardOrder,
      hasNonDeliveryProduct: checkout.hasNonDeliveryProduct,
      viewPackage: checkout.reusablePackage.viewPackage,
      hasInternationalDirectProduct: checkout.hasInternationalDirectProduct,
    }));

  const isPaymentsLoading = useAppSelector(({ payments }) => payments.isPaymentsLoading);

  const { sticky, thresholdRef } = useSticky({
    rootMarginTop: -57,
  });

  useEffect(() => {
    return () => {
      dispatch(initCheckout());
    };
  }, [dispatch]);

  useEffect(() => {
    // 주문서 페이지로 리다이렉트시 토스페이먼츠 Iframe이 있으면 삭제합니다.
    document.querySelectorAll('#_lguplus_popup_').forEach((iframe) => iframe.remove());
  }, []);

  return (
    <SubPageLayout title="주문서" css={styles.layout}>
      <Wrapper>
        <AuthContainer loginRequired>
          {isPaymentsLoading && <PaymentsLoading />}
          <ProductsContainer />
          <Title title="주문자 정보" />
          <OrdererContainer />
          <ShippingContainer />
          {hasInternationalDirectProduct && <PersonalCustomsCodeContainer />}
          {isPickupOrder && <PickupContainer />}
          {viewPackage && !isGiftCardOrder && (
            <>
              <PackagingMethodContainer />
              <BannerContainer device="pc" />
            </>
          )}
          <div ref={thresholdRef} />
          <PaymentWrapper>
            <InnerContainer>
              <Title title="쿠폰" />
              <CouponsContainer />
              {availablePLCCPoint && !isGiftCardOrder && (
                <>
                  <Title title="컬리카드 혜택" />
                  <KurlyCardContainer />
                </>
              )}
              <PointContainer />
              <PaymentMethodsContainer />
              {isShowCashReceipt && <CashReceiptContainer />}
              <TermsContainer />
              <CheckoutContainer />
            </InnerContainer>
            <ActualPriceContainer>
              <ScrollWrapper sticky={sticky}>
                <PriceContainer />
                {!hasNonDeliveryProduct && <DeliveryNoticeContainer />}
              </ScrollWrapper>
            </ActualPriceContainer>
          </PaymentWrapper>
        </AuthContainer>
      </Wrapper>
    </SubPageLayout>
  );
}
