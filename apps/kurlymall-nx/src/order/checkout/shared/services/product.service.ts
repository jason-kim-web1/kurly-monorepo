import { isEmpty, sortBy } from 'lodash';

import { readCheckoutProducts, readCheckoutGiftProducts, readCheckoutJoinProducts } from '../../../../shared/api';
import {
  CheckoutCoupon,
  CheckoutGiveProduct,
  CheckoutProduct,
  CheckoutProductItem,
  CheckoutProductsRequest,
  CheckoutProductsServiceResponse,
  GiftProductsServiceResponse,
  ProductGroup,
  ProductGroupAPIResponse,
  ProductGroupsByDeliveryPolicy,
} from '../../../../shared/interfaces';
import {
  OrderTypes,
  isGiftCardProducts,
  hasNonDeliveryProduct,
  isPickupProducts,
  isReservableProducts,
  isViewPackage,
} from '../utils';

interface ProductsData {
  products: CheckoutProductItem[];
  allDealProducts: CheckoutProduct[];
  productGroupsByDeliveryPolicies: ProductGroupsByDeliveryPolicy[];
}

const getProductsData = (productGroupsResponse: ProductGroupAPIResponse[]): ProductsData =>
  productGroupsResponse.reduce(
    (result: ProductsData, productGroup) => {
      result.allDealProducts.push(...productGroup.dealProducts);

      const products = productGroup.dealProducts.map((dealProduct) => ({
        id: dealProduct.dealProductNo,
        dealProductNo: dealProduct.dealProductNo,
        dealProductName: dealProduct.dealProductName,
        contentProductNo: dealProduct.contentProductNo,
        contentProductName: dealProduct.contentProductName,
        price: dealProduct.displayPrice,
        discountedPrice: dealProduct.displayDiscountPrice,
        quantity: dealProduct.quantity,
        thumbnailUrl: dealProduct.productVerticalSmallUrl,
        isPickupProduct: dealProduct.isPickupDealProduct,
        isReservable: dealProduct.isReservable,
        isAlcoholDealProduct: dealProduct.isAlcoholDealProduct,
        isGiftCard: dealProduct.isGiftCard,
        isCouponBlacklist: dealProduct.isCouponBlacklist,
      }));

      result.products.push(...products);

      const hasProductGroups = result.productGroupsByDeliveryPolicies.find(
        ({ deliveryPolicy }) => productGroup.deliveryPolicy === deliveryPolicy,
      );

      const redefinedProductGroup: ProductGroup = {
        partnerName: productGroup.partnerName,
        isKurlyFulfillmentProduct: productGroup.isKurlyFulfillmentProduct,
        products,
      };

      if (hasProductGroups) {
        hasProductGroups.productGroups.push(redefinedProductGroup);
      } else {
        result.productGroupsByDeliveryPolicies.push({
          deliveryPolicy: productGroup.deliveryPolicy,
          deliveryPolicyDisplayName: productGroup.deliveryPolicyDisplayName,
          productGroups: [redefinedProductGroup],
        });
      }

      return result;
    },
    {
      products: [],
      allDealProducts: [],
      productGroupsByDeliveryPolicies: [],
    },
  );

interface ProductLabelResponse {
  isReusablePackage: boolean;
  isEventProducts: boolean;
  isLuckyBoxOrder: boolean;
}

export const getProductsLabel = (products: CheckoutProduct[]): ProductLabelResponse => {
  const hasEventProducts = products.filter(
    ({ exceptionLabel, legacyPromotion }) => exceptionLabel !== null || legacyPromotion !== null,
  );

  if (isEmpty(hasEventProducts)) {
    return {
      isReusablePackage: false,
      isEventProducts: false,
      isLuckyBoxOrder: false,
    };
  }

  return {
    isReusablePackage: !isEmpty(products.filter(({ exceptionLabel }) => exceptionLabel === 'REFRESH_PACKAGE')),
    isEventProducts: !isEmpty(
      products.filter(({ legacyPromotion }) => legacyPromotion === 'NEWBIE' || legacyPromotion === 'LUCKY_BOX'),
    ),
    isLuckyBoxOrder: products.length === 1 && products[0].legacyPromotion === 'LUCKY_BOX',
  };
};

export const disableFreeShippingCoupons = (coupons: CheckoutCoupon[]) => {
  return coupons.map((coupon) => ({
    ...coupon,
    usable: coupon.type === 'FREE_SHIPPING' ? false : coupon.usable,
  }));
};

export const filterCoupons = (isFreeShipping: boolean, coupons: CheckoutCoupon[]) => {
  // 배송비가 0원이면 무료배송 쿠폰을 사용할 수 없도록 한다.
  const filteredCoupons = isFreeShipping ? disableFreeShippingCoupons(coupons) : coupons;

  const sortedByUsable = sortBy(filteredCoupons, [({ usable }) => !usable]);

  return sortedByUsable;
};

