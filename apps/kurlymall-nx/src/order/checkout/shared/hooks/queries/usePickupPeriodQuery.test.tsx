import usePickupPeriodQuery from './usePickupPeriodQuery';

import { renderHookWithProviders } from '../../../../../../util/testutil';
import { fetchPickupPeriod } from '../../../../../shared/api/pickupService';

jest.mock('../../../../../shared/api/pickupService');

describe('usePickupPeriodQuery', () => {
  const renderUsePickupPeriodQuery = (placeId?: number, preloadedState = {}) =>
    renderHookWithProviders(() => usePickupPeriodQuery({ placeId }), { preloadedState });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (fetchPickupPeriod as jest.Mock).mockResolvedValue({
      startDate: '2024-01-17',
      endDate: '2024-01-22',
    });
  });

  context('placeId 가 없으면', () => {
    it('api를 call 하지 않는다.', () => {
      renderUsePickupPeriodQuery();

      expect(fetchPickupPeriod).not.toBeCalled();
    });
  });

  context('placeId 가 있으면', () => {
    it('픽업 가능 날짜를 return 한다.', async () => {
      const { result, waitFor } = renderUsePickupPeriodQuery(123);

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual({
        startDate: '2024-01-17',
        endDate: '2024-01-22',
      });
    });

    it('픽업 가능 날짜를 store 에 저장한다.', async () => {
      const { result, waitFor, store } = renderUsePickupPeriodQuery(123);

      await waitFor(() => result.current.isSuccess);

      const { pickupPeriod } = store.getState().checkout;

      expect(pickupPeriod).toEqual(result.current.data);
    });
  });
});
