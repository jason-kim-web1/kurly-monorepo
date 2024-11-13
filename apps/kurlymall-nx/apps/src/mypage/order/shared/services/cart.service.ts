import { fetchCartProduct } from '../../../../shared/api/product/cartPopup';
import { convertNestedKeysToCamelCase } from '../../../../shared/utils/convert-to-camel-keys';
import type { ContentsProduct } from '../interfaces';

export const getCartProduct = async (productCode: number): Promise<ContentsProduct> => {
  const { data } = await fetchCartProduct(productCode);

  return {
    no: data.no,
    name: data.name,
    isSoldOut: data.is_sold_out,
    minEa: data.min_ea,
    maxEa: data.max_ea,
    originalImageUrl: data.original_image_url,
    isPurchaseStatus: data.is_purchase_status,
    isGiftable: data.is_giftable,
    isOnlyAdult: data.is_only_adult,
    isGroupProduct: data.is_group_product,
    legacyPromotion: data.legacy_promotion,
    dealProducts: data.deal_products.map((deal) => {
      return { ...convertNestedKeysToCamelCase(deal), categoryIds: deal.category_ids || [] };
    }),
  };
};