export const getCheckoutProducts = async ({
  percent,
  orderType,
}: {
  percent: number;
  orderType: OrderTypes;
}): Promise<CheckoutProductsServiceResponse | GiftProductsServiceResponse> => {
  const params: CheckoutProductsRequest = {
    memberReserveRatio: percent,
    kurlypayAvailable: true,
  };

  let data;

  if (orderType === OrderTypes.GIFT) {
    data = await readCheckoutGiftProducts(params);
  } else if (orderType === OrderTypes.JOIN) {
    data = await readCheckoutJoinProducts(params);
  } else {
    data = await readCheckoutProducts(params);
  }

  const { products, allDealProducts, productGroupsByDeliveryPolicies } = getProductsData(data.productGroups);

  const { isReusablePackage, isEventProducts, isLuckyBoxOrder } = getProductsLabel(allDealProducts);

  const hasReservableProducts = isReservableProducts(allDealProducts);
  const isPickupOrder = isPickupProducts(allDealProducts);
  const isGiftCardOrder = isGiftCardProducts(allDealProducts);

  return {
    // 모든 상품
    products,
    // 배송 정책 기준으로 그룹화 된 상품 그룹
    productGroupsByDeliveryPolicies,
    // 와인 픽업 서비스에 사용됩니다.
    isPickupOrder,
    // 선물하기 상품 여부
    isGiftOrder: orderType === OrderTypes.GIFT,
    // 컬리 상품권 주문 여부
    isGiftCardOrder,
    // 증정품
    giveawayProducts: data.giveawayProducts.map((it: CheckoutGiveProduct) => ({
      id: it.dealProductNo,
      dealProductNo: it.dealProductNo,
      dealProductName: it.dealProductName,
      contentProductNo: it.contentProductNo,
      contentProductName: it.contentProductName,
      quantity: it.quantity,
      thumbnailUrl: it.productVerticalSmallUrl,
      price: 0,
      discountedPrice: 0,
      isPickupProduct: it.isPickupDealProduct,
      isReservable: false,
      isAlcoholDealProduct: it.isAlcoholDealProduct,
      isGiftCard: false,
      isCouponBlacklist: false,
    })),
    isReusablePackage,
    isEventProducts,
    // 럭키박스 단건 주문 여부
    isLuckyBoxOrder,
    coupons: filterCoupons(data.deliveryPrice === 0, data.coupons),
    price: {
      totalPrice: data.totalDisplayProductsPrice,
      discountPrice: data.totalDisplayProductsDiscountPrice,
      expectedPoint: data.totalAccruedPoint,
      couponDiscountPrice: 0,
      paymentPrice: data.totalPaymentPrice,
      deliveryPrice: data.deliveryPrice,
      deliveryPriceDiscountReason: data.deliveryPriceDiscountReason,
      usedPlccPoint: 0,
      kurlycardAccruedPoint: data.totalKurlyCardAccruedPoint,
      usedFreePoint: 0,
      usedPaidPoint: 0,
    },
    reusablePackage: {
      // 재사용 포장재를 구매하거나 셀프픽업, 3P 상품 아니어야 함.
      viewPackage: isViewPackage({
        isPickupOrder,
        hasKurlyFulfillmentAndDeliveryProduct: data.hasKurlyFulfillmentAndDeliveryProduct,
        reusablePackageAvailability: data.reusablePackageAvailability,
      }),
      // 앰플리튜드를 위한 것
      defaultSelected: data.reusablePackagePreference,
      // 개인보냉을 사용했었어도, 기본 종이포장재로 선택한다.
      selected: data.reusablePackagePreference === 'PERSONAL' ? 'PAPER' : data.reusablePackagePreference,
      available: {
        personalBag: data.reusablePackageAvailability.isPersonalBagAvailable,
        kurlyBag: data.reusablePackageAvailability.isKurlyPurpleBoxAvailable,
      },
    },
    isDirectCheckout: data.isDirectCheckout,
    // 예약 상품 포함 여부
    hasReservableProducts,
    // 1P/3PL 상품 포함 여부
    hasKurlyFulfillmentAndDeliveryProduct: data.hasKurlyFulfillmentAndDeliveryProduct,
    // 무배송 상품(컬리에서 배송하지 않는 상품(판매자 배송/3P), 예약배송(일반, 미식 딜리버리), 온라인 교환권, 항공권, 셀프픽업) 여부
    hasNonDeliveryProduct: hasNonDeliveryProduct({
      hasReservableProducts,
      hasKurlyFulfillmentAndDeliveryProduct: data.hasKurlyFulfillmentAndDeliveryProduct,
      isPickupOrder,
      isGiftCardOrder,
    }),
    deliveryNotice: data.displayMessage?.deliveryNotice?.text,
    deliveryNoticeBasicStyle: data.displayMessage?.deliveryNotice?.basicStyle,
    deliveryNoticeReplaceStyles: data.displayMessage?.deliveryNotice?.replaceStyles,
    // 약관 동의 정보
    personalInfoAgreement: {
      isVisibleThirdPartyAgree: data.personalInfoAgreement?.isVisibleThirdPartyAgree,
      terms: data.personalInfoAgreement?.terms ?? [],
    },
    joinOrder: data.joinOrderMeta,
    // 사용가능 적립금/컬리캐시
    availablePoint: data.availablePoint,
    // 주문 타입
    checkoutType: data.checkoutType,
    // 해외직배송 상품 구매 여부
    hasInternationalDirectProduct: data.hasInternationalDirectProduct,
  };
};
