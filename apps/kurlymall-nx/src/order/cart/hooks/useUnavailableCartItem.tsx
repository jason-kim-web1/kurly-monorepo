import { useMemo } from 'react';

import { CartProduct } from '../interface/CartProduct';
import { getDetailUrl } from '../utils/getDetailUrl';
import { CART_PRODUCT_ORDER_UNAVAILABLE } from '../constants/CartProductOrderType';

export default function useUnavailableCartItem(product: CartProduct) {
  const { order } = product;

  const onlySoldOut = useMemo(
    () => order.unavailableTypes.length === 1 && order.unavailableTypes[0] === CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT,
    [order.unavailableTypes],
  );
  const soldOut = useMemo(
    () => order.unavailableTypes.some((type) => type === CART_PRODUCT_ORDER_UNAVAILABLE.SOLD_OUT),
    [order.unavailableTypes],
  );

  const onlyMembersCanPurchase = useMemo(
    () =>
      order.unavailableTypes.some(
        (type) =>
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SUBSCRIBED ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_LOVERS ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.INVALID_B2B ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VIP ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_VVIP,
      ),
    [order.unavailableTypes],
  );

  const notPurchasable = useMemo(
    () =>
      order.unavailableTypes.some(
        (type) =>
          type === CART_PRODUCT_ORDER_UNAVAILABLE.INCORRECT_DELIVERY_TYPE ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_CART_ITEM ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.NOT_SHOWN ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.OFF_SALE ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.RETIRED ||
          type === CART_PRODUCT_ORDER_UNAVAILABLE.THIRD_PARTY_PARTNER,
      ),
    [order.unavailableTypes],
  );

  const contents = useMemo(() => {
    const subTitle = product.dealProductName !== product.contentsProductName ? product.contentsProductName : '';

    // 오직 [품절] 일 때
    // [품절, 특정회원] 이면서 [구매불가]는 아닐 때
    if (onlySoldOut || (soldOut && onlyMembersCanPurchase && !notPurchasable)) {
      return {
        title: `(품절) ${product.dealProductName}`,
        subTitle,
        reason: product.soldOutText,
      };
    }

    // 품절도 아니고 구매불가도 아니면서 [멤버스], [VIP], [VVIP] 전용 상품일 때
    if (onlyMembersCanPurchase && !soldOut && !notPurchasable) {
      return {
        title: product.dealProductName,
        subTitle,
        reason: '',
      };
    }

    // 그 외에는 모두 구매불가
    return {
      title: `(구매불가) ${product.dealProductName}`,
      subTitle,
      reason: '배송불가 지역 또는 판매종료 상품',
    };
  }, [product, soldOut, onlyMembersCanPurchase, notPurchasable]);

  const buyableTarget = useMemo(() => product.displayMessage.buyableTarget, [product]);

  const detailUrl = useMemo(() => {
    if (notPurchasable) {
      return;
    }

    return getDetailUrl(product.contentsProductNo);
  }, [notPurchasable, product]);

  return { ...contents, buyableTarget, notPurchasable, detailUrl };
}
