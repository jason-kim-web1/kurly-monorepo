import { useRouter } from 'next/router';

import { checkTossPaymentsResult } from '../../../../../shared/shared/utils/checkPaymentGatewayResult';

import TossPaymentsProcessContainer from './TossPaymentsProcessContainer';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';
import { renderWithProviders } from '../../../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../../../shared/shared/utils/checkPaymentGatewayResult');
jest.mock('../../../hooks/useGuestCheckDuringWebPayment');

describe('TossPaymentsProcessContainer', () => {
  given('paymentReady', () => true);
  given('accessToken', () => 'token');

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {},
    }));
    (useGuestCheckDuringWebPayment as jest.Mock).mockImplementation(() => ({
      paymentReady: given.paymentReady,
    }));
  });

  const renderProcessContainer = () =>
    renderWithProviders(
      <TossPaymentsProcessContainer paymentAllResult={''} paymentGatewayResult={''} tossPaymentsParameter={{}} />,
    );

  context('어느 환경에서든 화면은', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = renderProcessContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('paymentReady가 false이면', () => {
    given('paymentReady', () => false);

    it('checkTossPaymentsResult를 호출하지 않는다.', () => {
      renderProcessContainer();

      expect(checkTossPaymentsResult).not.toBeCalled();
    });
  });

  context('paymentReady가 true이면', () => {
    given('paymentReady', () => true);

    it('checkTossPaymentsResult를 호출한다.', () => {
      renderProcessContainer();

      expect(checkTossPaymentsResult).toBeCalled();
    });
  });
});
