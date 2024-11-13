interface Params {
  price: {
    totalPrice: number;
    deliveryPrice: number;
    discountPrice: number;
    couponDiscountPrice: number;
  };
}

export const originalTotalPrice = ({
  price: { totalPrice, discountPrice, deliveryPrice, couponDiscountPrice },
}: Params) => {
  const originalTotal = totalPrice - discountPrice - couponDiscountPrice + deliveryPrice;

  return originalTotal;
};
