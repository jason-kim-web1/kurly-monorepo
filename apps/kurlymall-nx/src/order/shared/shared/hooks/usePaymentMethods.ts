import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';

import { PaymentEvent } from '../interfaces';
import { vendorStyles } from '../constants/vendor-styles';
import { isCreditCardPayments } from '../services';
import { EASY_KURLYPAY_VENDOR } from '../../../../../fixtures/checkout/payment-vendors';

const eventMapper = ({
  code,
  title,
  descriptions,
}: PaymentEvent): {
  vendorName?: string;
  title: string;
  descriptions: string[];
} => ({
  ...(!isCreditCardPayments(code) && {
    vendorName: vendorStyles[code].name,
  }),
  title,
  descriptions,
});

const eventSummaryMapper = ({ code, title, descriptions }: PaymentEvent): Event => ({
  vendorName: vendorStyles[code].name,
  title,
  descriptions,
});

const findElementAndMoveToFirstElement = ({
  eventList,
  findName,
}: {
  eventList: Event[];
  findName: string;
}): Event[] => {
  const sliceEventList = [...eventList];
  const findIndex = sliceEventList.findIndex((e) => e.vendorName === findName);

  if (findIndex > -1) {
    const getElement = sliceEventList.splice(findIndex, 1);

    sliceEventList.splice(0, 0, ...getElement);
  }

  return sliceEventList;
};

export interface Event {
  vendorName?: string;
  title: string;
  descriptions: string[];
}

interface PaymentMethods {
  hasSimplePayEvent: boolean;
  kakaoPayCouponSelected: boolean;
  events: Event[];
  easyPaymentEvent: Event[];
  filteredAllEvents: Event[];
  filteredSummaryEvents: Event[];
}

export default function usePaymentMethods(): PaymentMethods {
  const { selectedCoupon } = useAppSelector(({ checkoutCoupon }) => checkoutCoupon);
  const { simplePaymentVendors, event, selectedVendor } = useAppSelector(({ checkoutPayment }) => ({
    simplePaymentVendors: checkoutPayment.simplePaymentVendors,
    event: checkoutPayment.event,
    selectedVendor: checkoutPayment.selectedVendor,
  }));

  const hasSimplePayEvent = useMemo(
    () => simplePaymentVendors.some(({ hasEvent }) => hasEvent),
    [simplePaymentVendors],
  );

  const kakaoPayCouponSelected = useMemo(() => selectedCoupon?.paymentGateways[0] === 'kakao-pay', [selectedCoupon]);

  // 카드 이벤트
  const getEvents = () => {
    if (!selectedVendor) {
      return [];
    }

    return (selectedVendor?.isSimplePay ? simplePaymentVendors : [selectedVendor])
      .filter(({ code }) => !!event[code])
      .map<PaymentEvent[]>(({ code }) => event[code]!)
      .flatMap((it) => it)
      .map(eventMapper);
  };

  const getEasyPaymentEvent = () => {
    if (!event.kurlypay) {
      return [];
    }
    return event.kurlypay.map(eventMapper);
  };

  const getFilteredAllEvents = () => {
    if (!selectedVendor) {
      return [];
    }

    const copyEvent = { ...event };

    if (copyEvent[selectedVendor.code]) {
      delete copyEvent[selectedVendor.code];
    }

    if (copyEvent[EASY_KURLYPAY_VENDOR.code]) {
      delete copyEvent[EASY_KURLYPAY_VENDOR.code];
    }

    return Object.values(copyEvent)
      .flatMap((it) => it)
      .map(eventMapper);
  };

  const getFilteredSummaryEvents = () => {
    if (!selectedVendor) {
      return [];
    }

    const mapperEvent = Object.values({ ...event })
      .flatMap((it) => it)
      .map(eventSummaryMapper);

    const kurlyPayMoveToFirstElement = findElementAndMoveToFirstElement({
      eventList: mapperEvent,
      findName: EASY_KURLYPAY_VENDOR.name,
    });

    return findElementAndMoveToFirstElement({
      eventList: kurlyPayMoveToFirstElement,
      findName: selectedVendor.name,
    });
  };

  return {
    hasSimplePayEvent,
    kakaoPayCouponSelected,
    events: getEvents(),
    easyPaymentEvent: getEasyPaymentEvent(),
    filteredAllEvents: getFilteredAllEvents(),
    filteredSummaryEvents: getFilteredSummaryEvents(),
  };
}
