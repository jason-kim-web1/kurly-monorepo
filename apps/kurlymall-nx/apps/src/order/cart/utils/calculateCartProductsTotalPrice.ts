import { calculateProductPrices } from './calculateProductPrices';
import { CART_DELIVERY_PRICE } from '../constants/CartDeliveryPriceType';
import { CartProduct } from '../interface/CartProduct';
import { DeliveryPricePolicyType } from '../interface/Cart';

interface Params {
  cartProducts: CartProduct[];
  deliveryPricePolicy: DeliveryPricePolicyType;
}

export const calculateCartProductsTotalPrice = ({ cartProducts, deliveryPricePolicy }: Params) => {
  const { totalPrice, totalDiscountPrice } = cartProducts.reduce(
    (acc, { quantity, productPrice, discountPrice, retailPrice }) => {
      const { price, finalDiscountPrice } = calculateProductPrices({ productPrice, discountPrice, retailPrice });
      return {
        totalPrice: acc.totalPrice + price * quantity,
        totalDiscountPrice: acc.totalDiscountPrice + finalDiscountPrice * quantity,
      };
    },
    { totalPrice: 0, totalDiscountPrice: 0 },
  );

  // 무료배송 여부
  const isFreeShipping =
    totalPrice > 0 && totalPrice - totalDiscountPrice >= deliveryPricePolicy.deliveryPriceFreeCriteria;

  // 무료배송 상품 포함 여부
  const isFreeProducts = cartProducts.some(({ deliveryPriceType }) => deliveryPriceType === CART_DELIVERY_PRICE.FREE);

  // 배송비
  const deliveryFee = isFreeProducts || isFreeShipping ? 0 : deliveryPricePolicy.deliveryPrice;

  // (비회원/회원) N원 추가 주문 시 무료배송
  const remainingFreeShippingPrice =
    deliveryFee === 0 ? 0 : deliveryPricePolicy.deliveryPriceFreeCriteria - (totalPrice - totalDiscountPrice);

  return {
    price: totalPrice - totalDiscountPrice,
    discountPrice: totalDiscountPrice,
    remainingFreeShippingPrice,
    deliveryFee,
    isFreeProducts,
  };
};
