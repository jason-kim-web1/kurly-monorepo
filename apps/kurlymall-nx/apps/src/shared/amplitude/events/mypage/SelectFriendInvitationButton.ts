import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * MW 마이컬리탭에서 '친구 초대' 배너(메뉴) 클릭
 * @extends AmplitudeEvent
 */
export class SelectFriendInvitationButton extends AmplitudeEvent<void> {
  constructor() {
    super('select_friend_invitation_button');
  }
}
