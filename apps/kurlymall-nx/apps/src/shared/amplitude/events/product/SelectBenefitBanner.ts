import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  /**
   * message
   * : Benefit Banner 문구
   */
  message: string;

  /**
   * url
   * : Benefit Banner url
   */
  url: string;
}

/**
 * 상품 상세 화면 Benefit Banner(구명칭 PLCC 배너) 클릭 이벤트
 * @extends AmplitudeEvent
 */
export class SelectBenefitBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_benefit_banner', payload);
  }

  getPayload() {
    return this.payload;
  }
}
