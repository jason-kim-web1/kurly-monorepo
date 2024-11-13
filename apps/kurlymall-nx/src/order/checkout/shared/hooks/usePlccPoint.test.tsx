import { renderHookWithProviders } from '../../../../../util/testutil';
import usePlccPoint from './usePlccPoint';
import { initialState as checkoutPaymentInitialState } from '../reducers/checkout-payment.slice';
import { initialState as checkoutInitialState } from '../reducers/checkout.slice';
import { formattedKurlypayVendors, KurlypayPLCCVendor, mockAvailablePLCCPointProducts } from '../../../../../fixtures';
import { EASY_KURLYPAY_VENDOR } from '../../../../../fixtures/checkout/payment-vendors';

describe('usePlccPoint 테스트', () => {
  describe('포인트 사용을 체크하면', () => {
    it('즉시 결제 포인트를 사용한다', async () => {
      const { store, result } = renderHookWithProviders(usePlccPoint, {
        preloadedState: {
          checkout: {
            ...checkoutInitialState,
            products: mockAvailablePLCCPointProducts,
          },
          checkoutPayment: {
            ...checkoutPaymentInitialState,
            selectedVendor: EASY_KURLYPAY_VENDOR,
            selectedKurlypayVendor: KurlypayPLCCVendor,
            kurlypayVendors: formattedKurlypayVendors,
            selectedPlccPoint: false,
            plccDiscountPrice: 30000,
          },
        },
      });

      result.current.handlePointCheckbox();

      const { checkoutPayment } = store.getState();
      expect(checkoutPayment.selectedPlccPoint).toBeTruthy();
    });
  });
});
