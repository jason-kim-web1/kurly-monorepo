export const readCheckoutProducts = jest.fn().mockResolvedValue({
  dealProducts: [
    {
      dealProductNo: 10052000,
      dealProductName: '설화수 로션',
      contentProductNo: 5052000,
      contentProductName: '설화수 3종',
      imageUrl: 'https://img-cf.kurly.com/shop/data/goods/1621593044686l0.jpg',
      quantity: 3,
      displayPrice: 52000,
      displayDiscountPrice: 2000,
      isPickupDealProduct: false,
      isReservable: false,
      isAlcoholDealProduct: false,
    },
  ],
  giveawayProducts: [],
  isEventProducts: false,
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
    },
  ],
  totalDisplayProductsPrice: 156000,
  totalDisplayProductsDiscountPrice: 6000,
  totalAccruedPoint: 7800,
  totalPaymentPrice: 150000,
  deliveryPrice: 0,
  deliveryPriceDiscountReason: 'KURLY_PASS_ACTIVATED',
  reusablePackagePreference: 'KURLY',
  reusablePackageAvailability: {
    isKurlyPurpleBoxAvailable: true,
    isPersonalBagAvailable: true,
  },
  isDirectCheckout: false,
  hasKurlyFulfillmentAndDeliveryProduct: true,
});

export const readPreferenceMethods = jest.fn().mockResolvedValue({
  paymentGatewayId: 'toss-payments',
  tossPaymentsCreditCardCompanyId: '41',
  creditCardCompanyId: '41',
});

export const updatePreferenceMethods = jest.fn().mockResolvedValue([]);

export const deletePreferenceMethods = jest.fn().mockResolvedValue([]);

export const postPlaceOrder = jest.fn().mockResolvedValue([]);

export const postPriceRequestGuestParams = {
  couponCode: null,
  usingFreePoint: 0,
  paymentGatewayId: null,
  creditCardId: '41',
  deliveryPrice: 3000,
};

export const postPriceRequestParams = {
  memberReserveRatio: 3,
  couponCode: '1234',
  usingFreePoint: 500,
  paymentGatewayId: 'toss-payments',
  creditCardId: '41',
  deliveryPrice: 3000,
};

export const calculatePriceResponseMock = {
  totalPrice: 113820,
  discountPrice: 0,
  expectedPoint: 84,
  couponDiscountPrice: 0,
  paymentPrice: 113820,
  deliveryPrice: 0,
  usedPlccPoint: 0,
  kurlycardAccruedPoint: 5691,
  usedFreePoint: 0,
  usedPaidPoint: 0,
};

export const postPriceResponseMock = {
  totalDealProductsPrice: 113820,
  totalDealProductsDiscountPrice: 0,
  totalDisplayProductsPrice: 113820,
  totalDisplayProductsDiscountPrice: 0,
  deliveryPrice: 0,
  totalCouponDiscountPrice: 0,
  totalCardInstantDiscountPrice: 0,
  totalAccruedPoint: 84,
  totalKurlyCardAccruedPoint: 5691,
  totalPaymentPrice: 113820,
  usedPoint: {
    free: 0,
    paid: 0,
  },
};

export const postPriceCalculate = jest.fn().mockResolvedValue(postPriceResponseMock);

export const postCheckContinuity = jest.fn();
