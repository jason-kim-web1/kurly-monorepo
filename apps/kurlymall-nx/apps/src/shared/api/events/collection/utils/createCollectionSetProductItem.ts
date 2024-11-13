import type { CollectionSetProductItemResponse } from '../collection-caching';
import type { CollectionSetProductItemType } from '../types';

const createCollectionSetProductItem = (data: CollectionSetProductItemResponse): CollectionSetProductItemType => ({
  no: data.no,
  name: data.name,
  shortDescription: data.short_description,
  salesPrice: data.sales_price,
  discount: {
    price: data.discounted_price,
    rate: data.discount_rate,
  },
  productViewStatus: data.product_view_status,
  isSales: data.is_sales,
  isSoldOut: data.is_sold_out,
  soldOutMessage: {
    title: data.sold_out_title,
    text: data.sold_out_text,
  },
  isPurchaseStatus: data.is_purchase_status,
  notPurchaseMessage: data.not_purchase_message,
  isBuyNow: data.is_buy_now,
  isGiftable: data.is_giftable,
  isMultiplePrice: data.is_multiple_price,
  isOnlyAdult: data.is_only_adult,
  listImageUrl: data.list_image_url,
  productVerticalMediumUrl: data.product_vertical_medium_url,
  canRestockNotify: data.can_restock_notify,
  deliveryTypeNames: data.delivery_type_names,
  reviewCount: data.review_count,
  tags: data.tags,
  groupProduct: {
    isGroup: data.group_product.is_group,
    isNotRepresentative: data.group_product.is_not_representative,
  },
});

export { createCollectionSetProductItem };
