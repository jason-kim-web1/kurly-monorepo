import { forwardRef, InputHTMLAttributes, memo, ReactNode, Ref } from 'react';

import styled from '@emotion/styled';

import { css, SerializedStyles } from '@emotion/react';

import COLOR from '../../constant/colorset';

import CheckboxIcon from './CheckboxIcon';
import CheckboxFlatIcon from './CheckboxFlatIcon';

export const Label = styled.label(
  ({ withLabel, disabled, isFullSize }: { withLabel: boolean; disabled: boolean; isFullSize: boolean }) =>
    withLabel &&
    css`
      padding: 14px 0 9px;
      position: relative;
      display: ${isFullSize ? 'flex' : 'inline-flex'};
      align-items: center;
      font-size: 16px;
      vertical-align: top;
      line-height: normal;
      color: ${disabled ? COLOR.lightGray : COLOR.kurlyGray800};
    `,
);

export const Input = styled.input`
  overflow: hidden;
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
`;

export const IconWrapper = styled.div<{ disabledChecked: boolean }>`
  margin-right: 12px;
  ${({ disabledChecked }) => disabledChecked && 'opacity: 0.2;'};
  svg {
    vertical-align: middle;
  }
`;

export const Sub = styled.em`
  padding-left: 4px;
  font-style: normal;
  font-size: 12px;
  color: ${COLOR.kurlyGray350};
  line-height: 20px;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  iconColor?: string;
  label?: string | ReactNode;
  isFullSize?: boolean;
  flatTheme?: boolean;
  testId?: string;
  sub?: string | number;
  styles?: SerializedStyles;
}

function Checkbox(
  {
    className,
    id,
    iconColor,
    label,
    isFullSize = true,
    disabled = false,
    checked = false,
    flatTheme,
    sub,
    styles,
    width,
    height,
    ...props
  }: Props,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <Label
      className={className}
      htmlFor={id}
      disabled={disabled}
      isFullSize={isFullSize}
      withLabel={!!label}
      css={styles}
    >
      <Input {...props} id={id} ref={ref} disabled={disabled} checked={checked} type="checkbox" />
      <IconWrapper disabledChecked={disabled && checked}>
        {flatTheme ? (
          <CheckboxFlatIcon checked={checked} iconColor={iconColor} />
        ) : (
          <CheckboxIcon disabled={disabled} iconColor={iconColor} checked={checked} width={width} height={height} />
        )}
      </IconWrapper>
      <span>{label}</span>
      {sub && <Sub>{sub}</Sub>}
    </Label>
  );
}

export default memo(forwardRef(Checkbox));
