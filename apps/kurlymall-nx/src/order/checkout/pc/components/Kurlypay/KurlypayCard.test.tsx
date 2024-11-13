import { screen } from '@testing-library/react';

import {
  disableKurlypayVendorWithKB,
  KurlypayAddVendor,
  KurlypayBankVendor,
  KurlypayCheckCardVendor,
  KurlypayPlccLottieVendor,
} from '../../../../../../fixtures';

import { renderWithProviders } from '../../../../../../util/testutil';

import KurlypayCard from './KurlypayCard';

describe('KurlypayCard component', () => {
  given('card', () => undefined);
  given('active', () => true);

  const renderKurlypayCard = (preloadedState = {}) =>
    renderWithProviders(<KurlypayCard card={given.card} active={given.active} />, { preloadedState });

  context('card 가 undefined 이면', () => {
    given('card', () => undefined);

    it('아무것도 render 하지 않는다.', () => {
      const { container } = renderKurlypayCard();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('card 정보가 있으면', () => {
    given('card', () => KurlypayCheckCardVendor);

    it('카드 정보를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.queryByText(given.card.companyName)).toBeInTheDocument();
      expect(screen.queryByText(given.card.maskingNo)).toBeInTheDocument();
    });
  });

  context('card 가 PLCC lottie 카드이면', () => {
    given('card', () => KurlypayPlccLottieVendor);

    it('PLCC 로띠 카드를 볼 수 있다.', () => {
      const { container } = renderKurlypayCard();

      const lottie = container.querySelector('.lottie-kurlypay-button');

      expect(lottie).toBeInTheDocument();
    });
  });

  context('card 가 컬리페이 고스트 카드이면', () => {
    given('card', () => KurlypayAddVendor);

    it('고스트 카드를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText(/카드 또는 계좌.*추가하기/)).toBeInTheDocument();
    });
  });

  context('card 가 컬리페이 결제수단이면', () => {
    given('card', () => KurlypayBankVendor);

    it('카드의 회사 이름과 마스킹 번호를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText(given.card.companyName)).toBeInTheDocument();
      expect(screen.getByText(given.card.maskingNo)).toBeInTheDocument();
    });
  });

  context('사용 불가능한 컬리페이 카드라면', () => {
    given('card', () => disableKurlypayVendorWithKB);

    it('카드 사용 불가 문구를 볼 수 있다.', () => {
      renderKurlypayCard();

      expect(screen.getByText('해당 상품 구매 시 선택하신 카드는 사용이 제한됩니다')).toBeInTheDocument();
    });
  });
});
