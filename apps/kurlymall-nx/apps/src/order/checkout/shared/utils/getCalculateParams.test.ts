import { KURLYPAY_COUPON_WITH_HYUNDAI, TOSSPAYMENTS_COUPON_WITH_HYUNDAI } from '../../../../../fixtures';
import { HYUNDAI_CARD } from '../../../../../fixtures/checkout/credit-cards';
import {
  ADD_KURYPAY_GOST_CARD,
  ADD_PLCC_LOTTIE_CARD,
  KURLYPAY_HYUNDAI_CREDITCARD,
} from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import { EASY_KURLYPAY_VENDOR, TOSSPAYMENTS_VENDOR } from '../../../../../fixtures/checkout/payment-vendors';
import { CardVenderCode } from '../../../../shared/constant';
import { MemberBenefitPolicy } from '../../../../shared/interfaces';
import { getCalculateParams } from './getCalculateParams';

// 가격 계산 API 의 파라미터를 return 하는 util 함수
describe('getCalculateParams 테스트', () => {
  const MOCK_POINT_BENEFIT = {
    grade: '0',
    policy: MemberBenefitPolicy.MEMBER_BENEFIT_POLICY,
    percent: 0,
    description: '',
  };

  context('컬리페이 결제수단이고', () => {
    const selectedVendor = EASY_KURLYPAY_VENDOR;

    context('컬리페이 신용카드 결제수단을 선택하면', () => {
      const selectedKurlypayVendor = KURLYPAY_HYUNDAI_CREDITCARD;

      it('선택한 컬리페이 결제수단의 ID 와 선택한 컬리페이 결제수단의 카드사 ID 를 포함하여 return 한다.', () => {
        const result = getCalculateParams({
          selectedCoupon: undefined,
          usedPoint: 0,
          deliveryPrice: 3000,
          selectedVendor,
          selectedCreditCard: undefined,
          selectedKurlypayVendor,
          isUseAllPoint: false,
          pointBenefit: MOCK_POINT_BENEFIT,
        });

        expect(result.couponCode).toBeNull();
        expect(result.paymentGateways).toBe(selectedVendor.code);
        expect(result.creditCardId).toBe(selectedKurlypayVendor.companyId);
        expect(result.kurlypayPaymentMethodId).toBe(selectedKurlypayVendor.paymentMethodId);
      });
    });

    context('컬리페이의 고스트 카드를 선택하면', () => {
      const selectedKurlypayVendor = ADD_KURYPAY_GOST_CARD;

      it('kurlypayPaymentMethodId 가 null 이다', () => {
        const result = getCalculateParams({
          selectedCoupon: undefined,
          usedPoint: 0,
          deliveryPrice: 3000,
          selectedVendor,
          selectedCreditCard: undefined,
          selectedKurlypayVendor,
          isUseAllPoint: false,
          pointBenefit: MOCK_POINT_BENEFIT,
        });

        expect(result.couponCode).toBeNull();
        expect(result.paymentGateways).toBe(selectedVendor.code);
        expect(result.creditCardId).toBe(selectedKurlypayVendor.companyId);
        expect(result.kurlypayPaymentMethodId).toBeNull();
      });

      it('쿠폰이 선택되어 있으면 쿠폰의 카드사 ID를 return 한다.', () => {
        const selectedCoupon = KURLYPAY_COUPON_WITH_HYUNDAI;
        const result = getCalculateParams({
          selectedCoupon,
          usedPoint: 0,
          deliveryPrice: 3000,
          selectedVendor,
          selectedCreditCard: undefined,
          selectedKurlypayVendor,
          isUseAllPoint: false,
          pointBenefit: MOCK_POINT_BENEFIT,
        });

        expect(result.couponCode).toBe(selectedCoupon.couponCode);
        expect(result.paymentGateways).toBe(selectedVendor.code);
        expect(result.creditCardId).toBe(selectedCoupon.creditCardId);
        expect(result.kurlypayPaymentMethodId).toBeNull();
      });
    });

    context('컬리페이의 로띠카드를 선택하면', () => {
      const selectedKurlypayVendor = ADD_PLCC_LOTTIE_CARD;

      it('kurlypayPaymentMethodId 가 null 이고 creditCardId 가 P1 이다.', () => {
        const result = getCalculateParams({
          selectedCoupon: undefined,
          usedPoint: 0,
          deliveryPrice: 3000,
          selectedVendor,
          selectedCreditCard: undefined,
          selectedKurlypayVendor,
          isUseAllPoint: false,
          pointBenefit: MOCK_POINT_BENEFIT,
        });

        expect(result.couponCode).toBeNull();
        expect(result.paymentGateways).toBe(selectedVendor.code);
        expect(result.creditCardId).toBe(CardVenderCode.KURLYPAY_CARD);
        expect(result.kurlypayPaymentMethodId).toBeNull();
      });
    });
  });

  context('일반 신용카드 결제수단이고', () => {
    const selectedVendor = TOSSPAYMENTS_VENDOR;
    const selectedCreditCard = HYUNDAI_CARD;

    context('일반 신용카드 결제수단 전용 쿠폰을 선택했다면', () => {
      const selectedCoupon = TOSSPAYMENTS_COUPON_WITH_HYUNDAI;

      it('선택한 카드사의 ID를 return 한다.', () => {
        const result = getCalculateParams({
          selectedCoupon,
          usedPoint: 0,
          deliveryPrice: 3000,
          selectedVendor,
          selectedCreditCard,
          selectedKurlypayVendor: undefined,
          isUseAllPoint: false,
          pointBenefit: MOCK_POINT_BENEFIT,
        });

        expect(result.couponCode).toBe(selectedCoupon.couponCode);
        expect(result.paymentGateways).toBe(selectedVendor.code);
        expect(result.creditCardId).toBe(selectedCreditCard.value);
        expect(result.kurlypayPaymentMethodId).toBeNull();
      });
    });
  });

  context('전액 적립금을 사용했다면', () => {
    it('paymentGateways  가 kurly 이다.', () => {
      const result = getCalculateParams({
        selectedCoupon: undefined,
        usedPoint: 0,
        deliveryPrice: 3000,
        selectedVendor: undefined,
        selectedCreditCard: undefined,
        selectedKurlypayVendor: undefined,
        isUseAllPoint: true,
        pointBenefit: MOCK_POINT_BENEFIT,
      });

      expect(result.paymentGateways).toBe('kurly');
    });
  });
});
