import { AmplitudeEvent } from '../AmplitudeEvent';
import { AmplitudeCateogryMenu } from '../../interfaces/CategoryManu';

interface Payload {
  selectMenu: AmplitudeCateogryMenu;
}

export class SelectCategory extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super(payload.selectMenu.eventName, payload);
  }

  getPayload() {
    const { selectMenu } = this.payload;
    const { eventName, code, name, subCode, subName, isRecommend } = selectMenu;

    if (eventName === 'select_primary_category' || isRecommend) {
      return {
        primary_category_id: code,
        primary_category_name: name,
      };
    }

    return {
      primary_category_id: code,
      primary_category_name: name,
      secondary_category_id: subCode,
      secondary_category_name: subName,
    };
  }
}
