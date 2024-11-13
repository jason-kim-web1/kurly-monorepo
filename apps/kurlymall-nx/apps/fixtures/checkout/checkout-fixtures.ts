import { CheckoutProductItem, ProductGroupsByDeliveryPolicy } from '../../src/shared/interfaces';

export const mockCheckoutProducts: CheckoutProductItem[] = [
  {
    id: 10043000,
    dealProductNo: 10043000,
    dealProductName: '[사옹원] 씨앗 호떡',
    contentProductNo: 5043000,
    contentProductName: '[사옹원] 씨앗 호떡',
    price: 4820,
    discountedPrice: 0,
    quantity: 1,
    thumbnailUrl: 'https://img-cf-perf.kurly.com/shop/data/goods/1572845594623l0.jpg',
    isPickupProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
    isCouponBlacklist: false,
  },
  {
    id: 10110157,
    dealProductNo: 10110157,
    dealProductName: '[초코모드] 루비 초콜릿 마쉬멜로우 하트 틴 250g',
    contentProductNo: 5110157,
    contentProductName: '[초코모드] 루비 초콜릿 마쉬멜로우 하트 틴 250g',
    price: 19900,
    discountedPrice: 0,
    quantity: 2,
    thumbnailUrl: 'https://img-cf-perf.kurly.com/shop/data/goods/164238533695l0.jpg',
    isPickupProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
    isCouponBlacklist: false,
  },
  {
    id: 10027544,
    dealProductNo: 10027544,
    dealProductName: '[선물세트] 떼레발 실론 드림스 9 싱글_쇼핑백증정',
    contentProductNo: 5027544,
    contentProductName: '[선물세트] 떼레발 실론 드림스 9 싱글_쇼핑백증정',
    price: 1555000,
    discountedPrice: 0,
    quantity: 1,
    thumbnailUrl: 'https://img-cf-perf.kurly.com/shop/data/goods/1532685372671l0.jpg',
    isPickupProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
    isCouponBlacklist: false,
  },
  {
    id: 10004001,
    dealProductNo: 10004001,
    dealProductName: '[선물세트] 유명산지 곶감세트 2kg',
    contentProductNo: 5004001,
    contentProductName: '[선물세트] 유명산지 곶감세트 2kg',
    price: 99000,
    discountedPrice: 0,
    quantity: 2,
    thumbnailUrl: 'https://img-cf-perf.kurly.com/shop/data/goods/1494493003360l0.jpg',
    isPickupProduct: false,
    isReservable: false,
    isAlcoholDealProduct: false,
    isGiftCard: false,
    isCouponBlacklist: false,
  },
];

export const mockGiftCheckoutProduct: CheckoutProductItem[] = [
  {
    id: 1000034875,
    contentProductName: '[선물세트] 떼레발 실론 드림스 9 싱글_쇼핑백증정',
    contentProductNo: 1000034874,
    dealProductName: '[선물세트] 떼레발 실론 드림스 9 싱글_쇼핑백증정',
    dealProductNo: 1000034875,
    discountedPrice: 0,
    isAlcoholDealProduct: false,
    isPickupProduct: false,
    isReservable: false,
    price: 1555000,
    quantity: 1,
    thumbnailUrl: 'https://product-image-stg.kurly.com/product/image/74d239ac-1ddf-4377-8b66-9af20d180c02.png',
    isGiftCard: false,
    isCouponBlacklist: false,
  },
];

export const mockGiveawayProducts: CheckoutProductItem[] = [
  {
    contentProductName: '[증정상품] [수정금지][증정][로얄] 샹스 오 후레쉬 헤어미스트 35ml',
    contentProductNo: 1000052258,
    dealProductName: '[증정상품] [수정금지][증정][로얄] 샹스 오 후레쉬 헤어미스트 35ml',
    dealProductNo: 1000052257,
    discountedPrice: 0,
    id: 1000052257,
    isAlcoholDealProduct: false,
    isPickupProduct: false,
    isReservable: false,
    price: 0,
    quantity: 1,
    isGiftCard: false,
    isCouponBlacklist: false,
  },
];

export const mockGiftCardCheckoutProduct: CheckoutProductItem[] = [
  {
    id: 1000034875,
    contentProductName: '(상품권)',
    contentProductNo: 1000034874,
    dealProductName: '컬리 상품권 3만원권',
    dealProductNo: 1000034875,
    discountedPrice: 30000,
    isAlcoholDealProduct: false,
    isPickupProduct: false,
    isReservable: false,
    price: 43000,
    quantity: 1,
    thumbnailUrl: 'https://product-image-stg.kurly.com/product/image/74d239ac-1ddf-4377-8b66-9af20d180c02.png',
    isGiftCard: false,
    isCouponBlacklist: false,
  },
];

export const mockCheckoutProductGroupsByDeliveryPolicies: ProductGroupsByDeliveryPolicy[] = [
  {
    deliveryPolicy: 'DAWN',
    deliveryPolicyDisplayName: '샛별배송',
    productGroups: [
      {
        partnerName: '컬리',
        isKurlyFulfillmentProduct: true,
        products: mockCheckoutProducts,
      },
    ],
  },
  {
    deliveryPolicy: 'INTERNATIONAL_DIRECT',
    deliveryPolicyDisplayName: '해외직배송',
    productGroups: [
      {
        partnerName: '주식회사 카카오게임즈',
        isKurlyFulfillmentProduct: false,
        products: mockCheckoutProducts,
      },
      {
        partnerName: '주식회사 카카오게임즈',
        isKurlyFulfillmentProduct: false,
        products: mockCheckoutProducts,
      },
    ],
  },
];
