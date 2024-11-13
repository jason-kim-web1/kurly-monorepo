import { renderHookWithProviders } from '../../../../../util/testutil';
import UsePreviousVendor from './usePreviousVendor';
import {
  EASY_KURLYPAY_VENDOR,
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { formattedPaymentVendorFixture } from '../../../../../fixtures';
import { usePreviousVendorQuery } from './queries';
import { CheckoutType } from '../../../../shared/interfaces';
import { VendorCodes } from '../../../shared/shared/interfaces';

jest.mock('./queries');

describe.skip('usePreviousVendor', () => {
  const renderUsePreviousVendor = (preloadedState = {}) =>
    renderHookWithProviders(UsePreviousVendor, { preloadedState });

  given('paymentGatewayId', () => VendorCodes.NAVER_PAY);

  beforeEach(() => {
    (usePreviousVendorQuery as jest.Mock).mockReturnValue({
      data: {
        paymentGatewayId: given.paymentGatewayId,
        companyId: '',
      },
      isError: false,
      isLoading: true,
    });
  });

  context('이전 결제수단을 불러오면', () => {
    it('결제수단을 update 한다.', () => {
      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.NORMAL,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: [],
          hasKurlypayError: false,
        },
      });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor).toEqual(NAVERPAY_VENDOR);
    });
  });

  context('이전 결제수단의 paymentGatewayId 가 빈 문자열이면', () => {
    it('결제수단 중 disableVendorCodes에 포함되지 않은 첫 번째 결제수단으로 update 한다.', () => {
      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.NORMAL,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: [
            'naver-pay',
            'toss',
            'payco',
            'kakao-pay',
            'kurlypay-credit',
            'toss-payments',
            'phonebill',
          ],
          hasKurlypayError: false,
        },
      });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
    });
  });

  context('이전 결제수단이 사용 불가 결제수단 목록에 포함되어 있으면', () => {
    it('카카오페이를 선택한다.', () => {
      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.NORMAL,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: ['naver-pay'],
          hasKurlypayError: false,
        },
      });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor).toEqual(KAKAOPAY_VENDOR);
    });
  });

  context('이전 결제수단이 사용 불가 결제수단 목록에 포함되어 있고, 환금성 상품 주문이면', () => {
    it('컬리페이를 선택한다.', () => {
      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.LIQUIDITY,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: ['naver-pay'],
          hasKurlypayError: false,
        },
      });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
    });

    it('컬리페이 장애 상황일 경우 신용카드를 선택한다.', () => {
      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.LIQUIDITY,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: ['naver-pay', 'kurlypay'],
          hasKurlypayError: true,
        },
      });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedVendor).toEqual(TOSSPAYMENTS_VENDOR);
    });
  });

  context('이전결제수단 조회 api가 실패하면', () => {
    it('카카오페이 결제수단으로 변경한다.', async () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isError: true,
      });

      const { store } = renderUsePreviousVendor({
        checkout: {
          checkoutType: CheckoutType.NORMAL,
        },
        checkoutPayment: {
          vendors: formattedPaymentVendorFixture.vendors,
          disableVendorCodes: ['naver-pay'],
          hasKurlypayError: false,
        },
      });

      const { selectedVendor } = store.getState().checkoutPayment;

      expect(selectedVendor).toEqual(KAKAOPAY_VENDOR);
    });
  });
});
