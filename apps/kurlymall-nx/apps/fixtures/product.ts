import {
  CheckoutProductsServiceResponse,
  CheckoutType,
  GiftProductsServiceResponse,
  SiteType,
} from '../src/shared/interfaces';
import { SellerType } from '../src/shared/interfaces/UserTerms';

export const productDetailFixtures: CheckoutProductsServiceResponse = {
  products: [
    {
      isCouponBlacklist: false,
      id: 10052000,
      dealProductNo: 1,
      dealProductName: '설화수 로션',
      contentProductNo: 5052000,
      contentProductName: '설화수 3종',
      thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
      quantity: 3,
      price: 52000,
      discountedPrice: 2000,
      isPickupProduct: false,
      isReservable: false,
      isAlcoholDealProduct: false,
      isGiftCard: false,
    },
  ],
  productGroupsByDeliveryPolicies: [
    {
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
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
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
        },
        {
          partnerName: '주식회사 카카오게임즈',
          isKurlyFulfillmentProduct: false,
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
        },
      ],
    },
  ],
  isReusablePackage: false,
  isPickupOrder: false,
  isGiftCardOrder: false,
  giveawayProducts: [],
  isEventProducts: false,
  isDirectCheckout: false,
  coupons: [
    {
      couponCode: '824790806',
      endAt: '2022-03-10T00:00:00',
      usable: true,
      totalCouponDiscount: 3000,
      paymentGateways: ['toss-payments'],
      creditCardId: '41',
      pointAllowed: true,
      name: '쿠폰 이름',
      description: '쿠폰 설명',
      value: 3000,
      type: 'PRICE_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
  ],
  price: {
    totalPrice: 156000,
    discountPrice: 6000,
    expectedPoint: 7800,
    couponDiscountPrice: 0,
    paymentPrice: 150000,
    deliveryPrice: 0,
    deliveryPriceDiscountReason: 'KURLY_PASS_ACTIVATED',
    usedPlccPoint: 0,
    kurlycardAccruedPoint: 0,
    usedFreePoint: 0,
    usedPaidPoint: 0,
  },
  reusablePackage: {
    viewPackage: true,
    defaultSelected: 'KURLY',
    selected: 'KURLY',
    available: {
      personalBag: true,
      kurlyBag: true,
    },
  },
  hasReservableProducts: false,
  hasKurlyFulfillmentAndDeliveryProduct: true,
  hasNonDeliveryProduct: false,
  isLuckyBoxOrder: false,
  isGiftOrder: false,
  deliveryNotice: '23시까지 주문하면 내일 밤에 도착해요.',
  personalInfoAgreement: {
    isVisibleThirdPartyAgree: true,
    terms: [
      {
        names: ['에코스미스'],
        type: SellerType.AS,
      },
    ],
  },
  joinOrder: null,
  availablePoint: {
    free: 0,
    paid: 0,
  },
  checkoutType: CheckoutType.NORMAL,
  hasInternationalDirectProduct: false,
};

