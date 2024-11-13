import { ChangeEvent, InputHTMLAttributes, ReactNode, FocusEvent, useState, MouseEvent } from 'react';
import styled from '@emotion/styled';

import Delete from '../Button/DeleteButton';

import COLOR from '../../constant/colorset';

const Wrapper = styled.div`
  padding-bottom: 12px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const Label = styled.label`
  display: inline-block;
  padding: 8px 0 11px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: #333;
`;

const InputWrapper = styled.div<{
  height?: number;
}>(({ height }) => {
  return `
    position: relative;
    height: ${height ? `${height}px` : '48px'};
  `;
});

const Input = styled.input<{
  isError: boolean;
  isSuccess: boolean;
  height?: number;
  icon?: string;
}>(({ isError, isSuccess, height, icon }) => {
  let borderColor = COLOR.lightGray;

  if (isError) borderColor = COLOR.invalidRed;
  else if (isSuccess) borderColor = '#0e851a';

  return `
    width: 100%;
    height: ${height ? `${height}px` : '46px'};
    padding: 0 ${icon ? '35px' : '11px'} 1px 15px;;
    border-radius: 4px;
    border: 1px solid ${borderColor};
    font-weight: 400;
    font-size: 16px;
    line-height: ${height ? `${height - 2}px` : '1.5'};
    color: ${COLOR.kurlyGray800};
    outline: none;
    box-sizing: border-box;
    :placeholder {
      color: #ccc;
    };
    :focus {
      border: 1px solid ${COLOR.kurlyGray800};
      background: none;
    }
    :disabled{
      opacity: 1;
      background-color: ${COLOR.kurlyGray100};
      color: ${COLOR.kurlyGray450};
      :placeholder {
        color: ${COLOR.kurlyGray450};
      };
    }
  `;
});

const DefaultIcon = styled.img<{ hasIconAction: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  height: 20px;
  width: 20px;
  ${({ hasIconAction }) =>
    hasIconAction &&
    `
    cursor: pointer;
  `}
`;

const InputInsideText = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`;

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  denyPattern?: RegExp;
  hasDeleteButton?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  helperText?: ReactNode;
  height?: number;
  icon?: string;
  insideText?: ReactNode;
  hasFocusDeleteButton?: boolean;
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(params: { name?: string; value: string }): void;
  onClick?(): void;
  onIconClick?(): void;
}

export default function InputBox({
  className,
  id,
  name,
  label,
  readOnly = false,
  placeholder,
  maxLength,
  denyPattern,
  type = 'text',
  disabled = false,
  required = false,
  hasDeleteButton = false,
  isError = false,
  isSuccess = false,
  helperText,
  value,
  height,
  icon,
  insideText,
  autoComplete,
  hasFocusDeleteButton = false,
  onClick,
  onFocus,
  onChange,
  onBlur,
  onIconClick,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (readOnly || disabled) {
      return;
    }

    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (readOnly || disabled) {
      return;
    }
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }

    const text: string = event.target.value;
    const filteredValue: string = denyPattern ? text.replace(denyPattern, '') : text;
    onChange({
      name: event.target.name,
      value: maxLength ? filteredValue.slice(0, maxLength) : filteredValue,
    });
  };

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const handleClick = () => {
    onChange?.({
      name,
      value: '',
    });
  };

  const isViewDelete: boolean =
    (hasDeleteButton || (hasFocusDeleteButton && isFocused)) && !readOnly && !disabled && !icon && !insideText;

  return (
    <Wrapper className={className}>
      {label && (
        <>
          <Label htmlFor={id}>{label}</Label>
          {required && <Star>*</Star>}
        </>
      )}
      <InputWrapper height={height}>
        <Input
          data-testid="input-box"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          isError={isError}
          isSuccess={isSuccess}
          type={type}
          readOnly={readOnly}
          required={required}
          height={height}
          icon={icon}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onClick={onClick}
        />
        {isViewDelete && (
          <Delete onClick={handleClick} onMouseDown={handleMouseDown} id="delete-input" ariaLabel="delete-input" />
        )}
        {icon && <DefaultIcon src={icon} onClick={onIconClick ?? onClick} hasIconAction={!!onIconClick} />}
        {insideText && <InputInsideText>{insideText}</InputInsideText>}
      </InputWrapper>
      {helperText}
    </Wrapper>
  );
}
