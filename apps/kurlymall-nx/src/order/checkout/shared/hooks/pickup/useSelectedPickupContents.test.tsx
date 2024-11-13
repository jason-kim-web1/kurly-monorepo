import { renderHookWithProviders } from '../../../../../../util/testutil';
import useSelectedPickupContents from './useSelectedPickupContents';
import { initialState as CheckoutInitialState } from '../../reducers/checkout.slice';
import { mockPickupPlaces } from '../../../../../../fixtures/pickupPlaces';
import { usePickupPeriodQuery } from '../queries';
import { PickupPeriod } from '../../interfaces';

const MOCK_PICKUP_PERIOD = {
  startDate: '2024-01-17',
  endDate: '2024-01-22',
} as PickupPeriod;

jest.mock('../queries');

describe('useSelectedPickupContents', () => {
  const renderUseSelectedPickupContents = (preloadedState = {}) =>
    renderHookWithProviders(useSelectedPickupContents, { preloadedState });

  beforeEach(() => {
    (usePickupPeriodQuery as jest.Mock).mockReturnValue({
      data: MOCK_PICKUP_PERIOD,
    });
  });

  context('선택된 픽업지와 픽업 날짜가 있으면', () => {
    it('픽업지에 대한 text 를 return 한다.', () => {
      const { result } = renderUseSelectedPickupContents({
        checkout: {
          ...CheckoutInitialState,
          selectedPickupPlace: mockPickupPlaces[1],
        },
      });

      expect(result.current.selectedPickupContents).toEqual({
        latitude: 37.5012,
        longitude: 127.03424,
        shopName: `[${mockPickupPlaces[1].partnerName}] ${mockPickupPlaces[1].pickupShopName}`,
        shopAddress: mockPickupPlaces[1].pickupShopPlace,
        pickupPeriod: {
          start: '2024년 01월 17일',
          end: '01월 22일',
        },
        specialList: [],
      });
    });
  });

  context('선택된 픽업지가 없으면', () => {
    it('selectedPickupContents값이 null이다.', () => {
      const { result } = renderUseSelectedPickupContents();

      expect(result.current.selectedPickupContents).toBeNull();
    });
  });
});
