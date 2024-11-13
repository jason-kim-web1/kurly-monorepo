import { render } from '@testing-library/react';

import { useRouter } from 'next/router';

import orderResult from '../../../../../shared/shared/utils/orderResult';

import OrderCancelContainer from './OrderCancelContainer';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

jest.mock('next/router');
jest.mock('../../../../../shared/shared/utils/orderResult');
jest.mock('../../../hooks/useGuestCheckDuringWebPayment');

describe('OrderCancelContainer', () => {
  const paymentsCancel = jest.fn();
  const renderOrderCancelContainer = () => render(<OrderCancelContainer />);
  given('paymentReady', () => true);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        orderNumber: '1234',
      },
    }));
    (orderResult as jest.Mock).mockImplementation(() => ({
      paymentsCancel,
    }));
    (useGuestCheckDuringWebPayment as jest.Mock).mockImplementation(() => ({
      paymentReady: given.paymentReady,
    }));
  });

  context('어느 환경에서든 화면은', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = renderOrderCancelContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('paymentReady가 false면', () => {
    given('paymentReady', () => false);

    it('paymentsCancel를 호출하지 않는다.', () => {
      renderOrderCancelContainer();

      expect(orderResult().paymentsCancel).not.toHaveBeenCalled();
    });
  });

  context('paymentReady가 true이면', () => {
    given('paymentReady', () => true);

    it('paymentsCancel를 호출한다.', () => {
      renderOrderCancelContainer();

      expect(orderResult().paymentsCancel).toHaveBeenCalled();
    });
  });
});
