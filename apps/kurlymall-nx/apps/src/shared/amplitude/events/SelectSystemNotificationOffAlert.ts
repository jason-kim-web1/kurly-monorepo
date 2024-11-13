import { AmplitudeEvent } from '../AmplitudeEvent';

type PopupType = '배송완료' | '알림센터';
type SelectionType = '설정 변경하기' | '알림 켜기' | '취소';

/**
 * (디바이스 자체의)시스템 알림이 꺼져있을 경우, 노출되는 팝업(배너)에서 설정 변경하기 취소 클릭 여부 트래킹
 */
export default class SelectSystemNotificationOffAlert extends AmplitudeEvent<{
  selection_value: SelectionType;
  popup_type: PopupType;
}> {
  constructor(popupType: PopupType, selectionValue: SelectionType) {
    super('select_system_notification_off_alert', {
      selection_value: selectionValue,
      popup_type: popupType,
    });
  }
}
