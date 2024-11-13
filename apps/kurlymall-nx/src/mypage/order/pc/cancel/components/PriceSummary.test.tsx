import { render } from '@testing-library/react';

import { addComma } from '../../../../../shared/services';

import PriceSummary from './PriceSummary';

describe('PriceSummary 테스트', () => {
  given('price', () => ({
    totalDisplayProductsPrice: 0,
    totalDisplayProductsDiscountPrice: 0,
    totalUsedFreePoint: 0,
    totalUsedPaidPoint: 0,
    totalCouponDiscountPrice: 0,
    totalPaymentPrice: 0,
    totalCardInstantDiscountPrice: 0,
    deliveryPrice: 0,
  }));

  const renderPriceSummary = () => render(<PriceSummary price={given.price} />);

  context('모든 값이 존재하면', () => {
    given('price', () => ({
      totalDisplayProductsPrice: 10000,
      totalDisplayProductsDiscountPrice: 1000,
      totalUsedFreePoint: 1000,
      totalUsedPaidPoint: 1000,
      totalCouponDiscountPrice: 1000,
      totalPaymentPrice: 10000,
      totalCardInstantDiscountPrice: 30000,
      deliveryPrice: 3000,
    }));

    it('모든 항목을 볼 수 있다.', () => {
      const { container } = renderPriceSummary();

      const {
        totalDisplayProductsPrice,
        totalDisplayProductsDiscountPrice,
        totalUsedFreePoint,
        totalUsedPaidPoint,
        totalCouponDiscountPrice,
        totalPaymentPrice,
        totalCardInstantDiscountPrice,
        deliveryPrice,
      } = given.price;

      const totalUsePoint = totalUsedFreePoint + totalUsedPaidPoint;

      const result = `주문금액${addComma(totalDisplayProductsPrice)}원
상품금액${addComma(totalDisplayProductsPrice)}원
상품할인금액-${addComma(totalDisplayProductsDiscountPrice)}원
배송비+${addComma(deliveryPrice)}원
쿠폰할인-${addComma(totalCouponDiscountPrice)}원
카드즉시할인-${addComma(totalCardInstantDiscountPrice)}원
적립금 · 컬리캐시-${addComma(totalUsePoint)}원
적립금-${addComma(totalUsedFreePoint)}원
컬리캐시-${addComma(totalUsedPaidPoint)}원
환불 예정 금액${addComma(totalPaymentPrice)}원
반환 예정 적립금 · 컬리캐시${addComma(totalUsePoint)}원`
        .trim()
        .replace(/\r\n|\n|\r|\t/g, '');

      expect(container).toHaveTextContent(result);
    });
  });
});
