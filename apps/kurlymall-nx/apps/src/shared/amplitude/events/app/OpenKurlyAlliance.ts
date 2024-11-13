import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  allianceCode: string;
  allianceSite: string;
  allianceType: string;
}

export class OpenKurlyAlliance extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('open_kurly_alliance', payload);
  }

  getPayload() {
    return {
      alliance_code: this.payload.allianceCode,
      alliance_site: this.payload.allianceSite,
      alliance_type: this.payload.allianceType,
    };
  }
}
