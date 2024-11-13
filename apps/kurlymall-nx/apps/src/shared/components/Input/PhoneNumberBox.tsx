import { FocusEvent, ReactNode } from 'react';

import { NUMBER_DENY_REGEX } from '../../constant/regex';

import InputBox from './InputBox';

export interface Props {
  className?: string;
  id: string;
  name?: string;
  label?: string;
  readOnly?: boolean;
  placeholder: string;
  maxLength?: number;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  helperText?: ReactNode;
  hasDeleteButton?: boolean;
  value: string;
  height?: number;
  hasFocusDeleteButton?: boolean;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(params: { name?: string; value: string }): void;
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
}

export default function PhoneNumberBox({ name, maxLength = 11, onChange, height = 46, ...props }: Props) {
  return (
    <InputBox
      type="tel"
      pattern="[0-9]*"
      inputMode="decimal"
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      denyPattern={NUMBER_DENY_REGEX}
      height={height}
      {...props}
    />
  );
}
