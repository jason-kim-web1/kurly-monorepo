import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectMembershipCancelUnsubscribe extends AmplitudeEvent<void> {
  constructor() {
    super('select_membership_cancel_unsubscribe');
  }
}
