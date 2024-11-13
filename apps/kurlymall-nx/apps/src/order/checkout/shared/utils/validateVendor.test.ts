import { KB_CARD } from '../../../../../fixtures/checkout/credit-cards';
import {
  EASY_KURLYPAY_VENDOR,
  KAKAOPAY_VENDOR,
  KURLYPAY_CERDIT_VENDOR,
  TOSSPAYMENTS_VENDOR,
} from '../../../../../fixtures/checkout/payment-vendors';
import { validateVendor } from './validateVendor';
import { ADD_KURYPAY_GOST_CARD, ADD_PLCC_LOTTIE_CARD } from '../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import { disableKurlypayVendorWithKB } from '../../../../../fixtures';

describe('validateVendor - 결제 수단 검증 테스트', () => {
  context('모든 값이 올바르면 - 간편 결제 케이스', () => {
    given('params', () => ({
      selectedVendor: KAKAOPAY_VENDOR,
      selectedCreditCard: undefined,
      selectedInstallment: undefined,
    }));

    it('에러 메세지를 반환하지 않는다.', () => {
      const { errorMessage, documentId } = validateVendor(given.params);

      expect(errorMessage).toBe('');
      expect(documentId).toBe('');
    });
  });

  context.each([TOSSPAYMENTS_VENDOR, KURLYPAY_CERDIT_VENDOR])(
    '모든 값이 올바르면 - 신용카드 결제 케이스',
    (creditCardVendor) => {
      given('params', () => ({
        selectedVendor: creditCardVendor,
        selectedCreditCard: KB_CARD,
        selectedInstallment: { name: '일시불', value: '0' },
      }));

      it('에러 메세지를 반환하지 않는다.', () => {
        const { errorMessage, documentId } = validateVendor(given.params);

        expect(errorMessage).toBe('');
        expect(documentId).toBe('');
      });
    },
  );

  context('신용카드 결제 - 결제수단을 선택하지 않았으면', () => {
    given('params', () => ({
      selectedVendor: undefined,
      selectedCreditCard: undefined,
      selectedInstallment: undefined,
    }));

    it('에러 메세지 결제수단을 선택해주세요. 를 반환한다.', () => {
      const { errorMessage, documentId } = validateVendor(given.params);

      expect(errorMessage).toBe('결제수단을 선택해주세요.');
      expect(documentId).toBe('payment-methods');
    });
  });

  context.each([TOSSPAYMENTS_VENDOR, KURLYPAY_CERDIT_VENDOR])(
    '신용카드 결제 - 신용카드를 선택하지 않았으면',
    (creditCardVendor) => {
      given('params', () => ({
        selectedVendor: creditCardVendor,
        selectedCreditCard: undefined,
        selectedInstallment: { name: '일시불', value: '0' },
      }));

      it('에러 메세지 신용카드를 선택해주세요. 를 반환한다.', () => {
        const { errorMessage, documentId } = validateVendor(given.params);

        expect(errorMessage).toBe('신용카드를 선택해주세요.');
        expect(documentId).toBe('payment-methods');
      });
    },
  );

  context.each([TOSSPAYMENTS_VENDOR, KURLYPAY_CERDIT_VENDOR])(
    '신용카드 결제 - 할부 기간을 선택하지 않았으면',
    (creditCardVendor) => {
      given('params', () => ({
        selectedVendor: creditCardVendor,
        selectedCreditCard: KB_CARD,
        selectedInstallment: undefined,
      }));

      it('에러 메세지 할부 기간을 선택해주세요. 를 반환한다.', () => {
        const { errorMessage, documentId } = validateVendor(given.params);

        expect(errorMessage).toBe('할부 기간을 선택해주세요.');
        expect(documentId).toBe('payment-methods');
      });
    },
  );

  context('컬리페이 결제수단이고', () => {
    context.each([ADD_KURYPAY_GOST_CARD, ADD_PLCC_LOTTIE_CARD])(
      '고스트카드 또는 PLCC 추가 카드면',
      (selectedKurlypayVendor) => {
        given('params', () => ({
          selectedVendor: EASY_KURLYPAY_VENDOR,
          selectedCreditCard: undefined,
          selectedInstallment: undefined,
          selectedKurlypayVendor,
        }));

        it('에러 메세지 결제수단을 선택해주세요. 를 반환한다.', () => {
          const { errorMessage, documentId } = validateVendor(given.params);

          expect(errorMessage).toBe('결제수단을 선택해주세요.');
          expect(documentId).toBe('payment-methods');
        });
      },
    );

    context('disabled 된 결제수단이면', () => {
      given('params', () => ({
        selectedVendor: EASY_KURLYPAY_VENDOR,
        selectedCreditCard: undefined,
        selectedInstallment: undefined,
        selectedKurlypayVendor: disableKurlypayVendorWithKB,
      }));

      it('에러 메세지 "해당 상품 구매시 선택하신 카드는 사용이 제한됩니다." 를 반환한다.', () => {
        const { errorMessage, documentId } = validateVendor(given.params);

        expect(errorMessage).toBe('해당 상품 구매시 선택하신 카드는 사용이 제한됩니다.');
        expect(documentId).toBe('payment-methods');
      });
    });
  });
});
