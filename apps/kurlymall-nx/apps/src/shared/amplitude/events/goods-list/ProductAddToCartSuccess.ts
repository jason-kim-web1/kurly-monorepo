import type { ShortCutType } from '../../../types';
import { ContentsProduct } from '../../../../mypage/order/shared/interfaces';
import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getPackageInfo } from '../product/getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';
import type { DeliveryInfoName } from '../../../../product/types';

type Nullable<T> = T | null;
interface Payload {
  productData: ContentsProduct;
  cartItems: {
    no: number;
    name: string;
    basePrice: number;
    retailPrice: Nullable<number>;
    discountedPrice: Nullable<number>;
    buyUnit: number;
    isGiftable: boolean;
    masterProductCode: string;
    masterProductName: string;
  }[];
  deliveryTypeNames: DeliveryInfoName[];
  queryId?: string;
  selectionType: ShortCutType;
  referrerEventName?: string | null;
}

export class ProductAddToCartSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_success', payload);
  }

  getPayload() {
    const { productData, cartItems, deliveryTypeNames, queryId, selectionType, referrerEventName } = this.payload;

    const deliveryType = deliveryTypeNames.length > 0 ? deliveryTypeNames.join(',') : null;

    const { no, name, isGroupProduct, dealProducts, isGiftable } = productData;

    const contentTypeName = dealProducts.length === 1 ? 'SINGLE' : 'MULTI';

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    const salesPrice = {
      quantity: 0,
      totalBasePrice: 0,
      totalRetailPrice: 0,
      totalSalesPrice: 0,
    };

    cartItems.forEach((it) => {
      salesPrice.quantity += it.buyUnit;
      salesPrice.totalBasePrice += it.basePrice * it.buyUnit;
      salesPrice.totalRetailPrice += it.retailPrice ? it.retailPrice * it.buyUnit : 0;
      salesPrice.totalSalesPrice += it.discountedPrice ? it.discountedPrice * it.buyUnit : it.basePrice * it.buyUnit;
    });

    return {
      content_id: no,
      content_name: name,
      total_base_price: salesPrice.totalBasePrice,
      content_type: contentTypeName,
      delivery_type: deliveryType,
      is_gift_purchase: isGiftable,
      package_id: packageId,
      package_name: packageName,
      sku_count: salesPrice.quantity,
      referrer_event: createReferrerEvent(referrerEventName, selectionType),
      // optional
      total_price: salesPrice.totalSalesPrice,
      total_retail_price: salesPrice.totalRetailPrice || null,
      fusion_query_id: queryId ? queryId : null,
    };
  }
}
