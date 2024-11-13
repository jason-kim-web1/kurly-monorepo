import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectMembershipSubscribe extends AmplitudeEvent<void> {
  constructor() {
    super('select_membership_subscribe');
  }
}
