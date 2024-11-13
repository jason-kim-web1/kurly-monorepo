import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  selectionType: 'header' | 'dropdown' | 'mypage';
}

export class SelectMyKurlyPickList extends AmplitudeEvent<Payload | undefined> {
  constructor(payload?: Payload) {
    super('select_my_kurly_pick_list', payload);
  }

  getPayload() {
    return {
      selection_type: this.payload?.selectionType,
    };
  }
}
