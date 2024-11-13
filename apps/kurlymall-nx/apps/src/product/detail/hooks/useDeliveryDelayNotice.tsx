import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../../shared/store';

import { getSpecialHoliday } from '../../../shared/services/specialHoliday.service';
import { ENVIRONMENT, SPECIAL_HOLIDAY_DELIVERY } from '../../../shared/configs/config';
import { HolidayDeliveryResponse } from '../../../order/checkout/shared/interfaces';
import { getFile } from '../../../shared/api';

export default function useDeliveryDelayNotice() {
  const [deliveryDelayNotice, setDeliveryDelayNotice] = useState('');
  const { receiverForm } = useAppSelector(({ checkout }) => checkout);
  const { currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  const deliveryDelay = useCallback(async () => {
    try {
      const { regionCode } = receiverForm;

      // 현재 배송 정책을 확인한다.
      if (currentAddress) {
        const { deliveryType } = currentAddress;

        if (deliveryType !== 'direct') {
          setDeliveryDelayNotice('');
          return;
        }
      }

      if (!regionCode) {
        return;
      }

      const data: HolidayDeliveryResponse = await getFile(SPECIAL_HOLIDAY_DELIVERY[ENVIRONMENT]);
      const holiday = getSpecialHoliday(data, regionCode);
      if (holiday) {
        setDeliveryDelayNotice(holiday.description);
      }
    } catch (e) {
      setDeliveryDelayNotice('');
    }
  }, [currentAddress, receiverForm]);

  useEffect(() => {
    deliveryDelay();
  }, [deliveryDelay]);

  return {
    deliveryDelayNotice,
  };
}
