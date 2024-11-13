import { CreditCardFixture } from '../../../../../../fixtures/checkout/credit-cards';
import { KURLYPAY_BC_CREDITCARD } from '../../../../../../fixtures/checkout/kurlypayVendors.fixtures';
import {
  EASY_KURLYPAY_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
  vendorsFixture,
} from '../../../../../../fixtures/checkout/payment-vendors';
import { CardVenderCode } from '../../../../../shared/constant';
import { EasyPaymentType } from '../../../../../shared/interfaces';
import { CreditCard } from '../../../../shared/shared/interfaces';
import { findPaymentVendor } from './findPaymentVendor';

describe('findPaymentVendor', () => {
  context('선택한 결제수단을 결제수단 목록에서 찾울 수 없다면', () => {
    it('undefined 를 return 한다.', () => {
      const vendor = findPaymentVendor({
        selectedVendor: TOSSPAYMENTS_VENDOR,
        vendors: [],
        creditCards: CreditCardFixture,
      });

      expect(vendor).toBeUndefined();
    });
  });

  context('결제수단이 일반 신용카드라면', () => {
    const selectedCreditCard: CreditCard = {
      name: '현대',
      value: CardVenderCode.HYUNDAI_CARD,
    };

    it('신용카드 목록에 카드가 없을 경우 undefined 를 return 한다.', () => {
      const vendor = findPaymentVendor({
        selectedVendor: TOSSPAYMENTS_VENDOR,
        selectedCreditCard,
        vendors: vendorsFixture,
        creditCards: [],
      });

      expect(vendor).toBeUndefined();
    });

    it('선택한 신용카드가 없을 경우 undefined 를 return 한다.', () => {
      const vendor = findPaymentVendor({
        selectedVendor: TOSSPAYMENTS_VENDOR,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
      });

      expect(vendor).toBeUndefined();
    });

    it('신용카드목록에서 결제수단을 찾아 return 한다.', () => {
      const vendor = findPaymentVendor({
        selectedVendor: TOSSPAYMENTS_VENDOR,
        selectedCreditCard,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
      });

      expect(vendor).toEqual({
        code: 'toss-payments',
        cardId: '61',
        name: '현대카드',
      });
    });
  });

  context('결제수단이 컬리페이라면', () => {
    context('사용자가 선택한 컬리페이 결제수단이 있을 때', () => {
      it('선택한 컬리페이 결제수단을 return 한다.', () => {
        const vendor = findPaymentVendor({
          selectedVendor: EASY_KURLYPAY_VENDOR,
          selectedKurlypayVendor: KURLYPAY_BC_CREDITCARD,
          selectedCreditCard: undefined,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
        });

        expect(vendor).toEqual({
          code: 'kurlypay',
          cardId: '31',
          name: 'BC카드',
          easyPaymentType: EasyPaymentType.CARD,
          cardHolderType: 'personal',
        });
      });
    });

    context('사용자가 등록한 컬리페이 결제수단이 없을 때', () => {
      it('undefined 를 return 한다.', () => {
        const vendor = findPaymentVendor({
          selectedVendor: EASY_KURLYPAY_VENDOR,
          selectedKurlypayVendor: undefined,
          selectedCreditCard: undefined,
          vendors: vendorsFixture,
          creditCards: CreditCardFixture,
        });

        expect(vendor).toBeUndefined();
      });
    });
  });

  context('결제수단이 간편결제라면', () => {
    it('결제수단 목록에서 찾아 return 한다.', () => {
      const vendor = findPaymentVendor({
        selectedVendor: NAVERPAY_VENDOR,
        selectedCreditCard: undefined,
        vendors: vendorsFixture,
        creditCards: CreditCardFixture,
      });

      expect(vendor).toEqual({
        code: 'naver-pay',
        cardId: null,
        name: '네이버페이',
      });
    });
  });
});
