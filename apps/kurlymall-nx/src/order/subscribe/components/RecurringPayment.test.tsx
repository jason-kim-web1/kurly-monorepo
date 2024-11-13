import { render, screen } from '@testing-library/react';

import RecurringPayment from './RecurringPayment';

jest.mock('../hooks/useKurlyMembersCheckout');

describe.skip('Payment component in kurly membership', () => {
  given('order', () => undefined);
  given('product', () => undefined);
  given('isChangePayment', () => false);

  const renderRecurringPayment = () => render(<RecurringPayment isChangePayment={given.isChangePayment} />);

  context('데이터를 불러오는 중이면', () => {
    it('스켈레톤 UI 를 볼 수 있다.', () => {
      renderRecurringPayment();

      expect(screen.queryByTestId('loading-price')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-date')).toBeInTheDocument();
    });
  });

  context('첫 구독이면', () => {
    given('order', () => ({
      firstSubscription: true,
      startSettlementDate: '2023년 06월 28일',
    }));
    given('product', () => ({
      originalPrice: 1900,
      paymentPrice: 0,
    }));

    it('원래 금액과 할인 적용 된 금액을 볼 수 있다.', () => {
      renderRecurringPayment();

      expect(screen.queryByText('결제금액')).toBeInTheDocument();
      expect(screen.queryByText('월 1,900원')).toBeInTheDocument();
      expect(screen.queryByText('첫 달 0원')).toBeInTheDocument();

      expect(screen.queryByText('결제 시작일')).toBeInTheDocument();
      expect(screen.queryByText('2023년 06월 28일')).toBeInTheDocument();
    });
  });

  context('첫 구독이 아니면', () => {
    given('order', () => ({
      firstSubscription: false,
      startSettlementDate: '2023년 06월 28일',
    }));
    given('product', () => ({
      originalPrice: 1900,
      paymentPrice: 1900,
    }));

    it('원래 금액만 보여준다.', () => {
      renderRecurringPayment();

      expect(screen.queryByText('결제금액')).toBeInTheDocument();
      expect(screen.queryByText('월 1,900원')).toBeInTheDocument();
      expect(screen.queryByText('첫 달 0원')).not.toBeInTheDocument();

      expect(screen.queryByText('결제 시작일')).toBeInTheDocument();
      expect(screen.queryByText('2023년 06월 28일')).toBeInTheDocument();
    });
  });

  context('결제수단 변경이면', () => {
    given('order', () => ({
      firstSubscription: false,
      startSettlementDate: '2023년 06월 28일',
    }));
    given('product', () => ({
      originalPrice: 1900,
      paymentPrice: 1900,
    }));
    given('isChangePayment', () => true);

    it('결제금액은 무조건 0원으로 보여준다', () => {
      renderRecurringPayment();

      expect(screen.queryByText('결제금액')).toBeInTheDocument();
      expect(screen.queryByText('월')).not.toBeInTheDocument();
      expect(screen.queryByText('0원')).toBeInTheDocument();
    });

    it('다음 결제일 문구를 볼 수 있다.', () => {
      renderRecurringPayment();

      expect(screen.queryByText('다음 결제일')).toBeInTheDocument();
      expect(screen.queryByText('2023년 06월 28일')).toBeInTheDocument();
    });
  });
});
