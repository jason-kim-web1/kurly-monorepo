import { screen } from '@testing-library/react';

import { KurlypayAddVendor, KurlypayPlccLottieVendor } from '../../../../../../fixtures';
import { renderWithProviders } from '../../../../../../util/testutil';
import { initialState } from '../../../shared/reducers/checkout-payment.slice';

import KurlypayCards from './KurlypayCards';

describe('KurlypayCards components test', () => {
  it('고스트 카드 text를 볼 수 있다.', () => {
    renderWithProviders(<KurlypayCards />, {
      preloadedState: {
        checkoutPayment: {
          ...initialState,
          kurlypayVendors: [KurlypayPlccLottieVendor, KurlypayAddVendor],
        },
      },
    });

    expect(screen.getByText(/카드 또는 계좌.*추가하기/)).toBeInTheDocument();
  });
});
