import {
  KURLYPAY_CERDIT_VENDOR,
  NAVERPAY_VENDOR,
  TOSSPAYMENTS_VENDOR,
  vendorsFixtureWithKurlyPayCredit,
  vendorsFixture as vendorsFixtureWithTossPayments,
} from '../../../../../fixtures/checkout/payment-vendors';
import { findVendor } from './findVendor';

describe('findVendor', () => {
  context.each(vendorsFixtureWithTossPayments)('결제수단 목록이 있으면', (vendor) => {
    it(`${vendor.code} 결제수단을 찾아 return 한다.`, () => {
      const result = findVendor(vendorsFixtureWithTossPayments, vendor.code);

      expect(result).toEqual(vendor);
    });
  });

  context('결제수단 목록이 없으면', () => {
    it('undefined 를 return 한다.', () => {
      const result = findVendor([], 'kakao-pay');

      expect(result).toBeUndefined();
    });

    it('undefined 를 return 한다.', () => {
      const result = findVendor([NAVERPAY_VENDOR], 'kakao-pay');

      expect(result).toBeUndefined();
    });
  });

  context('결제수단의 신용카드 pg사와 찾으려는 code 의 신용카드사가 다를 때', () => {
    it('결제수단에 있는 신용카드 vendor를 return 한다.', () => {
      const result = findVendor(vendorsFixtureWithTossPayments, 'kurlypay-credit');

      expect(result).toEqual(TOSSPAYMENTS_VENDOR);
    });

    it('결제수단에 있는 신용카드 vendor를 return 한다.', () => {
      const result = findVendor(vendorsFixtureWithKurlyPayCredit, 'toss-payments');

      expect(result).toEqual(KURLYPAY_CERDIT_VENDOR);
    });
  });

  context('결제수단의 신용카드 pg사와 찾으려는 code 의 신용카드사가 같을 때', () => {
    it('결제수단에 있는 신용카드 vendor를 return 한다.', () => {
      const result = findVendor(vendorsFixtureWithKurlyPayCredit, 'kurlypay-credit');

      expect(result).toEqual(KURLYPAY_CERDIT_VENDOR);
    });
  });

  context('code 가 undefined 이면', () => {
    it('undefined 를 return 한다.', () => {
      const result = findVendor(vendorsFixtureWithKurlyPayCredit, undefined);

      expect(result).toBeUndefined();
    });
  });
});
