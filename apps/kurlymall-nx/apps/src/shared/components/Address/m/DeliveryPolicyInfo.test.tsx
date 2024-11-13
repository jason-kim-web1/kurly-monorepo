import { render } from '@testing-library/react';

import DeliveryPolicyInfo from './DeliveryPolicyInfo';
import { KURLY_DELIVERY } from '../../../constant';

describe('DeliveryPolicyInfo', () => {
  given('type', () => null);
  given('deactivation', () => null);

  const renderDeliveryPolicyInfo = () =>
    render(<DeliveryPolicyInfo type={given.type} deactivation={given.deactivation} />);

  context('배송 타입이 direct 이면', () => {
    given('type', () => 'direct');

    it(`${KURLY_DELIVERY.direct}을 볼 수 있다`, () => {
      const { container } = renderDeliveryPolicyInfo();

      expect(container).toHaveTextContent(KURLY_DELIVERY.direct);
    });
  });

  context('배송 타입이 indirect 이면', () => {
    given('type', () => 'indirect');

    it(`${KURLY_DELIVERY.indirect}을 볼 수 있다`, () => {
      const { container } = renderDeliveryPolicyInfo();

      expect(container).toHaveTextContent(KURLY_DELIVERY.indirect);
    });
  });

  context('배송 타입이 disable 이면', () => {
    given('type', () => 'disable');

    it(`${KURLY_DELIVERY.disable}를 볼 수 있다`, () => {
      const { container } = renderDeliveryPolicyInfo();

      expect(container).toHaveTextContent(KURLY_DELIVERY.disable);
    });
  });

  context(`${KURLY_DELIVERY.disable} 정책이 있으면`, () => {
    given('type', () => 'direct');
    given('deactivation', () => ({
      startAt: '18',
      endAt: '22',
    }));

    it(`${KURLY_DELIVERY.disable} 정책이 노출된다.`, () => {
      const { container } = renderDeliveryPolicyInfo();

      expect(container).toHaveTextContent(
        `${given.deactivation.startAt}시~${given.deactivation.endAt}시 주문은 택배로 배송되며 다음날 밤 12시 이전 도착합니다.`,
      );
    });
  });

  context(`${KURLY_DELIVERY.disable} 정책이 있지만 null 로 들어오면`, () => {
    given('type', () => 'direct');
    given('deactivation', () => ({
      startAt: null,
      endAt: null,
    }));

    it(`${KURLY_DELIVERY.disable} 정책을 볼 수 없다.`, () => {
      const { getByTestId } = renderDeliveryPolicyInfo();

      expect(() => getByTestId('deactivation-notice')).toThrowError();
    });
  });
});
