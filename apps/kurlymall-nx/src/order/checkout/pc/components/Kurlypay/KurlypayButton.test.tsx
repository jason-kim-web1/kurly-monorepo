import { fireEvent, screen } from '@testing-library/react';

import { formattedKurlypayVendors } from '../../../../../../fixtures';
import { renderWithProviders } from '../../../../../../util/testutil';
import { initialState } from '../../../shared/reducers/checkout-payment.slice';
import KurlypayButton from './KurlypayButton';

describe('KurlypayButton componrnt', () => {
  const handleClickPaymentVendor = jest.fn();

  given('selectedVendor', () => undefined);
  given('event', () => {});

  const renderKurlypayButton = (preloadedState = {}) =>
    renderWithProviders(
      <KurlypayButton
        selectedVendor={given.selectedVendor}
        event={given.event}
        onClickPaymentVendor={handleClickPaymentVendor}
      />,
      {
        preloadedState,
      },
    );

  context('hasKurlypayError가 true 인 경우', () => {
    it('컬리페이 에러 버튼을 볼 수 있다.', () => {
      renderKurlypayButton({
        checkoutPayment: {
          ...initialState,
          hasKurlypayError: true,
        },
      });

      expect(screen.queryByTestId('kurlypay-error-button')).toBeInTheDocument();
    });
  });

  context('kurlypayVendors에 결제수단이 있으면', () => {
    given('event', () => ({
      kurlypay: {},
    }));

    it('컬리페이 버튼을 볼 수 있다.', () => {
      renderKurlypayButton({
        checkoutPayment: {
          ...initialState,
          kurlypayVendors: formattedKurlypayVendors,
        },
      });

      expect(screen.queryByTestId('kurlypay-button')).toBeInTheDocument();
    });
  });

  context('컬리페이 버튼을 선택하면', () => {
    given('event', () => ({
      kurlypay: {},
    }));

    it('onClickPaymentVendor event 가 호출된다.', () => {
      renderKurlypayButton({
        checkoutPayment: {
          ...initialState,
          kurlypayVendors: formattedKurlypayVendors,
        },
      });

      const button = screen.getByTestId('kurlypay-button');

      fireEvent.click(button);

      expect(handleClickPaymentVendor).toHaveBeenCalledWith('kurlypay');
    });
  });
});
