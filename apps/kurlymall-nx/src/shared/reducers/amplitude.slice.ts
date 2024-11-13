import { amplitudeService } from '../amplitude';
import { AmplitudeEvent } from '../amplitude/AmplitudeEvent';

export const logEventAction =
  <T>(event: AmplitudeEvent<T>) =>
  async () => {
    amplitudeService.logEvent(event);
  };
