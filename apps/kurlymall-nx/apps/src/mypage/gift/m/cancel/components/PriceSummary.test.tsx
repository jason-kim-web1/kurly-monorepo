import { render } from '@testing-library/react';

import { addComma, prefixMinus } from '../../../../../shared/services';

import PriceSummary from './PriceSummary';

describe('PriceSummary 테스트', () => {
  given('price', () => ({
    totalDealProductPrice: 0,
    totalDealProductDiscountPrice: 0,
    totalUsedFreePoint: 0,
    totalUsedPaidPoint: 0,
    totalCouponDiscountPrice: 0,
    totalPaymentPrice: 0,
    deliveryPrice: 0,
    totalCardInstantDiscountPrice: 0,
  }));

  const renderPriceSummary = () => render(<PriceSummary price={given.price} />);

  context('모든 값이 존재하면', () => {
    given('price', () => ({
      totalDealProductPrice: 10000,
      totalDealProductDiscountPrice: 1000,
      totalUsedFreePoint: 1000,
      totalUsedPaidPoint: 1000,
      totalCouponDiscountPrice: 1000,
      totalPaymentPrice: 10000,
      deliveryPrice: 3000,
      totalCardInstantDiscountPrice: 2000,
    }));

    it('모든 항목을 볼 수 있다.', () => {
      const { container } = renderPriceSummary();

      const {
        totalDealProductPrice,
        totalDealProductDiscountPrice,
        totalUsedFreePoint,
        totalUsedPaidPoint,
        totalCouponDiscountPrice,
        totalPaymentPrice,
        deliveryPrice,
        totalCardInstantDiscountPrice,
      } = given.price;

      const result = `주문금액${addComma(totalDealProductPrice)}원
상품금액${addComma(totalDealProductPrice)}원
상품할인금액-${addComma(totalDealProductDiscountPrice)}원
배송비+${addComma(deliveryPrice)}원
쿠폰할인-${addComma(totalCouponDiscountPrice)}원
카드즉시할인${prefixMinus(totalCardInstantDiscountPrice)}${addComma(totalCardInstantDiscountPrice)}원
적립금 · 컬리캐시-${addComma(totalUsedFreePoint + totalUsedPaidPoint)}원
적립금-${addComma(totalUsedFreePoint)}원
컬리캐시-${addComma(totalUsedPaidPoint)}원
환불 예정 금액${addComma(totalPaymentPrice)}원
반환 예정 적립금 · 컬리캐시${addComma(totalUsedFreePoint + totalUsedPaidPoint)}원`
        .trim()
        .replace(/\r\n|\n|\r|\t/g, '');

      expect(container).toHaveTextContent(result);
    });
  });
});
