import { AmplitudeEvent } from '../AmplitudeEvent';

/**
 * 알림센터 배너
 */
export class SelectNotificationBanner extends AmplitudeEvent<{
  url: string;
  banner_id: number;
}> {
  constructor(url: string, bannerId: number) {
    super('select_notification_banner', { url, banner_id: bannerId });
  }
}
