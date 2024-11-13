import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  // 포장 방법 선택 시 선택한 포장 방법
  packingType: string;
  // 고객 주문서 생성 시, default로 내려오는 packing_type
  defaultPackingType: string | null;
}

/**
 * 주문 페이지에서 포장 방법 선택 시 발생
 * @extends AmplitudeEvent
 */
export class SelectPackingType extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_packing_type', payload);
  }

  getPayload() {
    return {
      packing_type: this.payload.packingType === 'PAPER' ? 'DEFAULT' : this.payload.packingType,
      default_packing_type: this.payload.defaultPackingType === 'PAPER' ? 'DEFAULT' : this.payload.defaultPackingType,
    };
  }
}
