import { AmplitudeEvent } from '../AmplitudeEvent';

type PopupType = 'LEGO' | 'notification';

/**
 * 광고성 정보 푸시 수신 동의 후 토스트 노출까지 완전히 끝난 직후
 */
export default class MarketingInformationAgreementSuccess extends AmplitudeEvent<{
  popup_type: PopupType;
}> {
  constructor(popupType: PopupType) {
    super('marketing_information_agreement_success', {
      popup_type: popupType,
    });
  }
}
