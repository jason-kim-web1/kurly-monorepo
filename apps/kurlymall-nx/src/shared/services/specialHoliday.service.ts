import { get } from 'lodash';

import {
  HolidayDeliveryLimit,
  HolidayDeliveryResponse,
} from '../../order/checkout/shared/interfaces/HolidayDelivery.interface';

export function getSpecialHoliday(data: HolidayDeliveryResponse, regionCode: string) {
  const isMetropolitan = data.regionCode.includes(regionCode);
  const limitDelivery: HolidayDeliveryLimit = get(data, isMetropolitan ? 'ALL' : regionCode);

  if (!limitDelivery) {
    return;
  }

  const { startDate, endDate, description } = limitDelivery;

  const after = new Date().getTime() > new Date(startDate).getTime();
  const before = new Date().getTime() < new Date(endDate).getTime();
  const isHoliday = after && before;

  if (isHoliday) {
    return {
      startDate,
      endDate,
      description,
    };
  }
}
