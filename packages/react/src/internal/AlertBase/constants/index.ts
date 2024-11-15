export const BUTTON_LAYOUT = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

export type ButtonLayout = (typeof BUTTON_LAYOUT)[keyof typeof BUTTON_LAYOUT];
