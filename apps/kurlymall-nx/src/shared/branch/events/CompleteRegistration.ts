import { BranchEvent } from '..';

interface EventData {
  description?: 'KAKAOSYNC';
  login_status?: 'LOGIN_FAILED';
}

export class CompleteRegistration extends BranchEvent<EventData | void, void> {
  constructor(eventData?: EventData) {
    if (eventData) {
      super('COMPLETE_REGISTRATION', eventData);
    } else {
      super('COMPLETE_REGISTRATION');
    }
  }
}
