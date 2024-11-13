import { renderHookWithProviders } from '../../../../../../util/testutil';
import { getPreviousVendor } from '../../../../shared/shared/services';
import usePreviousVendorQuery from './usePreviousVendorQuery';
import { vendorsFixture } from '../../../../../../fixtures/checkout/payment-vendors';
import { mockCheckoutProducts } from '../../../../../../fixtures/checkout/checkout-fixtures';

jest.mock('../../../../shared/shared/services');

describe('usePreviousVendorQuery test', () => {
  const renderUsePreviousVendorQuery = (preloadedState = {}) =>
    renderHookWithProviders(usePreviousVendorQuery, { preloadedState });

  context('상품권 주문이거나 컬리페이 결제수단 장애 상황일 경우', () => {
    it('isLoading 이 false 다', async () => {
      (getPreviousVendor as jest.Mock).mockResolvedValue({
        paymentGatewayId: 'naver-pay',
        companyId: '',
      });

      const { result, waitFor } = renderUsePreviousVendorQuery({
        checkoutPayment: {
          vendors: vendorsFixture,
          hasKurlypayError: true,
        },
        checkout: {
          products: mockCheckoutProducts,
          isGiftCardOrder: true,
        },
      });

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
