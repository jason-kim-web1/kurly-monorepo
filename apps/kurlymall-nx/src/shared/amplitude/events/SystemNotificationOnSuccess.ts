import { AmplitudeEvent } from '../AmplitudeEvent';

type PopupType = '배송완료' | '알림센터';

/**
 * (디바이스 자체의)시스템 알림이 꺼져있을 경우, 노출되는 팝업(배너)에서 설정을 ON하고 다시 앱으로 돌아온 경우에 발생
 */
export default class SystemNotificationOnSuccess extends AmplitudeEvent<{
  popup_type: PopupType;
}> {
  constructor(popupType: PopupType) {
    super('system_notification_on_success', {
      popup_type: popupType,
    });
  }
}
