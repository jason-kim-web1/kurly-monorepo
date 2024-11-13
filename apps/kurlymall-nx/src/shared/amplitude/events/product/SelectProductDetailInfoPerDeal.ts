import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  dealId: number;
  dealName: string;
  fusionQueryId: string | null;
}

/**
 * 상품 상세 화면 - 상세정보 서브탭에서 상품 고시 정보 클릭
 * @extends AmplitudeEvent
 */
export class SelectProductDetailInfoPerDeal extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product_detail_info_per_deal', payload);
  }

  getPayload() {
    const { dealId, dealName, fusionQueryId } = this.payload;

    return {
      deal_id: dealId,
      deal_name: dealName,
      fusion_query_id: !!fusionQueryId ? fusionQueryId : null, // 검색구분자
    };
  }
}
