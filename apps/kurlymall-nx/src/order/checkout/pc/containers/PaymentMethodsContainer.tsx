import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';

import {
  loadCheckoutPaymentMethods,
  selectKurlyPay,
  selectSimplePay,
  selectVendor,
} from '../../../checkout/shared/reducers/checkout-payment.slice';
import usePaymentMethods from '../../../shared/shared/hooks/usePaymentMethods';

import { isCreditCardPayments, isKurlypayPayments } from '../../../shared/shared/services';
import { OrderVendorCode } from '../../../shared/shared/interfaces/OrderVendorCode.interface';
import COLOR from '../../../../shared/constant/colorset';

import { Title } from '../components/Title';
import KurlypayErrorMessage from '../../../shared/shared/components/KurlypayErrorMessage';
import Events from '../../../shared/pc/components/Events';
import InformationRow from '../../../../shared/components/layouts/InformationRow';
import PaymentMethodButtons from '../../../shared/pc/components/PaymentMethodButtons';
import SimplePaymentMethods from '../../../shared/pc/components/SimplePaymentMethods';

import CreditCardContainer from './CreditCardContainer';
import KakaoPayText from '../components/KakaoPayText';
import KurlypayButton from '../components/Kurlypay/KurlypayButton';
import { PaymentDescription } from '../../shared/components/PaymentDescription';
import { CheckoutType } from '../../../../shared/interfaces';
import usePreviousVendor from '../../shared/hooks/usePreviousVendor';
import { KurlyMembersKurlyPayBanner } from '../../shared/components/KurlyMembersKurlyPayBanner';

const Container = styled.div`
  width: 414px;
`;

const PaymentNotice = styled.ul`
  margin-top: 20px;
  border-top: 1px solid ${COLOR.bg};
  padding-top: 20px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray600};
  li + li {
    padding-top: 4px;
  }
`;

function PaymentMethodsContainer() {
  const dispatch = useDispatch();
  const {
    isUseAllPoint,
    isUsePaidPoint,
    checkoutType,
    products,
    price: { paymentPrice },
  } = useAppSelector(({ checkout }) => ({
    isUseAllPoint: checkout.isUseAllPoint,
    isUsePaidPoint: checkout.isUsePaidPoint,
    checkoutType: checkout.checkoutType,
    products: checkout.products,
    price: checkout.price,
  }));

  const isSubscribed = useAppSelector(({ member }) => member.subscription.isSubscribed);

  const { event, selectedVendor, simplePaymentVendors, hasKurlypayError, kurlypayVendors, disableVendorCodes } =
    useAppSelector(({ checkoutPayment }) => checkoutPayment);

  const { hasSimplePayEvent, kakaoPayCouponSelected } = usePaymentMethods();
  usePreviousVendor();

  const handleClickPaymentVendor = (code: OrderVendorCode) => {
    dispatch(selectVendor(code));
  };

  const handleClickSimplePay = () => {
    dispatch(selectSimplePay());
  };

  useEffect(() => {
    if (checkoutType === CheckoutType.GIFT_CARD || (!isUseAllPoint && isUsePaidPoint)) {
      dispatch(selectKurlyPay(kurlypayVendors[0]));
    }
  }, [dispatch, checkoutType, isUsePaidPoint, kurlypayVendors]);

  useEffect(() => {
    if (!products) {
      return;
    }

    dispatch(loadCheckoutPaymentMethods());
  }, [dispatch, products]);

  if (paymentPrice === 0) {
    return null;
  }

  const isShowMemebersBanner = !isSubscribed && isKurlypayPayments(selectedVendor?.code);

  return (
    <div id={'payment-methods'}>
      <Title title="결제 수단" />
      <InformationRow title="결제수단 선택">
        <Container>
          {kakaoPayCouponSelected ? (
            <KakaoPayText hasEvent={!!selectedVendor?.hasEvent} />
          ) : (
            <>
              {checkoutType === CheckoutType.GIFT_CARD || (!isUseAllPoint && isUsePaidPoint) ? (
                <KurlypayButton
                  selectedVendor={selectedVendor}
                  event={event}
                  onClickPaymentVendor={handleClickPaymentVendor}
                />
              ) : (
                <PaymentMethodButtons
                  selectedVendor={selectedVendor}
                  event={event}
                  hasSimplePayEvent={hasSimplePayEvent}
                  onClickPaymentVendor={handleClickPaymentVendor}
                  onClickSimplePay={handleClickSimplePay}
                  disableVendor={disableVendorCodes}
                />
              )}
              {selectedVendor?.isSimplePay && (
                <SimplePaymentMethods
                  selectedVendor={selectedVendor}
                  vendors={simplePaymentVendors}
                  onClick={handleClickPaymentVendor}
                />
              )}
              {isCreditCardPayments(selectedVendor?.code) && <CreditCardContainer />}
              {hasKurlypayError && <KurlypayErrorMessage />}
            </>
          )}
          <PaymentDescription checkoutType={checkoutType} />
          {isShowMemebersBanner && <KurlyMembersKurlyPayBanner />}
          <Events />
        </Container>
      </InformationRow>
      <PaymentNotice>
        <li>※ 카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신 수단으로만 환불되는 점 양해부탁드립니다.</li>
        <li>
          ※ 고객님은 안전거래를 위해 현금 등으로 결제시 저희 쇼핑몰에서 가입한 토스 페이먼츠의 구매안전(에스크로)
          서비스를 이용하실 수 있습니다.
        </li>
      </PaymentNotice>
    </div>
  );
}

export default memo(PaymentMethodsContainer);