export const giftProductDetailFixtures: GiftProductsServiceResponse = {
  products: [
    {
      isCouponBlacklist: false,
      id: 1000034875,
      dealProductNo: 1000034875,
      dealProductName: '꼬꼬노리 선물세트(선물)',
      contentProductNo: 1000034874,
      contentProductName: '(선물하기) 컬리판매가5',
      price: 43000,
      discountedPrice: 3000,
      quantity: 1,
      thumbnailUrl: 'https://product-image-stg.kurly.com/product/image/74d239ac-1ddf-4377-8b66-9af20d180c02.png',
      isPickupProduct: false,
      isReservable: false,
      isAlcoholDealProduct: false,
      isGiftCard: false,
    },
  ],
  productGroupsByDeliveryPolicies: [
    {
      deliveryPolicy: 'DAWN',
      deliveryPolicyDisplayName: '샛별배송',
      productGroups: [
        {
          partnerName: '컬리',
          isKurlyFulfillmentProduct: true,
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
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
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
        },
        {
          partnerName: '주식회사 카카오게임즈',
          isKurlyFulfillmentProduct: false,
          products: [
            {
              isCouponBlacklist: false,
              id: 10052000,
              dealProductNo: 1,
              dealProductName: '설화수 로션',
              contentProductNo: 5052000,
              contentProductName: '설화수 3종',
              thumbnailUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
              quantity: 3,
              price: 52000,
              discountedPrice: 2000,
              isPickupProduct: false,
              isReservable: false,
              isAlcoholDealProduct: false,
              isGiftCard: false,
            },
          ],
        },
      ],
    },
  ],
  isPickupOrder: false,
  isGiftOrder: true,
  giveawayProducts: [],
  isReusablePackage: false,
  isEventProducts: false,
  isLuckyBoxOrder: false,
  coupons: [
    {
      couponCode: '264753987',
      endAt: null,
      usable: true,
      totalCouponDiscount: 32000,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '정율할인 테스트',
      description: '정율할인 테스트',
      value: 80,
      type: 'PERCENT_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '259937231',
      endAt: null,
      usable: true,
      totalCouponDiscount: 10000,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '정률쿠폰~~',
      description: '정률쿠폰~~',
      value: 50,
      type: 'PERCENT_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '283413736',
      endAt: null,
      usable: true,
      totalCouponDiscount: 10000,
      paymentGateways: ['naver-pay'],
      creditCardId: null,
      pointAllowed: false,
      name: '네이버페이결제수단쿠폰',
      description: '네이버페이쿠폰',
      value: 10000,
      type: 'PRICE_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '277341209',
      endAt: null,
      usable: true,
      totalCouponDiscount: 5000,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '와인적용제외쿠폰',
      description: '주류 쿠폰 적용 제외 ',
      value: 5000,
      type: 'PRICE_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '284014576',
      endAt: null,
      usable: true,
      totalCouponDiscount: 4000,
      paymentGateways: ['toss-payments'],
      creditCardId: '21',
      pointAllowed: false,
      name: '하나(외환) 카드 전용 쿠폰 테스트',
      description: '하나(외환) 카드 전용 쿠폰 테스트 입니다',
      value: 10,
      type: 'PERCENT_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '287590532',
      endAt: null,
      usable: true,
      totalCouponDiscount: 4000,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '쿠폰테스트',
      description: '쿠폰테스트',
      value: 10,
      type: 'PERCENT_DISCOUNT',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '275877509',
      endAt: null,
      usable: false,
      totalCouponDiscount: 0,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '회원_컬리한정_할인상품제외_무배1',
      description: '회원_컬리한정_할인상품제외_무배1',
      value: 0,
      type: 'FREE_SHIPPING',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '275877518',
      endAt: null,
      usable: false,
      totalCouponDiscount: 0,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '회원_최소조건_무배',
      description: '회원_최소조건_무배',
      value: 0,
      type: 'FREE_SHIPPING',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
    {
      couponCode: '275877522',
      endAt: null,
      usable: false,
      totalCouponDiscount: 0,
      paymentGateways: ['ALL'],
      creditCardId: null,
      pointAllowed: true,
      name: '회원_무조건_무배',
      description: '회원_무조건_무배',
      value: 0,
      type: 'FREE_SHIPPING',
      isAppOnly: false,
      siteType: SiteType.KURLY_MALL,
    },
  ],
  deliveryNotice: '',
  price: {
    totalPrice: 43000,
    discountPrice: 3000,
    expectedPoint: 0,
    couponDiscountPrice: 0,
    paymentPrice: 40000,
    deliveryPrice: 0,
    deliveryPriceDiscountReason: 'OVER_DEFAULT_FREE_DELIVERY_CRITERIA',
    usedPlccPoint: 0,
    kurlycardAccruedPoint: 0,
    usedFreePoint: 0,
    usedPaidPoint: 0,
  },
  reusablePackage: {
    viewPackage: false,
    defaultSelected: null,
    selected: null,
    available: { personalBag: false, kurlyBag: false },
  },
  isDirectCheckout: true,
  hasReservableProducts: false,
  hasKurlyFulfillmentAndDeliveryProduct: true,
  hasNonDeliveryProduct: false,
  joinOrder: null,
  checkoutType: CheckoutType.NORMAL,
  hasInternationalDirectProduct: false,
};