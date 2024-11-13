import { AmplitudeEvent } from '../../AmplitudeEvent';

export class SelectMembershipInfo extends AmplitudeEvent<void> {
  constructor() {
    super('select_membership_info');
  }
}
