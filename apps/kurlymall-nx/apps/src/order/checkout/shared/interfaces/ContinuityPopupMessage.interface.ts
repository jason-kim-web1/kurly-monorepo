export interface ContinuityMessageBasicStyle {
  color: string;
  bold: boolean;
  backgroundColor: string;
}

export interface ContinuityMessageReplaceStyle extends Omit<ContinuityMessageBasicStyle, 'backgroundColor'> {
  text: string;
}
