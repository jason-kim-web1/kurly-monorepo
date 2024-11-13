import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getPackageInfo } from './getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';
import type { DeliveryInfoName } from '../../../../product/types';

interface Payload {
  productDetailState: {
    no: number;
    name: string;
    isGroupProduct: boolean;
    isGiftable: boolean;
    deliveryTypeNames?: DeliveryInfoName[];
    sellerName?: string;
  };
  defaultContentId?: number;
  queryId?: string | null;
  isReferrerReviewDetail?: boolean;
  referrerEventName?: string | null;
}

export class ProductViewSelection extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_product_selection', payload);
  }

  getPayload() {
    const {
      productDetailState: { no, name, isGiftable, isGroupProduct, deliveryTypeNames, sellerName },
      queryId,
      defaultContentId,
      isReferrerReviewDetail,
      referrerEventName,
    } = this.payload;

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    const deliveryTypeName = deliveryTypeNames?.join(',') || null;

    return {
      content_id: no,
      content_name: name,
      delivery_type: deliveryTypeName,
      is_gift_purchase: isGiftable,
      package_id: packageId,
      package_name: packageName,
      // optional
      fusion_query_id: !!queryId ? queryId : null,
      default_content_id: isGroupProduct && !!defaultContentId ? defaultContentId : null,
      seller: !!sellerName ? sellerName : null,
      referrer_event: createReferrerEvent(referrerEventName, undefined, isReferrerReviewDetail),
    };
  }
}
