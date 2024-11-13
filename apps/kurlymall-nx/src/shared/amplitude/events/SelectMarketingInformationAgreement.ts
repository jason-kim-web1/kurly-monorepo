import { AmplitudeEvent } from '../AmplitudeEvent';

type PopupType = 'new' | 'normal' | 'notification';

/**
 * 광고성 정보 푸시 동의 버튼 클릭
 */
export default class SelectMarketingInformationAgreement extends AmplitudeEvent<{
  is_checked: boolean;
  popup_type: PopupType;
}> {
  constructor(popupType: PopupType, isChecked: boolean) {
    super('select_marketing_information_agreement', {
      is_checked: isChecked,
      popup_type: popupType,
    });
  }
}
