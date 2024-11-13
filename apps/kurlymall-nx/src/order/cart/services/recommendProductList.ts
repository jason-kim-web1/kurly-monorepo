import { isEmpty } from 'lodash';

import { CART_DELIVERY_PRICE } from '../constants/CartDeliveryPriceType';
import { postRecommendProductList } from '../api/postRecommendProductList';
import { RecommendProductList } from '../constants/RecommendProductList';

export const fetchRecommendProductList = async ({
  address,
  addressDetail,
}: {
  address: string;
  addressDetail?: string;
}): Promise<RecommendProductList> => {
  const {
    title,
    products: originalProducts,
    firstProductType,
    bottomType,
  } = await postRecommendProductList({ address, addressDetail });

  if (isEmpty(originalProducts)) {
    return {
      title,
      productList: null,
    };
  }

  const productList = originalProducts.map(({ discountRate, ...rest }) => ({
    ...rest,
    discountRate: discountRate === 0 ? null : discountRate,
    isFreeShipping: rest.deliveryPriceType === CART_DELIVERY_PRICE.FREE,
  }));

  return {
    title,
    productList,
    firstProductType,
    bottomType,
  };
};
