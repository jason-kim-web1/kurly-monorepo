import { fireEvent, screen } from '@testing-library/react';

import {
  KurlypayAddVendor,
  KurlypayBankVendor,
  KurlypayCheckCardVendor,
  KurlypayCreditCardVendor,
  KurlypayPlccLottieVendor,
  disableKurlypayVendorWithKB,
} from '../../../../../../fixtures';

import { renderWithProviders } from '../../../../../../util/testutil';
import { initialState } from '../../../shared/reducers/checkout-payment.slice';

import KurlypayCard from './KurlypayCard';
import { TOSSPAYMENTS_VENDOR, vendorsFixture } from '../../../../../../fixtures/checkout/payment-vendors';

describe('KurlypayCard component', () => {
  given('card', () => undefined);
  given('active', () => false);

  const renderKurlypayCard = (preloadedState = {}) =>
    renderWithProviders(<KurlypayCard card={given.card} active={given.active} />, { preloadedState });

  context('card 가 undefined 이면', () => {
    given('card', () => undefined);

    it('아무것도 render 하지 않는다.', () => {
      const { container } = renderKurlypayCard();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('컬리페이 간편결제 신용카드이면', () => {
    given('active', () => true);
    given('card', () => KurlypayCreditCardVendor);

    it('할부 selectbox 를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText('일시불')).toBeInTheDocument();
    });

    it('할부 박스를 선택했을 때 결제수단이 컬리페이가 아니였다면 컬리페이를 선택한다.', () => {
      const { store } = renderKurlypayCard({
        checkoutPayment: {
          ...initialState,
          selectedVendor: TOSSPAYMENTS_VENDOR,
          vendors: vendorsFixture,
        },
      });

      const selectbox = screen.getByText('일시불');

      fireEvent.click(selectbox);
      fireEvent.click(screen.getByText(given.card.installments[2].name));

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor?.code).toEqual('kurlypay');
    });

    it('선택한 할부를 바꿀 수 있다.', () => {
      const { store } = renderKurlypayCard();
      const { checkoutPayment: beforeCheckoutPayment } = store.getState();

      const selectbox = screen.getByText('일시불');

      expect(beforeCheckoutPayment.kurlypayInstallment).toEqual({ name: '일시불', value: '0' });

      fireEvent.click(selectbox);
      fireEvent.click(screen.getByText(given.card.installments[2].name));

      const { checkoutPayment: afterCheckoutPayment } = store.getState();

      expect(afterCheckoutPayment.kurlypayInstallment).toEqual(given.card.installments[2]);
    });
  });

  context.each([KurlypayBankVendor, KurlypayCheckCardVendor])('컬리페이 간편결제 신용카드가 아니면', (card) => {
    given('active', () => true);
    given('card', () => card);

    it('할부 selectbox 를 볼 수 없다.', () => {
      renderKurlypayCard();

      expect(screen.queryByText('일시불')).not.toBeInTheDocument();
    });
  });

  context('card 가 PLCC lottie 카드이면', () => {
    given('active', () => true);
    given('card', () => KurlypayPlccLottieVendor);

    it('PLCC 로띠 카드를 볼 수 있다.', () => {
      const { container } = renderKurlypayCard();

      const lottie = container.querySelector('.lottie-kurlypay-button');

      expect(lottie).toBeInTheDocument();
    });
  });

  context('card 가 컬리페이 고스트 카드이면', () => {
    given('active', () => true);
    given('card', () => KurlypayAddVendor);

    it('고스트 카드를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText(/카드 또는 계좌.*추가하기/)).toBeInTheDocument();
    });
  });

  context('card 가 컬리페이 결제수단이면', () => {
    given('active', () => true);
    given('card', () => KurlypayBankVendor);

    it('카드의 회사 이름과 마스킹 번호를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText(given.card.companyName)).toBeInTheDocument();
      expect(screen.getByText(given.card.maskingNo)).toBeInTheDocument();
    });
  });

  context('사용 불가능한 컬리페이 카드라면', () => {
    given('active', () => true);
    given('card', () => disableKurlypayVendorWithKB);

    it('카드 사용 불가 문구를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText('해당 상품 구매 시 선택하신 카드는 사용이 제한됩니다')).toBeInTheDocument();
    });

    it('할부 선택 박스를 노출하지 않는다', () => {
      const { container } = renderKurlypayCard();

      const selectBox = container.querySelector('.installment');

      expect(selectBox).not.toBeInTheDocument();
    });
  });
});
