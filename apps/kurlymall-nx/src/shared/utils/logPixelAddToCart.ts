import { isArray } from 'lodash';

import { ignoreError } from './general';
import { logEventPixelAddToCart } from '../../order/cart/utils/pixel/logEventPixelAddToCart';
import { DealProduct } from '../../mypage/order/shared/interfaces';

export const logPixelAddToCart = (addedItemList: { [key: string]: DealProduct } | DealProduct[]) => {
  const itemList = isArray(addedItemList) ? addedItemList : Object.values(addedItemList);

  ignoreError(() => {
    const addedProductList = itemList.map(
      ({ no: dealProductNo, name: dealProductName, basePrice: productPrice, buyUnit: quantity, categoryIds }) => {
        return { dealProductNo, dealProductName, productPrice, quantity, categoryIds };
      },
    );

    logEventPixelAddToCart(addedProductList);
  });
};
