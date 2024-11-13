import AmplitudeService from '../../shared/amplitude/AmplitudeService';
import {
  ShareEvent,
  ViewEventDetail,
  ViewEventDetail25,
  ViewEventDetail50,
  ViewEventDetail75,
  ViewEventDetail100,
} from '../../shared/amplitude/events/lego';
import { DEFAULT_EVENT_NAME, URL_DATA } from '../constants';
import { FileUrlParam } from '../types';

export class LegoEventTracker extends AmplitudeService {
  event?: ViewEventDetail | ViewEventDetail25 | ViewEventDetail50 | ViewEventDetail75 | ViewEventDetail100 | ShareEvent;

  skip?: boolean;

  constructor({ skip: _skip }: { skip: boolean }) {
    super();

    this.skip = _skip;
  }

  setAction(eventName: string, eventData?: { url: string }): LegoEventTracker {
    if (this.skip) {
      return this;
    }

    switch (eventName) {
      case DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL:
        this.event = new ViewEventDetail(eventData || {});
        break;
      case DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL_25:
        this.event = new ViewEventDetail25(eventData || {});
        break;
      case DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL_50:
        this.event = new ViewEventDetail50(eventData || {});
        break;
      case DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL_75:
        this.event = new ViewEventDetail75(eventData || {});
        break;
      case DEFAULT_EVENT_NAME.VIEW_EVENT_DETAIL_100:
        this.event = new ViewEventDetail100(eventData || {});
        break;
      case DEFAULT_EVENT_NAME.SHARE_EVENT:
        this.event = new ShareEvent(eventData || {});
        break;
      default:
    }

    return this;
  }

  sendData(): void {
    if (this.skip || !this.event) {
      return;
    }

    super.logEvent(this.event);
  }
}

export const createFileUrl = ({ isPC, environment, path }: FileUrlParam) => {
  const legoEnv = URL_DATA[environment];

  const baseDomain = '.kurly.com';
  const baseURL1 = `lego${legoEnv === '' ? '' : '-'}`;
  const originUrl = `https://${baseURL1}${legoEnv}${baseDomain}`;

  const fileName = `${isPC ? '' : 'm_'}index.html`;

  return `${originUrl}/${path}/${fileName}`;
};
