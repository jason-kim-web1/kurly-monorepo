import { useAppSelector } from '../../../../shared/store';

import HolidayShippingMessage from '../components/HolidayShippingMessage';
import DeliveryNoticeMessage from '../components/DeliveryNoticeMessage';

export default function DeliveryNoticeContainer() {
  const { holidayDelivery, deliveryNotice, deliveryNoticeBasicStyle, deliveryNoticeReplaceStyles } = useAppSelector(
    ({ checkout }) => ({
      holidayDelivery: checkout.holidayDelivery,
      deliveryNotice: checkout.deliveryNotice,
      deliveryNoticeBasicStyle: checkout.deliveryNoticeBasicStyle,
      deliveryNoticeReplaceStyles: checkout.deliveryNoticeReplaceStyles,
    }),
  );

  if (holidayDelivery) {
    return <HolidayShippingMessage description={holidayDelivery.description} />;
  }

  return (
    <DeliveryNoticeMessage
      message={deliveryNotice}
      basicStyle={deliveryNoticeBasicStyle}
      replaceStyles={deliveryNoticeReplaceStyles}
    />
  );
}
