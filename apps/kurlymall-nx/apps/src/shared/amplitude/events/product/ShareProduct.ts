import { AmplitudeEvent } from '../../AmplitudeEvent';

import { ProductDetailState } from '../../../../product/detail/slice';
import { getPackageInfo } from './getPackageInfo';

interface Payload {
  productDetailState: ProductDetailState;
  message: string;
  channel: string;
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면 - 공유하기 버튼 > 채널 버튼 클릭 시
 * @extends AmplitudeEvent
 */
export class ShareProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('share_product', payload);
  }

  getPayload() {
    const {
      productDetailState: { defaultContentId, no, name, contentType, isGroupProduct, deliveryTypeNames, sellerName },
      channel,
      message,
      fusionQueryId,
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
      package_id: packageId, // 상품개편 배포 이전에 등록된 상품(contentsNo - 5000000), 상품개편 이전 상품은 null
      package_name: packageName, // 상품개편 배포 이전에 등록된 상품의 이름, optional: 패키지 이름 정보가 없는 경우 null
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      message, // 토스트 메시지
      channel, // 공유 채널
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
