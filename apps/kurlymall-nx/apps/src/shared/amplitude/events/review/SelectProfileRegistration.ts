import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  profile_type: 'beauty';
  selection_type: 'my_kurly_style';
}

export class SelectProfileRegistration extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_profile_registration', payload);
  }

  getPayload() {
    return {
      profile_type: this.payload.profile_type,
      selection_type: this.payload.selection_type,
    };
  }
}
