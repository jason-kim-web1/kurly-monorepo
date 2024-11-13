import { useRouter } from 'next/router';

import KakaoPayProcessContainer from './KakaoPayProcessContainer';
import NaverPayProcessContainer from './NaverPayProcessContainer';
import PaycoProcessContainer from './PaycoProcessContainer';
import TossProcessContainer from './TossProcessContainer';
import KurlyPayCreditProcessContainer from './KurlypayCreditProcessContainer';
import KurlyPayProcessContainer from './KurlyPayProcessContainer';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';
import { renderWithProviders } from '../../../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../../../shared/pc/components/InProgress');
jest.mock('../../../hooks/useGuestCheckDuringWebPayment');
jest.mock('../../../../../shared/shared/reducers/payments.slice', () => {
  const originalModule = jest.requireActual('../../../../../shared/shared/reducers/payments.slice');

  return {
    ...originalModule,
    completeOrder: jest.fn().mockImplementation(() => ({ type: 'test' })),
  };
});

describe.each([
  KakaoPayProcessContainer,
  NaverPayProcessContainer,
  PaycoProcessContainer,
  TossProcessContainer,
  KurlyPayCreditProcessContainer,
  KurlyPayProcessContainer,
])('Common Type Process Container', (ProcessContainer) => {
  given('paymentReady', () => true);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {},
    }));
    (useGuestCheckDuringWebPayment as jest.Mock).mockImplementation(() => ({
      paymentReady: given.paymentReady,
    }));
    (PCInProgress as jest.Mock).mockImplementation(() => <>결제 진행 중입니다.</>);
  });

  const renderProcessContainer = ({ isMobilePage }: { isMobilePage?: boolean }) =>
    renderWithProviders(<ProcessContainer isMobilePage={isMobilePage} />);

  context('랜더링', () => {
    context('Mobile Page인 경우', () => {
      it('결제 진행 중입니다 텍스트를 볼 수 있다.', () => {
        const { container } = renderProcessContainer({ isMobilePage: true });

        expect(container).toHaveTextContent('결제 진행 중입니다.');
      });
    });

    context('Mobile Page가 아닌 경우', () => {
      it('결제 진행 중입니다 텍스트를 볼 수 있다.', () => {
        const { container } = renderProcessContainer({ isMobilePage: false });

        expect(container).toHaveTextContent('결제 진행 중입니다.');
      });
    });

    context('paymentReady가 false면', () => {
      given('paymentReady', () => false);

      it('dispatch(completeOrder)를 호출하지 않는다.', () => {
        renderProcessContainer({});

        expect(completeOrder).not.toBeCalled();
      });
    });

    context('paymentReady가 true이면', () => {
      given('paymentReady', () => true);

      it('dispatch(completeOrder)를 호출한다.', () => {
        renderProcessContainer({});

        expect(completeOrder).toBeCalled();
      });
    });
  });
});
