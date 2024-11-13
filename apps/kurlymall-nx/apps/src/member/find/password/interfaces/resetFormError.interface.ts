export interface ResetFormError {
  password?: {
    min: string;
    consecutive: string;
    pattern: string;
  };
  passwordConfirm: string;
}
