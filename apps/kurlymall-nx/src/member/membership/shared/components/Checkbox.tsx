import { forwardRef, InputHTMLAttributes, memo, Ref } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { CheckBoxActive, CheckBoxInactive, Check } from '../../../../shared/icons';
import { IconWrapper, Input, Label } from '../../../../shared/components/Input/Checkbox';
import { isPC } from '../../../../../util/window/getDevice';

const UpdatedLabel = styled(Label)<{ isTotal: boolean }>`
  ${({ isTotal }) =>
    isTotal
      ? css`
          padding: ${isPC ? '14px 0 19px 0' : '12px 0'};
        `
      : css`
          padding: ${isPC ? '0 0 11px 0' : '9px 0'};
        `};

  font-weight: 400;
`;

const Text = styled.span<{ isTotal: boolean }>`
  ${({ isTotal }) =>
    isTotal
      ? css`
          font-size: ${isPC ? 18 : 16}px;
          font-weight: ${isPC ? 500 : 600};
        `
      : css`
          font-size: 14px;
        `}

  text-align: left;
`;

const CheckWrapper = styled.span`
  margin: 0 5px;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputId?: string;
  activeId?: string;
  inactiveId?: string;
  isTotal: boolean;
  circleCheckbox: boolean;
}

function Checkbox(
  { className, inputId, activeId, inactiveId, label, isTotal, circleCheckbox, ...props }: Props,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <UpdatedLabel
      isTotal={isTotal}
      className={className}
      htmlFor={inputId}
      disabled={false}
      isFullSize
      withLabel={!!label}
    >
      <Input {...props} id={inputId} ref={ref} disabled={false} type="checkbox" />
      <IconWrapper disabledChecked={false}>
        {circleCheckbox ? (
          <>
            <CheckBoxActive id={activeId} width={24} height={24} fill={COLOR.kurlyPurple} />
            <CheckBoxInactive id={inactiveId} width={24} height={24} fill={COLOR.kurlyWhite} />
          </>
        ) : (
          <>
            <CheckWrapper id={activeId}>
              <Check width={13} height={9} stroke={COLOR.kurlyPurple} strokeWidth={1.5} />
            </CheckWrapper>
            <CheckWrapper id={inactiveId}>
              <Check width={13} height={9} stroke={COLOR.lightGray} strokeWidth={1.5} />
            </CheckWrapper>
          </>
        )}
      </IconWrapper>
      <Text isTotal={isTotal}>{label}</Text>
    </UpdatedLabel>
  );
}

export default memo(forwardRef(Checkbox));
