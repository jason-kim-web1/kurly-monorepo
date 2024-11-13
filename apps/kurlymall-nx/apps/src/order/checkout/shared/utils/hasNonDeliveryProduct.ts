interface Props {
  hasReservableProducts: boolean;
  hasKurlyFulfillmentAndDeliveryProduct: boolean;
  isPickupOrder: boolean;
  isGiftCardOrder: boolean;
}

/**
 * @param hasReservableProducts 예약 상품 포함 여부
 * @param isPickupOrder 셀프 픽업 상품 포함 여부
 * @param hasKurlyFulfillmentAndDeliveryProduct 컬리 물류배송(1P, 3PL) 포함 여부
 * @param isGiftCardOrder 컬리 상품권 포함 여부
 * @return 무배송 상품 여부에 해당되면 true 를 반환합니다.
 */
export const hasNonDeliveryProduct = ({
  hasReservableProducts,
  hasKurlyFulfillmentAndDeliveryProduct,
  isPickupOrder,
  isGiftCardOrder,
}: Props): boolean => {
  if (isPickupOrder || hasReservableProducts || isGiftCardOrder) {
    return true;
  }

  return !hasKurlyFulfillmentAndDeliveryProduct;
};
