import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getPackageInfo } from '../product/getPackageInfo';

/**
 * 저장완료 후 상품추천 리스트에서 상품 클릭 시,
 * @extends AmplitudeEvent
 */

interface RecommendProduct {
  index: number;
  no: number;
  name: string;
  listImageUrl: string;
  salesPrice: number;
  discountedPrice: number | null;
  discountRate: number | null;
  isMultiplePrice: boolean;
  isGiftable: boolean;
  isSoldOut: boolean;
  groupProduct: {
    isGroup: boolean;
    isNotRepresentative: boolean;
  };
}

export class SelectProduct extends AmplitudeEvent<RecommendProduct> {
  constructor(payload: RecommendProduct) {
    super('select_product', payload);
  }

  getPayload() {
    const { index, no, name, salesPrice, discountedPrice, isGiftable, isSoldOut, groupProduct } = this.payload;

    const isGroupProduct = groupProduct.isGroup;

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    return {
      content_id: no,
      content_name: name,
      sales_price: salesPrice,
      is_sorting: false,
      price: discountedPrice || salesPrice,
      is_soldout: isSoldOut,
      is_gift_purchase: isGiftable,
      position: index + 1,
      package_id: packageId,
      package_name: packageName,
    };
  }
}
