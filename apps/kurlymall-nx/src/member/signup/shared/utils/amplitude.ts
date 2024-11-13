import { amplitudeService } from '../../../../shared/amplitude';
import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { BTN_TEXT } from '../../constants';

export type BtnTextType = typeof BTN_TEXT[keyof typeof BTN_TEXT];
export type Landing_Type = 'cart' | 'home' | 'event_page' | null;

export const logSelectSignUpSuccessButton = (params: { message: BtnTextType; landing_type: Landing_Type }) => {
  amplitudeService.logEvent(new AmplitudeEvent('select_sign_up_success_button', params));
};

export const logSelectSignUpSuccessPopup = (params: { message: BtnTextType; landing_type: Landing_Type }) => {
  amplitudeService.logEvent(new AmplitudeEvent('select_sign_up_success_popup', params));
};
