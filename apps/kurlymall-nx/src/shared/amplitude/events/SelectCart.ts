import { AmplitudeEvent } from '../AmplitudeEvent';

/**
 * 장바구니 버튼 클릭 (장바구니 버튼 : 장바구니 화면으로 이동하는 버튼)
 * @extends AmplitudeEvent
 */
export class SelectCart extends AmplitudeEvent<void> {
  constructor() {
    super('select_cart');
  }
}
