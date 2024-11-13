import { checkCancelable, getOrderDetail, parseOrderSummary } from './cancel-order.service';

import { GiftOrderStatus } from '../enum/GiftOrderStatus.enum';
import { mockGiftDetails } from '../../../../../fixtures';
import { GiftDetailItem, GiftDetails } from '../../../../shared/interfaces/Gift';

describe('parseSummary 테스트', () => {
  const mock: GiftDetails = mockGiftDetails;

  context('주문이 없으면', () => {
    given('products', () => []);
    given('suffixName', () => '건');

    it('빈 값을 반환한다.', () => {
      const result = parseOrderSummary({
        products: given.products,
        suffixName: given.suffixName,
      });

      expect(result).toStrictEqual('');
    });
  });

  context('주문이 있으면', () => {
    given('products', () => mock.products);
    given('suffixName', () => '건');

    it('첫번째 값을 반환한다.', () => {
      const result = parseOrderSummary({
        products: given.products,
        suffixName: given.suffixName,
      });

      const productNames: string[] = given.products.map(({ dealProductName }: GiftDetailItem) => dealProductName);

      expect(result).toStrictEqual(productNames[0]);
    });
  });
});

describe('getOrderDetail 테스트', () => {
  const mock: GiftDetails = mockGiftDetails;

  context('주문이 없으면', () => {
    given('orders', () => []);
    given('suffixName', () => '건');

    it('빈 값과 0원 가격정보를 반환한다.', () => {
      const result = getOrderDetail(given.orders);

      expect(result).toStrictEqual({
        summary: '',
        price: {
          totalDealProductPrice: 0,
          totalDealProductDiscountPrice: 0,
          totalCouponDiscountPrice: 0,
          totalUsedFreePoint: 0,
          totalUsedPaidPoint: 0,
          totalPaymentPrice: 0,
          totalAccruedPoint: 0,
          deliveryPrice: 0,
          totalCardInstantDiscountPrice: 0,
        },
      });
    });
  });

  context('주문이 있으면', () => {
    given('orders', () => mock);
    given('suffixName', () => '건');

    it('값을 반환한다.', () => {
      const result = getOrderDetail(given.orders);

      const { products, payment } = given.orders;

      expect(result).toStrictEqual({
        summary: products[0].dealProductName,
        price: {
          totalDealProductPrice: payment.totalDisplayProductsPrice,
          totalDealProductDiscountPrice: payment.totalDisplayProductsDiscountPrice,
          totalCouponDiscountPrice: payment.totalCouponDiscountPrice,
          totalUsedFreePoint: payment.totalUsedFreePoint,
          totalUsedPaidPoint: payment.totalUsedPaidPoint,
          totalPaymentPrice: payment.totalPaymentPrice,
          totalAccruedPoint: payment.totalAccruedPoint,
          deliveryPrice: payment.deliveryPrice,
          totalCardInstantDiscountPrice: payment.totalCardInstantDiscountPrice,
        },
      });
    });
  });
});

describe('checkCancelable 테스트', () => {
  context('isSelfCancelable: true 이나 orderStatus 가 COMPLETED 가 아니면', () => {
    it.each([
      {
        isSelfCancelable: false,
        orderStatus: GiftOrderStatus.ACCEPTED,
        error: '배송준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
      },
      {
        isSelfCancelable: false,
        orderStatus: GiftOrderStatus.DELIVERED,
        error: '배송이 완료되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
      },
      {
        isSelfCancelable: false,
        orderStatus: GiftOrderStatus.CANCELED,
        error: '이미 취소된 상품이 포함되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
      },
      {
        isSelfCancelable: false,
        orderStatus: GiftOrderStatus.REJECTED,
        error: '이미 취소된 상품이 포함되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
      },
      {
        isSelfCancelable: false,
        orderStatus: GiftOrderStatus.READY_FOR_ACCEPT,
        error: '상품준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.',
      },
    ])('orderStatus 에 따라 error 를 return 한다.', ({ orderStatus, error, isSelfCancelable }) => {
      const result = checkCancelable({
        isSelfCancelable,
        orderStatus,
      });

      expect(result).toStrictEqual(error);
    });
  });
});
