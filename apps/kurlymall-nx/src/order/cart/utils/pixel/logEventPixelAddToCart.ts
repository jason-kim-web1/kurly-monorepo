import { isEmpty } from 'lodash';

import Pixel from '../../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../../shared/pixel/constants/pixelEventTitle';

interface AddedProduct {
  dealProductNo: number;
  dealProductName: string;
  productPrice: number;
  quantity?: number;
  categoryIds: number[];
}

export const convertContentCategory = (categoryIds: number[]): string => {
  if (!categoryIds || isEmpty(categoryIds)) {
    return '';
  }

  return categoryIds.join('>');
};

/**
 *
 * @param addedProductList 추가된 상품 목록 : dealProductNo / dealProductName / productPrice / quantity(optional - default 1) / contentCategory
 */
export const logEventPixelAddToCart = (addedProductList: AddedProduct[]) => {
  Pixel.logEvent(PIXEL_EVENT_TITLE.ADD_TO_CART, {
    content_ids: addedProductList.map(({ dealProductNo }) => dealProductNo),
    content_name: addedProductList.map(({ dealProductName }) => dealProductName),
    contents: addedProductList.map(({ dealProductNo, quantity, dealProductName, categoryIds }) => {
      return {
        id: dealProductNo,
        quantity: quantity || 1,
        content_name: dealProductName,
        content_category: convertContentCategory(categoryIds),
      };
    }),
    value: addedProductList.reduce((acc, { productPrice, quantity = 1 }) => acc + productPrice * quantity, 0),
    content_type: 'product',
    currency: 'KRW',
    content_category: addedProductList.map(({ categoryIds }) => convertContentCategory(categoryIds)),
  });
};
