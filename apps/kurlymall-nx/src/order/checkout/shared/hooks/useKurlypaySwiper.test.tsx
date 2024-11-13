import { act } from '@testing-library/react-hooks';
import { Swiper } from 'swiper';

import {
  disableKurlypayVendorWithKB,
  formattedKurlypayVendors,
  KAKAOPAY_COUPON,
  KurlypayBankVendor,
  KurlypayCreditCardVendor,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
  TOSSPAYMENTS_COUPON_WITH_SHINHAN,
} from '../../../../../fixtures';
import { renderHookWithProviders } from '../../../../../util/testutil';
import { initialState as checkoutPaymentInitialState, selectKurlyPay } from '../reducers/checkout-payment.slice';

import useKurlypaySwiper from './useKurlypaySwiper';
import { vendorsFixture } from '../../../../../fixtures/checkout/payment-vendors';
import { CreditCardFixture } from '../../../../../fixtures/checkout/credit-cards';

jest.mock('swiper');

describe('useKurlypaySwiper', () => {
  const renderKurlypaySwiperHook = (preloadedState = {}) =>
    renderHookWithProviders(useKurlypaySwiper, { preloadedState });

  context('changeKurlypayCard', () => {
    const activeIndex = 2;
    const selectedKurlypayVendor = formattedKurlypayVendors[1];

    it('selectKurlyPay가 실행되어 selectedKurlypayVendor가 변경된다.', () => {
      const { result, store } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor,
        },
      });

      result.current.changeKurlypayCard({ activeIndex });

      const { checkoutPayment } = store.getState();

      expect(checkoutPayment.selectedKurlypayVendor).toEqual(formattedKurlypayVendors[activeIndex]);
    });

    context('selectedKurlypayVendor와 변경 될 activeVendor 가 다르면', () => {
      context.each`
        coupon | message
        ${PLCC_COUPON} | ${'컬리페이 컬리카드 전용 쿠폰 사용 시, 컬리페이 컬리카드 결제만 가능합니다. (법인카드 제외)'}
        ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI} | ${'현대카드 전용 쿠폰 사용 시, 현대카드 결제만 가능합니다. (법인카드 제외)'}
        ${TOSSPAYMENTS_COUPON_WITH_SHINHAN} | ${'신한카드 전용 쿠폰 사용 시, 신한카드 결제만 가능합니다. (법인카드 제외)'}
        ${KAKAOPAY_COUPON} | ${'카카오페이 전용 쿠폰 사용 시, 카카오페이 결제만 가능합니다.'}
      `('선택 한 결제수단 전용 쿠폰이 있을 때', ({ coupon, message }) => {
        it('page.message의 상태값이 변경된다.', async () => {
          const { result, store, waitFor } = renderKurlypaySwiperHook({
            checkoutPayment: {
              ...checkoutPaymentInitialState,
              kurlypayVendors: formattedKurlypayVendors,
              vendors: vendorsFixture,
              creditCards: CreditCardFixture,
              selectedKurlypayVendor,
            },
            checkoutCoupon: {
              selectedCoupon: coupon,
            },
          });

          result.current.changeKurlypayCard({ activeIndex });

          await waitFor(() => {
            const { page } = store.getState();

            expect(page.message).toBe(message);
          });
        });
      });
    });
  });

  context('selectedKurlypayVendor 가 변경되면', () => {
    const index = 2;
    const changedVendor = formattedKurlypayVendors[index];

    it('컬리페이 결제수단에서 해당 결제수단의 index를 찾아 swiper.slideTo 를 호출한다.', async () => {
      const { result, store, waitFor } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor: undefined,
        },
      });

      act(() => {
        result.current.setSwiper(new Swiper('mockElement'));
      });

      store.dispatch(selectKurlyPay(changedVendor));

      const { checkoutPayment } = store.getState();

      await waitFor(() => {
        expect(checkoutPayment.selectedKurlypayVendor).toEqual(changedVendor);

        expect(result.current.swiper.slideTo).toBeCalledWith(index, 0);
      });
    });
  });

  context.each([
    { card: KurlypayCreditCardVendor, visible: true },
    { card: KurlypayBankVendor, visible: false },
  ])('선택 된 컬리페이 카드가 신용카드이면', ({ card, visible }) => {
    it('visibleSelectBox 는 true 이다. 아니면 false다.', () => {
      const { result } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor: card,
        },
      });

      expect(result.current.visibleSelectBox).toBe(visible);
    });
  });

  context('컬리페이 결제수단이 있고, 선택한 결제수단이 존재하면', () => {
    it('해당 결제수단의 할부 목록을 return 한다.', () => {
      const { result } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor: KurlypayCreditCardVendor,
        },
      });

      expect(result.current.installmentOptions).toEqual(KurlypayCreditCardVendor.installments);
    });
  });

  context('컬리페이 결제수단이 없으면', () => {
    it('빈 배열을 return 한다.', () => {
      const { result } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: [],
          selectedKurlypayVendor: KurlypayCreditCardVendor,
        },
      });

      expect(result.current.installmentOptions).toEqual([]);
    });
  });

  context('선택한 컬리페이 결제수단이 없으면', () => {
    it('빈 배열을 return 한다.', () => {
      const { result } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor: undefined,
        },
      });

      expect(result.current.installmentOptions).toEqual([]);
    });
  });

  context('선택한 컬리페이 결제수단이 비활성화 되어 있으면', () => {
    it('visibleSelectBox, visibleKurlyCardAccruedPoint, visibleHyundaiPoint 가 false 다', () => {
      const { result } = renderKurlypaySwiperHook({
        checkoutPayment: {
          ...checkoutPaymentInitialState,
          kurlypayVendors: formattedKurlypayVendors,
          selectedKurlypayVendor: disableKurlypayVendorWithKB,
        },
      });

      expect(result.current.visibleSelectBox).toBeFalsy();
      expect(result.current.visibleKurlyCardAccruedPoint).toBeFalsy();
      expect(result.current.visibleHyundaiPoint).toBeFalsy();
    });
  });
});
