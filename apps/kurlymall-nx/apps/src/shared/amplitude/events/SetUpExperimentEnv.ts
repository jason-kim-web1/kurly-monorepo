import { AmplitudeEvent } from '../AmplitudeEvent';

interface Payload {
  experimentId: string;
  variationId: string;
}

/**
 * Growthbook에서 발생한 실험키, 대조군키를 설정하는 이벤트
 * @extends AmplitudeEvent
 */
export class SetUpExperimentEnv extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('set_up_experiment_env', payload);
  }

  getPayload() {
    return {
      experiment_id: this.payload.experimentId,
      variation_id: this.payload.variationId,
    };
  }
}
