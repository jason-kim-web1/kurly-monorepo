import { postGiftPriceCalculate, postPriceCalculate } from '../../../../shared/api';
import {
  CALCULATE_REQUEST_ORDER_TYPE,
  CalculatedPrice,
  CalculateRequest,
  CalculateRequestOrderType,
  CalculateServiceRequest,
} from '../../../../shared/interfaces';

const getCalculateRequestType = ({
  isGiftOrder,
  isJoinOrder,
  isPickupOrder,
}: {
  isGiftOrder: boolean;
  isJoinOrder: boolean;
  isPickupOrder: boolean;
}): CalculateRequestOrderType => {
  if (isGiftOrder) {
    return CALCULATE_REQUEST_ORDER_TYPE.GIFT;
  }

  if (isJoinOrder) {
    return CALCULATE_REQUEST_ORDER_TYPE.JOIN;
  }

  if (isPickupOrder) {
    return CALCULATE_REQUEST_ORDER_TYPE.PICKUP;
  }

  return CALCULATE_REQUEST_ORDER_TYPE.NORMAL;
};

export const calculatePrice = async (
  params: CalculateServiceRequest,
  isGiftOrder = false,
  isJoinOrder = false,
  isPickupOrder = false,
): Promise<CalculatedPrice> => {
  const param: CalculateRequest = {
    memberReserveRatio: params.memberReserveRatio,
    couponCode: params.couponCode ?? null,
    usingFreePoint: params.usedPoint ?? 0,
    paymentGatewayId: params.paymentGateways ?? null,
    creditCardId: params.creditCardId,
    deliveryPrice: params.deliveryPrice,
    plccDiscountPrice: params.usedPlccPoint,
    type: getCalculateRequestType({ isGiftOrder, isJoinOrder, isPickupOrder }),
    kurlypayPaymentMethodId: params.kurlypayPaymentMethodId,
  };

  const data = isGiftOrder ? await postGiftPriceCalculate(param) : await postPriceCalculate(param);

  return {
    totalPrice: data.totalDisplayProductsPrice,
    discountPrice: data.totalDisplayProductsDiscountPrice,
    expectedPoint: data.totalAccruedPoint,
    couponDiscountPrice: data.totalCouponDiscountPrice,
    paymentPrice: data.totalPaymentPrice,
    deliveryPrice: data.deliveryPrice,
    usedPlccPoint: data.totalCardInstantDiscountPrice,
    kurlycardAccruedPoint: data.totalKurlyCardAccruedPoint,
    usedFreePoint: data.usedPoint?.free || 0,
    usedPaidPoint: data.usedPoint?.paid || 0,
  };
};
