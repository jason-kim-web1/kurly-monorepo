type BlackAndWhite =
  | '$black950'
  | '$black900'
  | '$blackAlpha200'
  | '$blackAlpha100'
  | '$blackAlpha50'
  | '$white0'
  | '$whiteAlpha200'
  | '$whiteAlpha100'
  | '$whiteAlpha50';
export const blackAndWhitePalette: Record<BlackAndWhite, string> = {
  $black950: 'rgba(0, 0, 0, 1)',
  $black900: 'rgba(28, 28, 28, 1)',
  $blackAlpha200: 'rgba(0, 0, 0, 0.7)',
  $blackAlpha100: 'rgba(0, 0, 0, 0.5)',
  $blackAlpha50: 'rgba(0, 0, 0, 0.2)',
  $white0: 'rgba(255, 255, 255, 1)',
  $whiteAlpha200: 'rgba(255, 255, 255, 0.7)',
  $whiteAlpha100: 'rgba(255, 255, 255, 0.5)',
  $whiteAlpha50: 'rgba(255, 255, 255, 0.2)',
};
