import { AmplitudeEvent } from '../../AmplitudeEvent';

import { getPackageInfo } from './getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';
import type { ContentType } from '../../../../product/detail/types';
import type { DeliveryInfoName } from '../../../../product/types';

interface Payload {
  productDetailState: {
    no: number;
    name: string;
    contentType: ContentType;
    isGroupProduct: boolean;
    deliveryTypeNames: DeliveryInfoName[];
    sellerName: string;
    retailPrice: number | null;
    basePrice: number;
    discountedPrice: number | null;
    isSoldOut: boolean;
  };
  defaultContentId: number;
  fusionQueryId: string | null;
  isReferrerReviewDetail?: boolean;
  referrerEventName?: string | null;
}

/*
'선물하기' 또는 '구매하기' 버튼 클릭
- 상품 상세 화면
- 상품 상세 > 사진 후기 상세 화면
*/
export class SelectPurchase extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_purchase', payload);
  }

  getPayload() {
    const {
      productDetailState: {
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
      },
      defaultContentId,
      fusionQueryId,
      isReferrerReviewDetail,
      referrerEventName,
    } = this.payload;

    const deliveryTypeName = deliveryTypeNames.join(',');

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    return {
      content_id: no, // 컨텐츠의 번호(CMS 기준의 컨텐츠 ID)
      content_name: name, // 컨텐츠의 이름(CMS 기준의 컨텐츠 이름)
      content_type: contentType, // 컨텐츠의 유형에 대한 정보
      default_content_id: isGroupProduct ? defaultContentId : null, // 대표 컨텐츠의 번호값, optional: 컨텐츠 그룹에서만 발생
      delivery_type: deliveryTypeName, // 배송유형 정보
      retail_price: retailPrice, // 권장소비자가, optional, 권장소비자가 없는 경우 Null
      base_price: basePrice, // 컬리판매가
      price: discountedPrice ?? basePrice, // 현재가(=대표가, 할인가 없는 경우 컬리판매가)
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      is_soldout: isSoldOut, // 콘텐츠의 품절여부
      is_gift_purchase: false, // 현재 웹은 선물하기 기능 서비스 운영 안하므로, default: false
      package_id: packageId, // 상품개편 배포 이전에 등록된 상품(contentsNo - 5000000), 상품개편 이전 상품은 null
      package_name: packageName, // 상품개편 배포 이전에 등록된 상품의 이름, optional: 패키지 이름 정보가 없는 경우 null
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
      referrer_event: createReferrerEvent(referrerEventName, undefined, isReferrerReviewDetail),
    };
  }
}
