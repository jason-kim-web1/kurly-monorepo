import { useRouter } from 'next/router';

import OrderFailContainer from './OrderFailContainer';
import { failOrderWithSetMessage } from '../../../../../shared/shared/reducers/payments.slice';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';
import { renderWithProviders } from '../../../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../hooks/useGuestCheckDuringWebPayment');
jest.mock('../../../../../shared/shared/reducers/payments.slice', () => {
  const originalModule = jest.requireActual('../../../../../shared/shared/reducers/payments.slice');

  return {
    ...originalModule,
    failOrderWithSetMessage: jest.fn().mockImplementation(() => ({ type: 'test' })),
  };
});

describe('OrderFailContainer', () => {
  given('paymentReady', () => true);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        orderNumber: '1234',
        paymentGatewayMessage: 'paymentGatewayMessage',
      },
    }));
    (useGuestCheckDuringWebPayment as jest.Mock).mockImplementation(() => ({
      paymentReady: given.paymentReady,
    }));
  });

  const renderOrderFailContainer = () => renderWithProviders(<OrderFailContainer />);

  context('어느 환경에서든 화면은', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = renderOrderFailContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('paymentReady가 false면', () => {
    given('paymentReady', () => false);

    it('failOrderWithSetMessage를 호출하지 않는다.', () => {
      renderOrderFailContainer();

      expect(failOrderWithSetMessage).not.toHaveBeenCalled();
    });
  });

  context('paymentReady가 true이면', () => {
    given('paymentReady', () => true);

    it('failOrderWithSetMessage를 호출한다.', () => {
      renderOrderFailContainer();

      expect(failOrderWithSetMessage).toHaveBeenCalled();
    });
  });
});
