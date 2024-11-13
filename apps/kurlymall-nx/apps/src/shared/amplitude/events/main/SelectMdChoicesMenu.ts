import type { MdChoicesPayload } from '../../../../main/interfaces/MainSection.interface';
import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  id: number;
  code: string;
  selectionType: string;
  selectionPayload?: MdChoicesPayload;
}

export class SelectMdChoicesMenu extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_section_category_subtab', payload);
  }

  getPayload() {
    const { id, code, selectionType, selectionPayload } = this.payload;

    return {
      primary_category_id: id,
      primary_category_name: selectionPayload?.options.find((opt) => opt.code === code)?.name || null,
      selection_type: selectionType,
      title: selectionPayload?.title || null,
    };
  }
}
