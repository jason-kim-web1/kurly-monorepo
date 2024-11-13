import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectMembershipSubscribeConfirm extends AmplitudeEvent<void> {
  constructor() {
    super('select_membership_subscribe_confirm');
  }
}
