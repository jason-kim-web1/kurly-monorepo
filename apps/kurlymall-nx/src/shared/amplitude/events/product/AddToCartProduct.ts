import { eq } from 'lodash';

import { AmplitudeEvent } from '../../AmplitudeEvent';

import { ProductDetailState } from '../../../../product/detail/slice';
import { DealProduct } from '../../../../product/detail/types';
import type { ShortCutType } from '../../../types';
import { getPackageInfo } from './getPackageInfo';
import { createReferrerEvent } from '../../../../product/utils';
import { ne } from '../../../utils/lodash-extends';

interface Payload {
  product: ProductDetailState;
  defaultContentId: number;
  dealProduct: DealProduct;
  totalPrice: number;
  totalBasePrice: number;
  totalRetailPrice: number;
  fusionQueryId: string | null;
  isReferrerReviewDetail?: boolean;
  selectionType?: ShortCutType;
  referrerEventName?: string | null;
  searchKeyword: string;
  referrerProductNo?: number;
  referrerProductName?: string;
}

/**
 * 장바구니 담기 성공 API 성공 후 전송, 옵션 상품 단위로 이벤트 발생
 * 바로구매, 선물하기는 버튼 클릭 후 주문서 생성으로 넘어가는 경우 발생
 * @extends AmplitudeEvent
 */
export class AddToCartProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('add_to_cart_product', payload);
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
        isDirectOrder,
        retailPrice,
        basePrice,
        discountedPrice,
      },
      defaultContentId,
      dealProduct,
      totalPrice,
      totalBasePrice,
      totalRetailPrice,
      fusionQueryId,
      isReferrerReviewDetail,
      selectionType,
      referrerEventName,
      searchKeyword = '',
      referrerProductNo,
      referrerProductName,
    } = this.payload;
    const deliveryTypeName = deliveryTypeNames.join(',');
    const shouldDropReferer = !referrerProductNo || eq(no, referrerProductNo);
    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });
    return {
      content_id: no, // 컨텐츠의 번호(CMS 기준의 컨텐츠 ID)
      content_name: name, // 컨텐츠의 이름(CMS 기준의 컨텐츠 이름)
      deal_id: dealProduct.no, // 딜의 번호 (CMS 기준의 딜 ID)
      deal_name: dealProduct.name, // 딜의 이름 (CMS 기준의 딜 이름)
      master_id: dealProduct.masterProductCode, // 마스터의 번호 (딜의 원물 관리용 번호)
      master_name: dealProduct.masterProductName, // 마스터의 이름 (딜의 원물 관리용 이름)
      content_type: contentType, // 컨텐츠의 유형에 대한 정보
      default_content_id: isGroupProduct ? defaultContentId : null, // 대표 컨텐츠의 번호값, optional: 컨텐츠 그룹에서만 발생
      delivery_type: deliveryTypeName, // 배송유형 정보
      retail_price: retailPrice, // 권장소비자가, optional, 권장소비자가 없는 경우 Null
      base_price: basePrice, // 컬리판매가
      price: discountedPrice ?? basePrice, // 현재가(=대표가, 할인가 없는 경우 컬리판매가)
      total_retail_price: totalRetailPrice || null, // 권장소비자가 기준의 상품 합계 금액
      total_base_price: totalBasePrice, // 컬리판매가 기준의 상품 합계 금액
      total_price: totalPrice, // 콘텐츠 기준의 판매자 정보
      seller: sellerName, // 콘텐츠 기준의 판매자 정보
      is_direct_purchase: isDirectOrder, // 바로구매 상품 여부
      is_gift_purchase: false, // 현재 웹은 선물하기 기능 서비스 운영 안하므로, default: false
      package_id: packageId, // 상품개편 배포 이전에 등록된 상품(contentsNo - 5000000), 상품개편 이전 상품은 null
      package_name: packageName, // 상품개편 배포 이전에 등록된 상품의 이름, optional: 패키지 이름 정보가 없는 경우 null
      quantity: dealProduct.quantity, // 카트에 담기는 이 딜의 수량
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
      referrer_event: createReferrerEvent(referrerEventName, selectionType, isReferrerReviewDetail),
      referrer_content_id: shouldDropReferer ? null : referrerProductNo,
      referrer_content_name: shouldDropReferer ? null : referrerProductName,
      ...(ne(searchKeyword, '') && { keyword: searchKeyword }),
    };
  }
}
