import { fireEvent, render, screen } from '@testing-library/react';

import { mockPickupPlaces } from '../../../../../../../fixtures/pickupPlaces';
import PickupPlaceItem from './PickupPlaceItem';

describe('PickupPlaceItem', () => {
  const handleClick = jest.fn();

  context('픽업지가 있으면', () => {
    it('픽업지 이름, 거리, 주소를 볼 수 있다.', () => {
      const place = mockPickupPlaces[0];

      render(<PickupPlaceItem place={place} onClick={handleClick} isSelected={false} />);

      const listitem = screen.getByRole('listitem', { name: `pickup-place-${place.placeId}` });

      expect(listitem).toHaveTextContent(`[${place.partnerName}] ${place.pickupShopName}`);
      expect(listitem).toHaveTextContent(place.pickupShopPlace);
      expect(listitem).toHaveTextContent(`${place.distance}`);
    });
  });

  context('픽업지를 선택하면', () => {
    it('onClick handler를 호출한다.', () => {
      const place = mockPickupPlaces[0];

      render(<PickupPlaceItem place={place} onClick={handleClick} isSelected={false} />);

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });
  });
});
