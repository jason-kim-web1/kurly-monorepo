import { forwardRef, memo, Ref } from 'react';
import { TextFieldBase, TextFieldProps } from '@/internal/TextFieldBase';
import { TextFieldContextProvider } from '@/internal/TextFieldBase/context/TextFieldContext';

export type Props = TextFieldProps;

export const TextField = memo(
  forwardRef(
    (
      {
        as = 'input',
        label,
        placeholder,
        disabled = false,
        required = false,
        error = false,
        value,
        minLength,
        maxLength,
        autoHeight = false,
        infoText,
        errorText,
        onChange,
        onClick,
        onBlur,
        onFocus,
        inputProps,
      }: Props,
      ref: Ref<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      return (
        <TextFieldContextProvider disabled={disabled} required={required} error={error}>
          <TextFieldBase label={label} infoText={infoText} errorText={errorText} as={as}>
            <TextFieldBase.Input
              ref={ref}
              as={as}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              inputProps={inputProps}
              autoHeight={autoHeight}
              onFocus={onFocus}
              onBlur={onBlur}
              onClick={onClick}
              onChange={onChange}
            />
            {(maxLength || minLength) && (
              <TextFieldBase.Slot>
                <TextFieldBase.Counter maxLength={maxLength} minLength={minLength} as={as} />
              </TextFieldBase.Slot>
            )}
          </TextFieldBase>
        </TextFieldContextProvider>
      );
    },
  ),
);

TextField.displayName = 'TextField';
