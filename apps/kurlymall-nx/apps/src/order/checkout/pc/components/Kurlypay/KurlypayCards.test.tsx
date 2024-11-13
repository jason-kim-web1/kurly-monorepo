import { screen } from '@testing-library/react';

import { KurlypayAddVendor, KurlypayPlccLottieVendor } from '../../../../../../fixtures';
import { renderWithProviders } from '../../../../../../util/testutil';
import { initialState } from '../../../shared/reducers/checkout-payment.slice';

import KurlypayCards from './KurlypayCards';

describe('KurlypayCards components test', () => {
  it('고스트 카드 text를 볼 수 있다.', () => {
    renderWithProviders(<KurlypayCards kurlycardAccruedPoint={0} />, {
      preloadedState: {
        checkoutPayment: {
          ...initialState,
          kurlypayVendors: [KurlypayPlccLottieVendor, KurlypayAddVendor],
        },
      },
    });

    expect(screen.getByText(/카드 또는 계좌.*추가하기/)).toBeInTheDocument();
  });

  it('이전, 다음 화살표를 볼 수 있다.', () => {
    renderWithProviders(<KurlypayCards kurlycardAccruedPoint={0} />);

    const prevArrow = screen.queryByTestId('prev-arrow');
    const nextArrow = screen.queryByTestId('next-arrow');

    expect(prevArrow).toBeInTheDocument();
    expect(nextArrow).toBeInTheDocument();
  });
});
