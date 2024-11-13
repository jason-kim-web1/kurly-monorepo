import { isViewPackage, isViewPackagePaymentResult } from './viewPackage';

describe('주문서의 포장방법 영역 노출 여부 util 테스트', () => {
  context('재사용 포장재를 구입하는 경우', () => {
    it('true를 return 한다.', () => {
      const result = isViewPackage({
        isPickupOrder: false,
        hasKurlyFulfillmentAndDeliveryProduct: true,
        reusablePackageAvailability: {
          isPersonalBagAvailable: false,
          isKurlyPurpleBoxAvailable: true,
        },
      });

      expect(result).toBeTruthy();
    });
  });

  context('셀프픽업 상품일 경우', () => {
    it('false를 return 한다.', () => {
      // 재사용 포장재를 구입하면서 셀프픽업 상품을 구입할 수 없음.
      const result = isViewPackage({
        isPickupOrder: true,
        hasKurlyFulfillmentAndDeliveryProduct: false,
        reusablePackageAvailability: {
          isPersonalBagAvailable: false,
          isKurlyPurpleBoxAvailable: false,
        },
      });

      expect(result).toBeFalsy();
    });
  });

  context('3P 상품일 경우', () => {
    it('false를 return 한다.', () => {
      const result = isViewPackage({
        isPickupOrder: true,
        hasKurlyFulfillmentAndDeliveryProduct: false,
        reusablePackageAvailability: {
          isPersonalBagAvailable: false,
          isKurlyPurpleBoxAvailable: false,
        },
      });

      expect(result).toBeFalsy();
    });
  });
});

describe('주문완료의 포장방법 영역 노출 여부 util 테스트', () => {
  context('포장방법이 PAPER인 경우', () => {
    it('false를 return 한다.', () => {
      const result = isViewPackagePaymentResult({
        packageType: 'PAPER',
      });

      expect(result).toBeFalsy();
    });
  });
});
