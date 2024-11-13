import { isEmpty } from 'lodash';

import useInterestFree from './queries/useInterestFree';
import { useAppSelector } from '../../../../shared/store';
import { isCreditCardPayments, isKurlypayVendor } from '../services';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import usePaymentMethods from './usePaymentMethods';

export default function useEvent() {
  const selectedVendor = useAppSelector(({ checkoutPayment }) => checkoutPayment.selectedVendor);
  const { interestFreeList } = useInterestFree();
  const { events, easyPaymentEvent } = usePaymentMethods();

  const filteredEvents = isCreditCardPayments(selectedVendor?.code)
    ? events
    : events.filter(({ vendorName }) => vendorName === selectedVendor?.name);

  const eventList = isKurlypayVendor(selectedVendor) ? easyPaymentEvent : filteredEvents.concat(easyPaymentEvent);

  const onlyInterestFree =
    isCreditCardPayments(selectedVendor?.code) && isEmpty(eventList) && isNotEmpty(interestFreeList);

  return {
    eventList,
    onlyInterestFree,
  };
}
