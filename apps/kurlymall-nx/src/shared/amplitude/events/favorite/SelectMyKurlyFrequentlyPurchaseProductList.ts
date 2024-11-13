import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 마이컬리탭에서 자주하는 질문 선택
 * @extends AmplitudeEvent
 */
export class SelectMyKurlyFrequentlyPurchaseProductList extends AmplitudeEvent<void> {
  constructor() {
    super('select_my_kurly_frequently_purchase_product_list');
  }
}
