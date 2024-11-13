import { screen } from '@testing-library/react';

import PickupContainer from './PickupContainer';

import { renderWithProviders } from '../../../../../util/testutil';
import { PICKUP_PLACE_SELECT_TEXT } from '../../../shared/shared/constants';
import useSelectedPickupContents from '../../shared/hooks/pickup/useSelectedPickupContents';
import { mockPickupPlaces } from '../../../../../fixtures/pickupPlaces';

jest.mock('../../shared/hooks/pickup/useSelectedPickupContents');

describe('PickupContainer', () => {
  const renderPickupContainer = (preloadedState = {}) => renderWithProviders(<PickupContainer />, { preloadedState });

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('선택 된 픽업 매장이 없으면', () => {
    it('픽업매장 선택 버튼을 볼 수 있다.', () => {
      (useSelectedPickupContents as jest.Mock).mockReturnValue({
        selectedPickupPlace: undefined,
        selectedPickupContents: null,
      });

      renderPickupContainer();

      const button = screen.getByRole('button', { name: PICKUP_PLACE_SELECT_TEXT });

      expect(button).toBeInTheDocument();
    });
  });

  context('선택 된 픽업 매장이 있으면', () => {
    it('변경 버튼과 선택한 매장의 픽업지를 볼 수 있다', () => {
      const mockPickupContents = {
        shopName: '[CU] 서초그린점',
        shopAddress: '서울특별시 서초구 잠원로3길',
        pickupPeriod: {
          start: '2024년 01월 27일 부터',
          end: '02월 02일 까지 픽업 가능합니다',
        },
      };

      (useSelectedPickupContents as jest.Mock).mockReturnValue({
        selectedPickupPlace: mockPickupPlaces[0],
        selectedPickupContents: mockPickupContents,
      });

      renderPickupContainer();

      expect(screen.queryByText(mockPickupContents.shopName, { exact: false })).toBeInTheDocument();
    });
  });
});
