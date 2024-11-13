import { MainSection } from '../../../../main/interfaces/MainSection.interface';
import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getEventName } from './getEventName';
import { getProductData } from './getProductData';
import { getTemplate } from './getTemplate';

interface Payload {
  sections: MainSection<unknown>[];
  section: any;
  eventName: string;
  sectionType: string;
  row?: number;
  position?: number;
  title: string;
  target?: number | string;
  link: string;
}

export class SelectQuickMenu extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(
      getEventName({
        name: payload.eventName,
        position: payload.position,
      }),
      payload,
    );
  }

  getPayload() {
    try {
      const { target, sections, section, eventName, row, position, sectionType, title, link } = this.payload;
      const { payload: sectionPayLoad, id } = section;

      const themePosition = sections.findIndex((s) => s.id === id);
      const calcPosition = typeof position !== 'undefined' ? position + 1 : null;

      const productTypeData = getProductData({
        eventName,
        sectionType,
        payload: sectionPayLoad,
        target,
        position,
      });

      return {
        ...productTypeData,
        selection_type: sectionType,
        theme_position: themePosition + 1,
        position: `${row}.${calcPosition}`,
        section_id: id,
        template_code: getTemplate({ eventName }).templateCode,
        template_type: getTemplate({ eventName }).templateType,
        content_title: title,
        url: link,
      };
    } catch (e) {
      return;
    }
  }
}
