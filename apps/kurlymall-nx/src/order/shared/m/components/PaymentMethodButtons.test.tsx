import { fireEvent } from '@testing-library/react';

import PaymentMethodButtons from './PaymentMethodButtons';
import { renderWithProviders } from '../../../../../util/testutil';
import { formattedKurlypayVendors } from '../../../../../fixtures';

describe('PaymentMethodButtons', () => {
  const handleClickPaymentVendor = jest.fn();
  const handleClickSimplePay = jest.fn();

  given('event', () => ({}));
  given('hasSimplePayEvent', () => false);

  const renderPaymentMethodButtons = (preloadedState = {}) =>
    renderWithProviders(
      <PaymentMethodButtons
        selectedVendor={undefined}
        hasSimplePayEvent={given.hasSimplePayEvent}
        event={given.event}
        onClickPaymentVendor={handleClickPaymentVendor}
        onClickSimplePay={handleClickSimplePay}
      />,
      { preloadedState },
    );

  context('결제수단 이벤트가 존재하면', () => {
    given('event', () => ({
      'naver-pay': {
        code: 'naver-pay',
        title: '네이버페이 결제 이벤트',
      },
    }));

    it('혜택 문구를 볼 수 있다.', () => {
      const { container } = renderPaymentMethodButtons();

      expect(container).toHaveTextContent('혜택');
    });
  });

  context('간편 결제에 이벤트가 있으면', () => {
    given('hasSimplePayEvent', () => true);

    it('혜택 문구를 볼 수 있다.', () => {
      const { container } = renderPaymentMethodButtons();

      expect(container).toHaveTextContent('혜택');
    });
  });

  context.each([
    { id: 'naver-pay-button' },
    { id: 'kurlypay-button' },
    { id: 'creditcard-button' },
    { id: 'phonebill' },
  ])('네이버페이, 컬리페이, 신용카드, 휴대폰 결제수단을 클릭하면', ({ id }) => {
    it('onClickPaymentVendor 를 호출한다.', () => {
      const { getByTestId } = renderPaymentMethodButtons({
        checkoutPayment: {
          kurlypayVendors: formattedKurlypayVendors,
        },
      });

      fireEvent.click(getByTestId(id));

      expect(handleClickPaymentVendor).toBeCalled();
    });
  });

  context('간편결제 버튼을 클릭하면', () => {
    it('onClickSimplePay 를 호출한다.', () => {
      const { getByTestId } = renderPaymentMethodButtons();

      fireEvent.click(getByTestId('simplepay-button'));

      expect(handleClickSimplePay).toBeCalled();
    });
  });
});
