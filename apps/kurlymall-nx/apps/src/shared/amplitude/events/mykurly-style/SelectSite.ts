import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  siteInfo: 'market' | 'beauty';
}

/**
 * 뷰티 프로필 저장 성공 후 랜딩되는 저장 성공 화면에서  '마켓 컬리 보기', '뷰티 컬리 보기' 버튼 클릭 시
 * @extends AmplitudeEvent
 */
export class SelectSite extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_site', payload);
  }

  getPayload() {
    return {
      site_info: this.payload.siteInfo,
    };
  }
}
