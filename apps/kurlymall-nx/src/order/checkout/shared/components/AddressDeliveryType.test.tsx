import { render } from '@testing-library/react';

import AddressDeliveryType from './AddressDeliveryType';
import { KURLY_DELIVERY } from '../../../../shared/constant';

describe('AddressDeliveryType 테스트', () => {
  given('deliveryType', () => 'direct');
  given('earlyBirdText', () => undefined);

  const renderAddressDeliveryType = () =>
    render(<AddressDeliveryType type={given.deliveryType} earlyBirdText={given.earlyBirdText} />);

  context(`${KURLY_DELIVERY.direct}이면`, () => {
    given('deliveryType', () => 'direct');

    it(`${KURLY_DELIVERY.direct}을 볼 수 있다`, () => {
      const { container } = renderAddressDeliveryType();

      expect(container).toHaveTextContent(KURLY_DELIVERY.direct);
    });
  });

  context(`${KURLY_DELIVERY.indirect}이면`, () => {
    given('deliveryType', () => 'indirect');

    it(`${KURLY_DELIVERY.indirect}을 볼 수 있다`, () => {
      const { container } = renderAddressDeliveryType();

      expect(container).toHaveTextContent(KURLY_DELIVERY.indirect);
    });
  });

  context(`${KURLY_DELIVERY.disable}이면`, () => {
    given('deliveryType', () => 'disable');

    it(`${KURLY_DELIVERY.disable}를 볼 수 있다`, () => {
      const { container } = renderAddressDeliveryType();

      expect(container).toHaveTextContent(KURLY_DELIVERY.disable);
    });
  });

  context('얼리버드 문구가 있으면', () => {
    given('deliveryType', () => 'direct');
    given('earlyBirdText', () => '얼리버드 문구');

    it('얼리버드 문구를 볼 수 있다', () => {
      const { container } = renderAddressDeliveryType();

      expect(container).toHaveTextContent(given.earlyBirdText);
    });
  });
});
