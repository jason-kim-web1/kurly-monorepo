import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import {
  loadCheckoutPaymentMethods,
  selectKurlyPay,
  selectSimplePay,
  selectVendor,
} from '../../../checkout/shared/reducers/checkout-payment.slice';
import usePaymentMethods from '../../shared/hooks/usePaymentMethods';
import { OrderVendorCode } from '../../shared/interfaces';

import CreditCardContainer from '../../../checkout/m/containers/CreditCardContainer';
import SimplePaymentMethods from '../components/SimplePaymentMethods';
import VendorSummary from '../../shared/components/VendorSummary';
import Collapse from '../../../../shared/components/Collapse/Collapse';
import PaymentMethodButtons from '../components/PaymentMethodButtons';
import KakaoPayText from '../../../checkout/m/components/KakaoPayText';
import Events from '../components/Events';
import EventIcon from '../../../../shared/components/icons/EventIcon';

import useToggle from '../../../checkout/shared/hooks/useToggle';
import { isCreditCardPayments, isKurlypayPayments } from '../../shared/services';
import { Divider } from '../../../../shared/components/Divider/Divider';
import KurlypayErrorMessage from '../../shared/components/KurlypayErrorMessage';
import KurlypayButton from '../../../checkout/m/components/Kurlypay/KurlypayButton';
import { PaymentDescription } from '../../../checkout/shared/components/PaymentDescription';
import { CheckoutType } from '../../../../shared/interfaces';
import usePreviousVendor from '../../../checkout/shared/hooks/usePreviousVendor';
import { KurlyMembersKurlyPayBanner } from '../../../checkout/shared/components/KurlyMembersKurlyPayBanner';

const EventSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 20px 20px;
`;

const Summary = styled.span`
  margin-left: 8px;
  font-size: 12px;
  line-height: 17px;
`;

const Content = styled.div`
  padding: 7px 20px 20px;
`;

export default function PaymentMethodsContainer() {
  const dispatch = useDispatch();

  const {
    checkoutType,
    isUseAllPoint,
    isUsePaidPoint,
    products,
    price: { paymentPrice },
  } = useAppSelector(({ checkout }) => ({
    checkoutType: checkout.checkoutType,
    isUseAllPoint: checkout.isUseAllPoint,
    isUsePaidPoint: checkout.isUsePaidPoint,
    products: checkout.products,
    price: checkout.price,
  }));

  const isSubscribed = useAppSelector(({ member }) => member.subscription.isSubscribed);

  const { event, selectedVendor, simplePaymentVendors, kurlypayVendors, hasKurlypayError, disableVendorCodes } =
    useAppSelector(({ checkoutPayment }) => checkoutPayment);

  const { toggleWithAmplitude, isOpen } = useToggle(true);

  const { hasSimplePayEvent, kakaoPayCouponSelected, filteredSummaryEvents } = usePaymentMethods();
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

  const eventSummary = filteredSummaryEvents.map(({ vendorName }) => vendorName).join(' / ');

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
      <Collapse
        title={'결제수단'}
        summary={<VendorSummary />}
        opened={isOpen}
        isSummaryKeepOpen
        onClick={() => toggleWithAmplitude('결제 수단')}
      >
        <Content>
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
            </>
          )}
          <PaymentDescription checkoutType={checkoutType} />
          {selectedVendor?.isSimplePay && (
            <SimplePaymentMethods
              selectedVendor={selectedVendor}
              vendors={simplePaymentVendors}
              onClick={handleClickPaymentVendor}
            />
          )}
          {isCreditCardPayments(selectedVendor?.code) && <CreditCardContainer />}
          {hasKurlypayError && <KurlypayErrorMessage />}
          {isShowMemebersBanner && <KurlyMembersKurlyPayBanner />}
          <Events />
        </Content>
      </Collapse>
      {!isOpen && eventSummary && (
        <EventSummary>
          <EventIcon />
          <Summary>
            <strong>{eventSummary}</strong> 결제시 할인 이벤트
          </Summary>
        </EventSummary>
      )}
      <Divider />
    </div>
  );
}
