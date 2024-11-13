import { screen } from '@testing-library/react';

import { mockPickupPlacesResponse } from '../../../../../fixtures/pickupPlaces';

import PickupContainer from './PickupContainer';

import { renderWithProviders } from '../../../../../util/testutil';
import { PICKUP_PLACE_INFOMATION_ROW_TEXT, PICKUP_PLACE_INFOMATION_TEXT } from '../../../shared/shared/constants';
import { usePickupPeriodQuery, usePickupPlacesQuery } from '../../shared/hooks/queries';

jest.mock('../../shared/hooks/queries');

describe('PickupContainer', () => {
  const renderPickupContainer = (preloadedState = {}) => renderWithProviders(<PickupContainer />, { preloadedState });

  beforeEach(() => {
    (usePickupPlacesQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [mockPickupPlacesResponse],
      },
    });
    (usePickupPeriodQuery as jest.Mock).mockReturnValue({
      data: {
        startDate: '2024-01-17',
        endDate: '2024-01-22',
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('픽업매장 정보 타이틀, 픽업매장 선택 문구를 볼 수 있다.', () => {
    renderPickupContainer();

    expect(screen.queryByText(PICKUP_PLACE_INFOMATION_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(PICKUP_PLACE_INFOMATION_ROW_TEXT)).toBeInTheDocument();
  });
});
