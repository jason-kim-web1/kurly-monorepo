import { useRouter } from 'next/router';

import usePaymentReady from '../../../hooks/usePaymentReady';

import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';

import KurlySuccessContainer from './KurlySuccessContainer';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import { renderWithProviders } from '../../../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../hooks/usePaymentReady');
jest.mock('../../../../../shared/pc/components/InProgress');
jest.mock('../../../../../shared/shared/reducers/payments.slice', () => {
  const originalModule = jest.requireActual('../../../../../shared/shared/reducers/payments.slice');

  return {
    ...originalModule,
    completeOrder: jest.fn().mockImplementation(() => ({ type: 'test' })),
  };
});

describe('KurlySuccessContainer', () => {
  given('paymentReady', () => false);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {},
    }));
    (usePaymentReady as jest.Mock).mockImplementation(() => ({
      paymentReady: given.paymentReady,
    }));
    (PCInProgress as jest.Mock).mockImplementation(() => <>결제 진행 중입니다.</>);
  });

  const renderSuccessContainer = ({ isMobilePage }: { isMobilePage?: boolean }) =>
    renderWithProviders(<KurlySuccessContainer isMobilePage={isMobilePage} />);

  context('랜더링', () => {
    context('Mobile Page인 경우', () => {
      it('결제 진행 중입니다 텍스트를 볼 수 있다.', () => {
        const { container } = renderSuccessContainer({ isMobilePage: true });

        expect(container).toHaveTextContent('결제 진행 중입니다.');
      });
    });

    context('Mobile Page가 아닌 경우', () => {
      it('결제 진행 중입니다 텍스트를 볼 수 있다.', () => {
        const { container } = renderSuccessContainer({ isMobilePage: false });

        expect(container).toHaveTextContent('결제 진행 중입니다.');
      });
    });
  });

  context('usePaymentReady', () => {
    context('usePaymentReady가 false이면', () => {
      given('paymentReady', () => false);

      it('completeOrder를 호출하지 않는다.', () => {
        renderSuccessContainer({});

        expect(completeOrder).not.toHaveBeenCalled();
      });
    });

    context('usePaymentReady가 true이면', () => {
      given('paymentReady', () => true);

      it('completeOrder를 호출한다.', () => {
        renderSuccessContainer({});

        expect(completeOrder).toHaveBeenCalled();
      });
    });
  });
});
