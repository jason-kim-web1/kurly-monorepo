import {
  BC_COUPON,
  KAKAOPAY_COUPON,
  KURLYPAY_COUPON_ALL,
  KURLYPAY_COUPON_WITH_HYUNDAI,
  KURLYPAY_COUPON_WITH_KB,
  KURLYPAY_COUPON_WITH_SHINHAN,
  KurlypayAddVendor,
  KurlypayBankVendor,
  KurlypayCardsWithoutPLCC,
  KurlypayCheckCardVendor,
  KurlypayPLCCVendor,
  KurlypayPlccLottieVendor,
  formattedKurlypayVendors as KurlypayVendorsWithPLCC,
  NAVERPAY_COUPON,
  PLCC_COUPON,
  TOSSPAYMENTS_COUPON_WITH_HYUNDAI,
  TOSSPAYMENTS_COUPON_WITH_SHINHAN,
  TOSS_COUPON,
  formattedPaymentVendorFixture,
  formattedKurlypayVendorsWithDisabled,
} from '../../../../../fixtures';
import { BC_CARD, HYUNDAI_CARD, SHINHAN_CARD } from '../../../../../fixtures/checkout/credit-cards';
import {
  DEFAULT_KURLYPAY_VENDORS,
  KURLYPAY_BC_CREDITCARD,
  KURLYPAY_HYUNDAI_CREDITCARD,
  KURLYPAY_SHINHAN_CREDITCARD,
} from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import {
  EASY_KURLYPAY_VENDOR,
  KAKAOPAY_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
  TOSS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { setupStore } from '../../../../shared/store';
import { selectPaymentsByCoupon } from './checkout-coupon.slice';
import { initialState } from './checkout-payment.slice';

describe('checkout coupon slice test', () => {
  describe('selectPaymentsByCoupon(결제수단 전용 쿠폰 선택시)', () => {
    context('일반 신용카드 전용 쿠폰 일 때', () => {
      context('쿠폰이 비씨카드 전용 쿠폰일 경우', () => {
        context('컬리페이 결제수단에 컬리카드(PLCC)가 등록되어 있으면', () => {
          it('컬리카드를 선택한다.', () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: KurlypayVendorsWithPLCC,
              },
            });

            store.dispatch(selectPaymentsByCoupon(BC_COUPON));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayPLCCVendor);
          });
        });

        context('컬리페이 결제수단에 컬리카드(PLCC)가 등록되어 있지 않고', () => {
          context('컬리페이 결제수단에 BC 카드가 등록되어 있으면', () => {
            it('컬리페이의 BC 카드를 선택한다.', () => {
              const store = setupStore({
                checkoutPayment: {
                  ...initialState,
                  vendors: formattedPaymentVendorFixture.vendors,
                  creditCards: formattedPaymentVendorFixture.creditCards,
                  kurlypayVendors: [KURLYPAY_BC_CREDITCARD, ...KurlypayCardsWithoutPLCC],
                },
              });

              store.dispatch(selectPaymentsByCoupon(BC_COUPON));

              const { checkoutPayment } = store.getState();

              expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
              expect(checkoutPayment.selectedKurlypayVendor).toEqual(KURLYPAY_BC_CREDITCARD);
            });
          });

          context('컬리페이 결제수단에 BC 카드가 등록되어 있지 않으면', () => {
            it('일반 신용카드의 BC 카드를 선택한다.', () => {
              const store = setupStore({
                checkoutPayment: {
                  ...initialState,
                  vendors: formattedPaymentVendorFixture.vendors,
                  creditCards: formattedPaymentVendorFixture.creditCards,
                  kurlypayVendors: KurlypayCardsWithoutPLCC,
                },
              });

              store.dispatch(selectPaymentsByCoupon(BC_COUPON));

              const { checkoutPayment } = store.getState();

              expect(checkoutPayment.selectedVendor).toEqual(TOSSPAYMENTS_VENDOR);
              expect(checkoutPayment.selectedCreditCard).toEqual(BC_CARD);
              expect(checkoutPayment.selectedInstallment).toEqual({ name: '일시불', value: '0' });
            });
          });
        });
      });

      context('쿠폰이 비씨카드 이외의 전용 쿠폰일 경우', () => {
        context.each`
          coupon | companyName | selectedKurlypayVendor
          ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI} | ${'현대'} | ${KURLYPAY_HYUNDAI_CREDITCARD}
          ${TOSSPAYMENTS_COUPON_WITH_SHINHAN} | ${'신한'} | ${KURLYPAY_SHINHAN_CREDITCARD}
        `(
          `컬리페이 결제수단에 전용쿠폰의 카드가 등록되어 있으면`,
          ({ coupon, companyName, selectedKurlypayVendor }) => {
            it(`컬리페이 결제수단에서 ${companyName} 카드를 선택한다`, () => {
              const store = setupStore({
                checkoutPayment: {
                  ...initialState,
                  vendors: formattedPaymentVendorFixture.vendors,
                  creditCards: formattedPaymentVendorFixture.creditCards,
                  kurlypayVendors: [selectedKurlypayVendor, ...KurlypayVendorsWithPLCC],
                },
              });

              store.dispatch(selectPaymentsByCoupon(coupon));

              const { checkoutPayment } = store.getState();

              expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
              expect(checkoutPayment.selectedKurlypayVendor).toEqual(selectedKurlypayVendor);
            });
          },
        );

        context.each`
          coupon | companyName | creditCard
          ${TOSSPAYMENTS_COUPON_WITH_HYUNDAI} | ${'현대'} | ${HYUNDAI_CARD}
          ${TOSSPAYMENTS_COUPON_WITH_SHINHAN} | ${'신한'} | ${SHINHAN_CARD}
        `(`컬리페이 결제수단에 전용쿠폰의 카드가 등록되어 있지 않으면`, ({ coupon, companyName, creditCard }) => {
          it(`일반 신용카드 결제수단에서 ${companyName} 카드를 선택한다`, () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: formattedPaymentVendorFixture.kurlypayVendors,
              },
            });

            store.dispatch(selectPaymentsByCoupon(coupon));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(TOSSPAYMENTS_VENDOR);
            expect(checkoutPayment.selectedCreditCard).toEqual(creditCard);
            expect(checkoutPayment.selectedInstallment).toEqual({ name: '일시불', value: '0' });
          });
        });
      });
    });

    context('컬리페이 신용카드 전용 쿠폰일 때', () => {
      context('쿠폰이 컬리카드 전용 쿠폰일 경우', () => {
        context('컬리페이 결제수단에 컬리카드(PLCC)가 등록되어 있으면', () => {
          it('컬리카드를 선택한다.', () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: KurlypayVendorsWithPLCC,
              },
            });

            store.dispatch(selectPaymentsByCoupon(PLCC_COUPON));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayPLCCVendor);
          });
        });

        context('컬리페이 결제수단에 컬리카드(PLCC)가 등록되어 있지 않으면', () => {
          it('컬리카드 추가(PLCC 로띠) 카드를 선택한다.', () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: KurlypayCardsWithoutPLCC,
              },
            });

            store.dispatch(selectPaymentsByCoupon(PLCC_COUPON));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayPlccLottieVendor);
          });
        });
      });

      context('쿠폰이 컬리페이-전체카드사 전용 쿠폰일 경우', () => {
        context('컬리페이 결제수단이 있으면', () => {
          it('첫 번째 컬리페이 신용카드 결제수단을 선택한다.', () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: [
                  KurlypayBankVendor, // 국민은행 계좌
                  KURLYPAY_HYUNDAI_CREDITCARD, // 현대 신용카드
                  ...DEFAULT_KURLYPAY_VENDORS,
                ],
              },
            });

            store.dispatch(selectPaymentsByCoupon(KURLYPAY_COUPON_ALL));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KURLYPAY_HYUNDAI_CREDITCARD);
          });
        });

        context('컬리페이 결제수단이 없으면', () => {
          it('컬리페이 고스트카드를 선택한다.', () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: [
                  KurlypayBankVendor, // 국민은행 계좌
                  ...DEFAULT_KURLYPAY_VENDORS,
                ],
              },
            });

            store.dispatch(selectPaymentsByCoupon(KURLYPAY_COUPON_ALL));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayAddVendor);
          });
        });
      });

      context('쿠폰이 PLCC 이외의 전용 쿠폰일 경우', () => {
        context.each`
          coupon | companyName | selectedKurlypayVendor
          ${KURLYPAY_COUPON_WITH_KB} | ${'국민'} | ${KurlypayCheckCardVendor}
          ${KURLYPAY_COUPON_WITH_HYUNDAI} | ${'현대'} | ${KURLYPAY_HYUNDAI_CREDITCARD}
          ${KURLYPAY_COUPON_WITH_SHINHAN} | ${'신한'} | ${KURLYPAY_SHINHAN_CREDITCARD}
        `(
          `컬리페이 결제수단에 전용쿠폰의 카드가 등록되어 있으면`,
          ({ coupon, companyName, selectedKurlypayVendor }) => {
            it(`컬리페이 결제수단에서 ${companyName} 카드를 선택한다`, () => {
              const store = setupStore({
                checkoutPayment: {
                  ...initialState,
                  vendors: formattedPaymentVendorFixture.vendors,
                  creditCards: formattedPaymentVendorFixture.creditCards,
                  kurlypayVendors: [selectedKurlypayVendor, ...KurlypayVendorsWithPLCC],
                },
              });

              store.dispatch(selectPaymentsByCoupon(coupon));

              const { checkoutPayment } = store.getState();

              expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
              expect(checkoutPayment.selectedKurlypayVendor).toEqual(selectedKurlypayVendor);
            });
          },
        );

        context.each`
          coupon
          ${KURLYPAY_COUPON_WITH_HYUNDAI}
          ${KURLYPAY_COUPON_WITH_SHINHAN}
        `(`컬리페이 결제수단에 전용쿠폰의 카드가 등록되어 있지 않으면`, ({ coupon }) => {
          it(`고스트 카드를 선택한다`, () => {
            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: [KurlypayPlccLottieVendor, KurlypayAddVendor],
              },
            });

            store.dispatch(selectPaymentsByCoupon(coupon));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayAddVendor);
          });
        });

        context('등록되어 있어도 disabled 된 상태이면', () => {
          it('해당 카드사를 선택하지 않는다.', () => {
            const coupon = KURLYPAY_COUPON_WITH_KB;

            const store = setupStore({
              checkoutPayment: {
                ...initialState,
                vendors: formattedPaymentVendorFixture.vendors,
                creditCards: formattedPaymentVendorFixture.creditCards,
                kurlypayVendors: formattedKurlypayVendorsWithDisabled,
              },
            });

            store.dispatch(selectPaymentsByCoupon(coupon));

            const { checkoutPayment } = store.getState();

            expect(checkoutPayment.selectedVendor).toEqual(EASY_KURLYPAY_VENDOR);
            expect(checkoutPayment.selectedKurlypayVendor).toEqual(KurlypayAddVendor);
          });
        });
      });
    });

    context.each`
      coupon | vendor
      ${KAKAOPAY_COUPON} | ${KAKAOPAY_VENDOR}
      ${NAVERPAY_COUPON} | ${NAVERPAY_VENDOR}
      ${TOSS_COUPON} | ${TOSS_VENDOR}
    `('간편결제 결제수단 전용 쿠폰 일 때', ({ coupon, vendor }) => {
      it(`${vendor.name} 전용 쿠폰이면 ${vendor.name}로 결제수단을 변경한다.`, () => {
        const store = setupStore({
          checkoutPayment: {
            ...initialState,
            vendors: formattedPaymentVendorFixture.vendors,
            creditCards: formattedPaymentVendorFixture.creditCards,
            kurlypayVendors: KurlypayCardsWithoutPLCC,
          },
        });

        store.dispatch(selectPaymentsByCoupon(coupon));

        const { checkoutPayment } = store.getState();

        expect(checkoutPayment.selectedVendor).toEqual(vendor);
      });
    });
  });
});
