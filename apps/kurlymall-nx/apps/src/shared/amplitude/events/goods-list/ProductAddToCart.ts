import type { ShortCutType } from '../../../types';
import { ContentsProduct } from '../../../../mypage/order/shared/interfaces';
import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getPackageInfo } from '../product/getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';
import type { DeliveryInfoName } from '../../../../product/types';

type Nullable<T> = T | null;
interface Payload {
  productData: ContentsProduct;
  item: {
    no: number;
    name: string;
    basePrice: number;
    retailPrice: Nullable<number>;
    discountedPrice: Nullable<number>;
    buyUnit: number;
    isGiftable: boolean;
    masterProductCode: string;
    masterProductName: string;
  };
  deliveryTypeNames: DeliveryInfoName[];
  queryId?: string;
  selectionType: ShortCutType;
  referrerEventName?: string | null;
}

export class ProductAddToCart extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_product', payload);
  }

  getPayload() {
    const { productData, item, deliveryTypeNames, queryId, selectionType, referrerEventName } = this.payload;

    const { no: contentId, name: contentName, isGroupProduct, dealProducts } = productData;

    const {
      no,
      name,
      masterProductCode,
      masterProductName,
      buyUnit,
      basePrice,
      retailPrice,
      discountedPrice,
      isGiftable,
    } = item;

    const contentTypeName = dealProducts.length === 1 ? 'SINGLE' : 'MULTI';

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no: contentId,
      name: contentName,
    });

    const salesPrice = discountedPrice || basePrice;
    const totalPrice = salesPrice * buyUnit;
    const deliveryType = deliveryTypeNames.length > 0 ? deliveryTypeNames.join(',') : null;

    return {
      content_id: contentId,
      content_name: contentName,
      master_id: masterProductCode,
      master_name: masterProductName,
      deal_id: no,
      deal_name: name,
      retail_price: retailPrice,
      base_price: basePrice,
      price: salesPrice,
      total_base_price: basePrice * buyUnit,
      quantity: buyUnit,
      content_type: contentTypeName,
      delivery_type: deliveryType,
      is_gift_purchase: isGiftable,
      package_id: packageId,
      package_name: packageName,
      referrer_event: createReferrerEvent(referrerEventName, selectionType),
      // optional
      total_retail_price: retailPrice ? retailPrice * buyUnit : null,
      total_price: totalPrice,
      fusion_query_id: queryId ? queryId : null,
    };
  }
}
