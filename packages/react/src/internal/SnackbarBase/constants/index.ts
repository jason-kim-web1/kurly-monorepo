export const SNACKBAR_TYPE = {
  NORMAL: 'normal',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;
export type SnackbarType = (typeof SNACKBAR_TYPE)[keyof typeof SNACKBAR_TYPE];

export const SNACKBAR_BUTTON_ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;
export type SnackbarButtonOrientation = (typeof SNACKBAR_BUTTON_ORIENTATION)[keyof typeof SNACKBAR_BUTTON_ORIENTATION];
