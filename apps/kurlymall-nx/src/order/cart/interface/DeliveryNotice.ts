import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../checkout/shared/interfaces';

export interface DeliveryNotice {
  text: string;
  basicStyle: ContinuityMessageBasicStyle;
  replaceStyles: ContinuityMessageReplaceStyle[];
  subText: string;
}
