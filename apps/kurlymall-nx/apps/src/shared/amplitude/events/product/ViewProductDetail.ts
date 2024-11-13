import { AmplitudeEvent } from '../../AmplitudeEvent';

import { ProductProps } from '../../../../product/detail/types';
import { getPackageInfo } from './getPackageInfo';

interface Payload {
  product: ProductProps;
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면 조회
 * @extends AmplitudeEvent
 */
export class ViewProductDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_product_detail', payload);
  }

  getPayload() {
    const {
      product: {
        no,
        name,
        contentType,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
        retailPrice,
        basePrice,
        discountedPrice,
        isSoldOut,
        isJoinOrder,
      },
      fusionQueryId,
    } = this.payload;

    const deliveryTypeName = deliveryTypeNames.join(', ');

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    return {
      content_id: no, // 컨텐츠의 번호(CMS 기준의 컨텐츠 ID)
      content_name: name, // 컨텐츠의 이름(CMS 기준의 컨텐츠 이름)
      content_type: contentType, // 컨텐츠의 유형에 대한 정보
      default_content_id: isGroupProduct ? no : null, // 대표 컨텐츠의 번호값, optional: 컨텐츠 그룹에서만 발생
      delivery_type: deliveryTypeName, // 배송유형 정보
      retail_price: retailPrice, // 권장소비자가, optional, 권장소비자가 없는 경우 Null
      base_price: basePrice, // 컬리판매가
      price: discountedPrice ?? basePrice, // 현재가(=대표가, 할인가 없는 경우 컬리판매가)
      package_id: packageId, // 상품개편 배포 이전에 등록된 상품(contentsNo - 5000000), 상품개편 이전 상품은 null
      package_name: packageName, // 상품개편 배포 이전에 등록된 상품의 이름, optional: 패키지 이름 정보가 없는 경우 null
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      is_soldout: isSoldOut, // 콘텐츠의 품절여부
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
      // 함께구매 여부
      purchase_together: isJoinOrder ? 'True' : 'False',
    };
  }
}
