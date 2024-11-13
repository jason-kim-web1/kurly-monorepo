import { mockPickupPlaces } from '../../../../../fixtures/pickupPlaces';
import { PickupPlaceText } from '../../../checkout/shared/interfaces';
import getSelectedPickupPlaceText from './getSelectedPickupPlaceText';

describe('getSelectedPickupPlaceText', () => {
  context('선택한 픽업 매장이 없으면', () => {
    given('place', () => undefined);
    given('pickupDate', () => ({}));

    it('null을 return한다.', () => {
      const params = {
        place: given.place,
        pickupDate: given.pickupDate,
      };

      const result = getSelectedPickupPlaceText(params);
      expect(result).toBeNull();
    });
  });

  context('선택한 픽업 매장이 있으면', () => {
    given('place', () => mockPickupPlaces[0]);
    given('pickupDate', () => ({
      startYear: '2022',
      startMonth: '04',
      startDay: '20',
      endYear: '2022',
      endMonth: '04',
      endDay: '24',
    }));

    it('픽업지, 픽업일자를 return한다.', () => {
      const params = {
        place: given.place,
        pickupDate: given.pickupDate,
      };

      const { shopName, shopAddress, pickupPeriod } = getSelectedPickupPlaceText(params) as PickupPlaceText;

      const result = {
        name: `[${given.place.partnerName}] ${given.place.pickupShopName}`,
        address: given.place.pickupShopPlace,
        period: {
          start: '2022년 04월 20일',
          end: '04월 24일',
        },
      };

      expect(shopName).toBe(result.name);
      expect(shopAddress).toBe(result.address);

      expect(pickupPeriod).toEqual(result.period);
    });
  });
});
