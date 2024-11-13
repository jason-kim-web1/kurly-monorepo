import { PickupPlace, PickupDate, PickupPlaceText } from '../../../checkout/shared/interfaces';
import { PickupOrderMeta } from '../../../common/interface/PickupOrderMeta';

export default function getSelectedPickupPlaceText({
  place,
  pickupDate,
}: {
  place?: PickupPlace | PickupOrderMeta | null;
  pickupDate: PickupDate;
}): PickupPlaceText | null {
  if (!place) {
    return null;
  }

  const { partnerName, pickupShopName, pickupShopPlace, closeWeekend, specialInformation, longitude, latitude } = place;
  const { startYear, startMonth, startDay, endMonth, endDay } = pickupDate;

  const shopName = `[${partnerName}] ${pickupShopName}`;
  const shopAddress = pickupShopPlace;

  const pickupPeriod = {
    start: `${startYear}년 ${startMonth}월 ${startDay}일`,
    end: `${endMonth}월 ${endDay}일`,
  };

  const specialList = [];

  if (closeWeekend) {
    specialList.push('주말 휴무');
  }

  if (specialInformation) {
    specialList.push(specialInformation);
  }

  return { shopName, shopAddress, pickupPeriod, specialList, longitude, latitude };
}
