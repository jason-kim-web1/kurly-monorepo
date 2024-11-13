export interface SignupFormError {
  id: {
    minAndPattern: string;
  };
  password: {
    min: string;
    pattern: string;
    consecutive: string;
  };
  passwordConfirm: string;
}
