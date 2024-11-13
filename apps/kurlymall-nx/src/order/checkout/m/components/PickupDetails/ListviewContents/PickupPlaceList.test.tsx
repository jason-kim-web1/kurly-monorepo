import { screen, within } from '@testing-library/react';

import { renderWithProviders } from '../../../../../../../util/testutil';
import PickupPlaceList from './PickupPlaceList';
import { mockPickupPlaces } from '../../../../../../../fixtures/pickupPlaces';
import { PickupDetailProvider } from '../../../../shared/context/PickupDetailContext';

describe('PickupPlaceList test', () => {
  given('places', () => mockPickupPlaces);
  given('isLoading', () => false);

  const renderPickupPlaceOptions = (preloadedState = {}) =>
    renderWithProviders(
      <PickupDetailProvider>
        <PickupPlaceList places={given.places} isLoading={given.isLoading} ref={null} />
      </PickupDetailProvider>,
      {
        preloadedState,
      },
    );

  context('isLoading 이 true 이면', () => {
    given('isLoading', () => true);

    it('skeleton loading 상태를 볼 수 있다.', () => {
      renderPickupPlaceOptions();

      expect(screen.getByTestId('skeleton-place-list')).toBeInTheDocument();
    });
  });

  context('픽업지가 undefined 이면', () => {
    given('places', () => undefined);

    it('skeleton loading 상태를 볼 수 있다.', () => {
      renderPickupPlaceOptions();

      expect(screen.getByTestId('skeleton-place-list')).toBeInTheDocument();
    });
  });

  context('픽업지가 없으면', () => {
    given('places', () => []);

    it('검색 결과가 없다는 텍스트를 볼 수 있다.', () => {
      renderPickupPlaceOptions();

      expect(screen.queryByText('검색된 매장이 없습니다.')).toBeInTheDocument();
    });
  });

  context('픽업지가 있으면', () => {
    given('places', () => mockPickupPlaces);

    it('픽업지 이름, 주소, 거리를 볼 수 있다.', () => {
      renderPickupPlaceOptions();

      const item = screen.getAllByRole('listitem')[0];

      const { partnerName, pickupShopName, pickupShopPlace, distance } = given.places[0];
      const name = `[${partnerName}] ${pickupShopName}`;
      const address = pickupShopPlace;

      expect(within(item).getByText(name)).toBeInTheDocument();
      expect(within(item).getByText(address)).toBeInTheDocument();
      expect(within(item).getByText(`${distance}m`)).toBeInTheDocument();
    });
  });
});
