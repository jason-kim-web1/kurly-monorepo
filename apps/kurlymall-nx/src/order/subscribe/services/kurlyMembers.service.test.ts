import { MEMBERS_PRODUCT_CODE } from '../../../shared/constant';
import { readKurlyMembersChangePaymentMethod, readKurlyMembersCheckoutProduct } from '../api/kurlyMembersProduct';
import { getKurlyMembersCheckoutProduct } from './kurlyMembers.service';

jest.mock('../api/kurlyMembersProduct');

describe('getKurlyMembersCheckoutProduct', () => {
  context('첫 구독 주문일 경우', () => {
    const product = {
      name: '유료 멤버십 월 구독상품',
      code: MEMBERS_PRODUCT_CODE,
      price: 1900,
      discountPrice: 1900,
    };

    const order = {
      firstSubscription: true,
      startSettlementDate: '2023-06-29T11:17:34',
    };

    (readKurlyMembersCheckoutProduct as jest.Mock).mockResolvedValueOnce({
      product,
      order,
      nextFreeTicket: null,
      kurlypayPaymentMethodList: [],
      benefitOptionMetaList: [],
      isKurlypayError: false,
    });

    it('firstSubscription 이 true 이고, paymentPrice 가 0 이다.', async () => {
      const result = await getKurlyMembersCheckoutProduct();

      expect(result).toEqual({
        product: {
          name: '유료 멤버십 월 구독상품',
          code: MEMBERS_PRODUCT_CODE,
          originalPrice: 1900,
          paymentPrice: 0,
        },
        order: {
          ...order,
          startSettlementDate: '2023년 06월 29일',
        },
        kurlypayList: [],
        couponPackList: [],
        nextFreeTicket: null,
        isKurlypayError: false,
      });
    });
  });

  context.skip('첫 구독 주문이 아닌 경우', () => {
    const product = {
      name: '유료 멤버십 월 구독상품',
      code: MEMBERS_PRODUCT_CODE,
      price: 1900,
      discountPrice: 0,
    };

    const order = {
      firstSubscription: false,
      startSettlementDate: '2023-06-29T11:17:34',
    };

    (readKurlyMembersCheckoutProduct as jest.Mock).mockResolvedValueOnce({
      product,
      order,
      nextFreeTicket: null,
      kurlypayPaymentMethodList: [],
      benefitOptionMetaList: [],
      isKurlypayError: false,
    });

    it('firstSubscription 이 true 이고, paymentPrice 가 0이 아니다.', async () => {
      const result = await getKurlyMembersCheckoutProduct();

      expect(result).toEqual({
        product: {
          name: '유료 멤버십 월 구독상품',
          code: MEMBERS_PRODUCT_CODE,
          originalPrice: 1900,
          paymentPrice: 1900,
        },
        order: {
          ...order,
          startSettlementDate: '2023년 06월 29일',
        },
        kurlypayList: [],
        couponPackList: [],
        nextFreeTicket: null,
        isKurlypayError: false,
      });
    });
  });
});

describe('getKurlyMembersChangePaymentMethod', () => {
  context('결제수단 변경 조회 API 에서는', () => {
    const product = {
      name: '유료 멤버십 월 구독상품',
      code: MEMBERS_PRODUCT_CODE,
      price: 1900,
      discountPrice: 0,
    };

    const order = {
      startSettlementDate: '2023-06-29T11:17:34',
    };

    (readKurlyMembersChangePaymentMethod as jest.Mock).mockResolvedValueOnce({
      product,
      order,
      nextFreeTicket: null,
      kurlypayPaymentMethodList: [],
      isKurlypayError: false,
    });

    it('paymentPrice 가 0이다.', async () => {
      const result = await getKurlyMembersCheckoutProduct(true);

      expect(result.product.paymentPrice).toBe(0);
    });
  });
});
