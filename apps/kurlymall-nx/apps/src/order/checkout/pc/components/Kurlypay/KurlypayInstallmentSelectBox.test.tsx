import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import { renderWithProviders } from '../../../../../../util/testutil';
import { Installment } from '../../../../shared/shared/interfaces';
import { initialState } from '../../../shared/reducers/checkout-payment.slice';
import KurlypayInstallmentSeletBox from './KurlypayInstallmentSelectBox';
import { EASY_KURLYPAY_VENDOR, vendorsFixture } from '../../../../../../fixtures/checkout/payment-vendors';

describe('KurlypayInstallmentSelectBox component', () => {
  given('installments', () => [
    { name: '일시불', value: '0' },
    { name: '2개월 (무이자)', value: '2' },
    { name: '3개월', value: '3' },
  ]);

  const renderKurlypayInstallmentSelectBox = (preloadedState = {}) =>
    renderWithProviders(<KurlypayInstallmentSeletBox installments={given.installments} />, { preloadedState });

  context('컬리페이 버튼이 선택되어 있지 않으면', () => {
    it('할부 선택 시 컬리페이 버튼 클릭 상태로 바꾸고, 할부 상태를 바꾼다.', async () => {
      const { store } = renderKurlypayInstallmentSelectBox({
        checkoutPayment: {
          ...initialState,
          vendors: vendorsFixture,
          selectedVendor: undefined,
        },
      });

      const button = screen.getByText('일시불');

      fireEvent.click(button);

      const twoMonthInstallment = screen.getByText('2개월 (무이자)');

      fireEvent.click(twoMonthInstallment);

      await waitFor(() => {
        const { checkoutPayment } = store.getState();

        expect(checkoutPayment.selectedVendor?.code).toEqual('kurlypay');
        expect(checkoutPayment.kurlypayInstallment).toEqual({ name: '2개월 (무이자)', value: '2' });
      });
    });
  });

  context('컬리페이 버튼이 선택되어 있으면', () => {
    it('할부 상태만 바꾼다.', async () => {
      const { store } = renderKurlypayInstallmentSelectBox({
        checkoutPayment: {
          ...initialState,
          vendors: vendorsFixture,
          selectedVendor: EASY_KURLYPAY_VENDOR,
        },
      });

      const button = screen.getByText('일시불');

      fireEvent.click(button);

      const twoMonthInstallment = screen.getByText('2개월 (무이자)');

      fireEvent.click(twoMonthInstallment);

      await waitFor(() => {
        const { checkoutPayment } = store.getState();

        expect(checkoutPayment.kurlypayInstallment).toEqual({ name: '2개월 (무이자)', value: '2' });
      });
    });
  });

  context('할부 목록을 받으면', () => {
    given('installments', () => [
      { name: '일시불', value: '0' },
      { name: '2개월 (무이자)', value: '2' },
      { name: '3개월 (무이자)', value: '3' },
      { name: '4개월', value: '4' },
      { name: '5개월', value: '5' },
      { name: '6개월', value: '6' },
      { name: '7개월', value: '7' },
      { name: '8개월', value: '8' },
      { name: '9개월', value: '9' },
      { name: '10개월 (무이자)', value: '10' },
      { name: '11개월', value: '11' },
      { name: '12개월', value: '12' },
    ]);

    it('할부 목록을 볼 수 있다.', () => {
      renderKurlypayInstallmentSelectBox();

      const button = screen.getByText('일시불');

      fireEvent.click(button);

      const listbox = screen.getByRole('listbox');

      given.installments.forEach(({ name }: Installment) => {
        expect(within(listbox).queryByText(name)).toBeInTheDocument();
      });
      expect(within(listbox).queryByText('13개월')).not.toBeInTheDocument();
    });
  });
});
